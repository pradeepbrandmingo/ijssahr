import mongoose from "mongoose";

const boardMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  affiliation: { type: String, required: true },
  email: { type: String, default: "" },
  profileLink: { type: String, default: "" },
});

const benefitItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const roleResponsibilitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  points: [{ type: String }],
});

const roleCategorySchema = new mongoose.Schema({
  id: { type: String },
  roleTitle: { type: String, required: true },
  roleSubtitle: { type: String },
  tag: { type: String },
  responsibilities: [roleResponsibilitySchema],
});

const editorialBoardSchema = new mongoose.Schema(
  {
    header: {
      title: { type: String, default: "Editorial Board" },
      subtitle: {
        type: String,
        default: "Meet the distinguished editors and scholars leading IJSSAHR.",
      },
    },
    recruitmentBanner: {
      title: {
        type: String,
        default: "Recruitment Open for Reviewers",
      },
      text: {
        type: String,
        default:
          "We are always looking for passionate researchers and academics to join our reviewer team.",
      },
      linkText: { type: String, default: "Click Here to Apply" },
      applyLink: { type: String, default: "/editorialboardrecruitment" },
    },
    rolesBanner: {
      title: { type: String, default: "Roles and Responsibilities" },
      text: {
        type: String,
        default: "Detailed roles and responsibilities of our editorial team.",
      },
      link: { type: String, default: "/editorialboardroles" },
    },
    editorInChief: [boardMemberSchema],
    associateEditors: [boardMemberSchema],
    editorialBoardMembers: [boardMemberSchema],

    // Reviewer Recruitment Sub-Page (/editorialboardrecruitment)
    recruitmentPage: {
      headerTitle: { type: String, default: "Recruitment for Reviewers" },
      headerSubtitle: {
        type: String,
        default:
          "The editorial board of IJSSAHR welcomes you to join us as a reviewer.",
      },
      jobStatus: { type: String, default: "Part time" },
      workingLanguage: { type: String, default: "English" },
      workingStyle: { type: String, default: "Internet-based" },
      paymentNotice: { type: String, default: "Voluntary job, no payment" },
      description: {
        type: String,
        default: "Reviewers' names will be listed on the journal's webpage.",
      },
      applicationFormLink: { type: String, default: "#" },
      applicationEmail: {
        type: String,
        default: "editor.aliconpublications@gmail.com",
      },
      benefitsTitle: { type: String, default: "Reviewer Benefits" },
      benefitsDescription: {
        type: String,
        default:
          "At IJSSAHR, we highly value the time, expertise, and dedication of our reviewers.",
      },
      benefitsList: [benefitItemSchema],
    },

    // Roles and Responsibilities Sub-Page (/editorialboardroles)
    rolesPage: {
      headerTitle: {
        type: String,
        default: "Editorial Board Roles & Responsibilities",
      },
      headerSubtitle: {
        type: String,
        default:
          "Detailed guidelines defining duties for Editors-in-Chief, Associate Editors, and Peer Reviewers.",
      },
      rolesList: [roleCategorySchema],
    },
  },
  { timestamps: true }
);

export default mongoose.model("EditorialBoard", editorialBoardSchema);
