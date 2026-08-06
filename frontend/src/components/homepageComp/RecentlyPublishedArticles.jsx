import React from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";

const RecentlyPublishedArticles = ({ viewAllLink = "/archive" }) => {
  // Fetch current issue live from MongoDB (/api/v1/issues/current)
  const { data: currentIssue, isLoading } = useQuery({
    queryKey: ["current-issue-home"],
    queryFn: async () => {
      const res = await API.get("/issues/current");
      return res.data?.data || null;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const articles = currentIssue?.articles || [];
  const volumeInfo = currentIssue
    ? `${currentIssue.volume || "Vol. 01"}, ${currentIssue.issue || "Issue 01"}`
    : "Current Issue";
  const periodInfo = currentIssue?.period || "";

  return (
    <section className="w-full bg-white rounded-xl shadow-2xs border border-slate-200/80 p-4 md:p-5 mb-6">
      {/* Component Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 mb-3 gap-2">
        <div className="flex items-center gap-2">
          <HiOutlineDocumentText className="text-blue-600 text-xl shrink-0" />
          <h2 className="text-sm md:text-base font-bold text-slate-900">
            Recently Published Articles
          </h2>
          {currentIssue && (
            <span className="bg-blue-50 text-blue-700 text-[10.5px] font-semibold px-2 py-0.5 rounded-full ml-1">
              {volumeInfo}
            </span>
          )}
        </div>
        <a
          href={viewAllLink}
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors group shrink-0"
        >
          <span>View All Articles</span>
          <FiArrowRight className="transform transition-transform group-hover:translate-x-1 shrink-0 text-xs" />
        </a>
      </div>

      {/* Article List */}
      {isLoading ? (
        <div className="py-6 text-center text-xs text-slate-400">
          Loading recently published articles...
        </div>
      ) : articles.length === 0 ? (
        <div className="py-6 text-center text-xs text-slate-500 italic">
          No articles published in current issue yet.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {articles.map((article, idx) => (
            <div
              key={article._id || article.articleId || idx}
              className="py-3 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 group hover:bg-slate-50/60 p-2 rounded-lg transition-colors"
            >
              {/* Left side: Icon + Title & Author */}
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                <HiOutlineDocumentText className="text-blue-600 text-lg shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <a
                    href={`/currentissue`}
                    className="block text-[13px] font-semibold text-slate-900 hover:text-blue-600 leading-snug mb-0.5 transition-colors"
                  >
                    {article.title}
                  </a>
                  <p className="text-[11.5px] text-slate-500 font-normal m-0">
                    {article.authors}
                  </p>
                </div>
              </div>

              {/* Right side: Volume/Issue & Date */}
              <div className="sm:text-right shrink-0 pl-7 sm:pl-0 flex sm:flex-col justify-between sm:justify-start items-baseline sm:items-end gap-2 sm:gap-0">
                <p className="text-[11.5px] text-slate-700 font-semibold m-0">
                  {volumeInfo}
                </p>
                <p className="text-[11px] text-slate-400 font-normal m-0">
                  {periodInfo}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentlyPublishedArticles;
