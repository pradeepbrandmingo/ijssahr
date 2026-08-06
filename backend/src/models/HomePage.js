import mongoose from "mongoose";

const homePageSchema = new mongoose.Schema(
  {
    hero: {
      badgeText: { type: String, default: "Peer-Reviewed • Bimonthly • Open Access" },
      title: { type: String, default: "Advancing Research. Inspiring Knowledge." },
      subtitle: {
        type: String,
        default:
          "IJSSAHR is a platform for scholars, researchers, and practitioners to share and discover high-quality research across Social Sciences, Arts and Humanities.",
      },
      stats: [
        {
          value: { type: String, default: "2026" },
          label: { type: String, default: "Starting Year" },
        },
        {
          value: { type: String, default: "Bimonthly" },
          label: { type: String, default: "Publication Frequency" },
        },
        {
          value: { type: String, default: "Open Access" },
          label: { type: String, default: "Global Reach" },
        },
      ],
    },
    announcement: {
      text: {
        type: String,
        default: "Invitation for Paper/Articles: Submission",
      },
      link: { type: String, default: "/paper-submission" },
    },
    contactEmail: {
      type: String,
      default: "editor.aliconpublications@gmail.com",
    },
    journalDoiPrefix: {
      type: String,
      default: "dx.doi.org/10.51505",
    },
    aboutParagraphs: [
      {
        type: String,
      },
    ],
    infoItems: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const HomePage = mongoose.model("HomePage", homePageSchema);
