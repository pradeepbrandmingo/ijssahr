import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import API from "../../services/api";
import {
  FaSave,
  FaCheckCircle,
  FaPlus,
  FaLayerGroup,
  FaStar,
  FaCheckSquare,
} from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

import { toast } from "react-toastify";

const defaultAimScopeFormData = {
  header: {
    title: "Aims and Scope",
    subtitle:
      "Discover the multidisciplinary fields, key journal features, and academic mission of IJSSAHR.",
  },
  introduction:
    "The International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is a peer-reviewed, open-access journal committed to advancing knowledge and understanding in the fields of Social Science, Arts and Humanities.",
  disciplinesSection: {
    title:
      "IJSSAHR welcomes high-quality submissions across a wide range of disciplines including, but not limited to:",
    disciplines: [
      "Sociology, Psychology, and Anthropology",
      "Linguistics, Literature, and Language Studies",
      "Political Science, International Relations, and Public Administration",
      "Education, Media, and Communication Studies",
      "History, Philosophy, and Cultural Studies",
      "Fine Arts, Performing Arts, and Visual Arts",
      "Gender Studies, Ethics, and Human Rights",
    ],
  },
  interdisciplinaryHighlight:
    "The journal encourages interdisciplinary and cross-cultural studies that explore the intersection of Social Science, Arts, and human experience.",
  keyFeaturesSection: {
    title: "Key features of IJSSAHR:",
    features: [
      "Free online access and global visibility for all published articles",
      "Fast and fair peer-review process",
      "Support for early-career researchers",
      "A strong commitment to academic integrity and originality",
    ],
    closingStatement:
      "By fostering academic exchange and promoting diverse voices, IJSSAHR aspires to be a leading international platform for critical thought, research innovation, and intellectual collaboration in the social sciences, arts, and humanities.",
  },
};

const AimScopeManager = () => {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const { data: serverData } = useQuery({
    queryKey: ["admin-aim-scope"],
    queryFn: async () => {
      const res = await API.get("/aim-scope");
      return res.data?.data || defaultAimScopeFormData;
    },
    staleTime: 0,
  });

  const [formData, setFormData] = useState(defaultAimScopeFormData);

  useEffect(() => {
    if (serverData) {
      setFormData(serverData);
    }
  }, [serverData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await API.put("/aim-scope", formData);
      if (res.data?.data) {
        setFormData(res.data.data);
      }
      toast.success("Aims & Scope page updated successfully! Live website updated.");
      await queryClient.invalidateQueries({ queryKey: ["admin-aim-scope"] });
      await queryClient.invalidateQueries({ queryKey: ["aim-scope-public"] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update Aims & Scope");
    } finally {
      setSaving(false);
    }
  };

  const handleArrayItemChange = (section, field, index, value) => {
    setFormData((prev) => {
      const updated = [...prev[section][field]];
      updated[index] = value;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: updated,
        },
      };
    });
  };

  const handleAddArrayItem = (section, field, defaultValue = "") => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], defaultValue],
      },
    }));
  };

  const handleRemoveArrayItem = (section, field, index) => {
    setFormData((prev) => {
      const updated = prev[section][field].filter((_, i) => i !== index);
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: updated,
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
      {/* Page Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            Aims & Scope Page Manager
          </h1>
          <p className="text-xs font-normal text-slate-500 mt-0.5">
            SuperAdmin Control: Edit Header, Introduction, Disciplines list, Highlight Note & Key Features.
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
        {/* 1. Header & Introduction Section */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Main Header & Introduction
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

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Introduction Paragraph:
            </label>
            <textarea
              rows="4"
              value={formData.introduction || ""}
              onChange={(e) =>
                setFormData({ ...formData, introduction: e.target.value })
              }
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* 2. Multidisciplinary Scope Section */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <FaLayerGroup className="text-blue-600 text-xs" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              2. Multidisciplinary Disciplines Section
            </h3>
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Section Intro Heading:
            </label>
            <input
              type="text"
              value={formData.disciplinesSection?.title || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  disciplinesSection: {
                    ...formData.disciplinesSection,
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
                Disciplines List:
              </label>
              <button
                type="button"
                onClick={() =>
                  handleAddArrayItem(
                    "disciplinesSection",
                    "disciplines",
                    "New Discipline..."
                  )
                }
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold rounded-md transition-all border border-blue-200"
              >
                <FaPlus className="text-[9px]" /> Add Discipline
              </button>
            </div>
            {formData.disciplinesSection?.disciplines?.map((discipline, idx) => (
              <div key={idx} className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 text-xs border border-blue-100">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={discipline}
                  onChange={(e) =>
                    handleArrayItemChange(
                      "disciplinesSection",
                      "disciplines",
                      idx,
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveArrayItem("disciplinesSection", "disciplines", idx)
                  }
                  className="w-7 h-7 rounded-md bg-rose-50/80 hover:bg-rose-600 text-rose-500 hover:text-white flex items-center justify-center transition-all border border-rose-200/60 hover:border-rose-600 shrink-0 cursor-pointer shadow-2xs"
                  title="Remove discipline"
                >
                  <FiTrash2 className="text-[12px]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Interdisciplinary Highlight Note */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <FaStar className="text-blue-600 text-xs" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              3. Interdisciplinary Highlight Note Box
            </h3>
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Highlight Note Content:
            </label>
            <textarea
              rows="3"
              value={formData.interdisciplinaryHighlight || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  interdisciplinaryHighlight: e.target.value,
                })
              }
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* 4. Key Features Section */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <FaCheckSquare className="text-blue-600 text-xs" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              4. Key Features Section
            </h3>
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Key Features Title:
            </label>
            <input
              type="text"
              value={formData.keyFeaturesSection?.title || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  keyFeaturesSection: {
                    ...formData.keyFeaturesSection,
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
                Key Feature Points:
              </label>
              <button
                type="button"
                onClick={() =>
                  handleAddArrayItem(
                    "keyFeaturesSection",
                    "features",
                    "New key feature..."
                  )
                }
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold rounded-md transition-all border border-blue-200"
              >
                <FaPlus className="text-[9px]" /> Add Feature
              </button>
            </div>
            {formData.keyFeaturesSection?.features?.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 mb-2.5">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) =>
                    handleArrayItemChange(
                      "keyFeaturesSection",
                      "features",
                      idx,
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveArrayItem("keyFeaturesSection", "features", idx)
                  }
                  className="w-7 h-7 rounded-md bg-rose-50/80 hover:bg-rose-600 text-rose-500 hover:text-white flex items-center justify-center transition-all border border-rose-200/60 hover:border-rose-600 shrink-0 cursor-pointer shadow-2xs"
                  title="Remove feature"
                >
                  <FiTrash2 className="text-[12px]" />
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Closing Statement Paragraph:
            </label>
            <textarea
              rows="3"
              value={formData.keyFeaturesSection?.closingStatement || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  keyFeaturesSection: {
                    ...formData.keyFeaturesSection,
                    closingStatement: e.target.value,
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

export default AimScopeManager;
