import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../../services/api";
import {
  FaSave,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaBuilding,
  FaInfoCircle,
  FaShieldAlt,
} from "react-icons/fa";

const defaultContactFormData = {
  title: "Contact Us",
  journalName:
    "International Journal of Social Science, Arts and Humanities Research",
  publishedBy: "Alicon Publications",
  organizationalEmail: "aliconpublications@gmail.com",
  address:
    "Near ICICI Bank, Subhash Marg, Shamgarh (Madhya Pradesh) India, 458883",
  email: "info@ijssahr.com",
  website: "https://www.ijssahr.com",
  infoHtml:
    'Alicon Publications is a private, for-profit organization dedicated to providing support and services to educators and researchers across India and around the world.<br/>The trade name "Alicon Publications" is officially registered under the Madhya Pradesh Establishment Act, 1958, with the Online Registration Mark & Number: <span class="text-[var(--primary)] font-semibold">C/1525726</span>.',
  license: {
    title: "Licensed under Creative Commons Attribution 3.0",
    text: "This work is licensed under a Creative Commons Attribution 3.0 International License.",
    imageUrl: "https://licensebuttons.net/l/by-sa/3.0/88x31.png",
  },
};

const ContactManager = () => {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(defaultContactFormData);

  const { data: serverData } = useQuery({
    queryKey: ["admin-contact-info"],
    queryFn: async () => {
      const res = await API.get("/contact-info");
      return res.data?.data || defaultContactFormData;
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
      const res = await API.put("/contact-info", formData);
      if (res.data?.data) {
        setFormData(res.data.data);
      }
      toast.success("Contact Us page updated live successfully!");
      await queryClient.invalidateQueries({ queryKey: ["admin-contact-info"] });
      await queryClient.invalidateQueries({ queryKey: ["contact-info-public"] });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update Contact Us page"
      );
    } finally {
      setSaving(false);
    }
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
          <h1 className="text-lg font-bold text-slate-900">
            Contact Us Page Manager
          </h1>
          <p className="text-xs font-normal text-slate-500 mt-0.5">
            SuperAdmin Control: Edit Journal Title, Publisher, Address, Emails, Website, Info Box & License details live in MongoDB.
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
        {/* Section 1: Page Title & Journal Name */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <FaBuilding className="text-blue-600" /> 1. Main Titles & Publisher Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Page Header Title:
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                Published By (Publisher Name):
              </label>
              <input
                type="text"
                value={formData.publishedBy || ""}
                onChange={(e) =>
                  setFormData({ ...formData, publishedBy: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Journal Name:
            </label>
            <input
              type="text"
              value={formData.journalName || ""}
              onChange={(e) =>
                setFormData({ ...formData, journalName: e.target.value })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
            />
          </div>
        </div>

        {/* Section 2: Contact Details (Address, Emails, Website) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <FaEnvelope className="text-blue-600" /> 2. Address, Emails & Website
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700 flex items-center gap-1">
                <FaEnvelope className="text-slate-400" /> Organizational E-mail:
              </label>
              <input
                type="email"
                value={formData.organizationalEmail || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    organizationalEmail: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-slate-700 flex items-center gap-1">
                <FaEnvelope className="text-slate-400" /> Support / General E-mail:
              </label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700 flex items-center gap-1">
                <FaGlobe className="text-slate-400" /> Website URL:
              </label>
              <input
                type="text"
                value={formData.website || ""}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-slate-700 flex items-center gap-1">
                <FaMapMarkerAlt className="text-slate-400" /> Address:
              </label>
              <textarea
                rows="2"
                value={formData.address || ""}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Information Box & License */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <FaInfoCircle className="text-blue-600" /> 3. Information Notice & License Badge
          </h3>

          <div>
            <label className="block mb-1.5 font-semibold text-slate-700">
              Information Box Content (HTML / Text):
            </label>
            <textarea
              rows="3"
              value={formData.infoHtml || ""}
              onChange={(e) =>
                setFormData({ ...formData, infoHtml: e.target.value })
              }
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                License Section Title:
              </label>
              <input
                type="text"
                value={formData.license?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    license: { ...formData.license, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">
                License Description Text:
              </label>
              <input
                type="text"
                value={formData.license?.text || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    license: { ...formData.license, text: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-xs"
              />
            </div>
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
            {saving ? "Saving Changes..." : "Save & Publish Contact Page"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactManager;
