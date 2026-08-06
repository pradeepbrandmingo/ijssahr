import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  FiFileText,
  FiCheckSquare,
  FiSettings,
  FiShield,
  FiDollarSign,
  FiMail,
  FiInfo,
} from "react-icons/fi";
import API from "../../services/api";

const defaultInstructions = {
  header: {
    title: "Instructions for Authors",
  },
  submissionGuidelines: {
    title: "Submission Guidelines",
    paragraphs: [
      "When submitting papers for potential publication in the IJSSAHR, please submit an original editable file in one of the ( MS Word, doc ) style files. All figures, images, tables, etc., should be embedded into the original file. Detailed instructions on preparing papers for submission can be found in the Template Paper.",
      "Further information on the scope of the IJSSAHR is also available upon enquiry of prospective authors. Authors accept the terms of Honor Code and Plagiarism Statement for Paper Submission, and that the paper is original research contribution with the references properly cited in the manuscript.",
    ],
    submissionEmail: "info@ijssahr.com",
  },
  checklist: {
    title: "Submission Preparation Checklist",
    description:
      "As part of the submission process, authors are required to check off their submission's compliance with all of the following items, and submissions may be returned to authors that do not adhere to these guidelines.",
    items: [
      "The submission has not been previously published, nor is it before another journal for consideration.",
      "The submission file is in OpenOffice, Microsoft Word, or RTF document file format.",
      "Where available, URLs for the references have been provided.",
      "The text is single-spaced; uses a 12-point font; employs italics, rather than underlining (except with URL addresses); and all illustrations, figures, and tables are placed within the text at the appropriate points, rather than at the end.",
      "The text adheres to the stylistic and bibliographic requirements outlined in the Author Guidelines.",
    ],
  },
  process: {
    title: "Paper Selection and Publication Process",
    steps: [
      "Upon receipt of a paper submission, the Editor sends a confirmation email to the corresponding author within 1–2 working days.",
      "Peer-Review: Peer-review feedback will be provided within 2-3 weeks.",
      "Notification of Acceptance: Author will be notified of acceptance or rejection.",
      "Payment of Article Processing Charges (APC): Authors will be requested to pay APC upon acceptance.",
      "Publication: Final paper will be published online within 2 days of receipt of payment.",
    ],
  },
  copyrightNotice: {
    title: "Copyright Notice",
    paragraphs: [
      "Authors who publish with IJSSAHR agree to the following terms:",
      "Authors retain copyright and grant the journal right of first publication with the work simultaneously licensed under a Creative Commons Attribution License that allows others to share the work with an acknowledgement of the work's authorship and initial publication in this journal.",
      "Authors are able to enter into separate, additional contractual arrangements for the non-exclusive distribution of the journal's published version of the work (e.g., post it to an institutional repository or publish it in a book), with an acknowledgement of its initial publication in this journal.",
    ],
  },
  publicationCharges: {
    title: "Publication Charges",
    description:
      "International Journal of Social Science, Arts and Humanities Research (IJSSAHR) being an Open Access journal, it's all content is freely available without charges to readers. Further, the journal does not receive any grant/ aid. So as to cover the journal's operational expenses (proofreading, layout designing, etc), IJSSAHR charges a nominal article processing fee (irrespective of no. of authors and pages), which is to be paid only after an article has been accepted.",
    tableData: [
      { label: "Publication (APC) Charges", value: "60 USD/article" },
    ],
    safeListNote:
      "To make sure that you can receive messages from us, please add the 'ijssahr.com' domain to your e-mail 'safe list'. If you do not receive e-mail in your 'inbox', check your 'bulk mail' or 'junk mail' folders.",
  },
};

const InstructionsContent = () => {
  const { data: serverData } = useQuery({
    queryKey: ["author-instructions-public"],
    queryFn: async () => {
      const res = await API.get("/author-instructions");
      return res.data?.data || defaultInstructions;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const instructionsData = serverData || defaultInstructions;

  return (
    <div className="w-full max-w-full overflow-hidden space-y-4">
      {/* Top Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-1"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {instructionsData.header?.title || "Instructions for Authors"}
        </h2>
        <div className="w-10 h-0.5 bg-[#004bdd] rounded-full"></div>
      </motion.div>

      {/* 1. Submission Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow"
      >
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-2.5 border-b border-gray-100 pb-2">
          <div className="w-7.5 h-7.5 rounded-full bg-[#f0f5ff] text-[#004bdd] flex items-center justify-center shrink-0">
            <FiFileText className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800">
            {instructionsData.submissionGuidelines?.title || "Submission Guidelines"}
          </h3>
        </div>

        {/* Card Body */}
        <div className="space-y-2.5 text-[13.5px] text-gray-600 font-normal leading-relaxed">
          {instructionsData.submissionGuidelines?.paragraphs?.map((p, idx) => (
            <p key={idx} className="text-[13.5px] text-gray-600 font-normal leading-relaxed">
              {p}
            </p>
          )) || (
            <p className="text-[13.5px] text-gray-600 font-normal leading-relaxed">
              When submitting papers for potential publication in the IJSSAHR, please submit an original editable file in one of the ( MS Word, doc ) style files.
            </p>
          )}
        </div>

        {/* Email Notice Box */}
        {instructionsData.submissionGuidelines?.submissionEmail && (
          <div className="mt-3 bg-[#f0f5ff] border border-blue-100/80 rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="w-6.5 h-6.5 rounded-full bg-blue-100 text-[#004bdd] flex items-center justify-center shrink-0">
              <FiMail className="w-3.5 h-3.5" />
            </div>
            <p className="text-[13px] font-normal text-gray-700 break-all">
              All manuscripts must be submitted electronically through the e-mail at:{" "}
              <a
                href={`mailto:${instructionsData.submissionGuidelines.submissionEmail}`}
                className="text-[#004bdd] hover:underline font-semibold"
              >
                {instructionsData.submissionGuidelines.submissionEmail}
              </a>
            </p>
          </div>
        )}
      </motion.div>

      {/* 2. Submission Preparation Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow"
      >
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-2.5 border-b border-gray-100 pb-2">
          <div className="w-7.5 h-7.5 rounded-full bg-[#f0f5ff] text-[#004bdd] flex items-center justify-center shrink-0">
            <FiCheckSquare className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800">
            {instructionsData.checklist?.title || "Submission Preparation Checklist"}
          </h3>
        </div>

        {/* Card Body */}
        {instructionsData.checklist?.description && (
          <p className="text-[13.5px] text-gray-600 font-normal leading-relaxed mb-2.5">
            {instructionsData.checklist.description}
          </p>
        )}

        {/* Checklist Items */}
        <div className="space-y-2.5">
          {instructionsData.checklist?.items?.map((item, index) => (
            <div key={index} className="flex items-start gap-2.5 min-w-0">
              <span className="w-4.5 h-4.5 rounded-full bg-[#004bdd] text-white flex items-center justify-center text-[10.5px] font-semibold shrink-0 mt-0.5 shadow-2xs">
                {index + 1}
              </span>
              <p className="text-[13.5px] text-gray-600 font-normal leading-relaxed flex-1 min-w-0 pt-0.5">
                {item}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. Paper Selection and Publication Process */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow"
      >
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-2.5 border-b border-gray-100 pb-2">
          <div className="w-7.5 h-7.5 rounded-full bg-[#f0f5ff] text-[#004bdd] flex items-center justify-center shrink-0">
            <FiSettings className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800">
            {instructionsData.process?.title || "Paper Selection and Publication Process"}
          </h3>
        </div>

        {/* Process Steps */}
        <div className="space-y-2.5">
          {instructionsData.process?.steps?.map((step, index) => (
            <div key={index} className="flex items-start gap-2.5 min-w-0">
              <span className="w-4.5 h-4.5 rounded-full bg-[#004bdd] text-white flex items-center justify-center text-[10.5px] font-semibold shrink-0 mt-0.5 shadow-2xs">
                {index + 1}
              </span>
              <p className="text-[13.5px] text-gray-600 font-normal leading-relaxed flex-1 min-w-0 pt-0.5">
                {step}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 4. Copyright Notice */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow"
      >
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-2.5 border-b border-gray-100 pb-2">
          <div className="w-7.5 h-7.5 rounded-full bg-[#f0f5ff] text-[#004bdd] flex items-center justify-center shrink-0">
            <FiShield className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800">
            {instructionsData.copyrightNotice?.title || "Copyright Notice"}
          </h3>
        </div>

        {/* Card Body */}
        <div className="space-y-2.5 text-[13.5px] text-gray-600 font-normal leading-relaxed">
          {instructionsData.copyrightNotice?.paragraphs?.map((p, index) => (
            <p key={index} className="text-[13.5px] text-gray-600 font-normal leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </motion.div>

      {/* 5. Publication Charges */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25 }}
        className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow"
      >
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-2.5 border-b border-gray-100 pb-2">
          <div className="w-7.5 h-7.5 rounded-full bg-[#f0f5ff] text-[#004bdd] flex items-center justify-center shrink-0">
            <FiDollarSign className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800">
            {instructionsData.publicationCharges?.title || "Publication Charges"}
          </h3>
        </div>

        {/* Card Body */}
        {instructionsData.publicationCharges?.description && (
          <p className="text-[13.5px] text-gray-600 font-normal leading-relaxed mb-2.5">
            {instructionsData.publicationCharges.description}
          </p>
        )}

        {/* APC Charges Table */}
        {instructionsData.publicationCharges?.tableData?.length > 0 && (
          <div className="border border-gray-200/80 rounded-lg overflow-hidden mb-2.5 shadow-2xs max-w-md text-[13px]">
            <div className="bg-gray-50/80 border-b border-gray-200/80 p-2 sm:p-2.5 grid grid-cols-2 font-semibold text-gray-700">
              <span>Fee Type</span>
              <span>Amount</span>
            </div>
            {instructionsData.publicationCharges.tableData.map((row, index) => (
              <div
                key={index}
                className="p-2 sm:p-2.5 grid grid-cols-2 text-[13px] text-gray-700 font-normal bg-white"
              >
                <span>{row.label}</span>
                <span className="text-[#004bdd] font-semibold">{row.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Safe List Note */}
        {instructionsData.publicationCharges?.safeListNote && (
          <div className="bg-amber-50/60 border border-amber-200/50 rounded-lg p-2.5 sm:p-3 flex items-start gap-2">
            <FiInfo className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[13px] text-amber-900/90 font-normal leading-relaxed">
              {instructionsData.publicationCharges.safeListNote}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default InstructionsContent;
