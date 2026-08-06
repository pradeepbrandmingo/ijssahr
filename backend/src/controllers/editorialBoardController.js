import EditorialBoard from "../models/EditorialBoard.js";
import { logActivity } from "./auditLogController.js";

const fullRolesData = [
  {
    id: "editor-in-chief",
    roleTitle: "Editor-in-Chief",
    roleSubtitle:
      "Overall leadership, strategic direction, and final editorial decisions.",
    tag: "Executive Leadership",
    responsibilities: [
      {
        title: "Editorial Leadership",
        points: [
          "Set the editorial direction and scope of the journal.",
          "Oversee peer review to ensure fairness and academic quality.",
        ],
      },
      {
        title: "Decision Making",
        points: [
          "Make final decisions on manuscripts after peer review.",
          "Ensure ethical standards are followed in publication.",
        ],
      },
      {
        title: "Team Coordination",
        points: [
          "Lead and coordinate with Associate Editors and reviewers.",
          "Support team collaboration and maintain timelines for publication.",
        ],
      },
      {
        title: "Quality Control",
        points: [
          "Uphold the academic integrity of the journal.",
          "Monitor plagiarism checks, reviewer feedback, and formatting quality.",
        ],
      },
      {
        title: "Community Engagement",
        points: [
          "Encourage high-quality submissions and collaborations.",
          "Represent the journal at academic events (virtually or in person).",
        ],
      },
      {
        title: "Journal Growth",
        points: [
          "Recommend indexing, visibility strategies, and new special issues.",
          "Propose ideas for increasing the reach and reputation of the journal.",
        ],
      },
    ],
  },
  {
    id: "associate-editor",
    roleTitle: "Associate Editor",
    roleSubtitle:
      "Managing peer-review workflow and evaluating domain-specific submissions.",
    tag: "Editorial Management",
    responsibilities: [
      {
        title: "Manuscript Handling",
        points: [
          "Assist in managing the peer-review process for assigned manuscripts.",
          "Select suitable reviewers based on subject expertise.",
          "Monitor the progress of reviews and ensure timely completion.",
        ],
      },
      {
        title: "Editorial Assessment",
        points: [
          "Evaluate submitted articles for relevance, originality, and scientific merit.",
          "Recommend editorial decisions (accept, revise, reject) based on reviewer comments.",
        ],
      },
      {
        title: "Quality Assurance",
        points: [
          "Ensure manuscripts align with the journal's scope and editorial standards.",
          "Help maintain ethical publishing practices, including identifying plagiarism.",
        ],
      },
      {
        title: "Communication",
        points: [
          "Communicate professionally and promptly with authors, reviewers, and staff.",
          "Provide clear and constructive guidance to authors on how to improve manuscripts.",
        ],
      },
      {
        title: "Support Editorial Goals",
        points: [
          "Suggest topics for special issues or thematic editions.",
          "Promote the journal within your professional network.",
          "Encourage high-quality submissions from colleagues.",
        ],
      },
      {
        title: "Confidentiality & Ethics",
        points: [
          "Treat all submissions and related communications as confidential.",
          "Adhere to COPE and the journal's ethical guidelines.",
        ],
      },
    ],
  },
  {
    id: "reviewer",
    roleTitle: "Reviewer",
    roleSubtitle:
      "Providing rigorous, objective, and constructive expert peer evaluations.",
    tag: "Peer Review Expert",
    responsibilities: [
      {
        title: "Manuscript Evaluation",
        points: [
          "Critically assess originality, significance, methodology, and clarity of submitted manuscripts.",
          "Provide objective, constructive, and balanced feedback to help authors improve their work.",
        ],
      },
      {
        title: "Timely Review",
        points: [
          "Complete reviews within the agreed-upon timeframe.",
          "Inform the editorial office promptly if unable to review or if more time is needed.",
        ],
      },
      {
        title: "Confidentiality",
        points: [
          "Treat all manuscripts and correspondence as strictly confidential.",
          "Do not share, discuss, or use the content for personal advantage.",
        ],
      },
      {
        title: "Ethical Vigilance",
        points: [
          "Alert editors to suspected plagiarism, duplicate publication, or ethical issues.",
          "Declare any conflicts of interest that might affect objectivity.",
        ],
      },
      {
        title: "Professional Communication",
        points: [
          "Provide clear, respectful, and constructive comments for authors.",
          "Avoid personal criticism or offensive language.",
        ],
      },
      {
        title: "Support Journal Standards",
        points: [
          "Help uphold the quality and reputation of the journal through thorough reviews.",
          "Offer suggestions to improve the journal's content and processes if applicable.",
        ],
      },
    ],
  },
];

const fullSeedData = {
  header: {
    title: "Editorial Board",
    subtitle: "Meet the distinguished editors and scholars leading IJSSAHR.",
  },
  recruitmentBanner: {
    title: "Recruitment Open for Reviewers",
    text: "We are always looking for passionate researchers and academics to join our reviewer team.",
    linkText: "Click Here to Apply",
    applyLink: "/editorialboardrecruitment",
  },
  rolesBanner: {
    title: "Roles and Responsibilities",
    text: "Detailed roles and responsibilities of our editorial team.",
    link: "/editorialboardroles",
  },
  editorInChief: [
    {
      name: "Dr. Carmine Boniello",
      affiliation:
        "Department of Economic and Statistics Sciences, University of Salerno, Fisciano, Salerno, Italy",
      email: "cboniello@unisa.it",
      profileLink: "",
    },
  ],
  associateEditors: [
    {
      name: "Dr. Steven Cates",
      affiliation:
        "Professor, Human Resource Management and Employment Law, Purdue University Global, USA",
      email: "SCates@purdueglobal.edu",
      profileLink: "",
    },
  ],
  editorialBoardMembers: [
    {
      name: "Dr. Lok Raj Sharma",
      affiliation:
        "Sr. Associate Professor of English & Head of the Faculty of Education, Makawanpur Multiple Campus, Hetauda, Nepal",
      email: "lokraj.sharma@mmchetauda.edu.np",
      profileLink: "https://mmchetauda.edu.np/faculty-members/",
    },
    {
      name: "Prof. Albrecht Classen",
      affiliation:
        "Department of German Studies, The University of Arizona, USA",
      email: "aclassen@arizona.edu",
      profileLink: "#",
    },
  ],
  recruitmentPage: {
    headerTitle: "Recruitment for Reviewers",
    headerSubtitle:
      "The editorial board of IJSSAHR welcomes you to join us as a reviewer.",
    jobStatus: "Part time",
    workingLanguage: "English",
    workingStyle: "Internet-based",
    paymentNotice: "Voluntary job, no payment",
    description: "Reviewers' names will be listed on the journal's webpage.",
    applicationFormLink: "#",
    applicationEmail: "editor.aliconpublications@gmail.com",
    benefitsTitle: "Reviewer Benefits",
    benefitsDescription:
      "At IJSSAHR, we highly value the time, expertise, and dedication of our reviewers. To recognize and reward their contributions, we offer the following benefits:",
    benefitsList: [
      {
        title: "Recognition Certificate",
        description:
          "Reviewers receive an official certificate acknowledging their valuable contribution to the peer-review process.",
      },
      {
        title: "Reviewer Acknowledgment",
        description:
          "Names of active reviewers are listed on our website annually (with permission), showcasing their support.",
      },
      {
        title: "Priority in Publication",
        description:
          "Reviewers receive prioritized processing for their own submissions to IJSSAHR.",
      },
      {
        title: "Discount on Publication Fees",
        description:
          "Active reviewers and any article recommended by an IJSSAHR reviewer are eligible for a 50% discount policy.",
      },
      {
        title: "Access to New Research",
        description:
          "Be among the first to read cutting-edge research in your field.",
      },
      {
        title: "Enhance Academic Profile",
        description:
          "Reviewing for IJSSAHR adds to your professional credentials and academic CV.",
      },
      {
        title: "Editorial Board Consideration",
        description:
          "Consistent and high-quality reviewers may be invited to join the editorial board.",
      },
    ],
  },
  rolesPage: {
    headerTitle: "Editorial Board Roles & Responsibilities",
    headerSubtitle:
      "Detailed guidelines defining duties for Editors-in-Chief, Associate Editors, and Peer Reviewers.",
    rolesList: fullRolesData,
  },
};

// @desc    Get Editorial Board data (Public)
// @route   GET /api/v1/editorial-board
export const getEditorialBoard = async (req, res, next) => {
  try {
    let board = await EditorialBoard.findOne();
    if (!board) {
      board = await EditorialBoard.create(fullSeedData);
    } else {
      let updated = false;
      if (!board.rolesPage?.rolesList || board.rolesPage.rolesList.length === 0) {
        board.rolesPage = fullSeedData.rolesPage;
        updated = true;
      }
      if (!board.recruitmentPage?.benefitsList || board.recruitmentPage.benefitsList.length === 0) {
        board.recruitmentPage = fullSeedData.recruitmentPage;
        updated = true;
      }
      if (updated) {
        await board.save();
      }
    }
    res.status(200).json({
      success: true,
      data: board,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Editorial Board data (SuperAdmin)
// @route   PUT /api/v1/editorial-board
export const updateEditorialBoard = async (req, res, next) => {
  try {
    let board = await EditorialBoard.findOne();
    if (!board) {
      board = new EditorialBoard(req.body);
    } else {
      if (req.body.header) board.header = req.body.header;
      if (req.body.recruitmentBanner)
        board.recruitmentBanner = req.body.recruitmentBanner;
      if (req.body.rolesBanner) board.rolesBanner = req.body.rolesBanner;
      if (Array.isArray(req.body.editorInChief))
        board.editorInChief = req.body.editorInChief;
      if (Array.isArray(req.body.associateEditors))
        board.associateEditors = req.body.associateEditors;
      if (Array.isArray(req.body.editorialBoardMembers))
        board.editorialBoardMembers = req.body.editorialBoardMembers;
      if (req.body.recruitmentPage)
        board.recruitmentPage = req.body.recruitmentPage;
      if (req.body.rolesPage) board.rolesPage = req.body.rolesPage;
    }
    await board.save();

    await logActivity({
      req,
      action: "Updated Editorial Board",
      module: "Editorial Board",
      details: "Updated Editorial Board Members, Recruitment or Roles page",
    });

    res.status(200).json({
      success: true,
      message: "Editorial Board & Sub-Pages updated live successfully!",
      data: board,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload Reviewer Application Form PDF (SuperAdmin)
// @route   POST /api/v1/editorial-board/upload-application-form
export const uploadApplicationFormPdf = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a PDF file to upload",
      });
    }

    const pdfRelativePath = `/uploads/${req.file.filename}`;

    let board = await EditorialBoard.findOne();
    if (!board) {
      board = new EditorialBoard();
    }
    if (!board.recruitmentPage) {
      board.recruitmentPage = {};
    }
    board.recruitmentPage.applicationFormLink = pdfRelativePath;
    await board.save();

    res.status(200).json({
      success: true,
      message: "Reviewer Application Form PDF uploaded successfully!",
      pdfUrl: pdfRelativePath,
      data: board,
    });
  } catch (error) {
    next(error);
  }
};
