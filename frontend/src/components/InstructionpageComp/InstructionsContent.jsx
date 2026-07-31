import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiCheckSquare, FiSettings, FiShield, FiDollarSign, FiMail, FiInfo, FiExternalLink } from 'react-icons/fi';

const instructionsData = {
  header: {
    title: "Instructions for Authors",
    subtitle: "Complete guidelines, checklists, and submission process for authors submitting papers to IJSSAHR."
  },
  submissionGuidelines: {
    title: "Submission Guidelines",
    paragraphs: [
      "When submitting papers for potential publication in the IJSSAHR, please submit an original editable file in one of the ( MS Word, doc ) style files. All figures, images, tables, etc., should be embedded into the original file. Detailed instructions on preparing papers for submission can be found in the Template Paper.",
      "Further information on the scope of the IJSSAHR is also available upon enquiry of prospective authors. Authors accept the terms of Honor Code and Plagiarism Statement for Paper Submission, and that the paper is original research contribution with the references properly cited in the manuscript."
    ],
    templatePaperLink: "#",
    submissionEmail: "info@ijssahr.com"
  },
  checklist: {
    title: "Submission Preparation Checklist",
    description: "As part of the submission process, authors are required to check off their submission's compliance with all of the following items, and submissions may be returned to authors that do not adhere to these guidelines.",
    items: [
      "The submission has not been previously published, nor is it before another journal for consideration (or an explanation has been provided in Comments to the Editor).",
      "The submission file is in Microsoft Word file format.",
      "Where available, URLs for the references have been provided.",
      "All authors of IJSSAHR are requested to disclose any actual or potential conflict of interest along with the paper, including financial, professional, personal or other relationships with other people or organizations.",
      "If the paper is accepted for publication, you will be asked to pay article processing charge (formatting and hosting): 60 USD/article."
    ]
  },
  process: {
    title: "Paper Selection and Publication Process",
    steps: [
      "Upon receipt of paper submission, the Editor sends an E-mail of confirmation to the corresponding author within 1-2 working days. If you fail to receive this confirmation, your submission/e-mail may be missed. Please contact at: info@ijssahr.com in time for that.",
      "Peer review. We use a double-blind system for peer-review; both reviewer's and authors' identities remain anonymous. The paper will be peer-reviewed by three experts; two reviewers from outside and one editor from the journal typically involve in reviewing a submission. The review process may take 1-3 weeks.",
      "Corresponding author will receive result of review by E-mail.",
      "The authors revise paper and Pay Article Processing Charge (Formatting and Hosting)(60 USD) (If article get accepted).",
      "After complete all formality paper will be published in current issue of the journal.",
      "E-journal in PDF is available on the journal's webpage, free of charge for download."
    ]
  },
  copyrightNotice: {
    title: "Copyright Notice",
    paragraphs: [
      "Submission of an article implies that the work described has not been published previously (except in the form of an abstract or as part of a published lecture or academic thesis), that it is not under consideration for publication elsewhere, that its publication is approved by all authors and tacitly or explicitly by the responsible authorities where the work was carried out, and that, if accepted, will not be published elsewhere in the same form, in English or in any other language, without the written consent of the Publisher. The Editors reserve the right to edit or otherwise alter all contributions, but authors will receive proofs for approval before publication.",
      "Copyrights for articles published in IJSSAHR are retained by the authors, with first publication rights granted to the journal. The journal/publisher is not responsible for subsequent uses of the work. It is the author's responsibility to bring an infringement action if so desired by the author."
    ]
  },
  publicationCharges: {
    title: "Publication Charges",
    description: "International Journal of Social Science, Arts and Humanities Research (IJSSAHR) being an Open Access journal, it's all content is freely available without charges to readers. Further, the journal does not receive any grant/ aid. So as to cover the journal's operational expenses (proofreading, layout designing, etc), IJSSAHR charges a nominal article processing fee (irrespective of no. of authors and pages), which is to be paid only after an article has been accepted.",
    tableData: [
      { label: "Publication (APC) Charges", value: "60 USD/article" }
    ],
    safeListNote: "To make sure that you can receive messages from us, please add the 'ijssahr.com' domain to your e-mail 'safe list'. If you do not receive e-mail in your 'inbox', check your 'bulk mail' or 'junk mail' folders."
  }
};

const InstructionsContent = () => {
  return (
    <div className="w-full max-w-full overflow-hidden space-y-5">
      {/* Top Section Header */}
      <div className="mb-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {instructionsData.header.title}
        </h2>
        <div className="w-12 h-1 bg-[#004bdd] rounded-full"></div>
      </div>

      {/* 1. Submission Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Card Header (Icon + Title) */}
        <div className="flex items-center gap-3 mb-3.5 border-b border-gray-100 pb-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f0f5ff] text-[#004bdd] flex items-center justify-center shrink-0">
            <FiFileText className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            {instructionsData.submissionGuidelines.title}
          </h3>
        </div>

        {/* Card Body (Full Width Text) */}
        <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <p>
            When submitting papers for potential publication in the IJSSAHR, please submit an original editable file in one of the ( MS Word, doc ) style files. All figures, images, tables, etc., should be embedded into the original file. Detailed instructions on preparing papers for submission can be found in the{" "}
            <a href={instructionsData.submissionGuidelines.templatePaperLink} className="text-[#004bdd] font-semibold hover:underline inline-flex items-center gap-0.5">
              Template Paper <FiExternalLink className="w-3.5 h-3.5 inline" />
            </a>.
          </p>
          <p>{instructionsData.submissionGuidelines.paragraphs[1]}</p>
        </div>

        {/* Email Notice Box */}
        <div className="mt-4 bg-[#f0f5ff] border border-blue-100 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-[#004bdd] flex items-center justify-center shrink-0">
            <FiMail className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-gray-800 break-all">
            All manuscripts must be submitted electronically through the e-mail at:{" "}
            <a href={`mailto:${instructionsData.submissionGuidelines.submissionEmail}`} className="text-[#004bdd] hover:underline font-bold">
              {instructionsData.submissionGuidelines.submissionEmail}
            </a>
          </p>
        </div>
      </motion.div>

      {/* 2. Submission Preparation Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Card Header (Icon + Title) */}
        <div className="flex items-center gap-3 mb-3.5 border-b border-gray-100 pb-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f0f5ff] text-[#004bdd] flex items-center justify-center shrink-0">
            <FiCheckSquare className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            {instructionsData.checklist.title}
          </h3>
        </div>

        {/* Card Body (Full Width) */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
          {instructionsData.checklist.description}
        </p>

        {/* Checklist Items */}
        <div className="space-y-3">
          {instructionsData.checklist.items.map((item, index) => (
            <div key={index} className="flex items-start gap-2.5 sm:gap-3 min-w-0">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#004bdd] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                {index + 1}
              </span>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pt-0.5 flex-1 min-w-0">
                {item}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. Paper Selection and Publication Process */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Card Header (Icon + Title) */}
        <div className="flex items-center gap-3 mb-3.5 border-b border-gray-100 pb-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f0f5ff] text-[#004bdd] flex items-center justify-center shrink-0">
            <FiSettings className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            {instructionsData.process.title}
          </h3>
        </div>

        {/* Process Steps */}
        <div className="space-y-3.5">
          {instructionsData.process.steps.map((step, index) => (
            <div key={index} className="flex items-start gap-2.5 sm:gap-3 min-w-0">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#004bdd] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                {index + 1}
              </span>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pt-0.5 flex-1 min-w-0">
                {step}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 4. Copyright Notice */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Card Header (Icon + Title) */}
        <div className="flex items-center gap-3 mb-3.5 border-b border-gray-100 pb-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f0f5ff] text-[#004bdd] flex items-center justify-center shrink-0">
            <FiShield className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            {instructionsData.copyrightNotice.title}
          </h3>
        </div>

        {/* Card Body */}
        <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
          {instructionsData.copyrightNotice.paragraphs.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      </motion.div>

      {/* 5. Publication Charges */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Card Header (Icon + Title) */}
        <div className="flex items-center gap-3 mb-3.5 border-b border-gray-100 pb-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f0f5ff] text-[#004bdd] flex items-center justify-center shrink-0">
            <FiDollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            {instructionsData.publicationCharges.title}
          </h3>
        </div>

        {/* Card Body */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
          {instructionsData.publicationCharges.description}
        </p>

        {/* APC Charges Table */}
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-4 shadow-sm max-w-lg">
          <div className="bg-gray-50 border-b border-gray-200 p-2.5 sm:p-3 grid grid-cols-2 text-xs font-bold text-gray-700">
            <span>Fee Type</span>
            <span>Amount</span>
          </div>
          {instructionsData.publicationCharges.tableData.map((row, index) => (
            <div key={index} className="p-2.5 sm:p-3 grid grid-cols-2 text-xs sm:text-sm text-gray-800 font-medium bg-white">
              <span>{row.label}</span>
              <span className="text-[#004bdd] font-bold">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Safe List Note */}
        <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3">
          <FiInfo className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed">
            {instructionsData.publicationCharges.safeListNote}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default InstructionsContent;
