import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiMapPin, FiGlobe, FiShield } from "react-icons/fi";
import { HiOutlineMail, HiOutlineInformationCircle } from "react-icons/hi";
import API from "../../services/api";

const defaultContactData = {
  title: "Contact Us",
  journalName:
    "International Journal of Social Science, Arts and Humanities Research",
  publishedBy: "Alicon Publications",
  organizationalEmail: "aliconpublications@gmail.com",
  address:
    "Near ICICI Bank, Subhash Marg, Shamgarh (Madhya Pradesh) India, 458883",
  email: "info@ijssahr.com",
  website: "https://www.ijssahr.com",
  infoHtml:
    'Alicon Publications is a private, for-profit organization dedicated to providing support and services to educators and researchers across India and around the world.<br/>The trade name "Alicon Publications" is officially registered under the Madhya Pradesh Establishment Act, 1958, with the Online Registration Mark & Number: <span class="text-[var(--primary)] font-semibold">C/1525726</span>.',
  license: {
    title: "Licensed under Creative Commons Attribution 3.0",
    text: "This work is licensed under a Creative Commons Attribution 3.0 International License.",
    imageUrl: "https://licensebuttons.net/l/by-sa/3.0/88x31.png",
  },
};

const ContactContent = () => {
  const { data: serverData } = useQuery({
    queryKey: ["contact-info-public"],
    queryFn: async () => {
      const res = await API.get("/contact-info");
      return res.data?.data || defaultContactData;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const contactData = serverData || defaultContactData;

  const detailsList = [
    {
      id: 1,
      type: "user",
      label: "Published by",
      value: contactData.publishedBy || "Alicon Publications",
      link: null,
    },
    {
      id: 2,
      type: "mail",
      label: "Organizational E-mail",
      value: contactData.organizationalEmail || "aliconpublications@gmail.com",
      link: `mailto:${contactData.organizationalEmail || "aliconpublications@gmail.com"}`,
    },
    {
      id: 3,
      type: "map-pin",
      label: "Address",
      value:
        contactData.address ||
        "Near ICICI Bank, Subhash Marg, Shamgarh (Madhya Pradesh) India, 458883",
      link: null,
    },
    {
      id: 4,
      type: "mail",
      label: "E-mail",
      value: contactData.email || "info@ijssahr.com",
      link: `mailto:${contactData.email || "info@ijssahr.com"}`,
    },
    {
      id: 5,
      type: "globe",
      label: "Website",
      value: contactData.website || "https://www.ijssahr.com",
      link: contactData.website || "https://www.ijssahr.com",
    },
  ];

  const getIcon = (type) => {
    const iconClass =
      "text-blue-600 text-xs shrink-0 transition-transform duration-300 group-hover:scale-110";
    switch (type) {
      case "user":
        return <FiUser className={iconClass} />;
      case "mail":
        return <FiMail className={iconClass} />;
      case "map-pin":
        return <FiMapPin className={iconClass} />;
      case "globe":
        return <FiGlobe className={iconClass} />;
      default:
        return <div className="w-3.5 h-3.5"></div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full max-w-full overflow-hidden space-y-3"
    >
      {/* Page Title */}
      <div className="mb-2">
        <h1 className="text-base sm:text-lg font-bold text-slate-900 m-0 border-b-2 border-blue-600 pb-0.5 inline-block">
          {contactData.title || "Contact Us"}
        </h1>
      </div>

      {/* Main Contact Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5 sm:p-4 shadow-2xs space-y-3 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
          {/* Left Icon */}
          <div className="shrink-0 hidden sm:flex justify-center">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
              <HiOutlineMail className="text-blue-600 text-lg" />
            </div>
          </div>

          <div className="flex-1 w-full space-y-2.5">
            {/* Journal Name Header */}
            <div className="border-b border-dashed border-slate-200 pb-2">
              <h2 className="text-[13.5px] font-semibold text-slate-900 leading-snug m-0">
                {contactData.journalName ||
                  "International Journal of Social Science, Arts and Humanities Research"}
              </h2>
            </div>

            {/* Contact Details List */}
            <div className="space-y-1.5">
              {detailsList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2.5 group p-1 -mx-1 rounded-md hover:bg-slate-50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="text-[12px] flex-1 leading-snug">
                    <span className="font-semibold text-slate-700 mr-1.5">
                      {item.label}:
                    </span>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-blue-600 font-normal hover:underline break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-slate-600 font-normal">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Info Box */}
            {contactData.infoHtml && (
              <div className="bg-slate-50 p-3 rounded-md border border-slate-200/80 flex items-start gap-2.5">
                <HiOutlineInformationCircle className="text-blue-600 text-base shrink-0 mt-0.5" />
                <p
                  className="text-[11.5px] font-normal text-slate-600 m-0 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: contactData.infoHtml }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* License Card */}
      {contactData.license && (
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-2xs">
              <FiShield className="text-sm" />
            </div>
            <div>
              <h3 className="text-[12.5px] font-semibold text-slate-800 m-0 leading-tight">
                {contactData.license.title ||
                  "Licensed under Creative Commons Attribution 3.0"}
              </h3>
              <p className="text-[11.5px] font-normal text-slate-500 m-0 leading-tight mt-0.5">
                {contactData.license.text ||
                  "This work is licensed under a Creative Commons Attribution 3.0 International License."}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex justify-start sm:justify-end">
            <img
              src={
                contactData.license.imageUrl ||
                "https://licensebuttons.net/l/by-sa/3.0/88x31.png"
              }
              alt="CC License"
              className="h-[24px] w-[70px] sm:h-[28px] sm:w-[80px]"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ContactContent;
