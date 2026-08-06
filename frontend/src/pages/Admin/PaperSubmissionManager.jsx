import React, { useEffect, useState } from "react";
import API from "../../services/api";
import {
  FaSave,
  FaFileLines,
  FaEnvelope,
  FaBookOpen,
  FaCheckCircle,
} from "react-icons/fa6";

const PaperSubmissionManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "Paper Submission",
    journalName:
      "International Journal of Social Science, Arts and Humanities Research",
    submissionEmail: "editor@ijssahr.com",
    content: "",
  });

  useEffect(() => {
    const fetchSubmissionPage = async () => {
      try {
        const response = await API.get("/manuscripts/submission-page");
        const data = response.data.data;
        if (data) {
          setFormData({
            title: data.title || "Paper Submission",
            journalName:
              data.journalName ||
              "International Journal of Social Science, Arts and Humanities Research",
            submissionEmail: data.submissionEmail || "editor@ijssahr.com",
            content: data.content || "",
          });
        }
      } catch (error) {
        console.error("Failed to load submission instructions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissionPage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await API.put("/manuscripts/submission-page", formData);
      setMessage("Paper Submission instructions updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update static page");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-slate-500 font-semibold">
        Loading submission page configuration...
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-900 font-sans max-w-4xl">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">
          Manage Static Pages - Paper Submission
        </h1>
        <p className="text-xs font-medium text-slate-600 mt-0.5">
          SuperAdmin: Edit Public Paper Submission Page Instructions, Journal Title, and Contact Email
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <FaCheckCircle className="text-emerald-600 text-base" />
          <span>{message}</span>
        </div>
      )}

      {/* SuperAdmin Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs font-medium"
      >
        <div>
          <label className="block mb-1 font-bold text-slate-800 flex items-center gap-1.5">
            <FaFileLines className="text-blue-600" /> Page Title:
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-bold text-slate-800 flex items-center gap-1.5">
            <FaBookOpen className="text-blue-600" /> Journal Name:
          </label>
          <input
            type="text"
            required
            value={formData.journalName}
            onChange={(e) =>
              setFormData({ ...formData, journalName: e.target.value })
            }
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-bold text-slate-800 flex items-center gap-1.5">
            <FaEnvelope className="text-blue-600" /> Submission Contact Email:
          </label>
          <input
            type="email"
            required
            value={formData.submissionEmail}
            onChange={(e) =>
              setFormData({ ...formData, submissionEmail: e.target.value })
            }
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-bold text-slate-800">
            Submission Instructions Content:
          </label>
          <textarea
            required
            rows="8"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <FaSave /> {saving ? "Saving Changes..." : "Save Page Instructions"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaperSubmissionManager;
