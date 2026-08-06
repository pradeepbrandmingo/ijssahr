import mongoose from "mongoose";

const manuscriptPageSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      default: "manuscript-submission",
      unique: true,
    },
    title: {
      type: String,
      default: "Paper Submission",
    },
    heading: {
      type: String,
      default: "Submission Instructions",
    },
    content: {
      type: String,
      default:
        "When submitting papers for potential publication in the IJSSAHR, please submit an original editable file in one of the (.doc, .pdf) style files. All figures, images, tables, etc., should be embedded into the original file. Detailed instructions on preparing papers for submission can be found in the Template Paper.",
    },
    copyrightNotice: {
      type: String,
      default:
        "Copyrights for articles published in International Journal of Social Science, Arts and Humanities Research are retained by the authors, with first publication rights granted to the journal.",
    },
    onlineSubmissionTitle: {
      type: String,
      default: "Online Submission System",
    },
    onlineSubmissionText: {
      type: String,
      default:
        'After submission you will get "Submission Acknowledgement" on your Email within 1 to 2 Working days.',
    },
    noteText: {
      type: String,
      default:
        "After Successfully Submitting your Manuscript Please inform to the editor about your submission at:",
    },
    submissionEmail: {
      type: String,
      default: "editor@ijssahr.com",
    },
    journalName: {
      type: String,
      default:
        "International Journal of Social Science, Arts and Humanities Research",
    },
  },
  { timestamps: true }
);

export const ManuscriptPage = mongoose.model(
  "ManuscriptPage",
  manuscriptPageSchema
);
