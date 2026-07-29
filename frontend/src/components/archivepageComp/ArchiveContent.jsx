import React from 'react';
import { BiCalendar, BiBookOpen } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const ArchiveContent = () => {
  const navigate = useNavigate();

  // Dummy data representing the list of past issues from the backend
  const pastIssues = [
    {
      id: "vol-01-iss-03",
      volume: "Volume 01",
      issue: "Issue 03",
      date: "May–Jun 2026",
    },
    {
      id: "vol-01-iss-02",
      volume: "Volume 01",
      issue: "Issue 02",
      date: "Mar–Apr 2026",
    },
    {
      id: "vol-01-iss-01",
      volume: "Volume 01",
      issue: "Issue 01",
      date: "Jan–Feb 2026",
    }
  ];

  const handleIssueClick = (issueId) => {
    // Navigate to the dynamic route for the specific issue
    // For now, this will just log or attempt to navigate. In future, create /archive/:issueId route
    navigate(`/archive/${issueId}`);
  };

  return (
    <div className="w-full animate-fade-in">
      
      {/* Archive Header */}
      <div className="mb-5 md:mb-8">
        <h1 className="text-[22px] md:text-[28px] font-bold text-[#0b1340] mb-1.5 md:mb-2">Archive</h1>
        <p className="text-slate-600 text-[13.5px] md:text-[15px]">Browse and access all past issues of IJSSAHR.</p>
      </div>

      {/* Issues List */}
      <div className="w-full bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="flex flex-col">
          {pastIssues.map((issue, index) => (
            <div 
              key={issue.id}
              onClick={() => handleIssueClick(issue.id)}
              className={`group flex items-center justify-between p-4 md:p-6 bg-white cursor-pointer transition-all duration-300 hover:bg-[#f8fbff] ${index === pastIssues.length - 1 ? '' : 'border-b border-slate-100'}`}
            >
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0">
                
                {/* Icon Badge */}
                <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#f0f6ff] group-hover:bg-[#0d6efd] flex items-center justify-center text-[#0d6efd] group-hover:text-white transition-colors duration-300">
                  <BiBookOpen className="text-2xl md:text-[28px]" />
                </div>

                {/* Info */}
                <div className="min-w-0 pr-2">
                  <h3 className="text-[#0d6efd] group-hover:text-[#0b1340] font-bold text-[14px] sm:text-[15px] md:text-[17px] mb-1 md:mb-1.5 transition-colors duration-300 truncate">
                    {issue.volume}, {issue.issue}
                  </h3>
                  <div className="flex items-center gap-1.5 md:gap-2 text-slate-500 text-[12px] sm:text-[13px] md:text-[14px]">
                    <BiCalendar className="text-[14px] md:text-[16px] shrink-0" />
                    <span className="truncate">{issue.date}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-3 md:gap-4 shrink-0">
                <button className="hidden sm:block px-3 py-1.5 md:px-4 md:py-2 bg-white border border-slate-200 text-slate-600 text-[12px] md:text-[13px] font-semibold rounded hover:border-[#0d6efd] hover:text-[#0d6efd] transition-colors duration-300">
                  View Issue
                </button>
                <FiChevronRight className="text-slate-400 text-lg md:text-xl group-hover:text-[#0d6efd] transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchiveContent;
