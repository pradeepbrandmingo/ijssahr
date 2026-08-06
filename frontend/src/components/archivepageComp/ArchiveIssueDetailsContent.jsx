import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { VscFilePdf } from "react-icons/vsc";
import { FaRegFilePdf, FaExternalLinkAlt } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import { FiArrowLeft } from "react-icons/fi";
import API from "../../services/api";
import { formatFileUrl } from "../../utils/fileUrl";

const ArchiveIssueDetailsContent = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();

  const [issueData, setIssueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    setLoading(true);
    API.get(`/issues/${issueId}`)
      .then((res) => {
        setIssueData(res.data?.data || null);
      })
      .catch((err) => {
        console.error("Failed to fetch issue details:", err);
      })
      .finally(() => setLoading(false));
  }, [issueId]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handlePdfClick = (e, link) => {
    e.stopPropagation();
    if (!link || link === "#") return;
    window.open(formatFileUrl(link), "_blank", "noopener,noreferrer");
  };

  const articles = issueData?.articles || [];

  if (loading) {
    return (
      <div className="w-full bg-white p-4 rounded-md border border-slate-100 text-center text-slate-400 text-xs font-normal animate-pulse">
        Loading archived issue publications...
      </div>
    );
  }

  if (!issueData) {
    return (
      <div className="w-full bg-white p-8 rounded-md border border-slate-100 text-center">
        <p className="text-slate-600 text-xs font-medium mb-3">Archived issue record not found.</p>
        <button
          onClick={() => navigate("/archive")}
          className="px-3 py-1.5 bg-blue-600 text-white rounded font-bold text-xs"
        >
          Back to Archive
        </button>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in space-y-3">
      {/* Back Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/archive")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0d6efd] hover:text-[#0b1340] transition-colors cursor-pointer"
        >
          <FiArrowLeft className="text-sm" />
          <span>Back to Archive</span>
        </button>
      </div>

      {/* Compact Archived Issue Banner */}
      <div className="relative bg-[#0b1340] text-white rounded-lg p-3 sm:px-4 md:px-5 md:py-3.5 overflow-hidden shadow-2xs flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="relative z-10 flex-1">
          <span className="inline-block text-[#38b6ff] font-semibold tracking-wider text-[9px] uppercase mb-0.5">
            ARCHIVED PUBLICATION
          </span>
          <h1 className="text-[13px] sm:text-[14px] md:text-[16px] font-semibold text-white mb-1">
            {issueData.volume}, {issueData.issue} ({issueData.period || "2026"})
          </h1>
          <div className="flex items-center gap-1.5 text-slate-300 text-[10px] font-normal">
            <BiCalendar className="text-xs" />
            <span>Published Issue</span>
          </div>
        </div>
      </div>

      {/* Publications Micro-Compact Table */}
      <div className="w-full bg-white rounded-md border border-slate-200 overflow-hidden shadow-2xs">
        {/* Micro-Compact Table Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 py-1.5 px-3 md:px-4 bg-slate-50/90 border-b border-slate-200 font-semibold text-slate-500 text-[10px] uppercase tracking-wider">
          <div>Article Title & Authors</div>
          <div className="hidden md:block w-[50px] text-center">Page</div>
          <div className="hidden md:block w-[75px] text-center">Download</div>
        </div>

        {/* Articles List */}
        <div className="flex flex-col">
          {articles.length === 0 ? (
            <div className="p-4 text-center text-slate-400 text-[11px] font-normal">
              No published articles found in this archived issue.
            </div>
          ) : (
            articles.map((article, index) => {
              const articleKey = article._id || article.id || index;
              const isExpanded = expandedId === articleKey;

              const doiUrl = article.doi
                ? article.doi.startsWith("http")
                  ? article.doi
                  : `https://doi.org/${article.doi.replace(/^doi:\s*/i, "")}`
                : "";

              return (
                <div
                  key={articleKey}
                  className={`group flex flex-col border-b border-slate-100 transition-colors duration-150 ${
                    isExpanded ? "bg-slate-50/80" : "hover:bg-slate-50/40"
                  } ${index === articles.length - 1 ? "border-b-0" : ""}`}
                >
                  {/* Main Micro-Compact Row */}
                  <div
                    className="flex flex-col md:grid md:grid-cols-[1fr_auto_auto] gap-2 py-1.5 px-3 md:px-4 md:items-center cursor-pointer"
                    onClick={() => toggleExpand(articleKey)}
                  >
                    {/* Title & Authors */}
                    <div className="flex items-start gap-2 min-w-0">
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

                    {/* Mobile & Desktop: Page Range & Download PDF */}
                    <div className="flex md:contents items-center justify-between mt-0.5 md:mt-0 pt-1.5 md:pt-0 border-t border-slate-100 md:border-0">
                      {/* Pages */}
                      <div className="flex items-center gap-1 md:block md:w-[50px] md:text-center text-[11px] text-slate-500 font-normal whitespace-nowrap">
                        <span className="md:hidden text-slate-400 text-[10px]">Page:</span>
                        {article.pageRange || article.pages || "01-15"}
                      </div>

                      {/* Download Button */}
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
                        {article.abstract}
                      </p>

                      {/* Bottom Action Footer with Read Full PDF on Left & DOI Link on Bottom Right */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1.5 border-t border-slate-100">
                        <button
                          onClick={(e) => handlePdfClick(e, article.pdfUrl || article.pdfLink)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium text-[11px] transition-colors w-fit cursor-pointer"
                        >
                          <VscFilePdf className="text-sm" />
                          <span className="underline underline-offset-2">Read Full PDF</span>
                        </button>

                        {/* Bottom Right DOI Link Option */}
                        {doiUrl ? (
                          <div className="sm:ml-auto text-right">
                            <a
                              href={doiUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-blue-700 hover:text-blue-900 bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100 transition-colors"
                            >
                              <span>DOI: {doiUrl.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")}</span>
                              <FaExternalLinkAlt className="text-[8px]" />
                            </a>
                          </div>
                        ) : (
                          <div className="sm:ml-auto text-right text-[9.5px] font-mono text-slate-400 italic">
                            DOI: Pending Registration
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchiveIssueDetailsContent;
