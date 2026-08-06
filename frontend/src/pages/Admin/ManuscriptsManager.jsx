import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { motion } from "framer-motion";
import API from "../../services/api";
import { formatFileUrl } from "../../utils/fileUrl";
import {
  FaFilePdf,
  FaSearch,
  FaFilter,
  FaTrash,
  FaEye,
  FaExternalLinkAlt,
  FaUser,
  FaEnvelope,
  FaGlobe,
  FaTasks,
  FaPencilAlt,
  FaCheck,
  FaTimes,
  FaCheckSquare,
} from "react-icons/fa";

const ARTICLE_STAGES = [
  "Submitted",
  "Plagiarism Check",
  "Under Review",
  "Revision Required",
  "Accepted",
  "Documents Received",
  "Payment Received",
  "Under Formatting",
  "Proof Approved",
  "Scheduled",
  "Published",
];

const REVIEW_STAGES = ["Plagiarism Check", "Under Review", "Revision Required"];
const ITEMS_PER_PAGE = 30;

const ManuscriptsManager = ({ defaultReviewMode = false }) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const isReviewMode = defaultReviewMode || location?.pathname?.includes("/reviews");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(isReviewMode ? "In Review Stages" : "All");
  const [selectedManuscript, setSelectedManuscript] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Server-Side Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Manual Article ID Edit State
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [tempArticleId, setTempArticleId] = useState("");

  // Custom Delete Warning Modal State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Sync statusFilter when switching between All Manuscripts and Peer Review Status routes
  useEffect(() => {
    const isReview = defaultReviewMode || location?.pathname?.includes("/reviews");
    setStatusFilter(isReview ? "In Review Stages" : "All");
    setCurrentPage(1);
  }, [location.pathname, defaultReviewMode]);

  // TanStack Query: 0-Second Instant Cache + Seamless Background Data Sync
  const { data: queryData, isLoading, isFetching } = useQuery({
    queryKey: ["manuscripts", currentPage, statusFilter, search],
    queryFn: async () => {
      const [manuscriptRes, authorsRes] = await Promise.all([
        API.get("/manuscripts", {
          params: {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            search,
            status: statusFilter,
          },
        }),
        API.get("/users?role=client&limit=500"),
      ]);

      const resData = manuscriptRes.data.data;
      return {
        manuscripts: resData?.manuscripts || (Array.isArray(resData) ? resData : []),
        pagination: resData?.pagination || {},
        authors: authorsRes.data.data?.users || [],
      };
    },
    staleTime: 1000 * 60 * 5, // 5 Minutes Instant UI Memory Cache
    placeholderData: keepPreviousData, // Keeps previous page data while loading new page (0 Flicker!)
  });

  const manuscripts = queryData?.manuscripts || [];
  const paginationInfo = queryData?.pagination || {};
  const authors = queryData?.authors || [];
  const loading = isLoading && manuscripts.length === 0;

  // Reset pagination on search or filter change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      await API.patch(`/manuscripts/${id}/status`, { status: newStatus });
      queryClient.invalidateQueries({ queryKey: ["manuscripts"] });
      if (selectedManuscript?._id === id) {
        setSelectedManuscript((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update manuscript status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAssignAuthor = async (manuscriptId, authorId) => {
    try {
      setUpdatingId(manuscriptId);
      const res = await API.patch(`/manuscripts/${manuscriptId}/assign-author`, { authorId });
      queryClient.invalidateQueries({ queryKey: ["manuscripts"] });
      const updatedItem = res.data.data;
      if (selectedManuscript?._id === manuscriptId) {
        setSelectedManuscript(updatedItem);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to assign author");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveArticleId = async (manuscriptId) => {
    if (!tempArticleId.trim()) return;
    try {
      setUpdatingId(manuscriptId);
      const res = await API.patch(`/manuscripts/${manuscriptId}/article-id`, {
        articleId: tempArticleId.trim(),
      });
      queryClient.invalidateQueries({ queryKey: ["manuscripts"] });
      const updatedItem = res.data.data;
      if (selectedManuscript?._id === manuscriptId) {
        setSelectedManuscript(updatedItem);
      }
      setEditingArticleId(null);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update Article ID");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = (id) => {
    setDeleteConfirmId(id);
  };

  const confirmDeleteManuscript = async () => {
    if (!deleteConfirmId) return;
    try {
      await API.delete(`/manuscripts/${deleteConfirmId}`);
      queryClient.invalidateQueries({ queryKey: ["manuscripts"] });
      if (selectedManuscript?._id === deleteConfirmId) setSelectedManuscript(null);
    } catch (error) {
      console.error("Failed to delete manuscript:", error);
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Published":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold";
      case "Accepted":
      case "Proof Approved":
      case "Payment Received":
        return "bg-teal-100 text-teal-800 border-teal-300";
      case "Plagiarism Check":
      case "Under Review":
      case "Under Formatting":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Revision Required":
        return "bg-amber-100 text-amber-800 border-amber-300 font-semibold";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300";
    }
  };

  const totalItems = paginationInfo.total || manuscripts.length;
  const totalPages = paginationInfo.totalPages || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + manuscripts.length, totalItems);

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-6 font-sans text-slate-900"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            {isReviewMode ? (
              <>
                <FaCheckSquare className="text-purple-600 text-lg" /> Peer Review Status & Tracking
              </>
            ) : (
              <>
                <FaTasks className="text-blue-600 text-lg" /> Article Processing & Manuscript Management
              </>
            )}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isReviewMode
              ? "Monitor and manage manuscripts undergoing Plagiarism Check, Peer Review & Revision stages"
              : "Manually edit Article Serial IDs, assign Registered Authors (Unique Client IDs), and update 11-Stage processing lifecycle"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100 text-xs font-semibold flex items-center gap-2">
            {isFetching && <span className="h-2 w-2 rounded-full bg-blue-600 animate-ping" />}
            {isReviewMode ? `Reviewing: ${totalItems}` : `Total Submissions: ${totalItems}`}
          </div>
        </div>
      </div>

      {/* Search & Filter Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-md border border-slate-200 shadow-xs">
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by Article ID (IJSSAHR-2026-xxx), Client ID (CL-00025)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <FaFilter className="text-slate-400" /> Filter Stage:
          </div>
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {isReviewMode ? (
              <option value="In Review Stages">In Review Stages (Plagiarism, Under Review, Revision)</option>
            ) : (
              <option value="All">All 11 Stages</option>
            )}
            {ARTICLE_STAGES.map((stg) => (
              <option key={stg} value={stg}>
                {stg}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Manuscripts Table */}
      <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="h-12 bg-slate-100/80 rounded-md animate-pulse" />
            ))}
          </div>
        ) : manuscripts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No manuscript records found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Article Serial ID</th>
                  <th className="py-3 px-4">Author Details & Country</th>
                  <th className="py-3 px-4">Article Title & Type</th>
                  <th className="py-3 px-4">Paper PDF/Doc</th>
                  <th className="py-3 px-4">Linked Author Account</th>
                  <th className="py-3 px-4 text-center">Processing Stage (11 Stages)</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {manuscripts.map((item) => {
                  const assignedAuthor = authors.find(
                    (a) => String(a._id) === String(item.author?._id || item.author)
                  );
                  const isLinked = Boolean(item.author || item.clientCode || assignedAuthor);
                  const displayClientCode =
                    item.clientCode ||
                    item.author?.clientCode ||
                    assignedAuthor?.clientCode ||
                    (isLinked ? "CL-00025" : "");

                  return (
                    <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Manually Editable Article Serial ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-700 whitespace-nowrap">
                        {editingArticleId === item._id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={tempArticleId}
                              onChange={(e) => setTempArticleId(e.target.value)}
                              className="w-36 px-2 py-1 bg-white border border-blue-500 rounded text-xs font-mono text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveArticleId(item._id);
                                if (e.key === "Escape") setEditingArticleId(null);
                              }}
                            />
                            <button
                              onClick={() => handleSaveArticleId(item._id)}
                              className="p-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] cursor-pointer"
                              title="Save Article ID"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => setEditingArticleId(null)}
                              className="p-1 bg-slate-300 hover:bg-slate-400 text-slate-700 rounded text-[11px] cursor-pointer"
                              title="Cancel"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span>{item.articleId || "IJSSAHR-2026-001"}</span>
                            <button
                              onClick={() => {
                                setEditingArticleId(item._id);
                                setTempArticleId(item.articleId || "IJSSAHR-2026-001");
                              }}
                              className="text-slate-400 hover:text-blue-600 transition-colors p-1 cursor-pointer"
                              title="Click to edit Article Serial ID"
                            >
                              <FaPencilAlt className="text-[10px]" />
                            </button>
                          </div>
                        )}
                        <div className="text-[10px] font-sans font-normal text-slate-400">
                          {new Date(item.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-[190px]">
                        <div className="font-semibold text-slate-900 truncate">
                          {item.titlePrefix} {item.authorName}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{item.email}</div>
                        <div className="text-[10px] text-slate-600 font-medium truncate flex items-center gap-1 mt-0.5">
                          <span className="text-slate-400">Country:</span>
                          <span className="font-semibold text-slate-800">{item.country || "India"}</span>
                        </div>
                        <div className="text-[10px] font-mono mt-1">
                          {isLinked || displayClientCode ? (
                            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">
                              ID: {displayClientCode || "CL-00025"}
                            </span>
                          ) : (
                            <span
                              className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded font-medium text-[10px]"
                              title="Select author account from Linked Author Account dropdown"
                            >
                              Unlinked (Assign Author)
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-[220px]">
                        <div className="font-medium text-slate-900 line-clamp-2" title={item.articleTitle}>
                          {item.articleTitle}
                        </div>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-semibold">
                          {item.articleType}
                        </span>
                      </td>

                      {/* Paper Document / PDF Download Button */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {item.fileUrl ? (
                          <a
                            href={formatFileUrl(item.fileUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-md text-xs font-semibold border border-red-200 transition-all cursor-pointer shadow-2xs"
                            title="Open/View Attached PDF or Doc File"
                          >
                            <FaFilePdf className="text-red-600 text-xs" /> View PDF
                            <FaExternalLinkAlt className="text-[9px]" />
                          </a>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">No File</span>
                        )}
                      </td>

                      {/* Author Assignment Dropdown Selector */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={item.author?._id || item.author || ""}
                          disabled={updatingId === item._id}
                          onChange={(e) => handleAssignAuthor(item._id, e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-[11px] font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-600 cursor-pointer"
                        >
                          <option value="">-- Assign Author (Client ID) --</option>
                          {authors.map((auth) => (
                            <option key={auth._id} value={auth._id}>
                              {auth.name} ({auth.clientCode || "CL-00025"}) - {auth.email}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <select
                          value={item.status || "Submitted"}
                          disabled={updatingId === item._id}
                          onChange={(e) => handleStatusChange(item._id, e.target.value)}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md border cursor-pointer focus:outline-none transition-all ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {ARTICLE_STAGES.map((stg) => (
                            <option key={stg} value={stg}>
                              {stg}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedManuscript(item)}
                            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-all cursor-pointer"
                            title="View Stage Lifecycle & Submission Details"
                          >
                            <FaEye className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all cursor-pointer"
                            title="Delete Manuscript"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Server-Side Mongo Paginated Footer Controls */}
        {totalItems > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 font-medium">
            <div>
              Showing <span className="font-bold text-slate-900">{totalItems > 0 ? startIndex + 1 : 0}</span> to{" "}
              <span className="font-bold text-slate-900">{endIndex}</span> of{" "}
              <span className="font-bold text-slate-900">{totalItems}</span> submissions (30 per page)
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full custom-scrollbar py-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-slate-700 cursor-pointer shadow-2xs"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-all cursor-pointer ${
                    currentPage === pg
                      ? "bg-blue-600 text-white font-bold shadow-xs"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {pg}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-slate-700 cursor-pointer shadow-2xs"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stage Progress Timeline & Full Article Detail Modal */}
      {selectedManuscript && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] flex flex-col rounded-md shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-blue-600 text-white rounded font-mono font-bold text-xs">
                    {selectedManuscript.articleId || "IJSSAHR-2026-001"}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-mono font-bold text-xs">
                    {selectedManuscript.clientCode ? `Client ID: ${selectedManuscript.clientCode}` : "Unlinked Author"}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  {selectedManuscript.articleTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedManuscript(null)}
                className="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded-md text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs font-sans">
              {/* 11-Stage Processing Progress Lifecycle Stepper Tree */}
              <div className="bg-slate-50/80 p-5 rounded-md border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <FaTasks className="text-blue-600" /> Article Processing Status Lifecycle (11 Stages)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
                  {ARTICLE_STAGES.map((stg, index) => {
                    const currentStageIndex = ARTICLE_STAGES.indexOf(selectedManuscript.status || "Submitted");
                    const isCompleted = index < currentStageIndex;
                    const isCurrent = index === currentStageIndex;

                    return (
                      <div
                        key={stg}
                        className={`p-2.5 rounded-md border flex items-center gap-2.5 text-xs transition-all ${
                          isCurrent
                            ? "bg-blue-600 text-white border-blue-700 font-bold shadow-sm"
                            : isCompleted
                            ? "bg-emerald-50 text-emerald-900 border-emerald-200 font-medium"
                            : "bg-white text-slate-400 border-slate-200 font-normal opacity-70"
                        }`}
                      >
                        <span
                          className={`h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                            isCurrent
                              ? "bg-white text-blue-700"
                              : isCompleted
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {isCompleted ? "✓" : index + 1}
                        </span>
                        <span className="truncate">{stg}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Author & Submission Overview */}
              <div className="bg-white p-4 rounded-md border border-slate-200 space-y-2">
                <div className="flex flex-wrap items-center gap-4 text-slate-700 font-medium">
                  <span className="flex items-center gap-1.5">
                    <FaUser className="text-blue-600" /> {selectedManuscript.titlePrefix} {selectedManuscript.authorName}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaEnvelope className="text-blue-600" /> {selectedManuscript.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaGlobe className="text-blue-600" /> {selectedManuscript.country}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <strong>Postal Address:</strong> {selectedManuscript.postalAddress}
                </div>
              </div>

              {/* Abstract */}
              <div>
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5">
                  Abstract Summary
                </h5>
                <div className="p-4 bg-white border border-slate-200 rounded-md leading-relaxed text-slate-700 font-normal whitespace-pre-line max-h-48 overflow-y-auto">
                  {selectedManuscript.abstract}
                </div>
              </div>

              {/* Attached Document File */}
              <div className="flex items-center justify-between p-3 bg-blue-50/70 border border-blue-100 rounded-md">
                <div>
                  <span className="font-semibold text-blue-900 block">Attached Manuscript Document</span>
                  <span className="text-[11px] text-slate-500">{selectedManuscript.fileName || "Uploaded File"}</span>
                </div>
                <a
                  href={formatFileUrl(selectedManuscript.fileUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  <FaFilePdf /> Open Document
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Elegant Custom Warning Modal for Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-5 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto text-xl border border-red-100">
              <FaTrash />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Confirm Manuscript Deletion</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Are you sure you want to permanently delete this manuscript submission? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all cursor-pointer flex-1"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteManuscript}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex-1"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ManuscriptsManager;
