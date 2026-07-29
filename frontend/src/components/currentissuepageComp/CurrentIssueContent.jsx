import React, { useState } from "react";
import { BsFileEarmarkText } from "react-icons/bs";
import { VscFilePdf } from "react-icons/vsc";
import { FaRegFilePdf } from "react-icons/fa6";
import dummyPdf from "../../assets/IJSSAHR_012.pdf";

const CurrentIssueContent = () => {
  // Dummy data representing future backend response
  const [articles] = useState([
    {
      id: 1,
      title:
        "Factors Associated With Inadequate Sexual and Reproductive Health Education Among Adolescents and Its Consequences in Selected Secondary Schools in Douala, Cameroon",
      authors:
        "Christina Mbongueh Mohnchimbare, Fankep Dihewou Alphonse Bertin, Henri Lucien Kamga Fouamno, Uganda",
      pages: "01-17",
      pdfLink: dummyPdf,
      abstract:
        "Sexual and reproductive health (SRH) education remains a major public health concern among adolescents, particularly in developing countries where socio-cultural barriers, inadequate school-based programs, and poor parent-child communication limit access to accurate reproductive health information. This study assessed factors associated with inadequate sexual and reproductive health education and its consequences among adolescents in selected secondary schools in Douala, Cameroon. A descriptive cross-sectional study was conducted among 378 adolescents recruited from three secondary schools using a non-probability sampling technique...",
    },
    {
      id: 2,
      title:
        "A Microcosm of the Qing's Diplomatic Modernization-Sinibaldo De Mas Y Sanz and Treaty of Chinese Laborers in Cuba",
      authors: "Yang Yang, Spain",
      pages: "18-33",
      pdfLink: dummyPdf,
      abstract:
        "This study explores the diplomatic modernization of the Qing Dynasty during the late 19th century through the lens of the Sino-Spanish Treaty regarding Chinese laborers in Cuba. It highlights the shifting paradigms in Qing foreign policy and the empire's attempt to protect its overseas subjects...",
    },
    {
      id: 3,
      title: "A Study on the Nature and Truth of Human Arrogance",
      authors: "JuongMe Lee, Republic of Korea",
      pages: "34-51",
      pdfLink: dummyPdf,
      abstract:
        "Human arrogance is a multifaceted psychological and philosophical phenomenon. This paper delves into the root causes of arrogance, distinguishing it from confidence, and analyzes its impact on interpersonal relationships and societal structures...",
    },
  ]);

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handlePdfClick = (e, link) => {
    e.stopPropagation();
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden animate-fade-in transition-all duration-300">
      {/* Table Header */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 md:gap-6 p-4 md:px-6 bg-white border-b border-slate-200 font-bold text-slate-800 text-[13px] md:text-[15px]">
        <div>Article Title & Authors</div>
        <div className="hidden md:block w-[70px] text-center">Page</div>
        <div className="hidden md:block w-[110px] text-center">Download</div>
      </div>

      {/* Articles List */}
      <div className="flex flex-col">
        {articles.map((article, index) => {
          const isExpanded = expandedId === article.id;

          return (
            <div
              key={article.id}
              className={`group flex flex-col border-b border-slate-100 transition-colors duration-300 ${isExpanded ? "bg-slate-50/50" : "hover:bg-slate-50/50"} ${index === articles.length - 1 ? "border-b-0" : ""}`}
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
                  
                  {/* Pages */}
                  <div className="flex items-center gap-2 md:block md:w-[70px] md:text-center text-[13px] md:text-[14px] text-slate-600 font-medium whitespace-nowrap">
                    <span className="md:hidden text-slate-400 text-[12px] font-normal tracking-wider">Page:</span>
                    {article.pages}
                  </div>

                  {/* Download Button */}
                  <div className="md:w-[110px] flex justify-end md:justify-center shrink-0">
                    <button
                      onClick={(e) => handlePdfClick(e, article.pdfLink)}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-[#f0f6ff] hover:bg-[#e0edff] text-[#0d6efd] text-[11px] md:text-[13px] font-bold rounded border border-[#0d6efd]/20 hover:border-[#0d6efd]/40 transition-all duration-300 hover:shadow-sm"
                    >
                      <FaRegFilePdf className="text-[14px] md:text-[16px]" />
                      <span>PDF</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Expandable Abstract Section */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="p-4 md:p-6 sm:ml-10 md:ml-14 border-t border-slate-100/80 bg-white">
                  <h4 className="font-bold text-slate-800 text-[14px] md:text-[15px] mb-2.5">
                    Abstract:
                  </h4>
                  <p className="text-[13px] md:text-[14.5px] text-slate-600 leading-[1.7] mb-5 text-justify break-words whitespace-normal">
                    {article.abstract}
                  </p>

                  <button
                    onClick={(e) => handlePdfClick(e, article.pdfLink)}
                    className="flex items-center gap-2 text-[#e63946] hover:text-[#d90429] font-bold text-[13px] md:text-[14.5px] group/pdf transition-colors w-fit"
                  >
                    <VscFilePdf className="text-lg md:text-[22px] group-hover/pdf:scale-110 transition-transform" />
                    <span className="border-b-[1.5px] border-transparent group-hover/pdf:border-[#d90429] transition-colors pb-0.5">
                      Read Full PDF
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentIssueContent;
