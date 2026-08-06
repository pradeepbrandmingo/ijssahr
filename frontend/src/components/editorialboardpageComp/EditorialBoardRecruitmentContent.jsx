import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  FiCheckCircle,
  FiDownload,
  FiMail,
  FiClock,
  FiGlobe,
  FiMonitor,
  FiGift,
  FiAward,
  FiBookOpen,
  FiTrendingUp,
  FiStar,
  FiFileText,
  FiUsers,
} from "react-icons/fi";
import API from "../../services/api";
import { formatFileUrl } from "../../utils/fileUrl";

const defaultRecruitmentData = {
  headerTitle: "Recruitment for Reviewers",
  headerSubtitle:
    "The editorial board of IJSSAHR welcomes you to join us as a reviewer.",
  jobStatus: "Part time",
  workingLanguage: "English",
  workingStyle: "Internet-based",
  paymentNotice: "Voluntary job, no payment",
  description: "Reviewers' names will be listed on the journal's webpage.",
  applicationFormLink: "#",
  applicationEmail: "editor.aliconpublications@gmail.com",
  benefitsTitle: "Reviewer Benefits",
  benefitsDescription:
    "At IJSSAHR, we highly value the time, expertise, and dedication of our reviewers.",
  benefitsList: [
    {
      title: "Recognition Certificate",
      description:
        "Official certificate acknowledging contribution to peer-review.",
    },
    {
      title: "Reviewer Acknowledgment",
      description: "Names listed on journal website annually.",
    },
  ],
};

const EditorialBoardRecruitmentContent = () => {
  const { data: serverData } = useQuery({
    queryKey: ["editorial-board-public"],
    queryFn: async () => {
      const res = await API.get("/editorial-board");
      return res.data?.data || {};
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const rPage = serverData?.recruitmentPage || defaultRecruitmentData;

  const keyDetails = [
    {
      id: 1,
      label: "Status",
      value: rPage.jobStatus || "Part time",
      icon: <FiClock className="w-3.5 h-3.5" />,
    },
    {
      id: 2,
      label: "Working language",
      value: rPage.workingLanguage || "English",
      icon: <FiGlobe className="w-3.5 h-3.5" />,
    },
    {
      id: 3,
      label: "Working style",
      value: rPage.workingStyle || "Internet-based",
      icon: <FiMonitor className="w-3.5 h-3.5" />,
    },
    {
      id: 4,
      label: "Payment",
      value: rPage.paymentNotice || "Voluntary job, no payment",
      icon: <FiGift className="w-3.5 h-3.5" />,
    },
  ];

  const defaultBenefits = [
    {
      id: 1,
      title: "Recognition Certificate",
      description:
        "Reviewers receive an official certificate acknowledging their valuable contribution.",
      icon: <FiAward />,
    },
    {
      id: 2,
      title: "Reviewer Acknowledgment",
      description:
        "Names of active reviewers are listed on our website annually.",
      icon: <FiStar />,
    },
    {
      id: 3,
      title: "Priority in Publication",
      description:
        "Reviewers receive prioritized processing for their own submissions.",
      icon: <FiTrendingUp />,
    },
    {
      id: 4,
      title: "Discount on Publication Fees",
      description:
        "Active reviewers are eligible for a 50% discount policy.",
      icon: <FiFileText />,
    },
    {
      id: 5,
      title: "Access to New Research",
      description: "Be among the first to read cutting-edge research.",
      icon: <FiBookOpen />,
    },
    {
      id: 6,
      title: "Enhance Academic Profile",
      description: "Adds to professional credentials and academic CV.",
      icon: <FiCheckCircle />,
    },
    {
      id: 7,
      title: "Editorial Board Consideration",
      description: "Consistent reviewers may join the editorial board.",
      icon: <FiUsers />,
    },
  ];

  return (
    <div className="w-full max-w-full overflow-hidden space-y-3">
      {/* Compact Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-3.5 sm:p-4 text-white shadow-2xs relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-base sm:text-lg font-bold mb-0.5 text-white">
            {rPage.headerTitle || "Recruitment for Reviewers"}
          </h2>
          <p className="text-blue-100 text-[11.5px] sm:text-xs max-w-2xl leading-relaxed">
            {rPage.headerSubtitle ||
              "The editorial board of IJSSAHR welcomes you to join us as a reviewer."}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column: Details & How to Apply */}
        <div className="lg:col-span-5 space-y-3">
          {/* Key Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
            className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs space-y-2.5"
          >
            <h3 className="text-[13px] font-bold text-slate-900 border-b border-slate-100 pb-1.5">
              Key Information
            </h3>
            <div className="space-y-2">
              {keyDetails.map((detail) => (
                <div key={detail.id} className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    {detail.icon}
                  </div>
                  <div className="min-w-0 flex-1 leading-tight">
                    <span className="text-[11px] text-slate-500 font-medium mr-1.5">
                      {detail.label}:
                    </span>
                    <span className="text-slate-900 text-[11.5px] font-semibold truncate">
                      {detail.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 bg-slate-50 rounded-md border border-slate-200/80">
              <p className="text-[11px] text-slate-600 italic m-0 leading-tight">
                "{rPage.description || "Reviewers' names will be listed on the journal's webpage."}"
              </p>
            </div>
          </motion.div>

          {/* How to Apply Card */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
            className="bg-blue-50/70 border border-blue-100 rounded-lg p-3.5 space-y-2.5 relative overflow-hidden"
          >
            <h3 className="text-[13px] font-bold text-blue-950">How to Apply</h3>
            <div className="space-y-2 relative z-10">
              <div className="p-2.5 bg-white rounded-md border border-slate-200 space-y-0.5 min-w-0">
                <div className="flex items-center gap-1.5">
                  <FiDownload className="text-blue-600 text-xs shrink-0" />
                  <p className="text-slate-800 text-[11.5px] font-medium m-0">
                    1. Complete application form
                  </p>
                </div>
                <a
                  href={formatFileUrl(rPage.applicationFormLink || "#")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11.5px] font-semibold text-blue-600 hover:underline break-all block pl-5"
                >
                  Download Application Form
                </a>
              </div>

              <div className="p-2.5 bg-white rounded-md border border-slate-200 space-y-0.5 min-w-0">
                <div className="flex items-center gap-1.5">
                  <FiMail className="text-blue-600 text-xs shrink-0" />
                  <p className="text-slate-800 text-[11.5px] font-medium m-0">
                    2. Send application to:
                  </p>
                </div>
                <a
                  href={`mailto:${rPage.applicationEmail || "editor.aliconpublications@gmail.com"}`}
                  className="text-[11.5px] font-semibold text-blue-600 hover:underline break-all block pl-5"
                >
                  {rPage.applicationEmail || "editor.aliconpublications@gmail.com"}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Reviewer Benefits */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
            className="bg-white border border-slate-200 rounded-lg p-3.5 sm:p-4 shadow-2xs space-y-2.5"
          >
            <h3 className="text-[13.5px] font-bold text-slate-900 border-b border-slate-100 pb-1.5">
              {rPage.benefitsTitle || "Reviewer Benefits"}
            </h3>
            <p className="text-[11.5px] font-normal text-slate-600 leading-relaxed">
              {rPage.benefitsDescription ||
                "At IJSSAHR, we highly value the time, expertise, and dedication of our reviewers."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
              {(rPage.benefitsList?.length > 0 ? rPage.benefitsList : defaultBenefits).map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-md hover:border-blue-200 transition-colors space-y-0.5"
                >
                  <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold">
                    {item.icon || <FiAward className="shrink-0 text-xs" />}
                    <h4 className="text-[12px] font-semibold text-slate-900">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[11.5px] font-normal text-slate-600 leading-snug">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditorialBoardRecruitmentContent;
