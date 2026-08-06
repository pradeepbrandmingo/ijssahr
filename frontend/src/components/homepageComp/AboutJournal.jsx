import React from "react";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import {
  FiArrowRight,
  FiCalendar,
  FiBookOpen,
  FiMessageSquare,
  FiGlobe,
  FiClock,
} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";

const defaultData = {
  announcement: {
    text: "Invitation for Paper/Articles : Submission open for Current issue",
    link: "/paper-submission",
  },
  contactEmail: "editor.aliconpublications@gmail.com",
  aboutParagraphs: [
    "International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is a peer-reviewed, Bimonthly, open-access journal dedicated to promoting high-quality interdisciplinary research in the fields of social sciences, arts, and humanities. Backed by a strong Editorial Board and a robust, rapid peer-review system, IJSSAHR aims to foster academic exchange and contribute to the global dissemination of knowledge in these diverse fields.",
    "The journal seeks to bridge gaps between theory and practice by encouraging contributions that stimulate dialogue among scholars, researchers, and practitioners.",
    "All submitted manuscripts, including papers from symposia or special issues, undergo a rigorous peer-review process conducted by qualified experts appointed by the editorial board.",
    "Our mission is to foster intellectual dialogue, promote interdisciplinary collaboration, and support the growth of knowledge across diverse academic disciplines.",
    "We invite you to join our vibrant academic community and share your work with a global audience through IJSSAHR.",
  ],
  infoItems: [
    { label: "Starting Year", value: "2026" },
    { label: "Subject Area", value: "Social Sciences, Arts and Humanities" },
    { label: "Language", value: "English" },
    { label: "Open Access", value: "Yes" },
    { label: "Frequency", value: "Bimonthly" },
  ],
};

const AboutJournal = () => {
  // Fetch home page data (announcement text override, contact email, paragraphs)
  const { data: serverData } = useQuery({
    queryKey: ["home-page-public"],
    queryFn: async () => {
      const res = await API.get("/home-page");
      return res.data?.data || defaultData;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  // Fetch current issue data to automatically generate dynamic issue info (e.g. Volume 01, Issue 04, July–Aug 2026)
  const { data: currentIssue } = useQuery({
    queryKey: ["current-issue-announcement"],
    queryFn: async () => {
      const res = await API.get("/issues/current");
      return res.data?.data || null;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const announcement = serverData?.announcement || defaultData.announcement;
  const contactEmail = serverData?.contactEmail || defaultData.contactEmail;
  const paragraphs =
    serverData?.aboutParagraphs?.length > 0
      ? serverData.aboutParagraphs
      : defaultData.aboutParagraphs;

  // Build dynamic announcement text according to current issue
  const rawText = announcement?.text || "Invitation for Paper/Articles : Submission open for Current issue";
  const dynamicIssueDetails = currentIssue
    ? `, ${currentIssue.volume || ""}, ${currentIssue.issue || ""}, ${currentIssue.period || ""}`
    : "";
  
  const displayAnnouncementText = `${rawText}${dynamicIssueDetails}`;

  const infoIcons = [
    <FiCalendar className="text-blue-600 text-sm shrink-0" />,
    <FiBookOpen className="text-blue-600 text-sm shrink-0" />,
    <FiMessageSquare className="text-blue-600 text-sm shrink-0" />,
    <FiGlobe className="text-blue-600 text-sm shrink-0" />,
    <FiClock className="text-blue-600 text-sm shrink-0" />,
  ];

  const pStyle = "text-[12px] md:text-[13px] text-slate-700 leading-relaxed font-normal";

  return (
    <section className="w-full bg-white rounded-xl shadow-2xs border border-slate-200/80 p-4 md:p-5 mb-6">
      {/* Top Announcement Section */}
      {announcement?.text && (
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-2.5 mb-4 gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <HiOutlineSpeakerphone className="text-blue-600 text-lg shrink-0" />
            <h2 className="text-sm md:text-base font-bold text-slate-900">
              Latest Announcements
            </h2>
          </div>
          <a
            href={announcement.link || "/paper-submission"}
            className="flex items-center gap-1.5 text-xs sm:text-[12.5px] font-semibold text-blue-700 hover:text-blue-900 transition-colors group"
          >
            <span className="break-words">
              {displayAnnouncementText}
            </span>
            <FiArrowRight className="transform transition-transform group-hover:translate-x-1 shrink-0 text-xs text-blue-700" />
          </a>
        </div>
      )}

      {/* Contact Line & Journal DOI Prefix */}
      <div className="mb-4 space-y-2.5">
        {contactEmail && (
          <h3 className="text-xs md:text-[13px] font-bold text-slate-900 flex flex-wrap items-center gap-1 m-0">
            <span>Submit Manuscript to editor at :</span>
            <a
              href={`mailto:${contactEmail}`}
              className="text-blue-600 hover:underline break-all"
            >
              {contactEmail}
            </a>
          </h3>
        )}

        <p className="text-xs md:text-[13px] font-bold text-slate-900 m-0 pt-1">
          Journal DOI Prefix No:&nbsp;&nbsp;
          <span className="font-semibold text-slate-700 font-mono">
            {serverData?.journalDoiPrefix || "dx.doi.org/10.51505"}
          </span>
        </p>
      </div>

      {/* Paragraph 1 */}
      {paragraphs.length > 0 && (
        <p className={`${pStyle} mb-4`}>{paragraphs[0]}</p>
      )}

      {/* Info Card Grid */}
      <div className="bg-slate-50 rounded-lg p-3.5 mb-4 border border-slate-200/70">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {defaultData.infoItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="shrink-0">{infoIcons[idx % infoIcons.length]}</div>
              <p className="text-[11.5px] text-slate-900 font-semibold m-0 leading-tight">
                {item.label}:{" "}
                <span className="font-normal text-slate-600">{item.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Remaining Paragraphs & Scope of the Journal */}
      {paragraphs.length > 1 && (
        <div className="space-y-3 pt-1">
          <div className="border-b border-slate-200 pb-1.5 mb-2.5">
            <h3 className="text-sm md:text-base font-bold text-slate-900">
              Scope of the Journal
            </h3>
          </div>
          {paragraphs.slice(1).map((para, index) => (
            <p key={index} className={pStyle}>
              {para}
            </p>
          ))}
        </div>
      )}
    </section>
  );
};

export default AboutJournal;
