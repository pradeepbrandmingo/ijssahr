import mongoose from "mongoose";

const paymentInfoSchema = new mongoose.Schema(
  {
    header: {
      title: { type: String, default: "Mode of Payment" },
      subtitle: {
        type: String,
        default: "Secure online payment options for publication processing fee (APC).",
      },
    },
    feeInfo: {
      title: { type: String, default: "Payment of Publication Fee" },
      amount: { type: String, default: "$60.00 USD" },
      currency: { type: String, default: "USD" },
      paragraphs: {
        type: [String],
        default: [
          "If you have a credit card or PayPal account, we strongly encourage you to pay the fee through PayPal. PayPal enables users, whether or not they are PayPal members, to use all major credit cards, including Visa, Mastercard, Discover, and American Express. PayPal is fast, secure, and free.",
          "Processing Fee has to be paid only if your article gets accepted for publication. If you are unable to pay through PayPal, you can contact the editorial assistant at info@ijssahr.com for alternative methods like Bank Transfer / Wire Transfer, Western Union money transfer etc.",
        ],
      },
      contactEmail: { type: String, default: "info@ijssahr.com" },
      paypalLink: { type: String, default: "https://www.paypal.com/ncp/payment/G7WW5ZB5EWNQL" },
      cardPayLink: { type: String, default: "https://www.paypal.com/ncp/payment/G7WW5ZB5EWNQL" },
    },
    copyrightForm: {
      title: { type: String, default: "IJSSAHR Copyright Form PDF" },
      pdfUrl: { type: String, default: "" },
    },
    alternativeNotice: {
      title: { type: String, default: "Need Alternative Payment Options?" },
      text: {
        type: String,
        default:
          "If you cannot pay using PayPal or Credit Card, you can request Bank Transfer / Wire Transfer or Western Union details by emailing info@ijssahr.com.",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("PaymentInfo", paymentInfoSchema);
