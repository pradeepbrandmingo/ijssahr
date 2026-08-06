import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-[#070b28] text-white py-1 sm:py-2 border-t border-slate-800/40">
      <div className="container mx-auto px-0 sm:px-0 flex flex-col items-center justify-center">
        <div className="w-full max-w-0xl mx-auto text-center flex flex-col items-center">
          
          {/* Copyright */}
          <p className="text-xs sm:text-[13px] font-semibold tracking-wide text-white mt-1">
            © 2026 IJSSAHR All Rights Reserved
          </p>

          {/* Privacy Statement */}
          <p className="text-[11px] leading-relaxed text-slate-300 font-normal mb-2">
            <span className="font-semibold text-white">Privacy Statement:</span> The names and email addresses entered in this journal site will be used exclusively for the stated purposes of this Publication and will not be made available for any other purpose or to any other party.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
