import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import Logo from "../images/ijssahr-logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileSearchOpen(false);
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleMobileSearch = () => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen((prev) => !prev);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearchQuery("");
    setIsSearchOpen(false);
    setIsMobileSearchOpen(false);
  };

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Subtle shadow / compact state on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [location.pathname]);

  // Focus mobile search input when it opens
  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  const navLinks = [
    {
      path: "/",
      label: "Home",
      icon: <AiOutlineHome style={{ fontSize: "18px" }} />,
    },
    {
      path: "/about-us",
      label: "About Us",
      icon: <BsPeople style={{ fontSize: "18px" }} />,
    },
  ];

  return (
    <header
      className="w-full bg-white sticky top-0 z-50 transition-shadow duration-300"
      style={{
        fontFamily: "var(--font-primary)",
        boxShadow: isScrolled
          ? "0 4px 20px rgba(15, 23, 42, 0.08)"
          : "0 1px 0 rgba(15, 23, 42, 0.06)",
      }}
    >
      {/* Top Header */}
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 pt-4 pb-3 md:py-6">
          {/* Logo & Title */}
          <div className="flex items-center justify-between md:justify-start gap-2.5 sm:gap-4 w-full md:w-auto">
            <Link
              to="/"
              className="flex items-start gap-2.5 sm:gap-4 min-w-0 shrink"
            >
              <img
                src={Logo}
                alt="IJSSAHR Logo"
                className="w-[42px] h-[42px] sm:w-[64px] sm:h-[64px] lg:w-[78px] lg:h-[78px] object-contain shrink-0 mt-0.5 md:mt-0 transition-transform duration-300 hover:scale-105"
              />
              <div className="flex flex-col justify-center min-w-0">
                <h1
                  className="font-bold m-0"
                  style={{
                    color: "var(--primary-dark)",
                    fontSize: "clamp(13px, 3.8vw, 24px)",
                    lineHeight: "1.2",
                  }}
                >
                  International Journal of Social Science, Arts and Humanities
                  Research
                </h1>
                <p
                  className="mt-0.5 md:mt-1 m-0"
                  style={{
                    color: "var(--text-light)",
                    fontSize: "clamp(10px, 2.4vw, 14px)",
                    lineHeight: "1.3",
                  }}
                >
                  Promoting Interdisciplinary Research. Advancing Global
                  Knowledge.
                </p>
              </div>
            </Link>

            {/* Mobile menu toggle (visible on small screens only) */}
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full cursor-pointer shrink-0 transition-all duration-200 active:scale-95"
              style={{
                backgroundColor: isMobileMenuOpen
                  ? "var(--primary)"
                  : "var(--primary-light)",
                color: isMobileMenuOpen ? "#ffffff" : "var(--primary)",
                border: isMobileMenuOpen
                  ? "1px solid var(--primary)"
                  : "1px solid #d6e4ff",
                boxShadow: isMobileMenuOpen ? "var(--shadow-sm)" : "none",
              }}
            >
              {isMobileMenuOpen ? (
                <FiX style={{ fontSize: "20px" }} />
              ) : (
                <FiMenu style={{ fontSize: "20px" }} />
              )}
            </button>
          </div>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-4 lg:gap-5 shrink-0">
            <div
              className="font-semibold flex items-center gap-1.5 shrink-0 whitespace-nowrap"
              style={{ color: "var(--heading)", fontSize: "14px" }}
            >
              ISSN&nbsp;:{" "}
              <span className="font-bold" style={{ color: "var(--primary)" }}>
                3139-5805
              </span>
            </div>

            <div
              className="hidden lg:block w-px h-6"
              style={{ backgroundColor: "var(--border)" }}
            />

            {/* Expandable Search Bar */}
            <div
              className="relative shrink-0"
              style={{ width: "38px", height: "38px" }}
              ref={searchInputRef}
            >
              <motion.form
                onSubmit={handleSearchSubmit}
                initial={false}
                animate={{ width: isSearchOpen ? "240px" : "38px" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute right-0 top-0 flex items-center overflow-hidden"
                style={{
                  height: "38px",
                  borderColor: isSearchOpen
                    ? "var(--primary)"
                    : "var(--border)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  backgroundColor: isSearchOpen ? "#ffffff" : "transparent",
                  borderRadius: "var(--radius-sm)",
                  zIndex: 10,
                  boxShadow: isSearchOpen ? "var(--shadow-sm)" : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isSearchOpen) {
                      handleSearchSubmit({ preventDefault: () => {} });
                    } else {
                      setIsSearchOpen(true);
                    }
                  }}
                  aria-label={isSearchOpen ? "Submit search" : "Open search"}
                  className="flex items-center justify-center shrink-0 cursor-pointer outline-none border-none bg-transparent absolute left-0"
                  style={{
                    width: "38px",
                    height: "38px",
                    color: isSearchOpen ? "var(--primary)" : "var(--text)",
                  }}
                >
                  <FiSearch style={{ fontSize: "17px" }} />
                </button>
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.input
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search articles..."
                      className="w-full h-full bg-transparent border-none outline-none pr-3"
                      style={{
                        color: "var(--primary-dark)",
                        fontSize: "14px",
                        paddingLeft: "38px",
                      }}
                      autoFocus
                    />
                  )}
                </AnimatePresence>
              </motion.form>
            </div>

            <Link
              to="/submit"
              className="flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-md shrink-0"
              style={{
                backgroundColor: "var(--primary)",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                padding: "10px 18px",
                borderRadius: "var(--radius-sm)",
                whiteSpace: "nowrap",
                boxShadow: "var(--shadow-sm)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--primary-hover)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--primary)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <HiOutlineDocumentText
                style={{ fontSize: "17px", color: "#ffffff" }}
              />
              <span style={{ color: "#ffffff" }}>Submit Manuscript</span>
            </Link>
          </div>

          {/* ISSN badge + Search - mobile/tablet row */}
          <div
            className="flex md:hidden flex-col w-full mt-2 border rounded-xl"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "#ffffff",
              boxShadow: "var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05))",
              padding: "12px 24px",
            }}
          >
            <div className="flex items-center justify-between w-full">
              <div
                className="font-semibold flex items-center gap-1.5"
                style={{ color: "var(--heading)", fontSize: "13px" }}
              >
                ISSN&nbsp;:{" "}
                <span className="font-bold" style={{ color: "var(--primary)" }}>
                  3139-5805
                </span>
              </div>
              <button
                onClick={toggleMobileSearch}
                className="w-10 h-10 flex items-center justify-center rounded-full shrink-0 transition-all duration-200 active:scale-95"
                style={{
                  backgroundColor: isMobileSearchOpen
                    ? "var(--primary)"
                    : "var(--primary-light)",
                  color: isMobileSearchOpen ? "#ffffff" : "var(--primary)",
                  border: isMobileSearchOpen
                    ? "1px solid var(--primary)"
                    : "1px solid #d6e4ff",
                  boxShadow: isMobileSearchOpen ? "var(--shadow-sm)" : "none",
                }}
                aria-label="Toggle search"
                aria-expanded={isMobileSearchOpen}
              >
                {isMobileSearchOpen ? (
                  <FiX style={{ fontSize: "17px" }} />
                ) : (
                  <FiSearch style={{ fontSize: "17px" }} />
                )}
              </button>
            </div>

            <AnimatePresence>
              {isMobileSearchOpen && (
                <motion.form
                  onSubmit={handleSearchSubmit}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className="flex items-center gap-2 mt-3 pl-3.5 pr-1.5"
                    style={{
                      height: "44px",
                      border: "1.5px solid var(--primary)",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "#ffffff",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <FiSearch
                      style={{
                        fontSize: "16px",
                        color: "var(--primary)",
                        flexShrink: 0,
                      }}
                    />
                    <input
                      ref={mobileSearchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search articles..."
                      className="flex-1 h-full min-w-0 bg-transparent border-none outline-none"
                      style={{
                        color: "var(--primary-dark)",
                        fontSize: "14px",
                      }}
                    />
                    <button
                      type="submit"
                      aria-label="Submit search"
                      className="shrink-0 font-semibold transition-colors duration-200"
                      style={{
                        color: "#ffffff",
                        backgroundColor: "var(--primary)",
                        fontSize: "13px",
                        padding: "8px 16px",
                        borderRadius: "var(--radius-full)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--primary-hover)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--primary)";
                      }}
                    >
                      Go
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Header (Nav Links) - Desktop / Tablet */}
      <div
        className="hidden md:block w-full"
        style={{ backgroundColor: "var(--primary-dark)" }}
      >
        <div className="container">
          <nav className="flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-2 font-medium relative text-white"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.02em",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                    opacity: isActive ? 1 : 0.85,
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = "1";
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = "0.85";
                  }}
                >
                  <span className="text-white flex items-center">
                    {link.icon}
                  </span>
                  <span className="text-white">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicatorDesktop"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px]"
                      style={{ backgroundColor: "var(--primary)" }}
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden w-full absolute left-0"
            style={{
              backgroundColor: "#ffffff",
              borderTop: "1px solid var(--border)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              top: "100%",
              zIndex: 50,
            }}
          >
            <div className="container">
              <nav className="flex flex-col pt-2 pb-3 gap-1">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.2 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 transition-all duration-200"
                        style={{
                          color: isActive ? "var(--primary)" : "var(--text)",
                          backgroundColor: isActive
                            ? "var(--primary-light, #eff6ff)"
                            : "transparent",
                          fontWeight: isActive ? "600" : "500",
                          fontSize: "14.5px",
                          borderRadius: "8px",
                        }}
                      >
                        <span
                          className="flex items-center justify-center shrink-0"
                          style={{
                            fontSize: "18px",
                            color: isActive
                              ? "var(--primary)"
                              : "var(--text-light, #64748b)",
                          }}
                        >
                          {link.icon}
                        </span>
                        <span>{link.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                <div
                  className="pt-3 mt-1 border-t"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Link
                    to="/submit"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full font-semibold transition-all duration-200 active:scale-95"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "#ffffff",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      fontSize: "15px",
                      boxShadow: "0 4px 14px rgba(0, 75, 221, 0.25)",
                    }}
                  >
                    <HiOutlineDocumentText
                      style={{ fontSize: "18px", color: "#ffffff" }}
                    />
                    <span style={{ color: "#ffffff" }}>Submit Manuscript</span>
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
