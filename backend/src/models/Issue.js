import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    articleId: { type: String, default: "" },
    title: { type: String, required: true, trim: true },
    authors: { type: String, required: true, trim: true },
    subHeading: { type: String, default: "" },
    pageRange: { type: String, required: true, default: "01-15" },
    pdfUrl: { type: String, required: true },
    fileName: { type: String, default: "Paper.pdf" },
    abstract: { type: String, required: true },
    doi: { type: String, default: "" }, // Digital Object Identifier link (e.g. https://doi.org/10.xxxx/xxxx)
  },
  { timestamps: true }
);

const issueSchema = new mongoose.Schema(
  {
    volume: { type: String, required: true, default: "Volume 01" },
    issue: { type: String, required: true, default: "Issue 04" },
    period: { type: String, required: true, default: "July–Aug 2026" },
    publicationFrequency: { type: String, default: "Bimonthly" },
    status: {
      type: String,
      enum: ["In Processing", "Published", "Archived"],
      default: "In Processing",
    },
    isCurrent: { type: Boolean, default: false, index: true },
    articles: [articleSchema],
  },
  { timestamps: true }
);

export const Issue = mongoose.model("Issue", issueSchema);
