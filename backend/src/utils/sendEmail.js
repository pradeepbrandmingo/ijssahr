import nodemailer from "nodemailer";

/**
 * Send dual automated notification emails on manuscript submission
 * @param {Object} manuscript - The created manuscript database object
 */
export const sendManuscriptEmails = async (manuscript) => {
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  const companyEmail =
    process.env.COMPANY_EMAIL ||
    process.env.SUBMISSION_EMAIL ||
    smtpUser ||
    "editor@ijssahr.com";

  // Check if SMTP is configured
  if (!smtpUser || !smtpPass) {
    console.warn(
      "[EMAIL SERVICE] SMTP credentials (SMTP_USER / SMTP_PASS) not configured in .env. Skipping email delivery."
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const journalName =
    manuscript.journalName ||
    "International Journal of Social Science, Arts and Humanities Research (IJSSAHR)";

  // -------------------------------------------------------------
  // EMAIL 1: Confirmation Email to Submitter / Author
  // -------------------------------------------------------------
  const authorMailOptions = {
    from: `"${journalName} Editorial Team" <${smtpUser}>`,
    to: manuscript.email,
    subject: `[Submission Received] ${manuscript.articleTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #1e293b; margin: 0;">${journalName}</h2>
          <p style="color: #64748b; font-size: 13px; margin-top: 5px;">Manuscript Submission Acknowledgement</p>
        </div>

        <p style="color: #334155; font-size: 15px;">Dear <strong>${manuscript.titlePrefix} ${manuscript.authorName}</strong>,</p>

        <p style="color: #475569; line-height: 1.6; font-size: 14px;">
          Thank you for submitting your research paper to <strong>${journalName}</strong>. We have successfully received your manuscript and it has been logged into our system for initial editorial screening and peer review.
        </p>

        <div style="background-color: #eff6ff; padding: 14px 16px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0; color: #1e40af; font-size: 14px; font-weight: 600; line-height: 1.5;">
          Thank you for submitting manuscript you will receive submission acknowledgement soon by editor with assign paper ID with in 1 to 2 working days.
        </div>

        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
          <h4 style="margin: 0 0 10px 0; color: #1e293b; font-size: 14px;">Submission Summary:</h4>
          <p style="margin: 4px 0; font-size: 13px; color: #334155;"><strong>Article Title:</strong> ${manuscript.articleTitle}</p>
          <p style="margin: 4px 0; font-size: 13px; color: #334155;"><strong>Article Type:</strong> ${manuscript.articleType}</p>
          <p style="margin: 4px 0; font-size: 13px; color: #334155;"><strong>Author Email:</strong> ${manuscript.email}</p>
          <p style="margin: 4px 0; font-size: 13px; color: #334155;"><strong>Country:</strong> ${manuscript.country}</p>
          <p style="margin: 4px 0; font-size: 13px; color: #334155;"><strong>Assigned Paper ID:</strong> <em>Will be sent manually by IJSSAHR editor in official acknowledgement email within 1-2 working days.</em></p>
          <p style="margin: 4px 0; font-size: 13px; color: #334155;"><strong>Submitted File:</strong> <a href="${manuscript.fileUrl}" target="_blank" style="color: #2563eb;">View Uploaded Document</a></p>
        </div>

        <p style="color: #475569; line-height: 1.6; font-size: 14px;">
          Our editorial team will review your manuscript and notify you of the peer-review decision shortly.
        </p>

        <p style="color: #475569; font-size: 14px; margin-top: 30px;">
          Best Regards,<br/>
          <strong>Editorial Board</strong><br/>
          ${journalName}
        </p>
      </div>
    `,
  };

  // -------------------------------------------------------------
  // EMAIL 2: Notification Email to Company / Journal Admin
  // -------------------------------------------------------------
  const companyMailOptions = {
    from: `"IJSSAHR Portal System" <${smtpUser}>`,
    to: companyEmail,
    subject: `🚨 [NEW MANUSCRIPT SUBMISSION] ${manuscript.articleTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #cbd5e1; background-color: #ffffff;">
        <div style="background-color: #0f172a; padding: 16px; text-align: center; border-radius: 6px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 18px;">New Manuscript Alert</h2>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 4px;">IJSSAHR Editorial Portal</p>
        </div>

        <p style="color: #334155; font-size: 14px; margin-top: 20px;">
          A new manuscript has been submitted online through the IJSSAHR Paper Submission system.
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px;">
          <tr style="background: #f1f5f9;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Author Name</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${manuscript.titlePrefix} ${manuscript.authorName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Author Email</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${manuscript.email}</td>
          </tr>
          <tr style="background: #f1f5f9;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Country & Address</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${manuscript.country} (${manuscript.postalAddress})</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Article Type</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${manuscript.articleType}</td>
          </tr>
          <tr style="background: #f1f5f9;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Article Title</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #1e40af;">${manuscript.articleTitle}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Abstract</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-style: italic;">${manuscript.abstract}</td>
          </tr>
          <tr style="background: #eff6ff;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Manuscript File Link</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">
              <a href="${manuscript.fileUrl}" target="_blank" style="display: inline-block; padding: 6px 12px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">
                Open / Download Document
              </a>
            </td>
          </tr>
        </table>

        <p style="color: #64748b; font-size: 12px; margin-top: 20px; text-align: center;">
          Log in to the Admin Dashboard under <strong>Manage Manuscripts</strong> to assign reviewers or update submission status.
        </p>
      </div>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(authorMailOptions),
      transporter.sendMail(companyMailOptions),
    ]);
    console.log(`[EMAIL SERVICE] Both confirmation emails sent successfully for manuscript: ${manuscript._id}`);
  } catch (error) {
    console.error("[EMAIL ERROR] Failed to send automated emails:", error.message);
  }
};
