import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-[#070b28] text-white py-5 md:py-7 border-t border-slate-800/40">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl mx-auto text-center flex flex-col items-center gap-2.5 sm:gap-3">
          
          {/* Copyright */}
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-white">
            © 2026 IJSSAHR All Rights Reserved
          </p>

          {/* Privacy Statement - Bright high-contrast text sitting in 2 clean lines */}
          <p className="text-xs sm:text-[13px] leading-relaxed text-slate-200 max-w-5xl font-normal">
            <span className="font-bold text-white">Privacy Statement:</span> The names and email addresses entered in this journal site will be used exclusively for the stated purposes of this Publication and will not be made available for any other purpose or to any other party.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
