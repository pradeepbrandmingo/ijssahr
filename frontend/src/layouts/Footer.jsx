import React from "react";

const Footer = () => {
  return (
    <footer
      className="w-full mt-auto"
      style={{
        backgroundColor: "var(--primary-dark)",
        paddingTop: "30px",
        paddingBottom: "10px",
      }}
    >
      <div className="container mx-auto px-5 sm:px-6 flex flex-col items-center justify-center">
        <div
          className="w-full max-w-6xl mx-auto text-center flex flex-col items-center"
          style={{ gap: "16px" }}
        >
          <p
            className="text-[12.5px] md:text-[13.5px] font-medium tracking-wider"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            © 2026 IJSSAHR All Rights Reserved
          </p>

          <p
            className="text-[12px] md:text-[13px] leading-relaxed w-full max-w-[98%] md:max-w-full"
            style={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            Privacy Statement: The names and email addresses entered in this
            journal site will be used exclusively for the stated purposes of
            this Publication and will not be made available for any other
            purpose or to any other party.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
