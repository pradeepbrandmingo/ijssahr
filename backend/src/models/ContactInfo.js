import mongoose from "mongoose";

const contactDetailItemSchema = new mongoose.Schema({
  type: { type: String, default: "mail" }, // user, mail, map-pin, globe
  label: { type: String, required: true },
  value: { type: String, required: true },
  link: { type: String, default: "" },
});

const contactInfoSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Contact Us" },
    journalName: {
      type: String,
      default:
        "International Journal of Social Science, Arts and Humanities Research",
    },
    publishedBy: { type: String, default: "Alicon Publications" },
    organizationalEmail: {
      type: String,
      default: "aliconpublications@gmail.com",
    },
    address: {
      type: String,
      default:
        "Near ICICI Bank, Subhash Marg, Shamgarh (Madhya Pradesh) India, 458883",
    },
    email: { type: String, default: "info@ijssahr.com" },
    website: { type: String, default: "https://www.ijssahr.com" },
    infoHtml: {
      type: String,
      default:
        'Alicon Publications is a private, for-profit organization dedicated to providing support and services to educators and researchers across India and around the world.<br/>The trade name "Alicon Publications" is officially registered under the Madhya Pradesh Establishment Act, 1958, with the Online Registration Mark & Number: <span class="text-[var(--primary)] font-semibold">C/1525726</span>.',
    },
    license: {
      title: {
        type: String,
        default: "Licensed under Creative Commons Attribution 3.0",
      },
      text: {
        type: String,
        default:
          "This work is licensed under a Creative Commons Attribution 3.0 International License.",
      },
      imageUrl: {
        type: String,
        default: "https://licensebuttons.net/l/by-sa/3.0/88x31.png",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("ContactInfo", contactInfoSchema);
