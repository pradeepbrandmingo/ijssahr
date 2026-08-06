import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";
import { formatFileUrl } from "../../utils/fileUrl";
import { FaSearch, FaFilePdf, FaBook, FaUserAlt, FaTag } from "react-icons/fa";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(initialQuery);

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ["search-published-articles", initialQuery],
    queryFn: async () => {
      const res = await API.get(`/issues/search/articles?q=${encodeURIComponent(initialQuery)}`);
      return res.data?.data || [];
    },
    enabled: true,
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="w-full animate-fade-in space-y-6 font-sans">
      {/* Top Banner Header */}
      <div className="bg-white rounded-xl shadow-2xs border border-slate-200/80 p-5 md:p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-3 gap-2">
          <div>
            <h1 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
              <FaSearch className="text-blue-600 text-sm" /> Published Articles Search
            </h1>
            <p className="text-xs text-slate-500 font-normal mt-0.5 m-0">
              Search by Article Title, Authors, Keywords, Article ID (e.g. IJSSAHR-2026-001) or Subject Area
            </p>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-100 shrink-0">
            Results Found: {searchResults.length}
          </span>
        </div>

        {/* Live Search Form Input */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter search keywords, title, author name, DOI..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results List */}
      <div className="bg-white rounded-xl shadow-2xs border border-slate-200/80 p-5 space-y-4">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 m-0">
          Search Results {initialQuery ? `for "${initialQuery}"` : "All Articles"}
        </h2>

        {isLoading ? (
          <div className="py-12 text-center text-xs text-slate-400">
            Searching published database...
          </div>
        ) : searchResults.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs italic">
            No published articles found matching "{initialQuery}". Try searching with different keywords.
          </div>
        ) : (
          <div className="space-y-4 pt-1">
            {searchResults.map((article, idx) => (
              <div
                key={article._id || idx}
                className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-600 text-white rounded font-mono font-bold text-[10.5px]">
                    {article.articleId || "IJSSAHR-2026-001"}
                  </span>
                  {article.subHeading && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium border border-slate-200">
                      <FaTag className="text-[9px] text-blue-600" /> {article.subHeading}
                    </span>
                  )}
                  {article.volume && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <FaBook className="text-[10px] text-slate-400" /> {article.volume}, {article.issue} ({article.period})
                    </span>
                  )}
                </div>

                <h3 className="text-xs md:text-sm font-bold text-slate-900 leading-snug m-0">
                  {article.title}
                </h3>

                <p className="text-[11.5px] text-slate-700 font-medium flex items-center gap-1.5 m-0">
                  <FaUserAlt className="text-[10px] text-slate-400 shrink-0" />
                  <span>{article.authors}</span>
                </p>

                {article.abstract && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                    <p className="text-[11.5px] text-slate-700 leading-relaxed m-0 font-normal">
                      <strong className="text-slate-900">Abstract: </strong>
                      {article.abstract}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-100">
                  <span className="text-[11px] text-slate-500 font-mono break-all">
                    {article.doi ? `DOI: ${article.doi}` : `Page Range: ${article.pageRange || "01–15"}`}
                  </span>

                  {article.pdfUrl && (
                    <a
                      href={formatFileUrl(article.pdfUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold border border-red-200/80 transition-all shrink-0 w-fit"
                    >
                      <FaFilePdf className="text-red-600" /> Download PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
