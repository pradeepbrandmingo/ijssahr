import ContactInfo from "../models/ContactInfo.js";

// @desc    Get Contact Info (Public)
// @route   GET /api/v1/contact-info
export const getContactInfo = async (req, res, next) => {
  try {
    let contact = await ContactInfo.findOne();
    if (!contact) {
      contact = await ContactInfo.create({});
    }
    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Contact Info (SuperAdmin)
// @route   PUT /api/v1/contact-info
export const updateContactInfo = async (req, res, next) => {
  try {
    let contact = await ContactInfo.findOne();
    if (!contact) {
      contact = new ContactInfo(req.body);
    } else {
      contact.title = req.body.title || contact.title;
      contact.journalName = req.body.journalName || contact.journalName;
      contact.publishedBy = req.body.publishedBy || contact.publishedBy;
      contact.organizationalEmail =
        req.body.organizationalEmail || contact.organizationalEmail;
      contact.address = req.body.address || contact.address;
      contact.email = req.body.email || contact.email;
      contact.website = req.body.website || contact.website;
      contact.infoHtml = req.body.infoHtml || contact.infoHtml;
      if (req.body.license) {
        contact.license = req.body.license;
      }
    }
    await contact.save();
    res.status(200).json({
      success: true,
      message: "Contact Info updated live successfully!",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
