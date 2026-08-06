import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../../services/api";
import {
  FaSave,
  FaCheckCircle,
  FaPlus,
  FaFileAlt,
  FaCheckSquare,
  FaCogs,
  FaShieldAlt,
  FaDollarSign,
} from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

const defaultAuthorInstructionsFormData = {
  header: {
    title: "Instructions for Authors",
    subtitle:
      "Complete guidelines, checklists, and submission process for authors submitting papers to IJSSAHR.",
  },
  submissionGuidelines: {
    title: "Submission Guidelines",
    paragraphs: [
      "When submitting papers for potential publication in the IJSSAHR, please submit an original editable file in one of the ( MS Word, doc ) style files. All figures, images, tables, etc., should be embedded into the original file.",
    ],
    submissionEmail: "info@ijssahr.com",
  },
  preparationChecklist: {
    title: "Author Preparation Checklist",
    items: [
      "Originality & Plagiarism: The submission is original work.",
    ],
  },
  publicationProcess: {
    title: "Step-by-Step Publication Process",
    steps: [
      { stepNumber: "1", title: "Paper Submission", description: "Authors submit paper via email." },
    ],
  },
  copyrightNotice: {
    title: "Copyright Notice",
    paragraphs: [
      "Copyrights for articles published in IJSSAHR are retained by the authors.",
    ],
  },
  publicationCharges: {
    title: "Publication Charges",
    description: "Nominal processing fee.",
    tableData: [{ label: "Publication (APC) Charges", value: "60 USD/article" }],
    safeListNote: "Please add 'ijssahr.com' domain to your e-mail 'safe list'.",
  },
};

const AuthorInstructionsManager = () => {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(defaultAuthorInstructionsFormData);

  const { data: serverData } = useQuery({
    queryKey: ["admin-author-instructions"],
    queryFn: async () => {
      const res = await API.get("/author-instructions");
      return res.data?.data || defaultAuthorInstructionsFormData;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (serverData) {
      setFormData(serverData);
    }
  }, [serverData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await API.put("/author-instructions", formData);
      if (res.data?.data) {
        setFormData(res.data.data);
      }
      toast.success("Author Instructions page updated successfully! Live website updated.");
      await queryClient.invalidateQueries({ queryKey: ["admin-author-instructions"] });
      await queryClient.invalidateQueries({ queryKey: ["author-instructions-public"] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update instructions");
    } finally {
      setSaving(false);
    }
  };

  const handleListChange = (section, field, index, value) => {
    setFormData((prev) => {
      const updatedList = [...prev[section][field]];
      updatedList[index] = value;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: updatedList,
        },
      };
    });
  };

  const handleAddListItem = (section, field, defaultValue = "") => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], defaultValue],
      },
    }));
  };

  const handleRemoveListItem = (section, field, index) => {
    setFormData((prev) => {
      const updatedList = prev[section][field].filter((_, i) => i !== index);
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: updatedList,
        },
      };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-5 text-slate-900 font-sans w-full"
    >
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            Author Instructions Page Manager
          </h1>
          <p className="text-xs font-normal text-slate-500 mt-0.5">
            SuperAdmin Control: Edit Guidelines, Checklist, Process steps, Copyright & APC Charges.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
        >
          <FaSave /> {saving ? "Saving Changes..." : "Save Live Page"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-xs font-normal">
        {/* 1. Page Header Title & Subtitle */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Main Header Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Page Header Title:
              </label>
              <input
                type="text"
                value={formData.header?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    header: { ...formData.header, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Page Header Subtitle:
              </label>
              <input
                type="text"
                value={formData.header?.subtitle || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    header: { ...formData.header, subtitle: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>
          </div>
        </div>

        {/* 2. Submission Guidelines Section */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <FaFileAlt className="text-blue-600 text-xs" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              1. Submission Guidelines Section
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Section Title:
              </label>
              <input
                type="text"
                value={formData.submissionGuidelines?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    submissionGuidelines: {
                      ...formData.submissionGuidelines,
                      title: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Submission Email Address:
              </label>
              <input
                type="email"
                value={formData.submissionGuidelines?.submissionEmail || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    submissionGuidelines: {
                      ...formData.submissionGuidelines,
                      submissionEmail: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-slate-700">
                Guidelines Paragraphs:
              </label>
              <button
                type="button"
                onClick={() =>
                  handleAddListItem("submissionGuidelines", "paragraphs", "New guideline paragraph...")
                }
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold rounded-md transition-all border border-blue-200"
              >
                <FaPlus className="text-[9px]" /> Add Paragraph
              </button>
            </div>
            {formData.submissionGuidelines?.paragraphs?.map((p, idx) => (
              <div key={idx} className="flex items-start gap-2.5 mb-2.5">
                <textarea
                  rows="3"
                  value={p}
                  onChange={(e) =>
                    handleListChange(
                      "submissionGuidelines",
                      "paragraphs",
                      idx,
                      e.target.value
                    )
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs leading-relaxed"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveListItem("submissionGuidelines", "paragraphs", idx)
                  }
                  className="w-7 h-7 rounded-md bg-rose-50/80 hover:bg-rose-600 text-rose-500 hover:text-white flex items-center justify-center transition-all border border-rose-200/60 hover:border-rose-600 shrink-0 mt-1 cursor-pointer shadow-2xs"
                  title="Remove paragraph"
                >
                  <FiTrash2 className="text-[12px]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Submission Preparation Checklist Section */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <FaCheckSquare className="text-blue-600 text-xs" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              2. Submission Preparation Checklist Section
            </h3>
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Checklist Title:
            </label>
            <input
              type="text"
              value={formData.checklist?.title || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  checklist: { ...formData.checklist, title: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Checklist Description Text:
            </label>
            <textarea
              rows="2"
              value={formData.checklist?.description || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  checklist: {
                    ...formData.checklist,
                    description: e.target.value,
                  },
                })
              }
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs leading-relaxed"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-slate-700">
                Checklist Bullet Points:
              </label>
              <button
                type="button"
                onClick={() =>
                  handleAddListItem("checklist", "items", "New checklist requirement...")
                }
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold rounded-md transition-all border border-blue-200"
              >
                <FaPlus className="text-[9px]" /> Add Bullet Point
              </button>
            </div>
            {formData.checklist?.items?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 mb-2.5">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleListChange("checklist", "items", idx, e.target.value)
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveListItem("checklist", "items", idx)}
                  className="w-7 h-7 rounded-md bg-rose-50/80 hover:bg-rose-600 text-rose-500 hover:text-white flex items-center justify-center transition-all border border-rose-200/60 hover:border-rose-600 shrink-0 cursor-pointer shadow-2xs"
                  title="Remove item"
                >
                  <FiTrash2 className="text-[12px]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Paper Selection and Publication Process Section */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <FaCogs className="text-blue-600 text-xs" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              3. Paper Selection & Publication Process Section
            </h3>
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Process Title:
            </label>
            <input
              type="text"
              value={formData.process?.title || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  process: { ...formData.process, title: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-slate-700">
                Process Steps (Numbered):
              </label>
              <button
                type="button"
                onClick={() =>
                  handleAddListItem("process", "steps", "New process step...")
                }
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold rounded-md transition-all border border-blue-200"
              >
                <FaPlus className="text-[9px]" /> Add Step
              </button>
            </div>
            {formData.process?.steps?.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 mb-2.5">
                <span className="w-7 h-7 rounded-md bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs mt-1">
                  {idx + 1}
                </span>
                <textarea
                  rows="2"
                  value={step}
                  onChange={(e) =>
                    handleListChange("process", "steps", idx, e.target.value)
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs leading-relaxed"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveListItem("process", "steps", idx)}
                  className="w-7 h-7 rounded-md bg-rose-50/80 hover:bg-rose-600 text-rose-500 hover:text-white flex items-center justify-center transition-all border border-rose-200/60 hover:border-rose-600 shrink-0 mt-1 cursor-pointer shadow-2xs"
                  title="Remove step"
                >
                  <FiTrash2 className="text-[12px]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Copyright Notice Section */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <FaShieldAlt className="text-blue-600 text-xs" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              4. Copyright Notice Section
            </h3>
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Copyright Section Title:
            </label>
            <input
              type="text"
              value={formData.copyrightNotice?.title || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  copyrightNotice: {
                    ...formData.copyrightNotice,
                    title: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-slate-700">
                Copyright Paragraphs:
              </label>
              <button
                type="button"
                onClick={() =>
                  handleAddListItem("copyrightNotice", "paragraphs", "New copyright paragraph...")
                }
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold rounded-md transition-all border border-blue-200"
              >
                <FaPlus className="text-[9px]" /> Add Paragraph
              </button>
            </div>
            {formData.copyrightNotice?.paragraphs?.map((p, idx) => (
              <div key={idx} className="flex items-start gap-2.5 mb-2.5">
                <textarea
                  rows="3"
                  value={p}
                  onChange={(e) =>
                    handleListChange(
                      "copyrightNotice",
                      "paragraphs",
                      idx,
                      e.target.value
                    )
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs leading-relaxed"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveListItem("copyrightNotice", "paragraphs", idx)
                  }
                  className="w-7 h-7 rounded-md bg-rose-50/80 hover:bg-rose-600 text-rose-500 hover:text-white flex items-center justify-center transition-all border border-rose-200/60 hover:border-rose-600 shrink-0 mt-1 cursor-pointer shadow-2xs"
                  title="Remove paragraph"
                >
                  <FiTrash2 className="text-[12px]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Publication Charges Section */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <FaDollarSign className="text-blue-600 text-xs" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              5. Publication (APC) Charges Section
            </h3>
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Publication Charges Title:
            </label>
            <input
              type="text"
              value={formData.publicationCharges?.title || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  publicationCharges: {
                    ...formData.publicationCharges,
                    title: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Description Text:
            </label>
            <textarea
              rows="3"
              value={formData.publicationCharges?.description || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  publicationCharges: {
                    ...formData.publicationCharges,
                    description: e.target.value,
                  },
                })
              }
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Safe List Alert Note:
            </label>
            <textarea
              rows="2"
              value={formData.publicationCharges?.safeListNote || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  publicationCharges: {
                    ...formData.publicationCharges,
                    safeListNote: e.target.value,
                  },
                })
              }
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 text-xs"
          >
            <FaSave className="text-xs" />{" "}
            {saving ? "Saving Changes..." : "Save & Publish Live Page"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AuthorInstructionsManager;
