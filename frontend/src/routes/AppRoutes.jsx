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
const EditorialBoard = lazy(
  () => import("../pages/EditorialBoard/EditorialBoard"),
);
const Instructions = lazy(() => import("../pages/Instructions/Instructions"));
const AimScope = lazy(() => import("../pages/AimScope/AimScope"));
const Payment = lazy(() => import("../pages/Payment/Payment"));
const Indexing = lazy(() => import("../pages/Indexing/Indexing"));
const Copyright = lazy(() => import("../pages/Copyright/Copyright"));
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
            <aside className="w-full md:w-[260px] lg:w-[280px] shrink-0 md:sticky md:top-[120px] md:max-h-[calc(100vh-140px)] overflow-y-auto rounded-xl scrollbar-hide">
              <Sidebar />
            </aside>
            <main className="flex-1 min-w-0">
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
                  <Route path="/editorial-board" element={<EditorialBoard />} />
                  <Route path="/instructions" element={<Instructions />} />
                  <Route path="/aim-scope" element={<AimScope />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/indexing" element={<Indexing />} />
                  <Route path="/copyright" element={<Copyright />} />
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
