import React from 'react';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { FiArrowRight, FiCalendar, FiBookOpen, FiMessageSquare, FiGlobe, FiClock } from 'react-icons/fi';

const AboutJournal = () => {
  // Dummy data representing future backend response
  const dummyData = {
    announcement: {
      text: "Invitation for Paper/Articles: Submission",
      link: "#"
    },
    contactEmail: "info@ijssahr.com",
    paragraphs: [
      "International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is a peer-reviewed, Bimonthly, open-access journal dedicated to promoting high-quality interdisciplinary research in the fields of social sciences, arts, and humanities. Backed by a strong Editorial Board and a robust, rapid peer-review system, IJSSAHR aims to foster academic exchange and contribute to the global dissemination of knowledge in these diverse fields.",
      "The journal seeks to bridge gaps between theory and practice by encouraging contributions that stimulate dialogue among scholars, researchers, and practitioners. The journal focuses on interdisciplinary research in the fields of Social Sciences, Arts and Humanities, including but not limited to sociology, economics, political science, history, literature, culture, and related areas.",
      "All submitted manuscripts, including papers from symposia or special issues, undergo a rigorous peer-review process conducted by qualified experts appointed by the editorial board. Submissions must present original research work and should not be under review or consideration by any other journal at the time of submission.",
      "Our mission is to foster intellectual dialogue, promote interdisciplinary collaboration, and support the growth of knowledge across diverse academic disciplines. IJSSAHR aims to serve as a platform where scholars, researchers, educators, and practitioners can stay updated on emerging academic trends and actively contribute to meaningful conversations within their fields.",
      "We invite you to join our vibrant academic community and share your work with a global audience through IJSSAHR."
    ],
    infoItems: [
      { id: 1, icon: <FiCalendar className="text-[var(--primary)] text-[18px] shrink-0 mt-0.5" />, label: "Starting Year", value: "2026" },
      { id: 2, icon: <FiBookOpen className="text-[var(--primary)] text-[18px] shrink-0 mt-0.5" />, label: "Subject Area", value: "Social Sciences, Arts and Humanities" },
      { id: 3, icon: <FiMessageSquare className="text-[var(--primary)] text-[18px] shrink-0 mt-0.5" />, label: "Language", value: "English" },
      { id: 4, icon: <FiGlobe className="text-[var(--primary)] text-[18px] shrink-0 mt-0.5" />, label: "Open Access", value: "Yes" },
      { id: 5, icon: <FiClock className="text-[var(--primary)] text-[18px] shrink-0 mt-0.5" />, label: "Frequency", value: "Bimonthly" }
    ]
  };

  const pStyle = "text-[14px] md:text-[15px] text-[var(--text)] leading-[1.7]";

  return (
    <section className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6 lg:p-8 mb-10">
      
      {/* Top Header Section */}
      {dummyData.announcement && (
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-3 mb-5 gap-3">
          <div className="flex items-center gap-2.5">
            <HiOutlineSpeakerphone className="text-[var(--primary)] text-xl shrink-0" />
            <h2 className="text-base md:text-lg font-bold text-[var(--heading)]">
              Latest Announcements
            </h2>
          </div>
          <a href={dummyData.announcement.link} className="flex items-center gap-1.5 text-[13px] md:text-sm font-semibold text-[var(--primary)] hover:text-blue-800 transition-colors group">
            <span className="break-words line-clamp-2 md:line-clamp-1">{dummyData.announcement.text}</span>
            <FiArrowRight className="transform transition-transform group-hover:translate-x-1 shrink-0" />
          </a>
        </div>
      )}

      {/* Contact Line */}
      {dummyData.contactEmail && (
        <div className="mb-5">
          <h3 className="text-[14px] md:text-[15px] font-bold text-[var(--heading)] flex flex-wrap items-center gap-1">
            <span>Submit Manuscript to editor at :</span>
            <a href={`mailto:${dummyData.contactEmail}`} className="text-[var(--primary)] hover:underline break-all">
              {dummyData.contactEmail}
            </a>
          </h3>
        </div>
      )}

      {/* Paragraph 1 */}
      {dummyData.paragraphs.length > 0 && (
        <p className={`${pStyle} mb-6`}>
          {dummyData.paragraphs[0]}
        </p>
      )}

      {/* Info Card Grid */}
      {dummyData.infoItems && dummyData.infoItems.length > 0 && (
        <div className="bg-slate-50 rounded-xl p-5 md:p-6 mb-6 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            {dummyData.infoItems.map((item) => (
              <div key={item.id} className="flex items-start md:items-center gap-2.5">
                <div className="mt-0.5 md:mt-0 shrink-0">
                  {item.icon}
                </div>
                <p className="text-[13px] md:text-[14px] text-[var(--heading)] font-semibold m-0 leading-snug md:leading-normal">
                  {item.label}: <span className="font-normal text-[var(--text)]">{item.value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remaining Paragraphs */}
      {dummyData.paragraphs.length > 1 && (
        <div className="space-y-4">
          {dummyData.paragraphs.slice(1).map((para, index) => (
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
