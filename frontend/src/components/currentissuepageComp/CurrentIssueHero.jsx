import React from 'react';
import { BiCalendar } from 'react-icons/bi';
// Import hero image assuming it's the book image from the screenshot
import heroImg from '../../assets/hero.png';

const CurrentIssueHero = () => {
  return (
    <div className="w-full mb-6 animate-fade-in">
      <div className="relative bg-[#0b1340] text-white rounded-2xl p-4 sm:p-5 md:p-6 lg:px-8 lg:py-7 overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6">

        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/4"></div>

        <div className="relative z-10 flex-1 w-full flex flex-col items-center text-center md:items-start md:text-left">
          <span className="inline-block text-[#38b6ff] md:text-blue-200/90 font-bold tracking-wider text-[11px] md:text-xs uppercase mb-1.5 md:mb-3">
            CURRENT ISSUE
          </span>
          <h1 className="text-[17px] sm:text-[19px] md:text-[24px] lg:text-[28px] font-bold leading-[1.3] mb-2.5 md:mb-4 text-white">
            Volume 01, Issue 04 (July–Aug 2026) <br className="hidden md:block" />
            <span className="md:hidden"> </span>– In Processing
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-1.5 md:gap-2.5 text-slate-200 text-[12px] md:text-[14px] font-medium">
            <BiCalendar className="text-base md:text-xl" />
            <span>Publication Frequency: Bimonthly</span>
          </div>
        </div>

        <div className="relative z-10 shrink-0 w-[160px] sm:w-[180px] md:w-[140px] lg:w-[170px] flex justify-center md:justify-end mt-1 md:mt-0 hover:scale-105 transition-transform duration-500">
          <img
            src={heroImg}
            alt="Current Issue Books"
            className="w-full h-auto object-contain drop-shadow-lg"
            onError={(e) => {
              // Fallback if hero.png is not the book image
              e.target.style.display = 'none';
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default CurrentIssueHero;
