import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  FiUsers,
  FiType,
  FiTv,
  FiBookOpen,
  FiImage,
  FiShield,
  FiStar,
  FiGlobe,
  FiUserCheck,
  FiLayers,
} from 'react-icons/fi';
import { MdOutlineAccountBalance } from 'react-icons/md';
import API from '../../services/api';

const defaultIcons = [
  <FiUsers className="w-5 h-5" />,
  <FiType className="w-5 h-5" />,
  <MdOutlineAccountBalance className="w-5 h-5" />,
  <FiTv className="w-5 h-5" />,
  <FiBookOpen className="w-5 h-5" />,
  <FiImage className="w-5 h-5" />,
  <FiShield className="w-5 h-5" />,
  <FiLayers className="w-5 h-5" />,
];

const featureIcons = [
  <FiGlobe className="w-5 h-5" />,
  <FiUsers className="w-5 h-5" />,
  <FiUserCheck className="w-5 h-5" />,
  <FiShield className="w-5 h-5" />,
  <FiStar className="w-5 h-5" />,
];

const defaultAimScopeData = {
  header: {
    title: "Aims and Scope",
    subtitle: "Discover the multidisciplinary fields, key journal features, and academic mission of IJSSAHR.",
  },
  introduction:
    "The International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is a peer-reviewed, open-access journal committed to advancing knowledge and understanding in the fields of Social Science, Arts and Humanities. The journal aims to provide a platform for scholars, researchers, and practitioners to share innovative ideas, critical perspectives, and original research findings that contribute to academic and societal development.",
  disciplinesSection: {
    title:
      "IJSSAHR welcomes high-quality submissions across a wide range of disciplines including, but not limited to:",
    disciplines: [
      "Sociology, Psychology, and Anthropology",
      "Linguistics, Literature, and Language Studies",
      "Political Science, International Relations, and Public Administration",
      "Education, Media, and Communication Studies",
      "History, Philosophy, and Cultural Studies",
      "Fine Arts, Performing Arts, and Visual Arts",
      "Gender Studies, Ethics, and Human Rights",
    ],
  },
  interdisciplinaryHighlight:
    "The journal encourages interdisciplinary and cross-cultural studies that explore the intersection of Social Science, Arts, and human experience. All submissions undergo a rigorous peer-review process to ensure scholarly excellence and relevance.",
  keyFeaturesSection: {
    title: "Key features of IJSSAHR:",
    features: [
      "Free online access and global visibility for all published articles",
      "Fast and fair peer-review process",
      "Support for early-career researchers",
      "A strong commitment to academic integrity and originality",
    ],
    closingStatement:
      "By fostering academic exchange and promoting diverse voices, IJSSAHR aspires to be a leading international platform for critical thought, research innovation, and intellectual collaboration in the social sciences, arts, and humanities.",
  },
};

const AimScopeContent = () => {
  const { data: serverData } = useQuery({
    queryKey: ["aim-scope-public"],
    queryFn: async () => {
      const res = await API.get("/aim-scope");
      return res.data?.data || defaultAimScopeData;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const aimScopeData = serverData || defaultAimScopeData;

  return (
    <div className="w-full max-w-full overflow-hidden space-y-4">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-1"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5">
          {aimScopeData.header?.title || "Aims and Scope"}
        </h2>
        <div className="w-10 h-0.5 bg-[#004bdd] rounded-full"></div>
      </motion.div>

      {/* Main Container Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 lg:p-6 shadow-xs space-y-5"
      >
        {/* Introduction Paragraph */}
        {aimScopeData.introduction && (
          <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
            {aimScopeData.introduction}
          </p>
        )}

        {/* Disciplines Section Box */}
        {aimScopeData.disciplinesSection?.disciplines?.length > 0 && (
          <div className="bg-[#f8fafc] border border-gray-100/80 rounded-lg p-3.5 sm:p-4 space-y-3">
            <h3 className="text-xs font-semibold text-gray-800 leading-relaxed">
              {aimScopeData.disciplinesSection.title ||
                "IJSSAHR welcomes high-quality submissions across a wide range of disciplines including, but not limited to:"}
            </h3>

            {/* Disciplines Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {aimScopeData.disciplinesSection.disciplines.map((title, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  key={index}
                  className="bg-white border border-gray-100 rounded-lg p-2.5 flex items-center gap-2.5 shadow-2xs hover:shadow-xs hover:border-blue-100 transition-all group min-w-0"
                >
                  <div className="w-8 h-8 rounded-full bg-[#f0f5ff] text-[#004bdd] group-hover:bg-[#004bdd] group-hover:text-white transition-colors flex items-center justify-center shrink-0 text-xs">
                    {defaultIcons[index % defaultIcons.length]}
                  </div>
                  <p className="text-xs font-normal text-gray-700 group-hover:text-[#004bdd] transition-colors leading-snug flex-1 min-w-0">
                    {title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Interdisciplinary Highlight Box */}
        {aimScopeData.interdisciplinaryHighlight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#f0f5ff] border border-blue-100/70 rounded-lg p-3 sm:p-3.5 flex items-start gap-2.5"
          >
            <div className="w-7 h-7 rounded-full bg-[#004bdd] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <FiStar className="w-3.5 h-3.5 fill-white" />
            </div>
            <p className="text-xs font-normal text-gray-700 leading-relaxed flex-1 min-w-0 pt-0.5">
              {aimScopeData.interdisciplinaryHighlight}
            </p>
          </motion.div>
        )}

        {/* Key Features Section */}
        <div className="space-y-4 pt-1">
          {aimScopeData.keyFeaturesSection?.title && (
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
              {aimScopeData.keyFeaturesSection.title}
            </h3>
          )}

          {/* Key Features Grid */}
          {aimScopeData.keyFeaturesSection?.features?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {aimScopeData.keyFeaturesSection.features.map((featureText, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  key={index}
                  className="bg-[#f8fafc] border border-gray-100 rounded-lg p-3 flex flex-col items-center text-center space-y-2 hover:bg-white hover:shadow-xs hover:border-blue-100 transition-all group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#f0f5ff] text-[#004bdd] group-hover:bg-[#004bdd] group-hover:text-white transition-colors flex items-center justify-center shrink-0 text-xs">
                    {featureIcons[index % featureIcons.length]}
                  </div>
                  <p className="text-xs font-normal text-gray-600 group-hover:text-gray-800 transition-colors leading-relaxed">
                    {featureText}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Closing Statement */}
          {aimScopeData.keyFeaturesSection?.closingStatement && (
            <p className="text-xs text-gray-500 font-normal leading-relaxed pt-1">
              {aimScopeData.keyFeaturesSection.closingStatement}
            </p>
          )}

          {/* Creative Commons License Badge */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2 pt-3 border-t border-gray-100 text-right">
            <span className="text-[11px] text-gray-400 font-normal">
              Licensed under Creative Commons{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/3.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#004bdd] font-medium hover:underline"
              >
                Attribution 3.0
              </a>
            </span>
            <div className="flex items-center gap-1 bg-gray-100/80 px-2 py-0.5 rounded text-[10px] font-semibold text-gray-500">
              <span>CC</span>
              <span>BY</span>
              <span>SA</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AimScopeContent;
