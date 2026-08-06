import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../../services/api";
import {
  FaSave,
  FaBullhorn,
  FaEnvelope,
  FaInfoCircle,
  FaHome,
} from "react-icons/fa";

const defaultHomePageData = {
  announcement: {
    text: "Invitation for Paper/Articles : Submission open for Current issue",
    link: "/paper-submission",
  },
  contactEmail: "editor.aliconpublications@gmail.com",
  aboutParagraphs: [
    "International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is a peer-reviewed, Bimonthly, open-access journal dedicated to promoting high-quality interdisciplinary research in the fields of social sciences, arts, and humanities.",
  ],
};

const HomePageManager = () => {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(defaultHomePageData);

  const { data: serverData } = useQuery({
    queryKey: ["admin-home-page"],
    queryFn: async () => {
      const res = await API.get("/home-page");
      return res.data?.data || defaultHomePageData;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (serverData) {
      const defaultParas = [
        "International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is a peer-reviewed, Bimonthly, open-access journal dedicated to promoting high-quality interdisciplinary research in the fields of social sciences, arts, and humanities. Backed by a strong Editorial Board and a robust, rapid peer-review system, IJSSAHR aims to foster academic exchange and contribute to the global dissemination of knowledge in these diverse fields.",
        "The journal seeks to bridge gaps between theory and practice by encouraging contributions that stimulate dialogue among scholars, researchers, and practitioners.",
        "All submitted manuscripts, including papers from symposia or special issues, undergo a rigorous peer-review process conducted by qualified experts appointed by the editorial board.",
        "Our mission is to foster intellectual dialogue, promote interdisciplinary collaboration, and support the growth of knowledge across diverse academic disciplines.",
        "We invite you to join our vibrant academic community and share your work with a global audience through IJSSAHR.",
      ];
      setFormData({
        ...serverData,
        aboutParagraphs:
          serverData.aboutParagraphs?.length > 0
            ? serverData.aboutParagraphs
            : defaultParas,
      });
    }
  }, [serverData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await API.put("/home-page", formData);
      if (res.data?.data) {
        setFormData(res.data.data);
      }
      toast.success("Home Page content updated live successfully!");
      await queryClient.invalidateQueries({ queryKey: ["admin-home-page"] });
      await queryClient.invalidateQueries({ queryKey: ["home-page-public"] });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update Home Page content"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleParagraphChange = (index, value) => {
    setFormData((prev) => {
      const paras = [...(prev.aboutParagraphs || [])];
      paras[index] = value;
      return { ...prev, aboutParagraphs: paras };
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
            <FaHome className="text-blue-600" /> Home Page Content Manager
          </h1>
          <p className="text-xs font-normal text-slate-500 mt-0.5">
            SuperAdmin Control: Edit Announcement Banner, Contact Email & About Journal Content live in MongoDB.
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
        {/* Announcement Banner */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <FaBullhorn className="text-blue-600" /> Latest Announcement Banner
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Announcement Prefix Text:
              </label>
              <input
                type="text"
                value={formData.announcement?.text || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    announcement: {
                      ...formData.announcement,
                      text: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs"
              />
              <p className="text-[10.5px] text-blue-600 font-medium mt-1">
                * Current issue details (e.g. Volume 01, Issue 04, July–Aug 2026) are automatically appended live from database!
              </p>
            </div>
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Announcement Link:
              </label>
              <input
                type="text"
                value={formData.announcement?.link || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    announcement: {
                      ...formData.announcement,
                      link: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs"
              />
            </div>
          </div>
        </div>

        {/* Contact Email & Journal DOI Prefix */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <FaEnvelope className="text-blue-600" /> Editor Contact Email & Journal DOI Prefix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Submit Manuscript Email:
              </label>
              <input
                type="email"
                value={formData.contactEmail || ""}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs font-medium"
              />
            </div>
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Journal DOI Prefix No:
              </label>
              <input
                type="text"
                value={formData.journalDoiPrefix || ""}
                placeholder="dx.doi.org/10.51505"
                onChange={(e) =>
                  setFormData({ ...formData, journalDoiPrefix: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs font-mono font-medium"
              />
            </div>
          </div>
        </div>

        {/* About Journal Paragraphs */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <FaInfoCircle className="text-blue-600" /> About Journal & Scope Paragraphs
          </h3>
          <div className="space-y-3">
            {formData.aboutParagraphs?.map((para, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block font-semibold text-slate-700">
                    Paragraph #{idx + 1}:
                  </label>
                  {idx === 1 && (
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                      Starts "Scope of the Journal" section on Home Page
                    </span>
                  )}
                </div>
                <textarea
                  rows="3"
                  value={para}
                  onChange={(e) => handleParagraphChange(idx, e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>

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

export default HomePageManager;
