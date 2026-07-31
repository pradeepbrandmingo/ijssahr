import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiDownload, FiMail, FiClock, FiGlobe, FiMonitor, FiGift, FiAward, FiBookOpen, FiTrendingUp, FiStar, FiFileText, FiUsers } from 'react-icons/fi';

// Dummy data structure to represent backend response
const recruitmentData = {
  header: {
    title: "Recruitment for Reviewers",
    subtitle: "The editorial board of IJSSAHR welcomes you to join us as a reviewer.",
  },
  details: [
    { id: 1, label: "Status", value: "Part time", icon: <FiClock className="w-4 h-4" /> },
    { id: 2, label: "Working language", value: "English", icon: <FiGlobe className="w-4 h-4" /> },
    { id: 3, label: "Working style", value: "Internet-based", icon: <FiMonitor className="w-4 h-4" /> },
    { id: 4, label: "Payment", value: "Voluntary job, no payment", icon: <FiGift className="w-4 h-4" /> },
  ],
  description: "Reviewers' names will be listed on the journal's webpage.",
  howToApply: {
    steps: [
      {
        id: 1,
        text: "Complete the application form",
        linkText: "download here",
        linkUrl: "#", // Add actual download URL here
        icon: <FiDownload className="w-4 h-4 text-blue-600" />
      },
      {
        id: 2,
        text: "Send your application form to",
        linkText: "editor.aliconpublications@gmail.com",
        linkUrl: "mailto:editor.aliconpublications@gmail.com",
        icon: <FiMail className="w-4 h-4 text-blue-600" />
      }
    ]
  },
  benefits: {
    title: "Reviewer Benefits",
    description: "At IJSSAHR (International Journal of Social Sciences, Arts and Humanities Research), we highly value the time, expertise, and dedication of our reviewers. To recognize and reward their contributions, we offer the following benefits:",
    items: [
      { id: 1, title: "Recognition Certificate", description: "Reviewers receive an official certificate acknowledging their valuable contribution to the peer-review process.", icon: <FiAward /> },
      { id: 2, title: "Reviewer Acknowledgment", description: "Names of active reviewers are listed on our website annually (with permission), showcasing their support for academic research.", icon: <FiStar /> },
      { id: 3, title: "Priority in Publication", description: "Reviewers receive prioritized processing for their own submissions to IJSSAHR.", icon: <FiTrendingUp /> },
      { id: 4, title: "Discount on Publication Fees", description: "Active reviewers and any article recommended by an IJSSAHR reviewer are eligible for a 50% discount policy.", icon: <FiFileText /> },
      { id: 5, title: "Access to New Research", description: "Be among the first to read cutting-edge research in your field.", icon: <FiBookOpen /> },
      { id: 6, title: "Enhance Your Academic Profile", description: "Reviewing for IJSSAHR adds to your professional credentials and academic CV.", icon: <FiCheckCircle /> },
      { id: 7, title: "Editorial Board Consideration", description: "Consistent and high-quality reviewers may be invited to join the editorial board.", icon: <FiUsers /> },
    ]
  }
};

const EditorialBoardRecruitmentContent = () => {
  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Compact Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-5 sm:p-6 text-white mb-6 shadow-md relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-xl pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-1.5 text-white !text-white">{recruitmentData.header.title}</h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl">{recruitmentData.header.subtitle}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
        {/* Left Column: Details & How to Apply */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Key Details Card */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Key Information</h3>
            <div className="space-y-3.5">
              {recruitmentData.details.map((detail) => (
                <div key={detail.id} className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    {detail.icon}
                  </div>
                  <div className="pt-0.5 min-w-0 flex-1">
                    <p className="text-xs text-gray-500 font-medium">{detail.label}</p>
                    <p className="text-gray-900 text-sm font-semibold truncate">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-600 italic">
                "{recruitmentData.description}"
              </p>
            </div>
          </motion.div>

          {/* How to Apply Card */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 sm:p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 opacity-5 rounded-bl-full pointer-events-none"></div>
            <h3 className="text-lg font-bold text-blue-950 mb-4">How to Apply</h3>
            <div className="space-y-3 relative z-10">
              {recruitmentData.howToApply.steps.map((step) => (
                <div key={step.id} className="flex flex-col items-start gap-2 bg-white p-4 rounded-xl shadow-sm border border-white hover:border-blue-200 transition-colors w-full min-w-0">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                  <div className="min-w-0 w-full pt-1">
                    <p className="text-gray-800 text-xs sm:text-sm font-medium mb-1">
                      {step.id}. {step.text}
                    </p>
                    <a 
                      href={step.linkUrl} 
                      className="inline-block max-w-full break-all text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                      target={step.linkUrl.startsWith('http') ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      {step.linkText}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Right Column: Benefits */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm h-full"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center shrink-0">
                <FiAward className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{recruitmentData.benefits.title}</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
              {recruitmentData.benefits.description}
            </p>

            <div className="space-y-4">
              {recruitmentData.benefits.items.map((benefit, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  key={benefit.id} 
                  className="flex gap-3 group min-w-0"
                >
                  <div className="w-9 h-9 rounded-full bg-gray-50 group-hover:bg-blue-50 text-gray-400 group-hover:text-blue-600 flex items-center justify-center shrink-0 transition-colors border border-gray-100 group-hover:border-blue-100 mt-0.5">
                    {React.cloneElement(benefit.icon, { className: 'w-4 h-4' })}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-gray-900 mb-0.5 group-hover:text-blue-700 transition-colors">
                      {benefit.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditorialBoardRecruitmentContent;
