import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layout
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Sidebar from "../layouts/Sidebar";

// Pages
const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/About/About"));
const CurrentIssue = lazy(() => import("../pages/CurrentIssue/CurrentIssue"));
const Archive = lazy(() => import("../pages/Archive/Archive"));
const ArchiveIssueDetails = lazy(() => import("../pages/Archive/ArchiveIssueDetails"));
const EditorialBoard = lazy(
  () => import("../pages/EditorialBoard/EditorialBoard"),
);
const EditorialBoardRecruitment = lazy(
  () => import("../pages/EditorialBoardRecruitment/EditorialBoardRecruitment"),
);
const EditorialBoardRoles = lazy(
  () => import("../pages/EditorialBoardRoles/EditorialBoardRoles"),
);
const Instructions = lazy(() => import("../pages/Instructions/Instructions"));
const AimScope = lazy(() => import("../pages/AimScope/AimScope"));
const Payment = lazy(() => import("../pages/Payment/Payment"));
const Indexing = lazy(() => import("../pages/Indexing/Indexing"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Search = lazy(() => import("../pages/Search/Search"));
const ArticleDetails = lazy(
  () => import("../pages/ArticleDetails/ArticleDetails"),
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#f8fafc]">
        <Navbar />

        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1280px]">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
            <aside className="w-full md:w-[260px] lg:w-[280px] shrink-0 md:sticky md:top-[185px] lg:top-[205px] z-30 md:max-h-[calc(100vh-225px)] overflow-y-auto custom-scrollbar rounded-2xl pr-1 pb-4">
              <Sidebar />
            </aside>
            <main className="flex-1 min-w-0 w-full max-w-full">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-64">
                    Loading...
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/current-issue" element={<CurrentIssue />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/archive/:issueId" element={<ArchiveIssueDetails />} />
                  <Route path="/editorial-board" element={<EditorialBoard />} />
                  <Route
                    path="/editorialboardrecruitment"
                    element={<EditorialBoardRecruitment />}
                  />
                  <Route
                    path="/editorialboardroles"
                    element={<EditorialBoardRoles />}
                  />
                  <Route path="/instructions" element={<Instructions />} />
                  <Route path="/aim-scope" element={<AimScope />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/indexing" element={<Indexing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/article/:slug" element={<ArticleDetails />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
