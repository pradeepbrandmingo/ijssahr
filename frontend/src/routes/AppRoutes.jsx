import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

// Layouts
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Sidebar from "../layouts/Sidebar";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/About/About"));
const CurrentIssue = lazy(() => import("../pages/CurrentIssue/CurrentIssue"));
const Archive = lazy(() => import("../pages/Archive/Archive"));
const ArchiveIssueDetails = lazy(() => import("../pages/Archive/ArchiveIssueDetails"));
const EditorialBoard = lazy(() => import("../pages/EditorialBoard/EditorialBoard"));
const EditorialBoardRecruitment = lazy(() => import("../pages/EditorialBoardRecruitment/EditorialBoardRecruitment"));
const EditorialBoardRoles = lazy(() => import("../pages/EditorialBoardRoles/EditorialBoardRoles"));
const Instructions = lazy(() => import("../pages/Instructions/Instructions"));
const AimScope = lazy(() => import("../pages/AimScope/AimScope"));
const Payment = lazy(() => import("../pages/Payment/Payment"));
const Indexing = lazy(() => import("../pages/Indexing/Indexing"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Search = lazy(() => import("../pages/Search/Search"));
const ArticleDetails = lazy(() => import("../pages/ArticleDetails/ArticleDetails"));
const PaperSubmission = lazy(() => import("../pages/PaperSubmission/PaperSubmission"));

// Admin Portal Pages
const Login = lazy(() => import("../pages/Admin/Login"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const UserManagement = lazy(() => import("../pages/Admin/UserManagement"));
const ManuscriptPageManager = lazy(() => import("../pages/Admin/ManuscriptPageManager"));
const ManuscriptsManager = lazy(() => import("../pages/Admin/ManuscriptsManager"));
const IssuesManager = lazy(() => import("../pages/Admin/IssuesManager"));
const AuthorInstructionsManager = lazy(() => import("../pages/Admin/AuthorInstructionsManager"));
const AimScopeManager = lazy(() => import("../pages/Admin/AimScopeManager"));
const PaymentManager = lazy(() => import("../pages/Admin/PaymentManager"));
const ContactManager = lazy(() => import("../pages/Admin/ContactManager"));
const EditorialBoardManager = lazy(() => import("../pages/Admin/EditorialBoardManager"));
const HomePageManager = lazy(() => import("../pages/Admin/HomePageManager"));
const AboutPageManager = lazy(() => import("../pages/Admin/AboutPageManager"));
const AuditLogsManager = lazy(() => import("../pages/Admin/AuditLogsManager"));
const IndexingServicesManager = lazy(() => import("../pages/Admin/IndexingServicesManager"));
const StaticPageManager = lazy(() => import("../pages/Admin/StaticPageManager"));

const MainLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-400">Loading Portal...</div>}>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/employees" element={<UserManagement />} />
            <Route path="/admin/clients" element={<UserManagement />} />
            <Route path="/admin/manuscripts" element={<ManuscriptsManager />} />
            <Route path="/admin/manuscripts/reviews" element={<ManuscriptsManager defaultReviewMode={true} />} />
            <Route path="/admin/volumes" element={<IssuesManager />} />
            <Route path="/admin/volumes/new" element={<IssuesManager openCreateModalOnMount={true} />} />
            <Route path="/admin/issues" element={<IssuesManager />} />
            <Route path="/admin/pages/submission" element={<ManuscriptPageManager />} />
            <Route path="/admin/pages/guidelines" element={<AuthorInstructionsManager />} />
            <Route path="/admin/pages/aims" element={<AimScopeManager />} />
            <Route path="/admin/pages/payment" element={<PaymentManager />} />
            <Route path="/admin/pages/contact" element={<ContactManager />} />
            <Route path="/admin/pages/editorial-board" element={<EditorialBoardManager />} />
            <Route path="/admin/pages/home" element={<HomePageManager />} />
            <Route path="/admin/pages/about" element={<AboutPageManager />} />
            <Route path="/admin/pages/indexing-services" element={<IndexingServicesManager />} />
            <Route path="/admin/logs" element={<AuditLogsManager />} />
            <Route path="/admin/pages/:pageKey" element={<StaticPageManager />} />
          </Route>
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1280px]">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          <aside className="w-full md:w-[220px] lg:w-[240px] shrink-0 md:sticky md:top-[135px] lg:top-[145px] z-30 md:max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar rounded-xl pr-1 pb-4">
            <Sidebar />
          </aside>
          <main className="flex-1 min-w-0 w-full max-w-full">
            <Suspense fallback={<div className="flex items-center justify-center h-64 text-slate-400">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/current-issue" element={<CurrentIssue />} />
                <Route path="/currentissue" element={<CurrentIssue />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/archive/:issueId" element={<ArchiveIssueDetails />} />
                <Route path="/editorial-board" element={<EditorialBoard />} />
                <Route path="/editorialboardrecruitment" element={<EditorialBoardRecruitment />} />
                <Route path="/editorialboardroles" element={<EditorialBoardRoles />} />
                <Route path="/instructions" element={<Instructions />} />
                <Route path="/aim-scope" element={<AimScope />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/indexing" element={<Indexing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/search" element={<Search />} />
                <Route path="/article/:slug" element={<ArticleDetails />} />
                <Route path="/submit" element={<PaperSubmission />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const asides = document.querySelectorAll("aside");
    asides.forEach((aside) => {
      aside.scrollTop = 0;
    });
  }, [pathname]);

  return null;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout />
    </BrowserRouter>
  );
};

export default AppRoutes;
