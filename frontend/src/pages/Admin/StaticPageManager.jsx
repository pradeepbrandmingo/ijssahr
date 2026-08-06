import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import { FaSave, FaCheckCircle } from "react-icons/fa";

const pageKeyMap = {
  submission: "paper-submission",
};

const StaticPageManager = () => {
  const { pageKey: routeKey } = useParams();

  // Map route slug to DB pageKey
  const currentKey = pageKeyMap[routeKey] || routeKey || "paper-submission";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    heading: "",
    content: "",
    copyrightNotice: "",
    onlineSubmissionTitle: "",
    onlineSubmissionText: "",
    noteText: "",
    submissionEmail: "editor@ijssahr.com",
    journalName: "International Journal of Social Science, Arts and Humanities Research",
  });

  const fetchPageDetails = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await API.get(`/pages/${currentKey}`);
      const data = response.data.data;
      if (data) {
        setFormData({
          title: currentKey === "paper-submission" ? "Submit Manuscript Page" : data.title || "",
          subtitle: data.subtitle || "",
          heading: data.heading || "Submission Instructions",
          content: data.content || "",
          copyrightNotice:
            data.copyrightNotice ||
            "Copyrights for articles published in International Journal of Social Science, Arts and Humanities Research are retained by the authors, with first publication rights granted to the journal.",
          onlineSubmissionTitle: data.onlineSubmissionTitle || "Online Submission System",
          onlineSubmissionText:
            data.onlineSubmissionText ||
            'After submission you will get "Submission Acknowledgement" on your Email within 1 to 2 Working days.',
          noteText:
            data.noteText ||
            "After Successfully Submitting your Manuscript Please inform to the editor about your submission at:",
          submissionEmail: data.submissionEmail || "editor@ijssahr.com",
          journalName:
            data.journalName ||
            "International Journal of Social Science, Arts and Humanities Research",
        });
      }
    } catch (error) {
      console.error("Failed to fetch page data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageDetails();
  }, [currentKey]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await API.put(`/pages/${currentKey}`, formData);
      setMessage(`"${formData.title}" updated successfully! Public website page updated live.`);
      fetchPageDetails();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update page");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 font-semibold bg-white rounded-2xl border border-slate-200 shadow-sm">
        Loading page editor...
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-900 font-sans max-w-4xl">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">
          Edit Page: <span className="text-blue-600">{formData.title}</span>
        </h1>
        <p className="text-xs font-medium text-slate-600 mt-0.5">
          SuperAdmin Full Control: Edit all titles, instructions, copyright notice, email, and notes live.
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <FaCheckCircle className="text-emerald-600 text-base" />
          <span>{message}</span>
        </div>
      )}

      {/* Complete Granular Editor Form */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs font-medium">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Editing: <span className="text-blue-600">{formData.title}</span>
            </h3>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Key: {currentKey}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
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
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-bold text-slate-800">
                Journal Name:
              </label>
              <input
                type="text"
                name="journalName"
                value={formData.journalName}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
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
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
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
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-bold text-slate-800">
                Online Submission System Heading:
              </label>
              <input
                type="text"
                name="onlineSubmissionTitle"
                value={formData.onlineSubmissionTitle}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
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
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
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
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <FaSave /> {saving ? "Saving All Fields..." : "Save & Publish Live"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaticPageManager;
