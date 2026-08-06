import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../services/api";
import {
  FaBook,
  FaPlus,
  FaFilePdf,
  FaTrash,
  FaPencilAlt,
  FaStar,
  FaLink,
  FaExternalLinkAlt,
  FaCheckCircle,
} from "react-icons/fa";

const IssuesManager = ({ openCreateModalOnMount = false }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);

  // New Issue Modal / Form State
  const [showIssueModal, setShowIssueModal] = useState(openCreateModalOnMount);
  const [issueForm, setIssueForm] = useState({
    volume: "Volume 01",
    issue: "Issue 05",
    period: "Sep–Oct 2026",
    publicationFrequency: "Bimonthly",
    isCurrent: true,
  });

  // Add/Edit Article Modal State inside an Issue
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [articleForm, setArticleForm] = useState({
    articleId: "",
    title: "",
    authors: "",
    subHeading: "",
    pageRange: "01–15",
    abstract: "",
    doi: "",
  });
  const [articleFile, setArticleFile] = useState(null);
  const [submittingArticle, setSubmittingArticle] = useState(false);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await API.get("/issues");
      const data = res.data?.data || [];
      setIssues(data);

      // Auto-select current issue or first issue
      if (!selectedIssue && data.length > 0) {
        const current = data.find((i) => i.isCurrent) || data[0];
        setSelectedIssue(current);
      } else if (selectedIssue) {
        const updated = data.find((i) => i._id === selectedIssue._id) || data[0];
        setSelectedIssue(updated);
      }
    } catch (err) {
      console.error("Failed to fetch issues:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleCreateIssue = async (e) => {
    e.preventDefault();
    try {
      await API.post("/issues", issueForm);
      setShowIssueModal(false);
      fetchIssues();
      toast.success(`Issue "${issueForm.volume}, ${issueForm.issue}" created successfully!`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create issue");
    }
  };

  const handleSetCurrentIssue = async (issueId) => {
    try {
      await API.patch(`/issues/${issueId}/set-current`);
      fetchIssues();
      toast.success("Selected issue set as Current Issue!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to set current issue");
    }
  };

  // Delete Confirm Modal State
  const [deleteIssueId, setDeleteIssueId] = useState(null);
  const [deleteArticleId, setDeleteArticleId] = useState(null);

  const handleDeleteIssue = (issueId) => {
    setDeleteIssueId(issueId);
  };

  const confirmDeleteIssue = async () => {
    if (!deleteIssueId) return;
    try {
      await API.delete(`/issues/${deleteIssueId}`);
      if (selectedIssue?._id === deleteIssueId) setSelectedIssue(null);
      fetchIssues();
      toast.success("Issue deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete issue");
    } finally {
      setDeleteIssueId(null);
    }
  };

  const handleDeleteArticle = (articleId) => {
    setDeleteArticleId(articleId);
  };

  const confirmDeleteArticle = async () => {
    if (!deleteArticleId || !selectedIssue) return;
    try {
      await API.delete(`/issues/${selectedIssue._id}/articles/${deleteArticleId}`);
      fetchIssues();
      toast.success("Published article removed!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete article");
    } finally {
      setDeleteArticleId(null);
    }
  };

  const handleSaveArticle = async (e) => {
    e.preventDefault();
    if (!selectedIssue) return;

    try {
      setSubmittingArticle(true);
      const formData = new FormData();
      formData.append("articleId", articleForm.articleId);
      formData.append("title", articleForm.title);
      formData.append("authors", articleForm.authors);
      formData.append("subHeading", articleForm.subHeading);
      formData.append("pageRange", articleForm.pageRange);
      formData.append("abstract", articleForm.abstract);
      formData.append("doi", articleForm.doi);

      if (articleFile) {
        formData.append("file", articleFile);
      }

      if (editingArticleId) {
        await API.put(`/issues/${selectedIssue._id}/articles/${editingArticleId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Article updated successfully!");
      } else {
        await API.post(`/issues/${selectedIssue._id}/articles`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Article published successfully to issue!");
      }

      setShowArticleModal(false);
      setEditingArticleId(null);
      setArticleFile(null);
      setArticleForm({
        articleId: "",
        title: "",
        authors: "",
        subHeading: "",
        pageRange: "01–15",
        abstract: "",
        doi: "",
      });
      fetchIssues();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save article");
    } finally {
      setSubmittingArticle(false);
    }
  };

  const openAddArticleModal = () => {
    setEditingArticleId(null);
    setArticleFile(null);
    setArticleForm({
      articleId: `IJSSAHR-2026-${String((selectedIssue?.articles?.length || 0) + 1).padStart(3, "0")}`,
      title: "",
      authors: "",
      subHeading: "",
      pageRange: `${String((selectedIssue?.articles?.length || 0) * 15 + 1).padStart(2, "0")}-${String(
        ((selectedIssue?.articles?.length || 0) + 1) * 15
      ).padStart(2, "0")}`,
      abstract: "",
      doi: "https://doi.org/10.1000/ijssahr.2026.04.01",
    });
    setShowArticleModal(true);
  };

  const openEditArticleModal = (art) => {
    setEditingArticleId(art._id);
    setArticleFile(null);
    setArticleForm({
      articleId: art.articleId || "",
      title: art.title || "",
      authors: art.authors || "",
      subHeading: art.subHeading || "",
      pageRange: art.pageRange || "",
      abstract: art.abstract || "",
      doi: art.doi || "",
    });
    setShowArticleModal(true);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FaBook className="text-blue-600 text-lg" /> Issues & Publication Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create 2-Month Bimonthly Issues, publish articles with Abstract & Bottom Right DOI links, and auto-archive previous issues.
          </p>
        </div>
        <button
          onClick={() => setShowIssueModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-md shadow-sm transition-all cursor-pointer"
        >
          <FaPlus /> Add New Issue / Volume
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Volumes & Issues List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-md border border-slate-200 p-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              All Volumes & Issues ({issues.length})
            </h3>

            {loading ? (
              <div className="p-4 text-center text-slate-400 text-xs animate-pulse">Loading issues...</div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                {issues.map((iss) => {
                  const isSelected = selectedIssue?._id === iss._id;

                  return (
                    <div
                      key={iss._id}
                      onClick={() => setSelectedIssue(iss)}
                      className={`p-3.5 rounded-md border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-blue-50 border-blue-300 shadow-2xs"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 truncate">
                            {iss.volume}, {iss.issue}
                          </span>
                          {iss.isCurrent ? (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                              CURRENT ISSUE
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px]">
                              Archived
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{iss.period}</p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {iss.articles?.length || 0} Published Articles
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {!iss.isCurrent && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetCurrentIssue(iss._id);
                            }}
                            className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded border border-amber-200 text-[10px] font-bold"
                            title="Set as Current Issue"
                          >
                            <FaStar />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteIssue(iss._id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded text-[11px]"
                          title="Delete Issue"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Issue Articles & DOI Editor */}
        <div className="lg:col-span-8 space-y-4">
          {selectedIssue ? (
            <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-5">
              {/* Selected Issue Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900">
                      {selectedIssue.volume}, {selectedIssue.issue} ({selectedIssue.period})
                    </h2>
                    {selectedIssue.isCurrent ? (
                      <span className="px-2 py-0.5 bg-emerald-600 text-white rounded font-bold text-[10px]">
                        ACTIVE CURRENT ISSUE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded font-bold text-[10px]">
                        ARCHIVED ISSUE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Publication Frequency: {selectedIssue.publicationFrequency}
                  </p>
                </div>

                <button
                  onClick={openAddArticleModal}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-md transition-all cursor-pointer"
                >
                  <FaPlus /> Add Article to Issue
                </button>
              </div>

              {/* Published Articles List */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Published Articles ({selectedIssue.articles?.length || 0})
                </h3>

                {selectedIssue.articles?.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-md">
                    No articles published in this issue yet. Click "Add Article to Issue" to add articles.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedIssue.articles.map((art) => (
                      <div
                        key={art._id}
                        className="p-4 bg-slate-50/70 border border-slate-200 rounded-md hover:bg-slate-50 transition-all space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-mono font-bold text-[10px]">
                                {art.articleId || "IJSSAHR-2026-001"}
                              </span>
                              <span className="text-xs text-slate-500 font-semibold">
                                Page: {art.pageRange}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 mt-1">{art.title}</h4>
                            <p className="text-xs text-slate-600 font-medium mt-0.5">{art.authors}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => openEditArticleModal(art)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                              title="Edit Article & DOI Link"
                            >
                              <FaPencilAlt />
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(art._id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                              title="Delete Article"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>

                        {/* Abstract Snippet */}
                        <p className="text-xs text-slate-600 line-clamp-2 pt-1 border-t border-slate-200/60">
                          <strong>Abstract:</strong> {art.abstract}
                        </p>

                        {/* Bottom Row: View PDF & Bottom Right DOI Link */}
                        <div className="flex items-center justify-between pt-2">
                          <a
                            href={art.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline"
                          >
                            <FaFilePdf /> View PDF Document
                          </a>

                          {art.doi ? (
                            <a
                              href={art.doi.startsWith("http") ? art.doi : `https://doi.org/${art.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-blue-700 hover:underline bg-blue-100/80 px-2 py-0.5 rounded"
                            >
                              <FaLink /> DOI: {art.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")}
                              <FaExternalLinkAlt className="text-[9px]" />
                            </a>
                          ) : (
                            <span className="text-[11px] font-mono text-slate-400 italic">
                              DOI: No link set
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-md border border-slate-200 text-center text-slate-400 text-xs">
              Select an issue from the left column to manage published articles and DOI links.
            </div>
          )}
        </div>
      </div>

      {/* Modal 1: Create New Volume / Issue */}
      {showIssueModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleCreateIssue}
            className="bg-white max-w-md w-full rounded-md shadow-xl border border-slate-200 p-6 space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Create New Volume / Issue</h3>
              <button
                type="button"
                onClick={() => setShowIssueModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Volume</label>
                <input
                  type="text"
                  value={issueForm.volume}
                  onChange={(e) => setIssueForm({ ...issueForm, volume: e.target.value })}
                  placeholder="Volume 01"
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Issue</label>
                <input
                  type="text"
                  value={issueForm.issue}
                  onChange={(e) => setIssueForm({ ...issueForm, issue: e.target.value })}
                  placeholder="Issue 05"
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Period (Month-Year)</label>
              <input
                type="text"
                value={issueForm.period}
                onChange={(e) => setIssueForm({ ...issueForm, period: e.target.value })}
                placeholder="Sep–Oct 2026"
                required
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Publication Frequency</label>
              <input
                type="text"
                value={issueForm.publicationFrequency}
                onChange={(e) => setIssueForm({ ...issueForm, publicationFrequency: e.target.value })}
                placeholder="Bimonthly"
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isCurrent"
                checked={issueForm.isCurrent}
                onChange={(e) => setIssueForm({ ...issueForm, isCurrent: e.target.checked })}
                className="h-4 w-4 text-blue-600 border-slate-300 rounded"
              />
              <label htmlFor="isCurrent" className="font-semibold text-slate-800">
                Set as Active Current Issue (Auto-archives older issue)
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowIssueModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded"
              >
                Create Issue
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal 2: Add / Edit Published Article with DOI Link */}
      {showArticleModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSaveArticle}
            className="bg-white max-w-lg w-full max-h-[90vh] flex flex-col rounded-md shadow-xl border border-slate-200 overflow-hidden text-xs"
          >
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">
                {editingArticleId ? "Edit Published Article & DOI Link" : "Add New Article to Issue"}
              </h3>
              <button
                type="button"
                onClick={() => setShowArticleModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Article Serial ID</label>
                  <input
                    type="text"
                    value={articleForm.articleId}
                    onChange={(e) => setArticleForm({ ...articleForm, articleId: e.target.value })}
                    placeholder="IJSSAHR-2026-001"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Page Range</label>
                  <input
                    type="text"
                    value={articleForm.pageRange}
                    onChange={(e) => setArticleForm({ ...articleForm, pageRange: e.target.value })}
                    placeholder="01–17"
                    required
                    className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="Enter full paper title"
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Authors & Country *</label>
                <input
                  type="text"
                  value={articleForm.authors}
                  onChange={(e) => setArticleForm({ ...articleForm, authors: e.target.value })}
                  placeholder="e.g. Christina Mbongueh, Henri Lucien, Uganda"
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* DOI Link Input Field (Bottom Right Link Option) */}
              <div className="bg-blue-50/70 p-3 rounded border border-blue-200">
                <label className="block font-bold text-blue-900 mb-1">
                  DOI Link (Digital Object Identifier)
                </label>
                <input
                  type="text"
                  value={articleForm.doi}
                  onChange={(e) => setArticleForm({ ...articleForm, doi: e.target.value })}
                  placeholder="https://doi.org/10.1000/ijssahr.2026.04.01"
                  className="w-full px-3 py-1.5 bg-white border border-blue-300 rounded font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <span className="text-[10px] text-blue-700 mt-1 block">
                  Will be displayed at the <strong>bottom right</strong> of the expanded article drawer on Current Issue & Archive pages.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Abstract *</label>
                <textarea
                  rows={5}
                  value={articleForm.abstract}
                  onChange={(e) => setArticleForm({ ...articleForm, abstract: e.target.value })}
                  placeholder="Paste article abstract text..."
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  PDF Document File {editingArticleId ? "(Optional if keeping existing)" : "*"}
                </label>
                <div className="relative border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-md p-4 bg-slate-50 hover:bg-blue-50/50 transition-all text-center cursor-pointer group">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setArticleFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaFilePdf className="text-base" />
                    </div>
                    {articleFile ? (
                      <span className="text-xs font-semibold text-blue-700 font-mono break-all">
                        Selected File: {articleFile.name}
                      </span>
                    ) : (
                      <>
                        <span className="text-xs font-semibold text-slate-800">
                          Click to select PDF document or drag file here
                        </span>
                        <span className="text-[10px] text-slate-500">
                          Supports .pdf, .doc, .docx (Max file size 25MB)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowArticleModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingArticle}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded disabled:opacity-50"
              >
                {submittingArticle ? "Saving..." : "Save Published Article"}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Custom Warning Modal for Delete Issue */}
      {deleteIssueId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-5 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto text-xl border border-red-100">
              <FaTrash />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Delete Issue & Articles</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Are you sure you want to delete this issue and all its published articles? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                onClick={() => setDeleteIssueId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all cursor-pointer flex-1"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteIssue}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex-1"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Warning Modal for Delete Article */}
      {deleteArticleId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-5 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto text-xl border border-red-100">
              <FaTrash />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Remove Published Article</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Are you sure you want to remove this published article from the issue?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                onClick={() => setDeleteArticleId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all cursor-pointer flex-1"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteArticle}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex-1"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssuesManager;
