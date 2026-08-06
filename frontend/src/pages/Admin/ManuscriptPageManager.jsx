import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../../services/api";
import { FaSave, FaCheckCircle } from "react-icons/fa";

const defaultManuscriptPageData = {
  title: "Submit Manuscript Page",
  heading: "Submission Instructions",
  content:
    "When submitting papers for potential publication in the IJSSAHR, please submit an original editable file in one of the ( MS Word, doc ) style files. All figures, images, tables, etc., should be embedded into the original file.",
  copyrightNotice:
    "Copyrights for articles published in International Journal of Social Science, Arts and Humanities Research are retained by the authors, with first publication rights granted to the journal.",
  onlineSubmissionTitle: "Online Submission System",
  onlineSubmissionText:
    'After submission you will get "Submission Acknowledgement" on your Email within 1 to 2 Working days.',
  noteText:
    "After Successfully Submitting your Manuscript Please inform to the editor about your submission at:",
  submissionEmail: "editor@ijssahr.com",
  journalName:
    "International Journal of Social Science, Arts and Humanities Research",
};

const ManuscriptPageManager = () => {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState(defaultManuscriptPageData);

  const { data: serverData } = useQuery({
    queryKey: ["admin-manuscript-page"],
    queryFn: async () => {
      const response = await API.get("/manuscript-page");
      return response.data?.data || defaultManuscriptPageData;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (serverData) {
      setFormData({
        title: "Submit Manuscript Page",
        heading: serverData.heading || defaultManuscriptPageData.heading,
        content: serverData.content || defaultManuscriptPageData.content,
        copyrightNotice:
          serverData.copyrightNotice || defaultManuscriptPageData.copyrightNotice,
        onlineSubmissionTitle:
          serverData.onlineSubmissionTitle ||
          defaultManuscriptPageData.onlineSubmissionTitle,
        onlineSubmissionText:
          serverData.onlineSubmissionText ||
          defaultManuscriptPageData.onlineSubmissionText,
        noteText: serverData.noteText || defaultManuscriptPageData.noteText,
        submissionEmail:
          serverData.submissionEmail || defaultManuscriptPageData.submissionEmail,
        journalName:
          serverData.journalName || defaultManuscriptPageData.journalName,
      });
    }
  }, [serverData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await API.put("/manuscript-page", formData);
      if (res.data?.data) {
        setFormData(res.data.data);
      }
      toast.success(
        "Submit Manuscript page content updated successfully! Live website page updated."
      );
      await queryClient.invalidateQueries({ queryKey: ["admin-manuscript-page"] });
      await queryClient.invalidateQueries({ queryKey: ["manuscript-page-public"] });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update manuscript page"
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
      className="space-y-6 text-slate-900 font-sans w-full"
    >
      {/* Top Banner */}
      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">
          Edit Page: <span className="text-blue-600">Submit Manuscript Page</span>
        </h1>
        <p className="text-xs font-medium text-slate-600 mt-0.5">
          SuperAdmin Editor: Edit all public manuscript page instructions, headings, emails & notes live in MongoDB
        </p>
      </div>

      {/* Complete Dedicated Manuscript Page Editor Form */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs font-medium w-full">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Editing: <span className="text-blue-600">Submit Manuscript Page</span>
            </h3>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Model: ManuscriptPage.js
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1 font-bold text-slate-800">
                Main Page Header Title:
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block mb-1 font-bold text-slate-800">
                Section Heading:
              </label>
              <input
                type="text"
                name="heading"
                required
                value={formData.heading}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold text-slate-800">
              Submission Instructions Paragraph:
            </label>
            <textarea
              name="content"
              required
              rows="5"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1 font-bold text-slate-800">
                Journal Name:
              </label>
              <input
                type="text"
                name="journalName"
                value={formData.journalName}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block mb-1 font-bold text-slate-800">
                Editor Contact Email:
              </label>
              <input
                type="email"
                name="submissionEmail"
                value={formData.submissionEmail}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold text-slate-800">
              Copyright Notice Text:
            </label>
            <textarea
              name="copyrightNotice"
              rows="3"
              value={formData.copyrightNotice}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1 font-bold text-slate-800">
                Online Submission System Heading:
              </label>
              <input
                type="text"
                name="onlineSubmissionTitle"
                value={formData.onlineSubmissionTitle}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block mb-1 font-bold text-slate-800">
                Acknowledgement Turnaround Text:
              </label>
              <input
                type="text"
                name="onlineSubmissionText"
                value={formData.onlineSubmissionText}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold text-slate-800">
              Bottom Yellow Note Text:
            </label>
            <textarea
              name="noteText"
              rows="2"
              value={formData.noteText}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <FaSave /> {saving ? "Saving Manuscript Page..." : "Save & Publish Live"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ManuscriptPageManager;
