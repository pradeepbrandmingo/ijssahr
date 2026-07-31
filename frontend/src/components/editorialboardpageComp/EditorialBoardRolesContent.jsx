import React from 'react';
import { motion } from 'framer-motion';
import { FiUserCheck, FiUsers, FiCheckCircle, FiShield, FiTrendingUp, FiTarget, FiMessageSquare, FiBookOpen, FiAward, FiCompass } from 'react-icons/fi';

const rolesData = [
  {
    id: 'editor-in-chief',
    roleTitle: "Editor-in-Chief",
    roleSubtitle: "Overall leadership, strategic direction, and final editorial decisions.",
    tag: "Executive Leadership",
    icon: <FiAward className="w-6 h-6 text-blue-600" />,
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-blue-50/60",
    borderColor: "border-blue-100",
    badgeBg: "bg-blue-100 text-blue-800",
    responsibilities: [
      { id: 1, title: "Editorial Leadership", points: ["Set the editorial direction and scope of the journal.", "Oversee peer review to ensure fairness and academic quality."] },
      { id: 2, title: "Decision Making", points: ["Make final decisions on manuscripts after peer review.", "Ensure ethical standards are followed in publication."] },
      { id: 3, title: "Team Coordination", points: ["Lead and coordinate with Associate Editors and reviewers.", "Support team collaboration and maintain timelines for publication."] },
      { id: 4, title: "Quality Control", points: ["Uphold the academic integrity of the journal.", "Monitor plagiarism checks, reviewer feedback, and formatting quality."] },
      { id: 5, title: "Community Engagement", points: ["Encourage high-quality submissions and collaborations.", "Represent the journal at academic events (virtually or in person)."] },
      { id: 6, title: "Journal Growth", points: ["Recommend indexing, visibility strategies, and new special issues.", "Propose ideas for increasing the reach and reputation of the journal."] },
    ]
  },
  {
    id: 'associate-editor',
    roleTitle: "Associate Editor",
    roleSubtitle: "Managing peer-review workflow and evaluating domain-specific submissions.",
    tag: "Editorial Management",
    icon: <FiUserCheck className="w-6 h-6 text-indigo-600" />,
    color: "from-indigo-600 to-purple-700",
    bgColor: "bg-indigo-50/60",
    borderColor: "border-indigo-100",
    badgeBg: "bg-indigo-100 text-indigo-800",
    responsibilities: [
      { id: 1, title: "Manuscript Handling", points: ["Assist in managing the peer-review process for assigned manuscripts.", "Select suitable reviewers based on subject expertise.", "Monitor the progress of reviews and ensure timely completion."] },
      { id: 2, title: "Editorial Assessment", points: ["Evaluate submitted articles for relevance, originality, and scientific merit.", "Recommend editorial decisions (accept, revise, reject) based on reviewer comments."] },
      { id: 3, title: "Quality Assurance", points: ["Ensure manuscripts align with the journal's scope and editorial standards.", "Help maintain ethical publishing practices, including identifying plagiarism."] },
      { id: 4, title: "Communication", points: ["Communicate professionally and promptly with authors, reviewers, and staff.", "Provide clear and constructive guidance to authors on how to improve manuscripts."] },
      { id: 5, title: "Support Editorial Goals", points: ["Suggest topics for special issues or thematic editions.", "Promote the journal within your professional network.", "Encourage high-quality submissions from colleagues."] },
      { id: 6, title: "Confidentiality & Ethics", points: ["Treat all submissions and related communications as confidential.", "Adhere to COPE and the journal's ethical guidelines."] },
    ]
  },
  {
    id: 'reviewer',
    roleTitle: "Reviewer",
    roleSubtitle: "Providing rigorous, objective, and constructive expert peer evaluations.",
    tag: "Peer Review Expert",
    icon: <FiCheckCircle className="w-6 h-6 text-teal-600" />,
    color: "from-teal-600 to-emerald-700",
    bgColor: "bg-teal-50/60",
    borderColor: "border-teal-100",
    badgeBg: "bg-teal-100 text-teal-800",
    responsibilities: [
      { id: 1, title: "Manuscript Evaluation", points: ["Critically assess originality, significance, methodology, and clarity of submitted manuscripts.", "Provide objective, constructive, and balanced feedback to help authors improve their work."] },
      { id: 2, title: "Timely Review", points: ["Complete reviews within the agreed-upon timeframe.", "Inform the editorial office promptly if unable to review or if more time is needed."] },
      { id: 3, title: "Confidentiality", points: ["Treat all manuscripts and correspondence as strictly confidential.", "Do not share, discuss, or use the content for personal advantage."] },
      { id: 4, title: "Ethical Vigilance", points: ["Alert editors to suspected plagiarism, duplicate publication, or ethical issues.", "Declare any conflicts of interest that might affect objectivity."] },
      { id: 5, title: "Professional Communication", points: ["Provide clear, respectful, and constructive comments for authors.", "Avoid personal criticism or offensive language."] },
      { id: 6, title: "Support Journal Standards", points: ["Help uphold the quality and reputation of the journal through thorough reviews.", "Offer suggestions to improve the journal's content and processes if applicable."] },
    ]
  }
];

const EditorialBoardRolesContent = () => {
  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Top Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-5 sm:p-6 text-white mb-6 shadow-md relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-36 h-36 bg-white opacity-10 rounded-full blur-xl pointer-events-none"></div>
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-blue-100 mb-2">
            Editorial Guidelines
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-1.5 text-white !text-white">
            Roles & Responsibilities
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-2xl">
            Detailed responsibilities, expectations, and ethical standards for members of the IJSSAHR Editorial Team.
          </p>
        </div>
      </motion.div>

      {/* Role Sections Container */}
      <div className="space-y-6">
        {rolesData.map((role, roleIndex) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: roleIndex * 0.1 }}
            key={role.id}
            className={`bg-white border ${role.borderColor} rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow`}
          >
            {/* Role Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-11 h-11 rounded-xl ${role.bgColor} flex items-center justify-center shrink-0`}>
                  {role.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{role.roleTitle}</h3>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${role.badgeBg} shrink-0`}>
                      {role.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{role.roleSubtitle}</p>
                </div>
              </div>
            </div>

            {/* Key Responsibilities Grid */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3.5">
                Key Responsibilities
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {role.responsibilities.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-gray-50/70 border border-gray-100 rounded-lg p-3.5 hover:bg-white hover:border-gray-200 transition-all hover:shadow-sm"
                  >
                    <h5 className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold shrink-0">
                        {item.id}
                      </span>
                      <span className="truncate">{item.title}</span>
                    </h5>
                    <ul className="space-y-1 text-xs text-gray-600 leading-relaxed pl-1">
                      {item.points.map((pt, ptIdx) => (
                        <li key={ptIdx} className="flex items-start gap-1.5">
                          <span className="text-blue-500 mt-1 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EditorialBoardRolesContent;
