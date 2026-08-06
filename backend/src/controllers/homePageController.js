import { HomePage } from "../models/HomePage.js";
import { logActivity } from "./auditLogController.js";

const defaultHomePageData = {
  hero: {
    badgeText: "Peer-Reviewed • Bimonthly • Open Access",
    title: "Advancing Research. Inspiring Knowledge.",
    subtitle:
      "IJSSAHR is a platform for scholars, researchers, and practitioners to share and discover high-quality research across Social Sciences, Arts and Humanities.",
    stats: [
      { value: "2026", label: "Starting Year" },
      { value: "Bimonthly", label: "Publication Frequency" },
      { value: "Open Access", label: "Global Reach" },
    ],
  },
  announcement: {
    text: "Invitation for Paper/Articles: Submission",
    link: "/paper-submission",
  },
  contactEmail: "editor.aliconpublications@gmail.com",
  aboutParagraphs: [
    "International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is a peer-reviewed, Bimonthly, open-access journal dedicated to promoting high-quality interdisciplinary research in the fields of social sciences, arts, and humanities. Backed by a strong Editorial Board and a robust, rapid peer-review system, IJSSAHR aims to foster academic exchange and contribute to the global dissemination of knowledge in these diverse fields.",
    "The journal seeks to bridge gaps between theory and practice by encouraging contributions that stimulate dialogue among scholars, researchers, and practitioners. The journal focuses on interdisciplinary research in the fields of Social Sciences, Arts and Humanities, including but not limited to sociology, economics, political science, history, literature, culture, and related areas.",
    "All submitted manuscripts, including papers from symposia or special issues, undergo a rigorous peer-review process conducted by qualified experts appointed by the editorial board. Submissions must present original research work and should not be under review or consideration by any other journal at the time of submission.",
    "Our mission is to foster intellectual dialogue, promote interdisciplinary collaboration, and support the growth of knowledge across diverse academic disciplines. IJSSAHR aims to serve as a platform where scholars, researchers, educators, and practitioners can stay updated on emerging academic trends and actively contribute to meaningful conversations within their fields.",
    "We invite you to join our vibrant academic community and share your work with a global audience through IJSSAHR.",
  ],
  infoItems: [
    { label: "Starting Year", value: "2026" },
    { label: "Subject Area", value: "Social Sciences, Arts and Humanities" },
    { label: "Language", value: "English" },
    { label: "Open Access", value: "Yes" },
    { label: "Frequency", value: "Bimonthly" },
  ],
};

// @desc    Get Home Page Data (Public)
// @route   GET /api/v1/home-page
export const getHomePageData = async (req, res, next) => {
  try {
    let homeData = await HomePage.findOne();
    if (!homeData) {
      homeData = await HomePage.create(defaultHomePageData);
    }
    res.status(200).json({
      success: true,
      data: homeData,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Home Page Data (SuperAdmin)
// @route   PUT /api/v1/home-page
export const updateHomePageData = async (req, res, next) => {
  try {
    let homeData = await HomePage.findOne();
    if (!homeData) {
      homeData = new HomePage(req.body);
    } else {
      if (req.body.hero) homeData.hero = req.body.hero;
      if (req.body.announcement) homeData.announcement = req.body.announcement;
      if (req.body.contactEmail) homeData.contactEmail = req.body.contactEmail;
      if (req.body.journalDoiPrefix !== undefined)
        homeData.journalDoiPrefix = req.body.journalDoiPrefix;
      if (Array.isArray(req.body.aboutParagraphs))
        homeData.aboutParagraphs = req.body.aboutParagraphs;
      if (Array.isArray(req.body.infoItems))
        homeData.infoItems = req.body.infoItems;
    }
    await homeData.save();

    await logActivity({
      req,
      action: "Updated Home Page Content",
      module: "Home Page",
      details: "Updated Announcement, Email & About Paragraphs",
    });

    res.status(200).json({
      success: true,
      message: "Home Page updated live successfully!",
      data: homeData,
    });
  } catch (error) {
    next(error);
  }
};
