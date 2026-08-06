import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  text: { type: String, required: true },
});

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  points: [pointSchema],
});

const aboutPageSchema = new mongoose.Schema(
  {
    header: {
      title: { type: String, default: "About Us" },
      intro: {
        type: String,
        default:
          "International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is an international, double-blind peer-reviewed, open-access journal published by Alicon Publications.",
      },
    },
    journalInfo: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    description: {
      type: String,
      default:
        "IJSSAHR aims to provide a valuable outlet for research and scholarship on Social Science, Arts and Humanities-orientated themes and topics. It publishes articles of a multi-disciplinary and interdisciplinary nature as well as empirical research from within traditional disciplines and managerial functions. With contributions from around the globe, the journal includes articles across the full range of Social Science, Arts and Humanities disciplines.",
    },
    ethicsStatement: {
      title: {
        type: String,
        default: "IJSSAHR Publication Ethics Statement",
      },
      intro: {
        type: String,
        default:
          "The publisher/journal is dedicated to maintaining the highest level of integrity in the work published. The journal and its publisher follow the Committee on Publication Ethics (COPE)'s Core Practices. It is expected of authors, reviewers, and editors that they follow the best-practice guidelines on ethical behaviour contained therein. In addition, some key points are listed below.",
      },
    },
    sections: [sectionSchema],
    license: {
      title: {
        type: String,
        default: "Creative Commons Attribution License (CC-BY)",
      },
      text: {
        type: String,
        default:
          "All articles published by IJSSAHR will be distributed under the terms and conditions of the Creative Commons Attribution License(CC-BY). So anyone is allowed to copy, distribute, and transmit the article on condition that the original article and source is correctly cited.",
      },
    },
  },
  { timestamps: true }
);

export const AboutPage = mongoose.model("AboutPage", aboutPageSchema);
