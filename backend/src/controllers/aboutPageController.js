import { AboutPage } from "../models/AboutPage.js";

const defaultAboutData = {
  header: {
    title: "About Us",
    intro:
      "International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is an international, double-blind peer-reviewed, open-access journal published by Alicon Publications.",
  },
  journalInfo: [
    { label: "Starting Year", value: "2026" },
    { label: "Subject Area", value: "Social Science, Arts and Humanities" },
    { label: "Format", value: "Online" },
    { label: "Language", value: "English" },
    { label: "Publisher", value: "Alicon Publications" },
  ],
  description:
    "IJSSAHR aims to provide a valuable outlet for research and scholarship on Social Science, Arts and Humanities-orientated themes and topics. It publishes articles of a multi-disciplinary and interdisciplinary nature as well as empirical research from within traditional disciplines and managerial functions. With contributions from around the globe, the journal includes articles across the full range of Social Science, Arts and Humanities disciplines.",
  ethicsStatement: {
    title: "IJSSAHR Publication Ethics Statement",
    intro:
      "The publisher/journal is dedicated to maintaining the highest level of integrity in the work published. The journal and its publisher follow the Committee on Publication Ethics (COPE)'s Core Practices. It is expected of authors, reviewers, and editors that they follow the best-practice guidelines on ethical behaviour contained therein. In addition, some key points are listed below.",
  },
  sections: [
    {
      title: "Editor's Responsibilities",
      points: [
        {
          heading: "Fair operation",
          text: "Editors evaluate submitted manuscripts with reference only to their academic merit (importance, originality, study’s validity, clarity) and their relevance to the journal’s scope. Editors should act in a balanced, objective, and unbiased manner regarding the race, gender, sexual orientation, ethnic origin, citizenship, religious belief, political philosophy, or institutional affiliation of the authors.",
        },
        {
          heading: "Editorial independence",
          text: "Decisions to accept or reject a work are determined only by the journal itself, not by the policies of governments or any other agencies. The Editor-in-Chief has full authority over the entire editorial process of the journal and the timing of publication of the editorial content.",
        },
        {
          heading: "Confidentiality and disclosure",
          text: "Editors should ensure that submitted manuscripts are processed in a confidential manner and that no content of the manuscripts is disclosed to anyone other than the corresponding author, reviewers, and the publisher, as appropriate.",
        },
        {
          heading: "Conflicts of interest",
          text: "Editors should recuse themselves from processing manuscripts if they have any conflict of interest resulting from competitive, collaborative, or other relationships/connections with any of the authors, companies, or institutions related to the manuscripts.",
        },
        {
          heading: "Decision making",
          text: "Editors should ensure that all submitted manuscripts being considered for publication are peer-reviewed by at least two reviewers who are experts in the research field.",
        },
        {
          heading: "Cooperation in investigations",
          text: "Editors should respond promptly and take reasonable measures when an ethical complaint arises concerning a submitted manuscript or published paper.",
        },
      ],
    },
    {
      title: "Reviewer's Responsibilities",
      points: [
        {
          heading: "Assistance in editorial process",
          text: "Peer review is an essential component of formal scholarly communication. It assists editors in making editorial decisions and helps authors improve their manuscripts.",
        },
        {
          heading: "Timeliness",
          text: "If reviewers should feel unqualified to review the assigned manuscript or affirm that they cannot meet the deadline for completion of the review, they should immediately notify the editor.",
        },
        {
          heading: "Confidentiality",
          text: "Reviewers should treat the manuscript in a confidential manner.",
        },
        {
          heading: "Objectivity",
          text: "Reviewers should approach the peer-review job objectively. Personal criticism of the authors is unacceptable.",
        },
        {
          heading: "Acknowledgement of sources",
          text: "Reviewers should notify the editors of any substantial similarity or overlap between the manuscript under consideration and any other manuscript.",
        },
        {
          heading: "Conflicts of interest and disclosure",
          text: "Reviewers should inform the editor and recuse themselves from reviewing the manuscript if there is a conflict of interest.",
        },
      ],
    },
    {
      title: "Author's Responsibilities",
      points: [
        {
          heading: "Precise reporting",
          text: "Authors should present a precise and brief report of their research followed by an impartial description of its significance.",
        },
        {
          heading: "Data and reproducibility",
          text: "Authors should gather and interpret their research data honestly.",
        },
        {
          heading: "Originality and plagiarism",
          text: "Authors should guarantee that the works they have submitted are original. Plagiarism in all its forms constitutes unethical publishing behaviour.",
        },
        {
          heading: "Concurrent submission and secondary publication",
          text: "Submission of a manuscript concurrently to more than one journal is unethical publishing behaviour and unacceptable.",
        },
        {
          heading: "Authorship and contributorship",
          text: "Authors must be able to take public responsibility for the content. Only persons who meet authorship criteria should be listed.",
        },
        {
          heading: "Conflicts of interest and disclosure",
          text: "Authors should include a statement to disclose any conflicts of interest that might be construed to influence the results.",
        },
        {
          heading: "Acknowledgement of sources",
          text: "Appropriate acknowledgement and citations are required.",
        },
        {
          heading: "Hazards and human or animal subjects",
          text: "If the work involves live subjects, all procedures must conform to relevant laws and institutional guidelines.",
        },
        {
          heading: "Peer review",
          text: "Authors have a duty to take part in the peer review process and cooperate actively.",
        },
        {
          heading: "Correction or retraction of published works",
          text: "Authors should promptly inform the journal editor of any obvious error(s) in their published paper.",
        },
      ],
    },
    {
      title: "Publisher's Responsibilities",
      points: [
        {
          heading: "Dealing with unethical publishing behaviour",
          text: "The publisher, in close collaboration with the editors, should take all effective measures to handle cases such as scientific misconduct or plagiarism.",
        },
      ],
    },
  ],
  license: {
    title: "Creative Commons Attribution License (CC-BY)",
    text: "All articles published by IJSSAHR will be distributed under the terms and conditions of the Creative Commons Attribution License(CC-BY). So anyone is allowed to copy, distribute, and transmit the article on condition that the original article and source is correctly cited.",
  },
};

// @desc    Get About Page Data (Public)
// @route   GET /api/v1/about-page
export const getAboutPageData = async (req, res, next) => {
  try {
    let aboutData = await AboutPage.findOne();
    if (!aboutData) {
      aboutData = await AboutPage.create(defaultAboutData);
    }
    res.status(200).json({
      success: true,
      data: aboutData,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update About Page Data (SuperAdmin)
// @route   PUT /api/v1/about-page
export const updateAboutPageData = async (req, res, next) => {
  try {
    let aboutData = await AboutPage.findOne();
    if (!aboutData) {
      aboutData = new AboutPage(req.body);
    } else {
      if (req.body.header) aboutData.header = req.body.header;
      if (Array.isArray(req.body.journalInfo))
        aboutData.journalInfo = req.body.journalInfo;
      if (req.body.description !== undefined)
        aboutData.description = req.body.description;
      if (req.body.ethicsStatement)
        aboutData.ethicsStatement = req.body.ethicsStatement;
      if (Array.isArray(req.body.sections))
        aboutData.sections = req.body.sections;
      if (req.body.license) aboutData.license = req.body.license;
    }
    await aboutData.save();
    res.status(200).json({
      success: true,
      message: "About Us Page content updated live successfully!",
      data: aboutData,
    });
  } catch (error) {
    next(error);
  }
};
