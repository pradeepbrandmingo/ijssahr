export const SIDEBAR_MENU = [
  {
    category: "Dashboard",
    icon: "LayoutDashboard",
    isStandalone: true,
    items: [
      {
        id: "dashboard-overview",
        label: "Dashboard Overview",
        path: "/dashboard",
        icon: "LayoutDashboard",
        roles: ["superadmin", "employee", "client"],
      },
    ],
  },
  {
    category: "Manage Issues & Volumes",
    icon: "BookOpen",
    isStandalone: true,
    items: [
      {
        id: "all-volumes",
        label: "Manage Issues & Volumes",
        path: "/admin/volumes",
        icon: "BookOpen",
        roles: ["superadmin", "employee"],
      },
    ],
  },

  {
    category: "Manage Manuscripts",
    icon: "FileCheck",
    items: [
      {
        id: "all-manuscripts",
        label: "All Manuscripts",
        path: "/admin/manuscripts",
        icon: "Inbox",
        roles: ["superadmin", "employee"],
      },
      {
        id: "review-process",
        label: "Peer Review Status",
        path: "/admin/manuscripts/reviews",
        icon: "CheckSquare",
        roles: ["superadmin", "employee"],
      },
    ],
  },
  {
    category: "Manage Static Pages",
    icon: "Info",
    items: [
      {
        id: "home-page-manager",
        label: "Home Page Settings",
        path: "/admin/pages/home",
        icon: "Home",
        roles: ["superadmin"],
      },
      {
        id: "about-page-manager",
        label: "About Us Page",
        path: "/admin/pages/about",
        icon: "Info",
        roles: ["superadmin"],
      },
      {
        id: "paper-submission-page",
        label: "Submit Manuscript Page",
        path: "/admin/pages/submission",
        icon: "FilePlus",
        roles: ["superadmin"],
      },
      {
        id: "aims-scope",
        label: "Aims & Scope",
        path: "/admin/pages/aims",
        icon: "Target",
        roles: ["superadmin"],
      },
      {
        id: "author-guidelines",
        label: "Author Guidelines",
        path: "/admin/pages/guidelines",
        icon: "HelpCircle",
        roles: ["superadmin"],
      },
      {
        id: "mode-of-payment",
        label: "Mode of Payment & Copyright PDF",
        path: "/admin/pages/payment",
        icon: "CreditCard",
        roles: ["superadmin"],
      },
      {
        id: "contact-page",
        label: "Contact Us Page",
        path: "/admin/pages/contact",
        icon: "Mail",
        roles: ["superadmin"],
      },
      {
        id: "editorial-board-page",
        label: "Editorial Board Page",
        path: "/admin/pages/editorial-board",
        icon: "Users",
        roles: ["superadmin"],
      },
      {
        id: "indexing-services-page",
        label: "Indexing Services Sidebar Menu",
        path: "/admin/pages/indexing-services",
        icon: "Link2",
        roles: ["superadmin"],
      },
    ],
  },
  {
    category: "Announcements & Messages",
    icon: "Megaphone",
    items: [
      {
        id: "call-for-papers",
        label: "Call For Papers",
        path: "/admin/announcements/call-for-papers",
        icon: "Bell",
        roles: ["superadmin"],
      },
      {
        id: "enquiries",
        label: "Contact Enquiries",
        path: "/admin/enquiries",
        icon: "Mail",
        roles: ["superadmin", "employee"],
      },
    ],
  },
  {
    category: "Admin User Management",
    icon: "Users",
    items: [
      {
        id: "manage-employees",
        label: "Manage Employees",
        path: "/admin/employees",
        icon: "UserCheck",
        roles: ["superadmin"],
      },
      {
        id: "manage-authors",
        label: "Manage Authors",
        path: "/admin/clients",
        icon: "UserGroup",
        roles: ["superadmin"],
      },
    ],
  },
  {
    category: "Employee Activity Logs",
    icon: "History",
    isStandalone: true,
    items: [
      {
        id: "activity-logs",
        label: "Employee Activity Logs",
        path: "/admin/logs",
        icon: "History",
        roles: ["superadmin"],
      },
    ],
  },
];
