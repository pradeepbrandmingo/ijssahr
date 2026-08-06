import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../../services/api";
import {
  FaSave,
  FaInfoCircle,
  FaBookOpen,
  FaShieldAlt,
  FaUserCheck,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

const defaultAboutData = {
  header: {
    title: "About Us",
    intro:
      "International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is an international, double-blind peer-reviewed, open-access journal published by Alicon Publications.",
  },
  journalInfo: [
    { label: "Starting Year", value: "2026" },
    { label: "Subject Area", value: "Social Science, Arts and Humanities" },
    { label: "Format", value: "Online" },
    { label: "Language", value: "English" },
    { label: "Publisher", value: "Alicon Publications" },
  ],
  description:
    "IJSSAHR aims to provide a valuable outlet for research and scholarship on Social Science, Arts and Humanities-orientated themes and topics.",
  ethicsStatement: {
    title: "IJSSAHR Publication Ethics Statement",
    intro:
      "The publisher/journal is dedicated to maintaining the highest level of integrity in the work published.",
  },
  sections: [],
  license: {
    title: "Creative Commons Attribution License (CC-BY)",
    text: "All articles published by IJSSAHR will be distributed under the terms and conditions of the Creative Commons Attribution License(CC-BY).",
  },
};

const AboutPageManager = () => {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(defaultAboutData);

  const { data: serverData } = useQuery({
    queryKey: ["admin-about-page"],
    queryFn: async () => {
      const res = await API.get("/about-page");
      return res.data?.data || defaultAboutData;
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
      const res = await API.put("/about-page", formData);
      if (res.data?.data) {
        setFormData(res.data.data);
      }
      toast.success("About Us Page content updated live successfully!");
      await queryClient.invalidateQueries({ queryKey: ["admin-about-page"] });
      await queryClient.invalidateQueries({ queryKey: ["about-page-public"] });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update About Us Page content"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleJournalInfoChange = (index, field, value) => {
    setFormData((prev) => {
      const list = [...(prev.journalInfo || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, journalInfo: list };
    });
  };

  const handleSectionPointChange = (sIndex, pIndex, field, value) => {
    setFormData((prev) => {
      const secs = [...(prev.sections || [])];
      const points = [...(secs[sIndex].points || [])];
      points[pIndex] = { ...points[pIndex], [field]: value };
      secs[sIndex] = { ...secs[sIndex], points };
      return { ...prev, sections: secs };
    });
  };

  const addPointToSection = (sIndex) => {
    setFormData((prev) => {
      const secs = [...(prev.sections || [])];
      const points = [...(secs[sIndex].points || []), { heading: "", text: "" }];
      secs[sIndex] = { ...secs[sIndex], points };
      return { ...prev, sections: secs };
    });
  };

  const removePointFromSection = (sIndex, pIndex) => {
    setFormData((prev) => {
      const secs = [...(prev.sections || [])];
      const points = (secs[sIndex].points || []).filter((_, idx) => idx !== pIndex);
      secs[sIndex] = { ...secs[sIndex], points };
      return { ...prev, sections: secs };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-5 text-slate-900 font-sans w-full"
    >
      {/* Top Banner Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FaInfoCircle className="text-blue-600" /> About Us Page Content Manager
          </h1>
          <p className="text-xs font-normal text-slate-500 mt-0.5">
            SuperAdmin Control: Edit About Us Intro, Journal Info, Ethics Statements & Responsibilities live in MongoDB.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
        >
          <FaSave /> {saving ? "Saving..." : "Save Live Settings"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-xs font-normal">
        {/* Header & Intro Section */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <FaBookOpen className="text-blue-600" /> Page Title & Header Intro
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Title:
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
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs"
              />
            </div>
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Subtitle / Intro:
              </label>
              <textarea
                rows="2"
                value={formData.header?.intro || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    header: { ...formData.header, intro: e.target.value },
                  })
                }
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Journal Info List */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <FaInfoCircle className="text-blue-600" /> Journal Overview Info List
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formData.journalInfo?.map((info, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2"
              >
                <input
                  type="text"
                  value={info.label}
                  onChange={(e) =>
                    handleJournalInfoChange(idx, "label", e.target.value)
                  }
                  className="w-1/3 px-2 py-1 bg-white border border-slate-300 rounded text-xs font-semibold"
                />
                <input
                  type="text"
                  value={info.value}
                  onChange={(e) =>
                    handleJournalInfoChange(idx, "value", e.target.value)
                  }
                  className="w-2/3 px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Description & Ethics Statement */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <FaShieldAlt className="text-blue-600" /> Journal Scope Description & Ethics Statement
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block mb-1 font-semibold text-slate-700">
                Detailed Scope Description:
              </label>
              <textarea
                rows="3"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs leading-relaxed"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-slate-700">
                Ethics Statement Title:
              </label>
              <input
                type="text"
                value={formData.ethicsStatement?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ethicsStatement: {
                      ...formData.ethicsStatement,
                      title: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-slate-700">
                Ethics Statement Intro:
              </label>
              <textarea
                rows="3"
                value={formData.ethicsStatement?.intro || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ethicsStatement: {
                      ...formData.ethicsStatement,
                      intro: e.target.value,
                    },
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Sections (Editor/Reviewer/Author/Publisher Responsibilities) */}
        {formData.sections?.map((sec, sIndex) => (
          <div
            key={sIndex}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FaUserCheck className="text-blue-600" /> {sec.title}
              </h3>
              <button
                type="button"
                onClick={() => addPointToSection(sIndex)}
                className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800"
              >
                <FaPlus /> Add Point
              </button>
            </div>

            <div className="space-y-3">
              {sec.points?.map((pt, pIndex) => (
                <div
                  key={pIndex}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-slate-700">
                      Point #{pIndex + 1} Heading:
                    </label>
                    <button
                      type="button"
                      onClick={() => removePointFromSection(sIndex, pIndex)}
                      className="text-red-500 hover:text-red-700 text-xs"
                      title="Remove Point"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={pt.heading}
                    onChange={(e) =>
                      handleSectionPointChange(
                        sIndex,
                        pIndex,
                        "heading",
                        e.target.value
                      )
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold"
                  />
                  <div>
                    <label className="block mb-1 font-semibold text-slate-600">
                      Text:
                    </label>
                    <textarea
                      rows="2"
                      value={pt.text}
                      onChange={(e) =>
                        handleSectionPointChange(
                          sIndex,
                          pIndex,
                          "text",
                          e.target.value
                        )
                      }
                      className="w-full p-2 bg-white border border-slate-300 rounded text-xs leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 text-xs"
          >
            <FaSave /> {saving ? "Saving..." : "Save Live Settings"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AboutPageManager;
