import { StaticPage } from "../models/StaticPage.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

// Default content seed map for all frontend pages
const DEFAULT_PAGES = [
  {
    pageKey: "paper-submission",
    title: "Paper Submission",
    subtitle: "Submit your research manuscript online for peer review",
    heading: "Submission Instructions",
    content: `When submitting papers for potential publication in the IJSSAHR, please submit an original editable file in one of the (.doc, .pdf) style files. All figures, images, tables, etc., should be embedded into the original file. Detailed instructions on preparing papers for submission can be found in the Template Paper. Further information on the scope of the IJSSAHR is also available upon inquiry of prospective authors. Authors accept the terms of the Honor Code and Plagiarism Statement for Paper Submission, and that the paper is original research contribution with the references properly cited in the manuscript.`,
    copyrightNotice: `Copyrights for articles published in International Journal of Social Science, Arts and Humanities Research are retained by the authors, with first publication rights granted to the journal. It is the author's responsibility to bring an infringement action if so desired by the author.`,
    onlineSubmissionTitle: "Online Submission System",
    onlineSubmissionText: `After submission you will get "Submission Acknowledgement" on your Email within 1 to 2 Working days, so please check your Inbox or Spam box after the Submission`,
    noteText: `After Successfully Submitting your Manuscript Please inform to the editor about your submission at:`,
    submissionEmail: "editor@ijssahr.com",
    journalName: "International Journal of Social Science, Arts and Humanities Research",
  },
];

/**
 * @desc Get page content by key (Public access for all frontend pages)
 * @route GET /api/v1/pages/:pageKey
 * @access Public
 */
export const getPageByKey = AsyncHandler(async (req, res) => {
  const { pageKey } = req.params;

  let page = await StaticPage.findOne({ pageKey });

  if (!page) {
    const defaultData = DEFAULT_PAGES.find((p) => p.pageKey === pageKey);
    if (defaultData) {
      page = await StaticPage.create(defaultData);
    } else {
      page = await StaticPage.create({
        pageKey,
        title: pageKey.replace("-", " ").toUpperCase(),
        content: `Content for ${pageKey} page will be updated soon.`,
      });
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, page, "Page content fetched successfully"));
});

/**
 * @desc Get all static pages (SuperAdmin list)
 * @route GET /api/v1/pages
 * @access Private (SuperAdmin)
 */
export const getAllPages = AsyncHandler(async (req, res) => {
  for (const defaultPage of DEFAULT_PAGES) {
    const exists = await StaticPage.findOne({ pageKey: defaultPage.pageKey });
    if (!exists) {
      await StaticPage.create(defaultPage);
    }
  }

  const pages = await StaticPage.find().sort({ createdAt: 1 });
  return res
    .status(200)
    .json(new ApiResponse(200, pages, "All pages fetched successfully"));
});

/**
 * @desc Update page content by pageKey (SuperAdmin edit any field)
 * @route PUT /api/v1/pages/:pageKey
 * @access Private (SuperAdmin)
 */
export const updatePageByKey = AsyncHandler(async (req, res) => {
  const { pageKey } = req.params;
  const updateData = req.body;

  const page = await StaticPage.findOneAndUpdate(
    { pageKey },
    { $set: updateData },
    { new: true, upsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, page, `${page.title} updated successfully`));
});
