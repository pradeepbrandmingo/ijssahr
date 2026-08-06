import mongoose from "mongoose";

const staticPageSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      required: true,
      unique: true, // e.g. 'paper-submission', 'about', 'aims-scope', 'instructions', 'payment'
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    heading: {
      type: String,
      default: "Submission Instructions",
    },
    content: {
      type: String,
      required: true,
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
      default: "International Journal of Social Science, Arts and Humanities Research",
    },
    metaTitle: {
      type: String,
      default: "",
    },
    metaDescription: {
      type: String,
      default: "",
    },
    extraFields: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const StaticPage = mongoose.model("StaticPage", staticPageSchema);
