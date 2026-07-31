import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BsFileEarmarkText } from 'react-icons/bs';
import { FaRegFilePdf } from 'react-icons/fa6';
import { BiCalendar, BiBookOpen } from 'react-icons/bi';
import { FiArrowLeft } from 'react-icons/fi';
import dummyPdf from '../../assets/IJSSAHR_012.pdf';

// Dummy database of past archived issues (Backend API response mockup)
const archiveIssuesData = {
  "vol-01-iss-03": {
    id: "vol-01-iss-03",
    volume: "Volume 01",
    issue: "Issue 03",
    date: "May–Jun 2026",
    fullTitle: "Volume 1, Issue 3, May–Jun 2026",
    articles: [
      {
        id: 1,
        title: "Hans Sachs and the Birth of Poetic Self-awareness: Autobiography, Criticism, and a Paradigm Shift in Literature",
        authors: "Albrecht Classen, USA",
        pages: "1-13",
        pdfLink: dummyPdf,
        abstract: "This paper explores the literary transformation and poetic self-awareness of Hans Sachs through autobiographical analysis and Renaissance criticism."
      },
      {
        id: 2,
        title: "SOS to Ghana's and ECOWAS' Parliaments for the Promulgation of Victims Protection Act",
        authors: "Ishmael D. Norman, Ghana",
        pages: "14-23",
        pdfLink: dummyPdf,
        abstract: "An urgent legislative evaluation and policy proposal advocating for victim protection frameworks in West Africa."
      },
      {
        id: 3,
        title: "The Phenomenon of Poverty and the Ethics of Help by the Rich Countries",
        authors: "Robert Wadri Aluma, Uganda",
        pages: "24-40",
        pdfLink: dummyPdf,
        abstract: "A critical examination of international aid, ethical obligations, and poverty alleviation strategies across developing nations."
      }
    ]
  },
  "vol-01-iss-02": {
    id: "vol-01-iss-02",
    volume: "Volume 01",
    issue: "Issue 02",
    date: "Mar–Apr 2026",
    fullTitle: "Volume 1, Issue 2, Mar–Apr 2026",
    articles: [
      {
        id: 4,
        title: "Algorithmic Composition: Artificial Intelligence and Generative Methods in Music",
        authors: "Belikova Viktoriia, USA",
        pages: "41-46",
        pdfLink: dummyPdf,
        abstract: "Investigation into AI-generated musical compositions and the evolution of algorithmic sound synthesis in modern arts."
      },
      {
        id: 5,
        title: "Puro Veneno Wall Posters, Colombia, South America, 2018 to Present",
        authors: "R.G. Wakeland, USA",
        pages: "47-60",
        pdfLink: dummyPdf,
        abstract: "A visual cultural analysis of political street art and public wall posters in post-conflict Colombia."
      }
    ]
  },
  "vol-01-iss-01": {
    id: "vol-01-iss-01",
    volume: "Volume 01",
    issue: "Issue 01",
    date: "Jan–Feb 2026",
    fullTitle: "Volume 1, Issue 1, Jan–Feb 2026",
    articles: [
      {
        id: 6,
        title: "Tracing the Concept of Mission in Public Organizations",
        authors: "Dr. Mike Potter, USA",
        pages: "61-71",
        pdfLink: dummyPdf,
        abstract: "An organizational theory paper examining public service orientation, mission statements, and administrative efficacy."
      }
    ]
  }
};

const ArchiveIssueDetailsContent = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  // Get selected issue data (or fallback to first issue)
  const currentIssueData = archiveIssuesData[issueId] || archiveIssuesData["vol-01-iss-03"];

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handlePdfClick = (e, link) => {
    e.stopPropagation();
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full space-y-5 animate-fade-in">
      {/* Back Button & Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:px-6 rounded-xl border border-slate-100 shadow-sm">
        <button
          onClick={() => navigate('/archive')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0d6efd] hover:text-[#0b1340] transition-colors w-fit"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Archive</span>
        </button>

        <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm">
          <BiCalendar className="text-[#0d6efd] w-4 h-4" />
          <span className="font-medium text-slate-700">{currentIssueData.date}</span>
        </div>
      </div>

      {/* Main Issue Container */}
      <div className="w-full bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        
        {/* Issue Banner Header */}
        <div className="bg-[#f8fafc] p-4 sm:px-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e0edff] text-[#0d6efd] flex items-center justify-center">
              <BiBookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#0b1340]">
                {currentIssueData.fullTitle}
              </h2>
              <p className="text-xs text-slate-500 font-medium">Archived Issue Publications</p>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 md:gap-6 p-4 md:px-6 bg-slate-50/50 border-b border-slate-200 font-bold text-slate-800 text-[13px] md:text-[14.5px]">
          <div>Article Title & Authors</div>
          <div className="hidden md:block w-[70px] text-center">Page</div>
          <div className="hidden md:block w-[110px] text-center">Download</div>
        </div>

        {/* Articles List */}
        <div className="flex flex-col">
          {currentIssueData.articles.map((article, index) => {
            const isExpanded = expandedId === article.id;

            return (
              <div
                key={article.id}
                className={`group flex flex-col border-b border-slate-100 transition-colors duration-300 ${isExpanded ? "bg-slate-50/50" : "hover:bg-slate-50/50"} ${index === currentIssueData.articles.length - 1 ? "border-b-0" : ""}`}
              >
                {/* Main Row */}
                <div
                  className="flex flex-col md:grid md:grid-cols-[1fr_auto_auto] gap-4 md:gap-6 p-4 md:px-6 md:items-center cursor-pointer"
                  onClick={() => toggleExpand(article.id)}
                >
                  {/* Title & Authors */}
                  <div className="flex items-start gap-2.5 md:gap-4 min-w-0">
                    <div className="shrink-0 mt-0.5 md:mt-1 hidden sm:block">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded bg-[#f0f6ff] border border-[#e0edff] flex items-center justify-center text-[#0d6efd] group-hover:scale-105 transition-transform duration-300">
                        <BsFileEarmarkText className="text-base md:text-xl" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pr-0 md:pr-2">
                      <h3
                        className={`text-[13.5px] md:text-[15.5px] font-bold leading-[1.4] mb-1.5 transition-colors duration-300 break-words whitespace-normal ${isExpanded ? "text-[#0b1340]" : "text-[#0d6efd] group-hover:text-[#0b1340]"}`}
                      >
                        {article.title}
                      </h3>
                      <p className="text-[12px] md:text-[13.5px] text-slate-500 m-0 break-words whitespace-normal leading-relaxed">
                        {article.authors}
                      </p>
                    </div>
                  </div>

                  {/* Mobile: Bottom Row for Pages and Download */}
                  <div className="flex md:contents items-center justify-between mt-1 md:mt-0 pt-3 md:pt-0 border-t border-slate-100/80 md:border-0">
                    <div className="flex items-center gap-2 md:block md:w-[70px] md:text-center text-[13px] md:text-[14px] text-slate-600 font-medium whitespace-nowrap">
                      <span className="md:hidden text-slate-400 font-normal">Page:</span>
                      {article.pages}
                    </div>

                    <div className="md:w-[110px] flex justify-end md:justify-center">
                      <button
                        onClick={(e) => handlePdfClick(e, article.pdfLink)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-[12px] md:text-[13px] font-medium transition-colors duration-200 shadow-2xs"
                      >
                        <FaRegFilePdf className="text-sm" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Abstract Accordion Dropdown */}
                {isExpanded && (
                  <div className="px-4 md:px-6 pb-4 pt-1 bg-[#f8fafc] border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong className="text-slate-800 font-bold block mb-1">Abstract:</strong>
                    <p>{article.abstract}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArchiveIssueDetailsContent;
