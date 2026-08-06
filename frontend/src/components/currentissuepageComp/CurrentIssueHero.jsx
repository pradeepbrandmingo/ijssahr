import React, { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import heroImg from "../../assets/hero.png";
import API from "../../services/api";

const CurrentIssueHero = ({ issueData }) => {
  const [currentIssue, setCurrentIssue] = useState(issueData || null);

  useEffect(() => {
    if (!issueData) {
      API.get("/issues/current")
        .then((res) => {
          if (res.data?.data) {
            setCurrentIssue(res.data.data);
          }
        })
        .catch((err) => console.error("Failed to fetch current issue hero:", err));
    } else {
      setCurrentIssue(issueData);
    }
  }, [issueData]);

  const volumeStr = currentIssue?.volume || "Volume 01";
  const issueStr = currentIssue?.issue || "Issue 04";
  const periodStr = currentIssue?.period || "July–Aug 2026";
  const statusStr = currentIssue?.status || "In Processing";
  const frequencyStr = currentIssue?.publicationFrequency || "Bimonthly";

  return (
    <div className="w-full mb-3 animate-fade-in">
      <div className="relative bg-[#0b1340] text-white rounded-lg p-3 sm:px-4 md:px-5 md:py-3.5 overflow-hidden shadow-2xs flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-xl -z-10 transform translate-x-1/2 -translate-y-1/4"></div>

        <div className="relative z-10 flex-1 w-full flex flex-col items-center text-center md:items-start md:text-left">
          <span className="inline-block text-[#38b6ff] font-semibold tracking-wider text-[9px] uppercase mb-0.5">
            CURRENT ISSUE
          </span>
          <h1 className="text-[13px] sm:text-[14px] md:text-[16px] font-semibold leading-tight mb-1 text-white">
            {volumeStr}, {issueStr} ({periodStr}) – {statusStr}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-slate-300 text-[10px] font-normal">
            <BiCalendar className="text-xs" />
            <span>Publication Frequency: {frequencyStr}</span>
          </div>
        </div>

        <div className="relative z-10 shrink-0 w-[80px] sm:w-[95px] flex justify-center md:justify-end hover:scale-105 transition-transform duration-200">
          <img
            src={heroImg}
            alt="Current Issue Books"
            className="w-full h-auto object-contain drop-shadow-xs"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentIssueHero;
