import React from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";

const defaultAboutData = {
  header: {
    title: "About Us",
    intro:
      "International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is an international, double-blind peer-reviewed, open-access journal published by Alicon Publications.",
  },
  journalInfo: [
    { label: "Starting Year", value: "2026" },
    { label: "Subject Area", value: "Social Science, Arts and Humanities" },
    { label: "Format", value: "Online" },
    { label: "Language", value: "English" },
    { label: "Publisher", value: "Alicon Publications" },
  ],
  description:
    "IJSSAHR aims to provide a valuable outlet for research and scholarship on Social Science, Arts and Humanities-orientated themes and topics. It publishes articles of a multi-disciplinary and interdisciplinary nature as well as empirical research from within traditional disciplines and managerial functions. With contributions from around the globe, the journal includes articles across the full range of Social Science, Arts and Humanities disciplines.",
  ethicsStatement: {
    title: "IJSSAHR Publication Ethics Statement",
    intro:
      "The publisher/journal is dedicated to maintaining the highest level of integrity in the work published. The journal and its publisher follow the Committee on Publication Ethics (COPE)'s Core Practices. It is expected of authors, reviewers, and editors that they follow the best-practice guidelines on ethical behaviour contained therein. In addition, some key points are listed below.",
  },
  sections: [],
  license: {
    title: "Creative Commons Attribution License (CC-BY)",
    text: "All articles published by IJSSAHR will be distributed under the terms and conditions of the Creative Commons Attribution License(CC-BY). So anyone is allowed to copy, distribute, and transmit the article on condition that the original article and source is correctly cited.",
  },
};

const AboutContent = () => {
  const { data: serverData, isLoading } = useQuery({
    queryKey: ["about-page-public"],
    queryFn: async () => {
      const res = await API.get("/about-page");
      return res.data?.data || defaultAboutData;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const aboutData = serverData || defaultAboutData;
  const pStyle = "text-[12px] md:text-[12.5px] text-slate-700 leading-relaxed font-normal";

  if (isLoading) {
    return (
      <div className="py-8 text-center text-xs text-slate-400">
        Loading About Us content...
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xs border border-slate-200/80 p-4 md:p-5 mb-6 space-y-4">
        {/* Page Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-2.5 gap-1.5">
          <h1 className="text-xs md:text-sm font-bold text-slate-900 m-0">
            International Journal of Social Science, Arts and Humanities Research
          </h1>
          <span className="font-bold text-blue-600 text-xs md:text-sm shrink-0">
            IJSSAHR
          </span>
        </div>

        {/* About Us Title & Intro */}
        <div>
          <h2 className="text-sm md:text-base font-bold text-slate-900 mb-1.5">
            {aboutData.header?.title || "About Us"}
          </h2>
          <p className={pStyle}>{aboutData.header?.intro}</p>
        </div>

        {/* Info List Section */}
        {aboutData.journalInfo?.length > 0 && (
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {aboutData.journalInfo.map((info, index) => (
                <p key={index} className="text-[11.5px] m-0 leading-tight">
                  <span className="font-semibold text-slate-900">{info.label}:</span>{" "}
                  <span className="text-slate-600">{info.value}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Description Section */}
        {aboutData.description && (
          <div>
            <p className={pStyle}>{aboutData.description}</p>
          </div>
        )}

        {/* Ethics Statement Header */}
        {aboutData.ethicsStatement && (
          <div className="pt-1">
            <h2 className="text-sm md:text-base font-bold text-slate-900 mb-1.5">
              {aboutData.ethicsStatement.title}
            </h2>
            <p className={pStyle}>{aboutData.ethicsStatement.intro}</p>
          </div>
        )}

        {/* Dynamic Sections (Editor/Reviewer/Author Responsibilities) */}
        {aboutData.sections?.map((section, index) => (
          <div key={index} className="space-y-2.5 pt-1">
            <h3 className="text-xs md:text-sm font-bold text-blue-700 border-b border-slate-100 pb-1">
              {section.title}
            </h3>
            <div className="space-y-2 pl-0.5">
              {section.points?.map((point, pointIndex) => (
                <div key={pointIndex} className="space-y-0.5">
                  <h4 className="text-[12px] md:text-[12.5px] font-semibold text-slate-900 m-0">
                    {point.heading}
                  </h4>
                  {point.text.split("\n\n").map((paragraph, i) => (
                    <p key={i} className={`${pStyle} ${i > 0 ? "mt-1" : ""}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* License Section */}
        {aboutData.license && (
          <div className="pt-3 border-t border-slate-100">
            <h3 className="text-xs md:text-sm font-bold text-slate-900 mb-1">
              {aboutData.license.title}
            </h3>
            <p className={pStyle}>{aboutData.license.text}</p>

            <div className="flex flex-col items-end w-full mt-3 gap-1">
              <img
                src="https://licensebuttons.net/l/by-sa/3.0/88x31.png"
                alt="Creative Commons License"
                className="h-[24px] w-[70px]"
              />
              <p className="text-[10.5px] font-semibold text-slate-700 m-0 text-right">
                Licensed under Creative Common Attribute 3.0
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutContent;
