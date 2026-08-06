import mongoose from "mongoose";

const aimScopeSchema = new mongoose.Schema(
  {
    header: {
      title: {
        type: String,
        default: "Aims and Scope",
      },
      subtitle: {
        type: String,
        default:
          "Discover the multidisciplinary fields, key journal features, and academic mission of IJSSAHR.",
      },
    },
    introduction: {
      type: String,
      default:
        "The International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is a peer-reviewed, open-access journal committed to advancing knowledge and understanding in the fields of Social Science, Arts and Humanities. The journal aims to provide a platform for scholars, researchers, and practitioners to share innovative ideas, critical perspectives, and original research findings that contribute to academic and societal development.",
    },
    disciplinesSection: {
      title: {
        type: String,
        default:
          "IJSSAHR welcomes high-quality submissions across a wide range of disciplines including, but not limited to:",
      },
      disciplines: {
        type: [String],
        default: [
          "Sociology, Psychology, and Anthropology",
          "Linguistics, Literature, and Language Studies",
          "Political Science, International Relations, and Public Administration",
          "Education, Media, and Communication Studies",
          "History, Philosophy, and Cultural Studies",
          "Fine Arts, Performing Arts, and Visual Arts",
          "Gender Studies, Ethics, and Human Rights",
        ],
      },
    },
    interdisciplinaryHighlight: {
      type: String,
      default:
        "The journal encourages interdisciplinary and cross-cultural studies that explore the intersection of Social Science, Arts, and human experience. All submissions undergo a rigorous peer-review process to ensure scholarly excellence and relevance.",
    },
    keyFeaturesSection: {
      title: {
        type: String,
        default: "Key features of IJSSAHR:",
      },
      features: {
        type: [String],
        default: [
          "Free online access and global visibility for all published articles",
          "Fast and fair peer-review process",
          "Support for early-career researchers",
          "A strong commitment to academic integrity and originality",
        ],
      },
      closingStatement: {
        type: String,
        default:
          "By fostering academic exchange and promoting diverse voices, IJSSAHR aspires to be a leading international platform for critical thought, research innovation, and intellectual collaboration in the social sciences, arts, and humanities.",
      },
    },
  },
  { timestamps: true }
);

export const AimScope = mongoose.model("AimScope", aimScopeSchema);
