import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import {
  BiArchive,
  BiCreditCard,
  BiBarChart,
  BiCopyright,
  BiEnvelope,
  BiTargetLock,
} from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiChevronDown, FiChevronUp, FiList } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    {
      path: "/current-issue",
      label: "Current Issue",
      icon: <AiOutlineHome className="text-[20px]" />,
    },
    { path: "/archive", label: "Archive", icon: <BiArchive className="text-[20px]" /> },
    {
      path: "/editorial-board",
      label: "Editorial Board",
      icon: <BsPeople className="text-[20px]" />,
    },
    {
      path: "/instructions",
      label: "Instructions for Authors",
      icon: <HiOutlineDocumentText className="text-[20px]" />,
    },
    {
      path: "/aim-scope",
      label: "Aim & Scope",
      icon: <BiTargetLock className="text-[20px]" />,
    },
    {
      path: "/payment",
      label: "Mode of Payment",
      icon: <BiCreditCard className="text-[20px]" />,
    },
    { path: "/indexing", label: "Indexing", icon: <BiBarChart className="text-[20px]" /> },
    {
      path: "/copyright",
      label: "Copyright Form",
      icon: <BiCopyright className="text-[20px]" />,
    },
    { path: "/contact", label: "Contact Us", icon: <BiEnvelope className="text-[20px]" /> },
  ];

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden w-full transition-all"
    >
      {/* Mobile Accordion Header */}
      <button
        onClick={() => setIsMobileOpen((prev) => !prev)}
        className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200/60 font-semibold text-[14px] text-[var(--primary-dark)]"
      >
        <div className="flex items-center gap-2">
          <FiList className="text-[var(--primary)] text-lg" />
          <span>Journal Menu</span>
        </div>
        {isMobileOpen ? (
          <FiChevronUp className="text-slate-500 text-lg" />
        ) : (
          <FiChevronDown className="text-slate-500 text-lg" />
        )}
      </button>

      {/* Navigation Menu List */}
      <nav className={`flex flex-col ${isMobileOpen ? "flex" : "hidden md:flex"}`}>
        {menuItems.map((item, index) => {
          const isActive =
            location.pathname === item.path ||
            (location.pathname === "/" && item.path === "/current-issue");
          const isLast = index === menuItems.length - 1;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3.5 px-5 py-3.5 transition-all duration-150 border-l-4 ${
                isLast ? "" : "border-b border-slate-100"
              }`}
              style={{
                borderLeftColor: isActive ? "var(--primary)" : "transparent",
                backgroundColor: isActive ? "var(--primary-light)" : "transparent",
                color: isActive ? "var(--primary)" : "var(--heading)",
                fontWeight: isActive ? "600" : "500",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#f8fafc";
                  e.currentTarget.style.color = "var(--primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--heading)";
                }
              }}
            >
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  color: isActive ? "var(--primary)" : "var(--text-light)",
                }}
              >
                {item.icon}
              </div>
              <span className="text-[14px] md:text-[14.5px] leading-snug font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
