import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiType, FiTv, FiBookOpen, FiImage, FiShield, FiStar, FiGlobe, FiUserCheck } from 'react-icons/fi';
import { MdOutlineAccountBalance } from 'react-icons/md';

const aimScopeData = {
  header: {
    title: "Aims and Scope",
    subtitle: "Discover the multidisciplinary fields, key journal features, and academic mission of IJSSAHR."
  },
  introduction: "The International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is a peer-reviewed, open-access journal committed to advancing knowledge and understanding in the fields of Social Science, Arts and Humanities. The journal aims to provide a platform for scholars, researchers, and practitioners to share innovative ideas, critical perspectives, and original research findings that contribute to academic and societal development.",
  disciplinesSection: {
    title: "IJSSAHR welcomes high-quality submissions across a wide range of disciplines including, but not limited to:",
    disciplines: [
      { id: 1, title: "Sociology, Psychology, and Anthropology", icon: <FiUsers className="w-5 h-5" /> },
      { id: 2, title: "Linguistics, Literature, and Language Studies", icon: <FiType className="w-5 h-5" /> },
      { id: 3, title: "Political Science, International Relations, and Public Administration", icon: <MdOutlineAccountBalance className="w-5 h-5" /> },
      { id: 4, title: "Education, Media, and Communication Studies", icon: <FiTv className="w-5 h-5" /> },
      { id: 5, title: "History, Philosophy, and Cultural Studies", icon: <FiBookOpen className="w-5 h-5" /> },
      { id: 6, title: "Fine Arts, Performing Arts, and Visual Arts", icon: <FiImage className="w-5 h-5" /> },
      { id: 7, title: "Gender Studies, Ethics, and Human Rights", icon: <FiShield className="w-5 h-5" /> },
    ]
  },
  interdisciplinaryHighlight: "The journal encourages interdisciplinary and cross-cultural studies that explore the intersection of Social Science, Arts, and human experience. All submissions undergo a rigorous peer-review process to ensure scholarly excellence and relevance.",
  keyFeaturesSection: {
    title: "Key features of IJSSAHR:",
    features: [
      { id: 1, text: "Free online access and global visibility for all published articles", icon: <FiGlobe className="w-5 h-5" /> },
      { id: 2, text: "Fast and fair peer-review process", icon: <FiUsers className="w-5 h-5" /> },
      { id: 3, text: "Support for early-career researchers", icon: <FiUserCheck className="w-5 h-5" /> },
      { id: 4, text: "A strong commitment to academic integrity and originality", icon: <FiShield className="w-5 h-5" /> }
    ],
    closingStatement: "By fostering academic exchange and promoting diverse voices, IJSSAHR aspires to be a leading international platform for critical thought, research innovation, and intellectual collaboration in the social sciences, arts, and humanities."
  }
};

const AimScopeContent = () => {
  return (
    <div className="w-full max-w-full overflow-hidden space-y-6">
      {/* Top Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-2"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {aimScopeData.header.title}
        </h2>
        <div className="w-12 h-1 bg-[#004bdd] rounded-full"></div>
      </motion.div>

      {/* Main Container Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6 sm:space-y-8"
      >
        {/* Introduction Paragraph */}
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          The <strong className="text-[#004bdd] font-bold">International Journal of Social Science, Arts and Humanities Research (IJSSAHR)</strong> is a peer-reviewed, open-access journal committed to advancing knowledge and understanding in the fields of Social Science, Arts and Humanities. The journal aims to provide a platform for scholars, researchers, and practitioners to share innovative ideas, critical perspectives, and original research findings that contribute to academic and societal development.
        </p>

        {/* Disciplines Section Box */}
        <div className="bg-[#f8fafc] border border-gray-100 rounded-xl p-4 sm:p-6 space-y-4">
          <h3 className="text-xs sm:text-sm font-bold text-gray-800 leading-relaxed">
            {aimScopeData.disciplinesSection.title}
          </h3>

          {/* Disciplines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {aimScopeData.disciplinesSection.disciplines.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                key={item.id}
                className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-center gap-3 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group min-w-0"
              >
                <div className="w-10 h-10 rounded-full bg-[#f0f5ff] text-[#004bdd] group-hover:bg-[#004bdd] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#004bdd] transition-colors leading-snug flex-1 min-w-0">
                  {item.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interdisciplinary Highlight Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#f0f5ff] border border-blue-100 rounded-xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4"
        >
          <div className="w-9 h-9 rounded-full bg-[#004bdd] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <FiStar className="w-5 h-5 fill-white" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed flex-1 min-w-0 pt-0.5">
            {aimScopeData.interdisciplinaryHighlight}
          </p>
        </motion.div>

        {/* Key Features Section */}
        <div className="space-y-6 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            {aimScopeData.keyFeaturesSection.title}
          </h3>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aimScopeData.keyFeaturesSection.features.map((feature, index) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                key={feature.id}
                className="bg-[#f8fafc] border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center space-y-3 hover:bg-white hover:shadow-md hover:border-blue-100 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#f0f5ff] text-[#004bdd] group-hover:bg-[#004bdd] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors leading-relaxed">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Closing Statement */}
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-2">
            {aimScopeData.keyFeaturesSection.closingStatement}
          </p>

          {/* Creative Commons License Badge */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2 pt-4 border-t border-gray-100 text-right">
            <span className="text-[11px] text-gray-500 font-medium">
              Licensed under Creative Commons <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer" className="text-[#004bdd] font-bold hover:underline">Attribution 3.0</a>
            </span>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs font-bold text-gray-600">
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
