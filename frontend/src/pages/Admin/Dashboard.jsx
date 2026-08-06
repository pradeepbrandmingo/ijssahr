import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";
import { formatFileUrl } from "../../utils/fileUrl";
import {
  FaBook,
  FaFileAlt,
  FaTasks,
  FaUsers,
  FaPlus,
  FaExternalLinkAlt,
  FaFilePdf,
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

const Dashboard = () => {
  const [user] = useState(() => {
    try {
      const cached = localStorage.getItem("user");
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      return null;
    }
  });

  // Query Manuscripts (Cached instant load + automatic background refresh)
  const { data: manuscripts = [], isLoading: loadingManuscripts } = useQuery({
    queryKey: ["admin-dashboard-manuscripts"],
    queryFn: async () => {
      const res = await API.get("/manuscripts?limit=30");
      const mData = res.data?.data;
      return Array.isArray(mData?.manuscripts)
        ? mData.manuscripts
        : Array.isArray(mData)
        ? mData
        : [];
    },
    staleTime: 30 * 1000,
    refetchOnMount: true,
  });

  // Query Issues (Cached instant load + automatic background refresh)
  const { data: issues = [], isLoading: loadingIssues } = useQuery({
    queryKey: ["admin-dashboard-issues"],
    queryFn: async () => {
      const res = await API.get("/issues");
      return Array.isArray(res.data?.data) ? res.data.data : [];
    },
    staleTime: 30 * 1000,
    refetchOnMount: true,
  });

  // Query Editorial Board (Cached instant load + automatic background refresh)
  const { data: boardCount = 0 } = useQuery({
    queryKey: ["admin-dashboard-board"],
    queryFn: async () => {
      const res = await API.get("/editorial-board");
      const boardData = res.data?.data;
      return (
        (boardData?.editorInChief?.name ? 1 : 0) +
        (boardData?.associateEditors?.length || 0) +
        (boardData?.editorialBoardMembers?.length || 0)
      );
    },
    staleTime: 30 * 1000,
    refetchOnMount: true,
  });

  const loading = loadingManuscripts || loadingIssues;

  // Calculate real metrics
  const totalPublishedArticles = issues.reduce(
    (acc, iss) => acc + (iss.articles?.length || 0),
    0
  );
  const currentActiveIssue = issues.find((iss) => iss.isCurrent) || issues[0];
  const underReviewCount = manuscripts.filter(
    (m) => m.status === "Under Review" || m.status === "Submitted"
  ).length;

  // Stat Card Component (Ultra Compact)
  const StatCard = ({ title, count, subtitle, icon: Icon, color }) => (
    <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs hover:shadow-xs transition-all">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{title}</span>
        <div className={`p-1.5 rounded-md ${color}`}>
          <Icon className="text-[10px]" />
        </div>
      </div>
      <div className="mt-1 flex items-baseline justify-between">
        {loading ? (
          <div className="h-6 w-12 bg-slate-100/90 rounded animate-pulse my-0.5" />
        ) : (
          <h3 className="text-2xl font-black text-slate-900 leading-none">{count}</h3>
        )}
        <span className="text-[9px] text-emerald-700 font-semibold bg-emerald-50 px-1 py-0.2 rounded">
          Live DB
        </span>
      </div>
      <p className="mt-0.5 text-[10px] text-slate-500 font-normal truncate m-0">{subtitle}</p>
    </div>
  );

  const isClient = user?.role === "client";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-4 text-slate-900 font-sans w-full"
    >
      {/* Top Banner Header UI */}
      <div className="bg-white p-3 md:p-3.5 rounded-lg border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[9.5px] font-bold tracking-wider uppercase border border-blue-100">
              {user?.role || "PORTAL"} DASHBOARD
            </span>
            <span className="text-[10.5px] text-slate-400 font-medium">• Active Realtime Session</span>
          </div>
          <h1 className="text-base font-bold text-slate-900 mt-0.5 tracking-tight">
            {isClient ? "Author Manuscript Tracking" : "Dashboard Overview"}
          </h1>
          <p className="text-[11.5px] text-slate-600 font-normal mt-0.5">
            Welcome back, <span className="font-semibold text-blue-600">{user?.name || "User"}</span>!{" "}
            {isClient
              ? "Track your submitted manuscripts & real-time article processing stages."
              : "Live analytics of IJSSAHR manuscripts, volumes, editorial board & users."}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2.5 py-1 bg-slate-50 text-slate-700 text-[11px] font-mono font-bold rounded-md border border-slate-200">
            {isClient ? `Client ID: ${user?.clientCode || "CL-00025"}` : "IJSSAHR Portal"}
          </span>
        </div>
      </div>

      {/* Author / Client Specific Dashboard View */}
      {isClient ? (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">My Submitted Articles</h2>
                <p className="text-[11px] text-slate-500">
                  Permanent Article ID & Live Stage Processing Tree
                </p>
              </div>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-100">
                Submitted Papers: {manuscripts.length}
              </span>
            </div>

            {loading ? (
              <div className="p-6 text-center text-slate-400 text-xs">
                Loading your submitted articles...
              </div>
            ) : manuscripts.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs italic">
                No articles submitted under your email ({user?.email}) yet.
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {manuscripts.map((article, idx) => {
                  const currentStageIdx = ARTICLE_STAGES.indexOf(article.status || "Submitted");

                  return (
                    <div
                      key={article._id}
                      className="p-4 bg-slate-50/70 rounded-lg border border-slate-200/80 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              Article {idx + 1}
                            </span>
                            <span className="px-2 py-0.5 bg-blue-600 text-white rounded font-mono font-bold text-[11px]">
                              {article.articleId || "IJSSAHR-2026-001"}
                            </span>
                          </div>
                          <h3 className="text-xs font-bold text-slate-900 mt-1">
                            {article.articleTitle}
                          </h3>
                        </div>

                        {article.fileUrl && (
                          <a
                            href={formatFileUrl(article.fileUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-semibold border border-slate-200 shrink-0"
                          >
                            <FaFilePdf className="text-red-500 text-xs" /> View Document
                          </a>
                        )}
                      </div>

                      <div className="pl-1 space-y-1.5 text-slate-700">
                        <div className="font-semibold text-slate-900 flex items-center gap-2 text-[11.5px]">
                          <span>└─</span>
                          <span className="font-mono text-blue-600">{article.articleId || "IJSSAHR-2026-001"}</span>
                          <span className="text-[10.5px] font-normal text-slate-500">
                            (Submitted on {new Date(article.createdAt).toLocaleDateString()})
                          </span>
                        </div>

                        <div className="pl-5 space-y-1">
                          {ARTICLE_STAGES.map((stg, sIdx) => {
                            const isDone = sIdx < currentStageIdx;
                            const isCurrent = sIdx === currentStageIdx;
                            const isLast = sIdx === ARTICLE_STAGES.length - 1;

                            return (
                              <div
                                key={stg}
                                className={`flex items-center gap-2 transition-all text-xs ${
                                  isCurrent
                                    ? "text-blue-700 font-bold bg-blue-50/90 px-2 py-1 rounded-md border border-blue-200"
                                    : isDone
                                    ? "text-emerald-700 font-medium"
                                    : "text-slate-400 font-normal opacity-60"
                                }`}
                              >
                                <span className="text-slate-400">{isLast ? "└─" : "├─"}</span>
                                <span
                                  className={`h-3.5 w-3.5 rounded-full flex items-center justify-center text-[8.5px] font-bold shrink-0 ${
                                    isCurrent
                                      ? "bg-blue-600 text-white"
                                      : isDone
                                      ? "bg-emerald-600 text-white"
                                      : "bg-slate-200 text-slate-500"
                                  }`}
                                >
                                  {isDone ? "✓" : sIdx + 1}
                                </span>
                                <span>{stg}</span>
                                {isCurrent && (
                                  <span className="px-1.5 py-0.2 bg-blue-600 text-white rounded text-[8.5px] uppercase font-bold ml-1">
                                    Current Stage
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* SuperAdmin & Employee Live Overview */
        <>
          {/* Real Analytics Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              title="Total Volumes / Issues"
              count={issues.length}
              subtitle={
                currentActiveIssue
                  ? `${currentActiveIssue.volume}, ${currentActiveIssue.issue} Active`
                  : "No active issue"
              }
              icon={FaBook}
              color="bg-blue-50 text-blue-600"
            />

            <StatCard
              title="Published Articles"
              count={totalPublishedArticles}
              subtitle="Across all volumes & issues"
              icon={FaFileAlt}
              color="bg-indigo-50 text-indigo-600"
            />

            <StatCard
              title="Total Manuscripts"
              count={manuscripts.length}
              subtitle={`${underReviewCount} Under Processing / Review`}
              icon={FaTasks}
              color="bg-purple-50 text-purple-600"
            />

            <StatCard
              title="Editorial Board"
              count={boardCount}
              subtitle="Active Board Members & Editors"
              icon={FaUsers}
              color="bg-amber-50 text-amber-600"
            />
          </div>

          {/* Recent Submissions & Quick Action Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Real Recent Manuscripts List */}
            <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Recent Live Manuscript Submissions
                </h2>
                <a
                  href="/admin/manuscripts"
                  className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline flex items-center gap-1"
                >
                  View All <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>

              <div className="divide-y divide-slate-100 text-xs font-normal">
                {loading ? (
                  <div className="space-y-3 py-2">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="h-8 bg-slate-100/80 rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : manuscripts.length === 0 ? (
                  <div className="py-6 text-center text-slate-500 text-xs italic">
                    No manuscripts submitted yet in database.
                  </div>
                ) : (
                  manuscripts.slice(0, 5).map((item) => (
                    <div key={item._id} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-600 text-[11px] shrink-0">
                            {item.articleId || "IJSSAHR-2026-001"}
                          </span>
                          <h4 className="font-semibold text-slate-900 truncate text-[12.5px]">
                            {item.articleTitle}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 font-normal">
                          By {item.titlePrefix} {item.authorName} • {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 bg-blue-50 text-blue-700 border border-blue-100">
                        {item.status || "Submitted"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2.5">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <a
                  href="/admin/volumes"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-xs font-semibold text-slate-800 transition-all border border-slate-200/80"
                >
                  <FaPlus className="text-xs text-blue-600 shrink-0" /> Manage Issues & Volumes
                </a>
                <a
                  href="/admin/manuscripts"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-xs font-semibold text-slate-800 transition-all border border-slate-200/80"
                >
                  <FaTasks className="text-xs text-purple-600 shrink-0" /> Review Manuscripts Status
                </a>
                {user?.role === "superadmin" && (
                  <a
                    href="/admin/employees"
                    className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-xs font-semibold text-slate-800 transition-all border border-slate-200/80"
                  >
                    <FaUsers className="text-xs text-amber-600 shrink-0" /> Manage Employee & Authors
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Dashboard;
