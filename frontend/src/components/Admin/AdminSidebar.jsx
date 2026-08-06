import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../../services/api";
import {
  FaThLarge,
  FaBook,
  FaFileAlt,
  FaUsers,
  FaComments,
  FaBullhorn,
  FaLayerGroup,
  FaPlusCircle,
  FaSlidersH,
  FaPlus,
  FaLink,
  FaInbox,
  FaTasks,
  FaInfoCircle,
  FaBullseye,
  FaQuestionCircle,
  FaCreditCard,
  FaGlobe,
  FaEnvelope,
  FaUserCheck,
  FaUserTie,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
  FaFolder,
  FaHistory,
} from "react-icons/fa";

const iconMap = {
  LayoutDashboard: FaThLarge,
  BookOpen: FaBook,
  FileText: FaFileAlt,
  FileCheck: FaTasks,
  Users: FaUsers,
  MessageSquare: FaComments,
  Megaphone: FaBullhorn,
  Layers: FaLayerGroup,
  PlusCircle: FaPlusCircle,
  Sliders: FaSlidersH,
  FileCode: FaFileAlt,
  FilePlus: FaPlus,
  Link2: FaLink,
  Inbox: FaInbox,
  CheckSquare: FaTasks,
  Info: FaInfoCircle,
  Target: FaBullseye,
  HelpCircle: FaQuestionCircle,
  CreditCard: FaCreditCard,
  Globe: FaGlobe,
  Bell: FaBullhorn,
  Mail: FaEnvelope,
  UserCheck: FaUserCheck,
  UserGroup: FaUserTie,
  History: FaHistory,
};

const AdminSidebar = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCategories, setOpenCategories] = useState({});
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch sidebar menu ONCE on mount
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await API.get("/users/sidebar-menu");
        const menuData = response.data.data || [];
        setMenu(menuData);
      } catch (error) {
        console.error("Failed to load sidebar menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Automatically expand active category when route changes
  useEffect(() => {
    if (menu.length === 0) return;

    setOpenCategories((prevOpen) => {
      const updatedOpen = { ...prevOpen };
      menu.forEach((cat) => {
        const hasActiveItem = cat.items.some(
          (item) =>
            location.pathname === item.path ||
            (item.path === "/dashboard" && location.pathname === "/admin/dashboard")
        );
        if (hasActiveItem) {
          updatedOpen[cat.category] = true;
        }
      });
      return updatedOpen;
    });
  }, [location.pathname, menu]);

  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <div className="w-[230px] bg-[#0b1340] text-slate-200 border-r border-slate-800 flex flex-col h-screen sticky top-0 font-sans shadow-xl shrink-0">
      {/* Sidebar Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">
            IJ
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-none tracking-tight">IJSSAHR</h1>
            <span className="text-[10px] text-[#38b6ff] font-semibold uppercase tracking-wider mt-1 block">
              {user?.role || "Portal"}
            </span>
          </div>
        </div>
      </div>

      {/* User Info Card */}
      <div className="px-3.5 py-3 mx-4 my-3 bg-slate-900/60 rounded-xl border border-slate-800/90 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-blue-600/30 text-[#38b6ff] border border-blue-500/40 flex items-center justify-center text-xs font-bold shrink-0">
          {user?.name?.charAt(0) || "U"}
        </div>
        <div className="overflow-hidden flex-1">
          <p className="text-xs font-semibold text-white truncate">{user?.name || "User"}</p>
          <p className="text-[11px] text-slate-400 font-normal truncate">{user?.email}</p>
        </div>
      </div>

      {/* Sidebar Collapsible Accordion Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar space-y-1">
        {loading ? (
          <div className="space-y-3 py-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-9 bg-slate-800/60 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          menu.map((cat, idx) => {
            const isStandalone = cat.isStandalone || cat.category === "Dashboard";
            const CategoryIcon = iconMap[cat.icon] || FaFolder;
            const isOpen = !!openCategories[cat.category];

            // Standalone Link (like Dashboard Overview, Manage Issues & Volumes)
            if (isStandalone && cat.items.length === 1) {
              const item = cat.items[0];
              const isActive =
                location.pathname === item.path ||
                (item.path === "/dashboard" && location.pathname === "/admin/dashboard");
              const ItemIcon = iconMap[item.icon] || CategoryIcon;

              return (
                <Link
                  key={idx}
                  to={item.path === "/dashboard" ? "/admin/dashboard" : item.path}
                  className={`flex items-center justify-between px-3 py-2 text-[11.5px] rounded-xl font-normal transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-medium"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-1">
                    <ItemIcon className={`text-xs shrink-0 ${isActive ? "text-white" : "text-[#38b6ff]"}`} />
                    <span className="text-left whitespace-nowrap truncate font-normal">{item.label}</span>
                  </div>
                  <FaChevronRight className={`text-[9px] ${isActive ? "text-white" : "text-slate-500"}`} />
                </Link>
              );
            }

            // Dropdown Accordion Group
            const isAnySubItemActive = cat.items.some(
              (item) =>
                location.pathname === item.path ||
                (item.path === "/dashboard" && location.pathname === "/admin/dashboard")
            );

            return (
              <div key={idx} className="rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleCategory(cat.category)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-[11.5px] font-normal rounded-xl transition-all cursor-pointer ${
                    isAnySubItemActive
                      ? "bg-blue-950/60 text-[#38b6ff] border border-blue-800/50 font-medium"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-1">
                    <CategoryIcon className={`text-xs shrink-0 ${isAnySubItemActive ? "text-[#38b6ff]" : "text-slate-400"}`} />
                    <span className="text-left whitespace-nowrap truncate text-[11.5px] font-normal">{cat.category}</span>
                  </div>
                  {isOpen ? (
                    <FaChevronDown className="text-[9px] text-[#38b6ff] shrink-0" />
                  ) : (
                    <FaChevronRight className="text-[9px] text-slate-500 shrink-0" />
                  )}
                </button>

                {/* Submenu Items Dropdown */}
                {isOpen && (
                  <div className="mt-1 ml-3 pl-3 border-l border-slate-800 space-y-1 py-1">
                    {cat.items.map((subItem) => {
                      const SubIcon = iconMap[subItem.icon] || FaFolder;
                      const isSubActive = location.pathname === subItem.path;

                      return (
                        <Link
                          key={subItem.id}
                          to={subItem.path === "/dashboard" ? "/admin/dashboard" : subItem.path}
                          className={`flex items-center gap-2 px-2.5 py-1.5 text-[11px] rounded-lg transition-all ${
                            isSubActive
                              ? "bg-blue-600 text-white font-medium shadow-xs"
                              : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-100 font-normal"
                          }`}
                        >
                          <SubIcon className={`text-[11px] ${isSubActive ? "text-white" : "text-slate-500"}`} />
                          <span className="truncate">{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-800/80">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900/80 hover:bg-red-950/60 text-slate-300 hover:text-red-300 rounded-xl text-xs font-semibold transition-all border border-slate-800 hover:border-red-900/80 cursor-pointer"
        >
          <FaSignOutAlt className="text-sm" /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
