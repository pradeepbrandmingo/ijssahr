import React from "react";
import { BiCalendar, BiBookOpen } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";

const ArchiveContent = () => {
  const navigate = useNavigate();

  const { data: pastIssues = [], isLoading } = useQuery({
    queryKey: ["archive-issues-public"],
    queryFn: async () => {
      const res = await API.get("/issues/archive");
      return res.data?.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const handleIssueClick = (issueId) => {
    navigate(`/archive/${issueId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-3"
    >
      {/* Micro-Compact Archive Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-[#0b1340] mb-0.5">Archive</h1>
        <p className="text-slate-500 text-xs font-normal">
          Browse and access all past issues of IJSSAHR.
        </p>
      </div>

      {/* Issues List Container */}
      <div className="w-full bg-white rounded-md border border-slate-200 overflow-hidden shadow-2xs">
        {isLoading ? (
          /* Smooth Skeleton Rows (Same height as real data items) */
          <div className="flex flex-col divide-y divide-slate-100">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="py-2.5 px-3 md:px-4 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 shrink-0"></div>
                  <div className="space-y-1.5 flex-1 max-w-sm">
                    <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                    <div className="h-2.5 bg-slate-50 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="h-6 w-16 bg-slate-100 rounded shrink-0 hidden sm:block"></div>
              </div>
            ))}
          </div>
        ) : pastIssues.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs font-normal">
            No past archived issues recorded yet.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col"
          >
            {pastIssues.map((issue, index) => (
              <div
                key={issue._id || issue.id}
                onClick={() => handleIssueClick(issue._id || issue.id)}
                className={`group flex items-center justify-between py-2 px-3 md:px-4 bg-white cursor-pointer transition-colors duration-150 hover:bg-slate-50/70 ${
                  index === pastIssues.length - 1 ? "" : "border-b border-slate-100"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Compact Icon Badge */}
                  <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors duration-200">
                    <BiBookOpen className="text-sm sm:text-base" />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 pr-2">
                    <h3 className="text-[#0d6efd] group-hover:text-[#0b1340] font-medium text-xs sm:text-[13px] md:text-[13.5px] transition-colors truncate">
                      {issue.volume}, {issue.issue} ({issue.period || "2026"})
                    </h3>
                    <div className="flex items-center gap-1 text-slate-400 text-[10.5px] font-normal">
                      <BiCalendar className="text-xs shrink-0" />
                      <span className="truncate">{issue.period || issue.date}</span>
                    </div>
                  </div>
                </div>

                {/* Compact Action Button */}
                <div className="flex items-center gap-2 shrink-0">
                  <button className="hidden sm:block px-2.5 py-1 bg-white border border-slate-200 text-slate-600 text-[11px] font-medium rounded hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer">
                    View Issue
                  </button>
                  <FiChevronRight className="text-slate-400 text-sm group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ArchiveContent;
