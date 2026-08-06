import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../../services/api";
import {
  FaFileUpload,
  FaCheckCircle,
  FaExclamationCircle,
  FaFileAlt,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";

const reCaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6Lce1-QqAAAAAEz7x4_exampleKeyHere";

const PaperSubmission = () => {
  const [pageInfo, setPageInfo] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Country Search & Custom Country State
  const [countrySearch, setCountrySearch] = useState("");
  const [isCustomCountry, setIsCustomCountry] = useState(false);
  const [customCountryName, setCustomCountryName] = useState("");

  // reCAPTCHA Token State
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);

  // Custom Dropdown Open States
  const [openDropdown, setOpenDropdown] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    titlePrefix: "Dr.",
    authorName: "",
    email: "",
    postalAddress: "",
    country: "India",
    journalName:
      "International Journal of Social Science, Arts and Humanities Research",
    articleType: "",
    articleTitle: "",
    abstract: "",
    agreeTerms: false,
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const titlePrefixOptions = ["Dr.", "Prof.", "Mr.", "Ms.", "Mrs."];
  const journalOptions = [
    "International Journal of Social Science, Arts and Humanities Research (IJSSAHR)",
  ];
  const countryOptions = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Nigeria",
    "Egypt",
    "Malaysia",
    "Indonesia",
    "Pakistan",
    "Bangladesh",
    "Saudi Arabia",
    "United Arab Emirates",
    "China",
    "Japan",
    "Brazil",
    "South Africa",
    "Turkey",
    "Philippines",
    "Vietnam",
    "Kenya",
    "Ghana",
    "Italy",
    "Spain",
    "Russia",
    "South Korea",
    "Singapore",
    "Other Country",
  ];

  useEffect(() => {
    const fetchPageInfo = async () => {
      try {
        const response = await API.get("/manuscript-page");
        setPageInfo(response.data.data);
      } catch (err) {
        console.error("Failed to load submission instructions:", err);
      } finally {
        setLoadingPage(false);
      }
    };

    fetchPageInfo();

    // Inject Google reCAPTCHA v2 Script if configured
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".custom-select-container")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (submitError) setSubmitError("");
  };

  const handleSelectCustom = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setOpenDropdown(null);
    if (submitError) setSubmitError("");
  };

  const handleCountrySelect = (countryName) => {
    if (countryName === "Other Country") {
      setIsCustomCountry(true);
      setFormData((prev) => ({ ...prev, country: customCountryName || "" }));
    } else {
      setIsCustomCountry(false);
      setCustomCountryName("");
      setFormData((prev) => ({ ...prev, country: countryName }));
    }
    setOpenDropdown(null);
    setCountrySearch("");
    if (submitError) setSubmitError("");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!formData.agreeTerms) {
      setSubmitError("Please accept the Terms of Service and Privacy Policy to proceed.");
      return;
    }

    if (!selectedFile) {
      setSubmitError("Please attach your manuscript doc/pdf file.");
      return;
    }

    // Skip reCAPTCHA check if running on localhost or dev environment
    const isLocalhost =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.includes("192.168."));

    if (!isLocalhost && window.grecaptcha && window.grecaptcha.getResponse) {
      const token = window.grecaptcha.getResponse();
      if (!token && !isCaptchaChecked) {
        setSubmitError("Please verify the Security Check ('I'm not a robot') to proceed.");
        return;
      }
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      data.append("file", selectedFile);

      const response = await API.post("/manuscripts/submit", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSubmitError("");
      setSubmitSuccess(
        response.data.message ||
          "Paper Submitted Successfully! Please check your registered email for confirmation."
      );

      // Reset form
      setFormData({
        titlePrefix: "Dr.",
        authorName: "",
        email: "",
        postalAddress: "",
        country: "India",
        journalName:
          "International Journal of Social Science, Arts and Humanities Research",
        articleType: "",
        articleTitle: "",
        abstract: "",
        agreeTerms: false,
      });
      setSelectedFile(null);
      setIsCustomCountry(false);
      setCustomCountryName("");

      try {
        if (window.grecaptcha && typeof window.grecaptcha.reset === "function") {
          window.grecaptcha.reset();
        }
      } catch (recaptchaErr) {
        // Ignore recaptcha reset error on localhost / unrendered widget
      }
    } catch (err) {
      setSubmitSuccess("");
      setSubmitError(
        err.response?.data?.message ||
          err.message ||
          "Failed to submit manuscript. Please check all fields and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-4 font-sans text-slate-800 w-full"
    >
      {/* Page Title & Instructions Box */}
      <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h1 className="text-base md:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 m-0">
          {pageInfo?.title || "Paper Submission"}
        </h1>

        <div className="space-y-2 text-[13px] leading-relaxed text-slate-700 font-normal">
          <h3 className="font-bold text-slate-900 text-[14px] m-0">
            {pageInfo?.heading || "Submission Instructions"}
          </h3>
          <p className="m-0 text-[13px] text-slate-700 leading-relaxed">
            {pageInfo?.content ||
              `When submitting papers for potential publication in the IJSSAHR, please submit an original editable file in one of the (.doc, .pdf) style files. All figures, images, tables, etc., should be embedded into the original file.`}
          </p>

          <p className="font-semibold text-slate-900 m-0 text-[13px]">
            All manuscripts must be submitted electronically through our Online Submission System below or via e-mail to the editor at:{" "}
            <a
              href={`mailto:${pageInfo?.submissionEmail || "editor@ijssahr.com"}`}
              className="text-blue-600 font-bold hover:underline"
            >
              {pageInfo?.submissionEmail || "editor@ijssahr.com"}
            </a>
          </p>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/70 space-y-1">
            <h4 className="font-bold text-slate-900 text-[13px] m-0">Copyright:</h4>
            <p className="text-slate-600 m-0 text-[12px] leading-relaxed">
              {pageInfo?.copyrightNotice ||
                `Copyrights for articles published in ${
                  pageInfo?.journalName ||
                  "International Journal of Social Science, Arts and Humanities Research"
                } are retained by the authors, with first publication rights granted to the journal.`}
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-[14px] m-0">
              {pageInfo?.onlineSubmissionTitle || "Online Submission System"}
            </h4>
            <p className="text-slate-600 m-0 text-[12px]">
              {pageInfo?.onlineSubmissionText ||
                'After submission you will get "Submission Acknowledgement" on your Email within 1 to 2 Working days.'}
            </p>
            <p className="text-amber-900 font-medium bg-amber-50/80 p-2 rounded-lg border border-amber-200/60 m-0 text-[12px]">
              <span className="font-bold">Note:</span>{" "}
              {pageInfo?.noteText ||
                "After Successfully Submitting your Manuscript Please inform to the editor about your submission at:"}{" "}
              <a
                href={`mailto:${pageInfo?.submissionEmail || "editor@ijssahr.com"}`}
                className="font-bold text-blue-700 hover:underline"
              >
                {pageInfo?.submissionEmail || "editor@ijssahr.com"}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Manuscript Submission Input Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3.5 text-xs font-medium">
        <h2 className="text-xs md:text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 m-0">
          <FaFileAlt className="text-blue-600 text-xs" /> Enter Manuscript & Author Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Custom Styled Title Prefix Dropdown */}
          <div className="relative custom-select-container">
            <label className="block mb-1 font-bold text-slate-800">
              Title Prefix:<span className="text-red-500 ml-0.5">*</span>
            </label>
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "prefix" ? null : "prefix")}
              className="w-full flex items-center justify-between p-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-left cursor-pointer text-xs"
            >
              <span>{formData.titlePrefix}</span>
              <FaChevronDown className="text-slate-500 text-xs shrink-0" />
            </button>
            {openDropdown === "prefix" && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-30 py-1 overflow-hidden">
                {titlePrefixOptions.map((opt) => (
                  <div
                    key={opt}
                    onClick={() => handleSelectCustom("titlePrefix", opt)}
                    className={`px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                      formData.titlePrefix === opt
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Author Name */}
          <div>
            <label className="block mb-1 font-bold text-slate-800 text-[11.5px]">
              Full Name:<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="text"
              name="authorName"
              required
              value={formData.authorName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 font-medium text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Email ID */}
          <div>
            <label className="block mb-1 font-bold text-slate-800 text-[11.5px]">
              Email ID:<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email ID"
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 font-medium text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Postal Address */}
          <div>
            <label className="block mb-1 font-bold text-slate-800 text-[11.5px]">
              Postal Address:<span className="text-red-500 ml-0.5">*</span>
            </label>
            <textarea
              name="postalAddress"
              required
              rows="2"
              value={formData.postalAddress}
              onChange={handleChange}
              placeholder="Postal Address with pincode"
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 font-medium text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 resize-none"
            />
          </div>

          {/* Searchable Country Dropdown & Custom Country Option */}
          <div className="relative custom-select-container">
            <label className="block mb-1 font-bold text-slate-800 text-[11.5px]">
              Country:<span className="text-red-500 ml-0.5">*</span>
            </label>
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "country" ? null : "country")}
              className="w-full flex items-center justify-between p-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 font-medium text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-left cursor-pointer"
            >
              <span>{isCustomCountry ? (customCountryName ? `Other: ${customCountryName}` : "Other Country (Type Manually)") : (formData.country || "Select Country")}</span>
              <FaChevronDown className="text-slate-500 text-xs shrink-0" />
            </button>

            {openDropdown === "country" && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-md shadow-xl z-30 overflow-hidden flex flex-col max-h-64">
                {/* Search Box inside Dropdown */}
                <div className="p-2 border-b border-slate-200 bg-slate-50 shrink-0">
                  <div className="relative">
                    <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                      type="text"
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      placeholder="Type country name to search..."
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Country List */}
                <div className="overflow-y-auto custom-scrollbar flex-1 py-1">
                  {countryOptions
                    .filter((c) => c.toLowerCase().includes(countrySearch.toLowerCase()))
                    .map((c) => (
                      <div
                        key={c}
                        onClick={() => handleCountrySelect(c)}
                        className={`px-3 py-2 text-xs font-medium cursor-pointer transition-colors ${
                          (isCustomCountry && c === "Other Country") || (!isCustomCountry && formData.country === c)
                            ? "bg-blue-600 text-white font-semibold"
                            : "text-slate-800 hover:bg-slate-100"
                        }`}
                      >
                        {c}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* If 'Other Country' selected, show custom text input */}
            {isCustomCountry && (
              <div className="mt-2">
                <input
                  type="text"
                  required
                  value={customCountryName}
                  onChange={(e) => {
                    setCustomCountryName(e.target.value);
                    setFormData((prev) => ({ ...prev, country: e.target.value }));
                  }}
                  placeholder="Specify your country name manually..."
                  className="w-full p-2.5 bg-white border border-blue-400 rounded-md text-slate-900 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            )}
          </div>

          {/* Custom Styled Journal Name Dropdown */}
          <div className="relative custom-select-container">
            <label className="block mb-1 font-bold text-slate-800">
              Journal Name:<span className="text-red-500 ml-0.5">*</span>
            </label>
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "journal" ? null : "journal")}
              className="w-full flex items-center justify-between p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-left cursor-pointer"
            >
              <span className="truncate pr-2">{formData.journalName}</span>
              <FaChevronDown className="text-slate-500 text-xs shrink-0" />
            </button>
            {openDropdown === "journal" && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-30 py-1 overflow-hidden">
                {journalOptions.map((opt) => (
                  <div
                    key={opt}
                    onClick={() =>
                      handleSelectCustom(
                        "journalName",
                        "International Journal of Social Science, Arts and Humanities Research"
                      )
                    }
                    className="px-3 py-2 text-xs font-semibold bg-blue-600 text-white cursor-pointer"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Article Type Text Input */}
          <div>
            <label className="block mb-1 font-bold text-slate-800">
              Article Type:<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="text"
              name="articleType"
              required
              value={formData.articleType}
              onChange={handleChange}
              placeholder="e.g. Research Paper, Review Paper, Case Study..."
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Article Title */}
          <div>
            <label className="block mb-1 font-bold text-slate-800">
              Article Title:<span className="text-red-500 ml-0.5">*</span>
            </label>
            <textarea
              name="articleTitle"
              required
              rows="2"
              value={formData.articleTitle}
              onChange={handleChange}
              placeholder="Article Title"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 resize-none"
            />
          </div>
        </div>

        {/* Abstract */}
        <div>
          <label className="block mb-1 font-bold text-slate-800">
            Abstract:<span className="text-red-500 ml-0.5">*</span>
          </label>
          <textarea
            name="abstract"
            required
            rows="4"
            value={formData.abstract}
            onChange={handleChange}
            placeholder="Abstract"
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 resize-y"
          />
        </div>

        {/* File Attachment */}
        <div>
          <label className="block mb-1 font-bold text-slate-800">
            Attach Your File:(Only add doc file)<span className="text-red-500 ml-0.5">*</span>
          </label>
          <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-300 rounded-md">
            <label className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer font-bold transition-all shadow-xs">
              <FaFileUpload className="text-xs" /> Choose File
              <input
                type="file"
                accept=".doc,.docx,.pdf"
                required
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="text-slate-600 font-medium truncate">
              {selectedFile ? selectedFile.name : "No file chosen"}
            </span>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="agreeTerms" className="text-slate-700 cursor-pointer font-medium">
            I agree to <span className="text-blue-600 font-bold hover:underline">Terms of Service and Privacy Policy</span> <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Official Google reCAPTCHA v2 Component / Localhost Fallback */}
        <div className="space-y-1.5 pt-1">
          <label className="font-bold text-slate-800 block">
            Security Check<span className="text-red-500 ml-0.5">*</span>
          </label>
          
          {typeof window !== "undefined" &&
          (window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1" ||
            window.location.hostname.includes("192.168.")) ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md flex items-center gap-2.5 text-xs text-emerald-900 font-medium">
              <span className="h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px]">✓</span>
              <span>Security Check: <strong className="text-emerald-700">Verified (Dev Localhost Mode)</strong></span>
            </div>
          ) : (
            <div className="g-recaptcha" data-sitekey={reCaptchaSiteKey} />
          )}
        </div>

        {/* Submit Button & Inline Feedback Message */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-md shadow-md shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            {submitting ? "Submitting Manuscript..." : "Submit"}
          </button>

          {submitError && (
            <div className="flex-1 flex items-center gap-2.5 p-3 bg-red-50 border border-red-200 text-red-900 text-xs font-medium rounded-md animate-fadeIn shadow-xs">
              <FaExclamationCircle className="text-red-600 text-base shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {submitSuccess && !submitError && (
            <div className="flex-1 flex items-center gap-2.5 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium rounded-md animate-fadeIn shadow-xs">
              <FaCheckCircle className="text-emerald-600 text-base shrink-0" />
              <div>
                <span className="font-bold text-emerald-800 block">Paper Submitted Successfully!</span>
                <span className="text-[11px] text-emerald-700">
                  Please check your email for confirmation & check website for review updates.
                </span>
              </div>
            </div>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default PaperSubmission;
