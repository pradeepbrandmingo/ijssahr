import React from 'react';

const AboutContent = () => {
  // Dummy data representing future backend response
  const dummyAboutData = {
    header: {
      title: "About Us",
      intro: "International Journal of Social Science, Arts and Humanities Research (IJSSAHR) is an international, double-blind peer-reviewed, open-access journal published by Alicon Publications."
    },
    journalInfo: [
      { label: "Starting Year", value: "2026" },
      { label: "Subject Area", value: "Social Science, Arts and Humanities" },
      { label: "Format", value: "Online" },
      { label: "Language", value: "English" },
      { label: "Publisher", value: "Alicon Publications" }
    ],
    description: "IJSSAHR aims to provide a valuable outlet for research and scholarship on Social Science, Arts and Humanities-orientated themes and topics. It publishes articles of a multi-disciplinary and interdisciplinary nature as well as empirical research from within traditional disciplines and managerial functions. With contributions from around the globe, the journal includes articles across the full range of Social Science, Arts and Humanities disciplines.",
    ethicsStatement: {
      title: "IJSSAHR Publication Ethics Statement",
      intro: "The publisher/journal is dedicated to maintaining the highest level of integrity in the work published. The journal and its publisher follow the Committee on Publication Ethics (COPE)'s Core Practices. It is expected of authors, reviewers, and editors that they follow the best-practice guidelines on ethical behaviour contained therein. In addition, some key points are listed below."
    },
    sections: [
      {
        title: "Editor's Responsibilities",
        points: [
          {
            heading: "Fair operation",
            text: "Editors evaluate submitted manuscripts with reference only to their academic merit (importance, originality, study’s validity, clarity) and their relevance to the journal’s scope. Editors should act in a balanced, objective, and unbiased manner regarding the race, gender, sexual orientation, ethnic origin, citizenship, religious belief, political philosophy, or institutional affiliation of the authors."
          },
          {
            heading: "Editorial independence",
            text: "Decisions to accept or reject a work are determined only by the journal itself, not by the policies of governments or any other agencies. The Editor-in-Chief has full authority over the entire editorial process of the journal and the timing of publication of the editorial content."
          },
          {
            heading: "Confidentiality and disclosure",
            text: "Editors should ensure that submitted manuscripts are processed in a confidential manner and that no content of the manuscripts is disclosed to anyone other than the corresponding author, reviewers, and the publisher, as appropriate. The editor should not use for his or her own research any part of any data or work reported in submitted or yet unpublished articles. Privileged information or ideas obtained by editors as a result of processing the manuscript will be kept confidential and not used for their personal advantage."
          },
          {
            heading: "Conflicts of interest",
            text: "Editors should recuse themselves from processing manuscripts if they have any conflict of interest resulting from competitive, collaborative, or other relationships/connections with any of the authors, companies, or institutions related to the manuscripts; instead, they should ask another member of the editorial board to handle the manuscript."
          },
          {
            heading: "Decision making",
            text: "Editors should ensure that all submitted manuscripts being considered for publication are peer-reviewed by at least two reviewers who are experts in the research field. The Editor-in-Chief has the right to make the final decision on whether to accept or reject a manuscript with reference to the significance, originality, and clarity of the manuscript, as well as the reviewers’ comments and such legal requirements as are currently in force regarding libel, copyright infringement, and plagiarism. The Editor-in-Chief may confer with other editors or reviewers in making decisions."
          },
          {
            heading: "Cooperation in investigations",
            text: "Editors should respond promptly and take reasonable measures when an ethical complaint arises concerning a submitted manuscript or published paper. Every reported act of unethical publishing behaviour will be investigated, even if it is discovered years after publication. Editors will follow the COPE Flowcharts when dealing with cases of suspected misconduct. If, upon investigation, the ethical concern is well-founded, a written formal retraction or correction will be published in the journal."
          }
        ]
      },
      {
        title: "Reviewer's Responsibilities",
        points: [
          {
            heading: "Assistance in editorial process",
            text: "Peer review is an essential component of formal scholarly communication. It assists editors in making editorial decisions and helps authors improve their manuscripts. The journal shares the view of many that all scholars who wish to contribute to the scientific process have an obligation to do a fair share of reviewing."
          },
          {
            heading: "Timeliness",
            text: "If reviewers should feel unqualified to review the assigned manuscript or affirm that they cannot meet the deadline for completion of the review, they should immediately notify the editor and excuse themselves from the process of reviewing this manuscript so that alternative reviewers can be contacted."
          },
          {
            heading: "Confidentiality",
            text: "Reviewers should treat the manuscript in a confidential manner. The manuscript should not be disclosed to or discussed with others except as authorized by the editor (who would only do so under exceptional and specific circumstances). This also applies to invited reviewers who decline the review invitation."
          },
          {
            heading: "Objectivity",
            text: "Reviewers should approach the peer-review job objectively. Their observations should be formulated clearly with supporting arguments so that the authors can use them for improving the manuscript. Personal criticism of the authors is unacceptable."
          },
          {
            heading: "Acknowledgement of sources",
            text: "Reviewers should notify the editors of any substantial similarity or overlap between the manuscript under consideration and any other manuscript either published or under consideration by another journal. Reviewers should also identify any relevant published works that have not been cited by the authors. Any statement that is an observation, derivation, or argument that has been reported in previous publications should be accompanied by the relevant citation."
          },
          {
            heading: "Conflicts of interest and disclosure",
            text: "Reviewers should inform the editor and recuse themselves from reviewing the manuscript if there is a conflict of interest resulting from competitive, collaborative, or other relationships/connections with any of the authors, companies, or institutions connected to the manuscript and decline the invitation to review so that alternative reviewers can be contacted. Reviewers should not use any part of any data or work reported in submitted or yet unpublished articles in their own research without the express written consent of the authors. Privileged information or ideas obtained through peer review must be kept confidential and not used for the reviewer’s personal advantage. This also applies to invited reviewers who decline the review invitation."
          }
        ]
      },
      {
        title: "Author's Responsibilities",
        points: [
          {
            heading: "Precise reporting",
            text: "Authors should present a precise and brief report of their research followed by an impartial description of its significance. Manuscripts should contain sufficient detail and references to permit readers to replicate the work. Review articles should be accurate, objective, and comprehensive, while editorial “opinion” or perspective pieces should be clearly identified as such. Fraudulent or knowingly inaccurate statements constitute unethical behaviour and are unacceptable."
          },
          {
            heading: "Data and reproducibility",
            text: "Authors should gather and interpret their research data honestly. Publishers, editors, and reviewers are entitled to request from the author the raw data for the study for convenience of editorial review and public access if practicable. Authors should retain such data for at least 10 years for any possible use after publication (preferably via an institutional or subject-based data repository or other data centre), provided that the confidentiality of the participants can be protected and legal rights concerning proprietary data do not preclude their release."
          },
          {
            heading: "Originality and plagiarism",
            text: "Authors should guarantee that the works they have submitted are original. If the author has used work and/or words by others, appropriate citations are required. Publications that have been influential in determining the nature of the work reported in the manuscript should also be cited. Plagiarism in all its forms (“passing off” another’s paper as the author’s own, copying or paraphrasing substantial parts of another’s paper without attribution, claiming results from research conducted by others, etc.) constitutes unethical publishing behaviour and is unacceptable."
          },
          {
            heading: "Concurrent submission and secondary publication",
            text: "Submission of a manuscript concurrently to more than one journal is unethical publishing behaviour and unacceptable. Authors should not submit concurrent manuscripts (or manuscripts essentially describing the same subject matter) to multiple journals. Likewise, authors should not submit any paper previously published anywhere to the journals for consideration.\n\nThe publication of articles on specific subject matter, such as clinical guidelines and translations, in more than one journal is acceptable if certain conditions are met. The authors and editors of the journals concerned must agree to the secondary publication, which must reflect the same data and interpretation of the primary document. The primary reference must be cited in the secondary publication."
          },
          {
            heading: "Authorship and contributorship",
            text: "Authors must be able to take public responsibility for the content. Only persons who meet the following authorship criteria should be listed as authors in the manuscript: those who (i) made significant contributions to the conception, design, execution, data acquisition, or analysis/interpretation of the study; (ii) drafted the manuscript or revised it critically for important intellectual content; and (iii) have seen and approved the final version of the paper and agreed to its submission for publication.\n\nThe persons who made substantial contributions to the work reported in the manuscript (such as technical help, writing and editing assistance, and general support) but who do not meet the criteria for authorship must not be listed as authors but should be acknowledged in the “Acknowledgements” section after their written permission to be named has been obtained.\n\nCorresponding authors should ensure that the author list is appropriately determined according to the above definition and that all coauthors have approved the final version of the manuscript and its submission for publication."
          },
          {
            heading: "Conflicts of interest and disclosure",
            text: "Authors should include a statement to disclose any conflicts of interest that might be construed to influence the results or their interpretation on the first stage of the paper submission. The potential conflicts of interest that should be disclosed include financial ones, such as honoraria, educational grants, or other funding; participation in speakers’ bureaus, membership, employment, consultancies, stock ownership, or other equity interest; and paid expert testimony or patent-licensing arrangements, as well as non-financial conflicts of interest, such as personal or professional relationships, affiliations, knowledge, or beliefs in the subject matter or materials discussed in the manuscript. All sources of financial support for the work should be clearly stated (including the grant number or other reference number if any)."
          },
          {
            heading: "Acknowledgement of sources",
            text: "If the author has used work and/or words by others that have been influential in determining the nature of the reported work, appropriate acknowledgement and citations are required. Information obtained privately (from conversation, correspondence, or discussion with third parties) must not be used or reported without explicit, written permission from the source. Information obtained in the course of providing confidential services, such as refereeing manuscripts or grant applications, should not be used unless the explicit written permission of the author(s) of the work involved in these services has been obtained."
          },
          {
            heading: "Hazards and human or animal subjects",
            text: "If the work involves chemicals, procedures, or equipment that have any unusual hazards inherent in their use, the authors must state so clearly in the manuscript. If the work involves live subjects (human or animal), the authors should ensure that all procedures conform to relevant laws and institutional guidelines. The manuscript should contain a statement that the appropriate institutional committee(s) has approved it. Authors should also include a statement in the manuscript that informed consent was obtained for experimentation with human participants. The privacy rights of human participants must always be observed."
          },
          {
            heading: "Peer review",
            text: "Authors have a duty to take part in the peer review process and cooperate actively by responding promptly to editors’ requests for raw data, clarifications, proof of ethics approval, patient consents, and copyright permissions. In the case of a decision of “revisions required,” authors should respond to the reviewers’ comments timely and systematically, point by point, revising and re-submitting the manuscript to the journal by the deadline given."
          },
          {
            heading: "Correction or retraction of published works",
            text: "Authors should promptly inform the journal editor or publisher of any obvious error(s) in their published paper and cooperate earnestly with the editor in the correction or retraction of the paper. If the editors or publisher learns from a third party that a published work contains an obvious error or inaccuracy, it is the obligation of the authors to promptly correct or retract the paper or provide evidence to the journal editors of the correctness of the paper."
          }
        ]
      },
      {
        title: "Publisher's Responsibilities",
        points: [
          {
            heading: "Dealing with unethical publishing behaviour",
            text: "The publisher, in close collaboration with the editors, should take all effective measures to handle cases such as alleged or proven scientific misconduct, fraudulent publication, or plagiarism. These measures may include the prompt publication of an erratum, clarification, or, in the worst case, retraction of the affected work. The publisher, working together with the editors, shall take reasonable actions to identify and prevent the publication of papers where research misconduct has occurred and shall by no means encourage or knowingly allow such misconduct."
          }
        ]
      }
    ],
    license: {
      title: "Creative Commons Attribution License (CC-BY)",
      text: "All articles published by IJSSAHR will be distributed under the terms and conditions of the Creative Commons Attribution License(CC-BY). So anyone is allowed to copy, distribute, and transmit the article on condition that the original article and source is correctly cited."
    }
  };

  const pStyle = "text-[14px] md:text-[15px] text-[var(--text)] leading-[1.8]";

  return (
    <div className="w-full animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-8 lg:p-10 mb-10">
        
        {/* Page Title Header (Inside Card like Home Page) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-3">
          <h1 className="text-[16px] md:text-[18px] font-bold text-[var(--heading)] m-0">
            International Journal of Social Science, Arts and Humanities Research
          </h1>
          <span className="font-bold text-[var(--heading)] text-[16px] md:text-[18px] shrink-0">
            IJSSAHR
          </span>
        </div>

        {/* About Us Title & Intro */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--primary-dark)] mb-4">
            {dummyAboutData.header.title}
          </h2>
          <p className={pStyle}>
            {dummyAboutData.header.intro}
          </p>
        </div>

        {/* Info List Section */}
        <div className="mb-6 space-y-2">
          {dummyAboutData.journalInfo.map((info, index) => (
            <p key={index} className="text-[14px] md:text-[15px] m-0">
              <span className="font-bold text-[var(--heading)]">{info.label}:</span> <span className="text-[var(--text)]">{info.value}</span>
            </p>
          ))}
        </div>

        {/* Description Section */}
        <div className="mb-10">
          <p className={pStyle}>
            {dummyAboutData.description}
          </p>
        </div>

        {/* Ethics Statement Header */}
        <div className="mb-8">
          <h2 className="text-lg md:text-xl font-bold text-[var(--heading)] mb-4">
            {dummyAboutData.ethicsStatement.title}
          </h2>
          <p className={pStyle}>
            {dummyAboutData.ethicsStatement.intro}
          </p>
        </div>

        {/* Dynamic Sections (Responsibilities) */}
        <div className="space-y-8 mb-10">
          {dummyAboutData.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg md:text-xl font-bold text-[var(--primary)] mb-4">
                {section.title}
              </h3>
              <div className="space-y-5">
                {section.points.map((point, pointIndex) => (
                  <div key={pointIndex}>
                    <h4 className="text-[15px] md:text-[16px] font-bold text-[var(--heading)] mb-1.5">
                      {point.heading}
                    </h4>
                    {point.text.split('\n\n').map((paragraph, i) => (
                      <p key={i} className={`${pStyle} ${i > 0 ? 'mt-3' : ''}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* License Section */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-[var(--heading)] mb-4">
            {dummyAboutData.license.title}
          </h3>
          <p className={pStyle}>
            {dummyAboutData.license.text}
          </p>
          
          {/* Right Aligned License Badge and Text */}
          <div className="flex flex-col items-end w-full mt-4 gap-2">
            <img 
              src="https://licensebuttons.net/l/by-sa/3.0/88x31.png" 
              alt="Creative Commons License" 
              className="h-[31px] w-[88px]"
            />
            <p className="text-[13px] md:text-[14px] font-bold text-[var(--heading)] m-0 text-right">
              Licensed under Creative Common Attribute 3.0
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutContent;
