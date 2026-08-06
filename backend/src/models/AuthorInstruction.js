import mongoose from "mongoose";

const authorInstructionSchema = new mongoose.Schema(
  {
    header: {
      title: {
        type: String,
        default: "Instructions for Authors",
      },
      subtitle: {
        type: String,
        default:
          "Complete guidelines, checklists, and submission process for authors submitting papers to IJSSAHR.",
      },
    },
    submissionGuidelines: {
      title: {
        type: String,
        default: "Submission Guidelines",
      },
      paragraphs: {
        type: [String],
        default: [
          "When submitting papers for potential publication in the IJSSAHR, please submit an original editable file in one of the ( MS Word, doc ) style files. All figures, images, tables, etc., should be embedded into the original file. Detailed instructions on preparing papers for submission can be found in the Template Paper.",
          "Further information on the scope of the IJSSAHR is also available upon enquiry of prospective authors. Authors accept the terms of Honor Code and Plagiarism Statement for Paper Submission, and that the paper is original research contribution with the references properly cited in the manuscript.",
        ],
      },
      templatePaperLink: {
        type: String,
        default: "#",
      },
      submissionEmail: {
        type: String,
        default: "info@ijssahr.com",
      },
    },
    checklist: {
      title: {
        type: String,
        default: "Submission Preparation Checklist",
      },
      description: {
        type: String,
        default:
          "As part of the submission process, authors are required to check off their submission's compliance with all of the following items, and submissions may be returned to authors that do not adhere to these guidelines.",
      },
      items: {
        type: [String],
        default: [
          "The submission has not been previously published, nor is it before another journal for consideration (or an explanation has been provided in Comments to the Editor).",
          "The submission file is in Microsoft Word file format.",
          "Where available, URLs for the references have been provided.",
          "All authors of IJSSAHR are requested to disclose any actual or potential conflict of interest along with the paper, including financial, professional, personal or other relationships with other people or organizations.",
          "If the paper is accepted for publication, you will be asked to pay article processing charge (formatting and hosting): 60 USD/article.",
        ],
      },
    },
    process: {
      title: {
        type: String,
        default: "Paper Selection and Publication Process",
      },
      steps: {
        type: [String],
        default: [
          "Upon receipt of paper submission, the Editor sends an E-mail of confirmation to the corresponding author within 1-2 working days. If you fail to receive this confirmation, your submission/e-mail may be missed. Please contact at: info@ijssahr.com in time for that.",
          "Peer review. We use a double-blind system for peer-review; both reviewer's and authors' identities remain anonymous. The paper will be peer-reviewed by three experts; two reviewers from outside and one editor from the journal typically involve in reviewing a submission. The review process may take 1-3 weeks.",
          "Corresponding author will receive result of review by E-mail.",
          "The authors revise paper and Pay Article Processing Charge (Formatting and Hosting)(60 USD) (If article get accepted).",
          "After complete all formality paper will be published in current issue of the journal.",
          "E-journal in PDF is available on the journal's webpage, free of charge for download.",
        ],
      },
    },
    copyrightNotice: {
      title: {
        type: String,
        default: "Copyright Notice",
      },
      paragraphs: {
        type: [String],
        default: [
          "Submission of an article implies that the work described has not been published previously (except in the form of an abstract or as part of a published lecture or academic thesis), that it is not under consideration for publication elsewhere, that its publication is approved by all authors and tacitly or explicitly by the responsible authorities where the work was carried out, and that, if accepted, will not be published elsewhere in the same form, in English or in any other language, without the written consent of the Publisher. The Editors reserve the right to edit or otherwise alter all contributions, but authors will receive proofs for approval before publication.",
          "Copyrights for articles published in IJSSAHR are retained by the authors, with first publication rights granted to the journal. The journal/publisher is not responsible for subsequent uses of the work. It is the author's responsibility to bring an infringement action if so desired by the author.",
        ],
      },
    },
    publicationCharges: {
      title: {
        type: String,
        default: "Publication Charges",
      },
      description: {
        type: String,
        default:
          "International Journal of Social Science, Arts and Humanities Research (IJSSAHR) being an Open Access journal, it's all content is freely available without charges to readers. Further, the journal does not receive any grant/ aid. So as to cover the journal's operational expenses (proofreading, layout designing, etc), IJSSAHR charges a nominal article processing fee (irrespective of no. of authors and pages), which is to be paid only after an article has been accepted.",
      },
      tableData: [
        {
          label: { type: String, default: "Publication (APC) Charges" },
          value: { type: String, default: "60 USD/article" },
        },
      ],
      safeListNote: {
        type: String,
        default:
          "To make sure that you can receive messages from us, please add the 'ijssahr.com' domain to your e-mail 'safe list'. If you do not receive e-mail in your 'inbox', check your 'bulk mail' or 'junk mail' folders.",
      },
    },
  },
  { timestamps: true }
);

export const AuthorInstruction = mongoose.model(
  "AuthorInstruction",
  authorInstructionSchema
);
