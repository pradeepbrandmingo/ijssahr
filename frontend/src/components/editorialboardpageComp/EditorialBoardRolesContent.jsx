import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FiUserCheck, FiCheckCircle, FiAward } from "react-icons/fi";
import API from "../../services/api";

const defaultRolesList = [
  {
    id: "editor-in-chief",
    roleTitle: "Editor-in-Chief",
    roleSubtitle:
      "Overall leadership, strategic direction, and final editorial decisions.",
    tag: "Executive Leadership",
    icon: <FiAward className="w-4 h-4 text-blue-600" />,
    borderColor: "border-blue-100",
    bgColor: "bg-blue-50/60",
    badgeBg: "bg-blue-100 text-blue-800",
    responsibilities: [
      {
        title: "Editorial Leadership",
        points: [
          "Set the editorial direction and scope of the journal.",
          "Oversee peer review to ensure fairness and academic quality.",
        ],
      },
      {
        title: "Decision Making",
        points: [
          "Make final decisions on manuscripts after peer review.",
          "Ensure ethical standards are followed in publication.",
        ],
      },
      {
        title: "Team Coordination",
        points: [
          "Lead and coordinate with Associate Editors and reviewers.",
          "Support team collaboration and maintain timelines for publication.",
        ],
      },
      {
        title: "Quality Control",
        points: [
          "Uphold the academic integrity of the journal.",
          "Monitor plagiarism checks, reviewer feedback, and formatting quality.",
        ],
      },
      {
        title: "Community Engagement",
        points: [
          "Encourage high-quality submissions and collaborations.",
          "Represent the journal at academic events (virtually or in person).",
        ],
      },
      {
        title: "Journal Growth",
        points: [
          "Recommend indexing, visibility strategies, and new special issues.",
          "Propose ideas for increasing the reach and reputation of the journal.",
        ],
      },
    ],
  },
  {
    id: "associate-editor",
    roleTitle: "Associate Editor",
    roleSubtitle:
      "Managing peer-review workflow and evaluating domain-specific submissions.",
    tag: "Editorial Management",
    icon: <FiUserCheck className="w-4 h-4 text-indigo-600" />,
    borderColor: "border-indigo-100",
    bgColor: "bg-indigo-50/60",
    badgeBg: "bg-indigo-100 text-indigo-800",
    responsibilities: [
      {
        title: "Manuscript Handling",
        points: [
          "Assist in managing the peer-review process for assigned manuscripts.",
          "Select suitable reviewers based on subject expertise.",
          "Monitor the progress of reviews and ensure timely completion.",
        ],
      },
      {
        title: "Editorial Assessment",
        points: [
          "Evaluate submitted articles for relevance, originality, and scientific merit.",
          "Recommend editorial decisions (accept, revise, reject) based on reviewer comments.",
        ],
      },
      {
        title: "Quality Assurance",
        points: [
          "Ensure manuscripts align with the journal's scope and editorial standards.",
          "Help maintain ethical publishing practices, including identifying plagiarism.",
        ],
      },
      {
        title: "Communication",
        points: [
          "Communicate professionally and promptly with authors, reviewers, and staff.",
          "Provide clear and constructive guidance to authors on how to improve manuscripts.",
        ],
      },
      {
        title: "Support Editorial Goals",
        points: [
          "Suggest topics for special issues or thematic editions.",
          "Promote the journal within your professional network.",
          "Encourage high-quality submissions from colleagues.",
        ],
      },
      {
        title: "Confidentiality & Ethics",
        points: [
          "Treat all submissions and related communications as confidential.",
          "Adhere to COPE and the journal's ethical guidelines.",
        ],
      },
    ],
  },
  {
    id: "reviewer",
    roleTitle: "Reviewer",
    roleSubtitle:
      "Providing rigorous, objective, and constructive expert peer evaluations.",
    tag: "Peer Review Expert",
    icon: <FiCheckCircle className="w-4 h-4 text-teal-600" />,
    borderColor: "border-teal-100",
    bgColor: "bg-teal-50/60",
    badgeBg: "bg-teal-100 text-teal-800",
    responsibilities: [
      {
        title: "Manuscript Evaluation",
        points: [
          "Critically assess originality, significance, methodology, and clarity.",
          "Provide objective, constructive, and balanced feedback.",
        ],
      },
      {
        title: "Timely Review",
        points: [
          "Complete reviews within the agreed-upon timeframe.",
          "Inform the editorial office promptly if unable to review.",
        ],
      },
      {
        title: "Confidentiality",
        points: [
          "Treat all manuscripts and correspondence as strictly confidential.",
          "Do not share, discuss, or use the content for personal advantage.",
        ],
      },
      {
        title: "Ethical Vigilance",
        points: [
          "Alert editors to suspected plagiarism, duplicate publication, or ethical issues.",
          "Declare any conflicts of interest that might affect objectivity.",
        ],
      },
      {
        title: "Professional Communication",
        points: [
          "Provide clear, respectful, and constructive comments for authors.",
          "Avoid personal criticism or offensive language.",
        ],
      },
      {
        title: "Support Journal Standards",
        points: [
          "Help uphold the quality and reputation of the journal through thorough reviews.",
          "Offer suggestions to improve the journal's content and processes.",
        ],
      },
    ],
  },
];

const EditorialBoardRolesContent = () => {
  const { data: serverData } = useQuery({
    queryKey: ["editorial-board-public"],
    queryFn: async () => {
      const res = await API.get("/editorial-board");
      return res.data?.data || {};
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const rolesPage = serverData?.rolesPage || {};
  const headerTitle =
    rolesPage.headerTitle || "Editorial Board Roles & Responsibilities";
  const headerSubtitle =
    rolesPage.headerSubtitle ||
    "Detailed guidelines defining duties for Editors-in-Chief, Associate Editors, and Peer Reviewers.";

  const activeRolesList =
    rolesPage.rolesList?.length > 0 ? rolesPage.rolesList : defaultRolesList;

  const getRoleStyle = (index) => {
    switch (index % 3) {
      case 0:
        return {
          icon: <FiAward className="w-4 h-4 text-blue-600" />,
          borderColor: "border-blue-100",
          bgColor: "bg-blue-50/60",
          badgeBg: "bg-blue-100 text-blue-800",
        };
      case 1:
        return {
          icon: <FiUserCheck className="w-4 h-4 text-indigo-600" />,
          borderColor: "border-indigo-100",
          bgColor: "bg-indigo-50/60",
          badgeBg: "bg-indigo-100 text-indigo-800",
        };
      default:
        return {
          icon: <FiCheckCircle className="w-4 h-4 text-teal-600" />,
          borderColor: "border-teal-100",
          bgColor: "bg-teal-50/60",
          badgeBg: "bg-teal-100 text-teal-800",
        };
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden space-y-3">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-gradient-to-r from-blue-600 to-slate-900 rounded-lg p-3.5 sm:p-4 text-white shadow-2xs"
      >
        <h2 className="text-base sm:text-lg font-bold mb-0.5 text-white">
          {headerTitle}
        </h2>
        <p className="text-blue-100 text-[11.5px] sm:text-xs max-w-2xl leading-relaxed">
          {headerSubtitle}
        </p>
      </motion.div>

      {/* Roles Cards */}
      <div className="space-y-3">
        {activeRolesList.map((role, rIdx) => {
          const style = getRoleStyle(rIdx);
          return (
            <motion.div
              key={role._id || role.id || rIdx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25 }}
              className={`bg-white border ${style.borderColor} rounded-lg p-3.5 sm:p-4 shadow-2xs space-y-2.5`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full ${style.bgColor} flex items-center justify-center shrink-0`}
                  >
                    {style.icon}
                  </div>
                  <div>
                    <h3 className="text-[13.5px] font-semibold text-slate-900 m-0 leading-tight">
                      {role.roleTitle}
                    </h3>
                    <p className="text-[11.5px] font-normal text-slate-500 m-0 leading-tight mt-0.5">
                      {role.roleSubtitle}
                    </p>
                  </div>
                </div>
                {role.tag && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.badgeBg}`}
                  >
                    {role.tag}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-0.5">
                {role.responsibilities?.map((resp, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-md space-y-0.5"
                  >
                    <h4 className="text-[12px] font-semibold text-slate-900">
                      {resp.title}
                    </h4>
                    <ul className="space-y-0.5 text-[11.5px] font-normal text-slate-600 list-disc list-inside leading-snug">
                      {resp.points?.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default EditorialBoardRolesContent;
