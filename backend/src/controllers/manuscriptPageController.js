import { ManuscriptPage } from "../models/ManuscriptPage.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

/**
 * @desc Get Manuscript Submission Page content
 * @route GET /api/v1/manuscript-page
 * @access Public
 */
export const getManuscriptPageDetails = AsyncHandler(async (req, res) => {
  let page = await ManuscriptPage.findOne({ pageKey: "manuscript-submission" });

  if (!page) {
    page = await ManuscriptPage.create({
      pageKey: "manuscript-submission",
      title: "Paper Submission",
      heading: "Submission Instructions",
      content: `When submitting papers for potential publication in the IJSSAHR, please submit an original editable file in one of the (.doc, .pdf) style files. All figures, images, tables, etc., should be embedded into the original file. Detailed instructions on preparing papers for submission can be found in the Template Paper. Further information on the scope of the IJSSAHR is also available upon inquiry of prospective authors. Authors accept the terms of the Honor Code and Plagiarism Statement for Paper Submission, and that the paper is original research contribution with the references properly cited in the manuscript.`,
      copyrightNotice: `Copyrights for articles published in International Journal of Social Science, Arts and Humanities Research are retained by the authors, with first publication rights granted to the journal.`,
      onlineSubmissionTitle: "Online Submission System",
      onlineSubmissionText: `After submission you will get "Submission Acknowledgement" on your Email within 1 to 2 Working days, so please check your Inbox or Spam box after the Submission`,
      noteText: `After Successfully Submitting your Manuscript Please inform to the editor about your submission at:`,
      submissionEmail: "editor@ijssahr.com",
      journalName:
        "International Journal of Social Science, Arts and Humanities Research",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, page, "Manuscript page details fetched successfully"));
});

/**
 * @desc Update Manuscript Submission Page content (SuperAdmin)
 * @route PUT /api/v1/manuscript-page
 * @access Private (SuperAdmin)
 */
export const updateManuscriptPageDetails = AsyncHandler(async (req, res) => {
  const updateData = req.body;

  const page = await ManuscriptPage.findOneAndUpdate(
    { pageKey: "manuscript-submission" },
    { $set: updateData },
    { new: true, upsert: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        page,
        "Manuscript submission page content updated successfully"
      )
    );
});
