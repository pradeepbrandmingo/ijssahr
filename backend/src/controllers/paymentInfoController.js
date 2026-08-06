import PaymentInfo from "../models/PaymentInfo.js";

// @desc    Get payment info (Public)
// @route   GET /api/v1/payment-info
export const getPaymentInfo = async (req, res, next) => {
  try {
    let payment = await PaymentInfo.findOne();
    if (!payment) {
      payment = await PaymentInfo.create({});
    }
    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update payment info (SuperAdmin)
// @route   PUT /api/v1/payment-info
export const updatePaymentInfo = async (req, res, next) => {
  try {
    let payment = await PaymentInfo.findOne();
    if (!payment) {
      payment = new PaymentInfo(req.body);
    } else {
      payment.header = req.body.header || payment.header;
      payment.feeInfo = req.body.feeInfo || payment.feeInfo;
      payment.alternativeNotice = req.body.alternativeNotice || payment.alternativeNotice;
      if (req.body.copyrightForm) {
        payment.copyrightForm = req.body.copyrightForm;
      }
    }
    await payment.save();
    res.status(200).json({
      success: true,
      message: "Payment settings updated successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload Copyright Form PDF (SuperAdmin)
// @route   POST /api/v1/payment-info/upload-copyright-pdf
export const uploadCopyrightPdf = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file for the Copyright Form",
      });
    }

    const pdfRelativePath = `/uploads/${req.file.filename}`;

    let payment = await PaymentInfo.findOne();
    if (!payment) {
      payment = new PaymentInfo({});
    }

    payment.copyrightForm = {
      title: req.body.title || "IJSSAHR Copyright Form PDF",
      pdfUrl: pdfRelativePath,
    };

    await payment.save();

    res.status(200).json({
      success: true,
      message: "Copyright Form PDF uploaded & published live successfully!",
      pdfUrl: pdfRelativePath,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};
