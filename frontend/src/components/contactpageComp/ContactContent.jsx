import React from 'react';
import { FiUser, FiMail, FiMapPin, FiGlobe, FiShield } from 'react-icons/fi';
import { HiOutlineMail, HiOutlineInformationCircle } from 'react-icons/hi';

const ContactContent = () => {
  // Dummy data representing future backend response
  const dummyContactData = {
    title: "Contact Us",
    journalName: "International Journal of Social Science, Arts and Humanities Research",
    details: [
      { id: 1, type: "user", label: "Published by", value: "Aicon Publications", link: null },
      { id: 2, type: "mail", label: "Organizational E-mail", value: "aliconpublications@gmail.com", link: "mailto:aliconpublications@gmail.com" },
      { id: 3, type: "map-pin", label: "Address", value: "Near ICICI Bank, Subhash Marg, Shamgarh (Madhya Pradesh) India, 458883", link: null },
      { id: 4, type: "mail", label: "E-mail", value: "info@ijssahr.com", link: "mailto:info@ijssahr.com" },
      { id: 5, type: "globe", label: "Website", value: "https://www.ijssahr.com", link: "https://www.ijssahr.com" }
    ],
    infoHtml: `Alicon Publications is a private, for-profit organization dedicated to providing support and services to educators and researchers across India and around the world.<br/>The trade name "Alicon Publications" is officially registered under the Madhya Pradesh Establishment Act, 1958, with the Online Registration Mark & Number: <span class="text-[var(--primary)] font-semibold">C/1525726</span>.`,
    license: {
      title: "Licensed under Creative Commons Attribution 3.0",
      text: "This work is licensed under a Creative Commons Attribution 3.0 International License.",
      imageUrl: "https://licensebuttons.net/l/by-sa/3.0/88x31.png"
    }
  };

  const getIcon = (type) => {
    const iconClass = "text-[var(--primary)] text-[15px] md:text-[17px] shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3";
    switch (type) {
      case 'user': return <FiUser className={iconClass} />;
      case 'mail': return <FiMail className={iconClass} />;
      case 'map-pin': return <FiMapPin className={iconClass} />;
      case 'globe': return <FiGlobe className={iconClass} />;
      default: return <div className="w-[18px] h-[18px]"></div>;
    }
  };

  return (
    <div className="w-full animate-fade-in">
      
      {/* Page Title */}
      <div className="mb-5">
        <h1 className="text-xl md:text-[24px] font-bold text-[var(--primary-dark)] m-0 inline-block border-b-[3px] border-[var(--primary)] pb-1 hover:scale-[1.02] transition-transform duration-300 origin-left">
          {dummyContactData.title}
        </h1>
      </div>

      {/* Main Contact Card */}
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 p-4 md:p-6 lg:p-7 mb-6 transition-all duration-300 hover:border-blue-100 group/card relative overflow-hidden">
        
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -z-10 group-hover/card:bg-blue-100/50 transition-colors duration-500"></div>

        <div className="flex flex-col md:flex-row gap-5 md:gap-6 relative z-10">
          
          {/* Large Left Icon */}
          <div className="shrink-0 flex justify-center md:justify-start">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shadow-inner group-hover/card:scale-105 transition-transform duration-300">
              <HiOutlineMail className="text-[var(--primary)] text-2xl md:text-[28px]" />
            </div>
          </div>

          <div className="flex-1 w-full">
            {/* Journal Name Header */}
            <div className="border-b border-dashed border-slate-200 pb-3 mb-4">
              <h2 className="text-[15px] md:text-[16px] font-bold text-[var(--heading)] m-0 group-hover/card:text-[var(--primary-dark)] transition-colors duration-300">
                {dummyContactData.journalName}
              </h2>
            </div>

            {/* Contact Details List */}
            <div className="space-y-2 mb-6">
              {dummyContactData.details.map((item, idx) => (
                <div key={item.id} 
                  className="flex items-start gap-3 group p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 cursor-default"
                >
                  <div className="mt-0.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0 group-hover:border-blue-200 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                    {getIcon(item.type)}
                  </div>
                  <div className="text-[13px] md:text-[14px] pt-1 flex-1">
                    <span className="font-bold text-[var(--heading)] mr-1.5">{item.label}:</span>
                    {item.link ? (
                      <a href={item.link} className="text-[var(--primary)] font-medium hover:text-blue-800 transition-colors break-all relative inline-block group-hover:after:w-full after:w-0 after:h-[1px] after:bg-blue-800 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-[var(--text)] group-hover:text-slate-700 transition-colors">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="bg-slate-50/70 p-4 md:p-5 rounded-xl border border-slate-100 flex items-start gap-3 hover:bg-slate-50 transition-colors duration-300 hover:shadow-sm">
              <HiOutlineInformationCircle className="text-[var(--primary)] text-xl md:text-2xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <p 
                className="text-[12px] md:text-[13px] text-[var(--text)] m-0 leading-[1.6]"
                dangerouslySetInnerHTML={{ __html: dummyContactData.infoHtml }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* License Card */}
      <div className="bg-blue-50/50 hover:bg-blue-50/80 transition-colors duration-300 rounded-xl border border-blue-100 p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8 hover:shadow-sm group/license cursor-default">
        <div className="flex items-start md:items-center gap-3 md:gap-4">
          <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white shadow-sm group-hover/license:scale-110 group-hover/license:rotate-12 transition-transform duration-300">
            <FiShield className="text-xl md:text-2xl" />
          </div>
          <div>
            <h3 className="text-[13px] md:text-[14px] font-bold text-[var(--heading)] m-0 mb-1 group-hover/license:text-[var(--primary-dark)] transition-colors">
              {dummyContactData.license.title}
            </h3>
            <p className="text-[12px] md:text-[13px] text-[var(--text)] m-0">
              {dummyContactData.license.text}
            </p>
          </div>
        </div>
        
        <div className="shrink-0 flex justify-start md:justify-end group-hover/license:opacity-90 group-hover/license:scale-105 transition-all duration-300 origin-right">
          <img 
            src={dummyContactData.license.imageUrl} 
            alt="CC License" 
            className="h-[28px] w-[80px] md:h-[31px] md:w-[88px]"
          />
        </div>
      </div>

    </div>
  );
};

export default ContactContent;
