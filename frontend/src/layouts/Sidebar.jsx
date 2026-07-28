import React from "react";
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

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/current-issue",
      label: "Current Issue",
      icon: <AiOutlineHome size={22} />,
    },
    { path: "/archive", label: "Archive", icon: <BiArchive size={22} /> },
    {
      path: "/editorial-board",
      label: "Editorial Board",
      icon: <BsPeople size={22} />,
    },
    {
      path: "/instructions",
      label: "Instructions for Authors",
      icon: <HiOutlineDocumentText size={22} />,
    },
    {
      path: "/aim-scope",
      label: "Aim & Scope",
      icon: <BiTargetLock size={22} />,
    },
    {
      path: "/payment",
      label: "Mode of Payment",
      icon: <BiCreditCard size={22} />,
    },
    { path: "/indexing", label: "Indexing", icon: <BiBarChart size={22} /> },
    {
      path: "/copyright",
      label: "Copyright Form",
      icon: <BiCopyright size={22} />,
    },
    { path: "/contact", label: "Contact Us", icon: <BiEnvelope size={22} /> },
  ];

  return (
    <div
      className="bg-white overflow-hidden w-full"
      style={{
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-sm)",
        border: "1px solid var(--border-light)",
      }}
    >
      <nav className="flex flex-col">
        {menuItems.map((item, index) => {
          const isActive =
            location.pathname === item.path ||
            (location.pathname === "/" && item.path === "/current-issue");
          const isLast = index === menuItems.length - 1;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-4 transition-all duration-200"
              style={{
                padding: "13px 20px",
                borderBottom: isLast ? "none" : "1px solid var(--border)",
                borderLeft: isActive
                  ? "4px solid var(--primary)"
                  : "4px solid transparent",
                backgroundColor: isActive
                  ? "var(--primary-light)"
                  : "transparent",
                color: isActive ? "var(--primary)" : "var(--text)",
                fontWeight: isActive ? "600" : "500",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "var(--border-light)";
                  e.currentTarget.style.color = "var(--heading)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--text)";
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
              <span style={{ fontSize: "14.5px", lineHeight: "1.4" }}>
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
