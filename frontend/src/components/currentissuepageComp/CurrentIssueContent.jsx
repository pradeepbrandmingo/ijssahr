import React, { useState } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { FaRegFilePdf, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";
import { formatFileUrl } from "../../utils/fileUrl";

const CurrentIssueContent = () => {
  const [expandedId, setExpandedId] = useState(null);

  const { data: currentIssue, isLoading } = useQuery({
    queryKey: ["current-issue-public"],
    queryFn: async () => {
      const res = await API.get("/issues/current");
      return res.data?.data || null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handlePdfClick = (e, link) => {
    e.stopPropagation();
    if (!link || link === "#") return;
    window.open(formatFileUrl(link), "_blank", "noopener,noreferrer");
  };

  const articles = currentIssue?.articles || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-3"
    >
      {/* Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-[#0b1340] mb-0.5">
          {currentIssue ? `${currentIssue.volume}, ${currentIssue.issue} (${currentIssue.period || "2026"})` : "Current Issue"}
        </h1>
        <p className="text-slate-500 text-xs font-normal">
          Published articles in the latest volume and issue of IJSSAHR.
        </p>
      </div>

      {/* Main Table / Container */}
      <div className="w-full bg-white rounded-md border border-slate-200 overflow-hidden shadow-2xs">
        {/* Table Header - Desktop */}
        <div className="hidden md:grid grid-cols-12 gap-2 py-2 px-3 bg-slate-50 border-b border-slate-200 text-slate-700 text-[11px] font-semibold">
          <div className="col-span-9 pl-1">Article Details</div>
          <div className="col-span-[1.5] text-center">Page</div>
          <div className="col-span-[1.5] text-center">Action</div>
        </div>

        {/* Content Rows or Skeleton */}
        {isLoading ? (
          <div className="flex flex-col divide-y divide-slate-100">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-3 px-3 md:px-4 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-2.5 flex-1 max-w-lg">
                  <div className="w-6 h-6 rounded bg-slate-100 shrink-0"></div>
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 bg-slate-100 rounded w-3/4"></div>
                    <div className="h-2.5 bg-slate-50 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-5 w-12 bg-slate-100 rounded shrink-0 hidden md:block"></div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs font-normal">
            No articles published in current issue yet.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col divide-y divide-slate-100"
          >
            {articles.map((article, idx) => {
              const articleId = article._id || article.id || idx;
              const isExpanded = expandedId === articleId;

              return (
                <div key={articleId} className="flex flex-col bg-white">
                  {/* Article Main Row */}
                  <div
                    onClick={() => toggleExpand(articleId)}
                    className="py-2.5 px-3 md:px-4 cursor-pointer hover:bg-slate-50/70 transition-colors flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center group"
                  >
                    {/* Article Details */}
                    <div className="col-span-9 flex items-start gap-2.5 min-w-0 pr-0 md:pr-2">
                      <div className="shrink-0 mt-0.5 hidden sm:block">
                        <div className="w-6 h-6 rounded bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                          <BsFileEarmarkPdf className="text-xs" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 pr-0 md:pr-1">
                        <h3
                          className={`text-[12px] md:text-[12.5px] font-medium leading-snug mb-0.5 transition-colors ${
                            isExpanded
                              ? "text-[#0b1340]"
                              : "text-[#0d6efd] group-hover:text-[#0b1340]"
                          }`}
                        >
                          {article.title}
                        </h3>
                        <p className="text-[10.5px] md:text-[11px] text-slate-500 m-0 break-words whitespace-normal leading-tight font-normal">
                          {article.authors}
                        </p>
                      </div>
                    </div>

                    {/* Page Range & Action */}
                    <div className="flex md:contents items-center justify-between mt-0.5 md:mt-0 pt-1.5 md:pt-0 border-t border-slate-100 md:border-0">
                      <div className="flex items-center gap-1 md:block md:w-[50px] md:text-center text-[11px] text-slate-500 font-normal whitespace-nowrap">
                        <span className="md:hidden text-slate-400 text-[10px]">Page:</span>
                        {article.pageRange || article.pages || "01-15"}
                      </div>

                      <div className="md:w-[75px] flex justify-end md:justify-center shrink-0">
                        <button
                          onClick={(e) => handlePdfClick(e, article.pdfUrl || article.pdfLink)}
                          className="flex items-center justify-center gap-1 px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-medium rounded border border-blue-200 transition-all cursor-pointer"
                        >
                          <FaRegFilePdf className="text-[10px]" />
                          <span>PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Abstract & DOI Section */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="py-2.5 px-3 md:px-4 sm:ml-8 border-t border-slate-100 bg-white space-y-1.5">
                      <h4 className="font-medium text-slate-800 text-[11px]">Abstract:</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed text-justify break-words font-normal">
                        {article.abstract || "Abstract not provided for this article."}
                      </p>
                      {article.doi && (
                        <div className="flex items-center gap-1 text-[10.5px] text-slate-500 pt-1">
                          <span className="font-semibold text-slate-700">DOI:</span>
                          <a
                            href={article.doi.startsWith("http") ? article.doi : `https://doi.org/${article.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0d6efd] hover:underline flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {article.doi} <FaExternalLinkAlt className="text-[9px]" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CurrentIssueContent;
