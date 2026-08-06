import mongoose from "mongoose";

export const ARTICLE_STAGES = [
  "Submitted",
  "Plagiarism Check",
  "Under Review",
  "Revision Required",
  "Accepted",
  "Documents Received",
  "Payment Received",
  "Under Formatting",
  "Proof Approved",
  "Scheduled",
  "Published",
];

const manuscriptSchema = new mongoose.Schema(
  {
    articleId: {
      type: String,
      unique: true,
      trim: true,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clientCode: {
      type: String,
      trim: true,
      default: "",
    },
    titlePrefix: {
      type: String,
      required: [true, "Title prefix is required"],
      trim: true,
    },
    authorName: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email ID is required"],
      trim: true,
      lowercase: true,
    },
    postalAddress: {
      type: String,
      required: [true, "Postal address is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    journalName: {
      type: String,
      required: [true, "Journal name is required"],
      default: "International Journal of Social Science, Arts and Humanities Research",
    },
    articleType: {
      type: String,
      required: [true, "Article type is required"],
      trim: true,
    },
    articleTitle: {
      type: String,
      required: [true, "Article title is required"],
      trim: true,
    },
    abstract: {
      type: String,
      required: [true, "Abstract is required"],
      trim: true,
    },
    fileUrl: {
      type: String,
      required: [true, "Attached document file is required"],
    },
    fileName: {
      type: String,
    },
    status: {
      type: String,
      enum: ARTICLE_STAGES,
      default: "Submitted",
    },
    statusHistory: [
      {
        status: { type: String, enum: ARTICLE_STAGES },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Manuscript = mongoose.model("Manuscript", manuscriptSchema);
