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
import { FiChevronDown, FiChevronUp, FiList, FiBookmark } from "react-icons/fi";
import fallbackCopyrightPdf from "../assets/images/Copyright-form IJSSAHR.pdf";
import { formatFileUrl } from "../utils/fileUrl";
import API from "../services/api";

import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isIndexingOpen, setIsIndexingOpen] = useState(false);

  const { data: copyrightPdfUrl = fallbackCopyrightPdf } = useQuery({
    queryKey: ["sidebar-copyright-pdf"],
    queryFn: async () => {
      const res = await API.get("/payment-info");
      const livePdfUrl = res.data?.data?.copyrightForm?.pdfUrl;
      if (livePdfUrl) {
        return formatFileUrl(livePdfUrl);
      }
      return fallbackCopyrightPdf;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const { data: indexingServices = [] } = useQuery({
    queryKey: ["sidebar-indexing-services"],
    queryFn: async () => {
      const res = await API.get("/indexing-services");
      return res.data?.data || [];
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const sidebarData = { copyrightPdfUrl };

  const menuItems = [
    {
      path: "/current-issue",
      label: "Current Issue",
      icon: <AiOutlineHome className="text-[15px]" />,
    },
    {
      path: "/archive",
      label: "Archive",
      icon: <BiArchive className="text-[15px]" />,
    },
    {
      path: "/editorial-board",
      label: "Editorial Board",
      icon: <BsPeople className="text-[15px]" />,
    },
    {
      path: "/instructions",
      label: "Instructions for Authors",
      icon: <HiOutlineDocumentText className="text-[15px]" />,
    },
    {
      path: "/aim-scope",
      label: "Aim & Scope",
      icon: <BiTargetLock className="text-[15px]" />,
    },
    {
      path: "/payment",
      label: "Mode of Payment",
      icon: <BiCreditCard className="text-[15px]" />,
    },
    {
      path: "/copyright",
      label: "Copyright Form",
      icon: <BiCopyright className="text-[15px]" />,
      isExternal: true,
      externalUrl: sidebarData.copyrightPdfUrl,
    },
    {
      path: "/contact",
      label: "Contact Us",
      icon: <BiEnvelope className="text-[15px]" />,
    },
    {
      path: "/indexing",
      label: "Indexing",
      icon: <BiBarChart className="text-[15px]" />,
    },
  ];

  const dummyIndexingServices = [
    { id: 1, name: "Index Copernicus", link: "/index-copernicus" },
    { id: 2, name: "Scientific Indexing Services", link: "/scientific-indexing-services" },
    { id: 3, name: "Cite factor", link: "/cite-factor" },
    { id: 4, name: "Research Bib", link: "/research-bib" },
    { id: 5, name: "SJIF Journal Rank", link: "/sjif-journal-rank" },
  ];

  return (
    <div className="flex flex-col gap-4 w-full text-slate-800">
      {/* Journal Menu Box */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden w-full transition-all">
        {/* Header */}
        <div className="px-3.5 py-2.5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiList className="text-blue-600 text-sm" />
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-800">
              Journal Navigation
            </span>
          </div>
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="md:hidden text-slate-500 hover:text-slate-800"
          >
            {isMobileOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>

        {/* Navigation Menu List */}
        <nav
          className={`p-1.5 flex-col gap-0.5 ${
            isMobileOpen ? "flex" : "hidden md:flex"
          }`}
        >
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            if (item.isExternal) {
              return (
                <a
                  key={item.label}
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-semibold transition-all duration-150 text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                >
                  <div className="flex items-center justify-center shrink-0 text-slate-400 group-hover:text-blue-600">
                    {item.icon}
                  </div>
                  <span className="leading-tight font-semibold">
                    {item.label}
                  </span>
                </a>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 ${
                    isActive ? "text-white" : "text-slate-400"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Indexing Services Box */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden w-full transition-all">
        <div className="px-3.5 py-2.5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiBookmark className="text-blue-600 text-sm" />
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-800">
              Indexing Services
            </span>
          </div>
          <button
            onClick={() => setIsIndexingOpen((prev) => !prev)}
            className="md:hidden text-slate-500 hover:text-slate-800"
          >
            {isIndexingOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>

        <div
          className={`p-1.5 flex-col gap-0.5 ${
            isIndexingOpen ? "flex" : "hidden md:flex"
          }`}
        >
          {indexingServices.map((service, index) => (
            <a
              key={index}
              href={service.url || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
              <span className="leading-tight">{service.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
