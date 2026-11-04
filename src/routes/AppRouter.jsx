
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";

// Components
import BackToTop from "../components/BackToTop";
import Navbar from "../components/common/Navbar";

// Pages
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import ProductsPage from "../pages/ProductsPage";
import ProjectsPage from "../pages/ProjectsPage";
import TestimonialsPage from "../pages/TestimonialsPage";
import CompanyProfile from "../pages/CompanyProfile";
import NotFound from "../pages/NotFound";
import NewsPage from "../pages/NewsPage";
import NewsCardDetail from "../pages/NewsCardDetail";
import QuotePage from "../pages/QuotePage";
import Career from "../pages/Career";
import JobApplication from "../pages/JobApplication";

// ========================================
// SCROLL TO TOP
// ========================================

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

// ========================================
// APP ROUTES
// ========================================

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* About */}
        <Route path="/about" element={<AboutPage />} />

        {/* Services */}
        <Route path="/services" element={<ServicesPage />} />

        {/* Products */}
        <Route path="/products" element={<ProductsPage />} />

        {/* Projects */}
        <Route path="/projects" element={<ProjectsPage />} />

        {/* Testimonials */}
        <Route
          path="/testimonials"
          element={<TestimonialsPage />}
        />

        {/* Career */}
        <Route path="/career" element={<Career />} />

        <Route
          path="/career/apply/:jobId"
          element={<JobApplication />}
        />

        {/* News */}
        <Route path="/news" element={<NewsPage />} />

        <Route
          path="/news/:slug"
          element={<NewsCardDetail />}
        />

        {/* Company Profile */}
        <Route
          path="/company-profile"
          element={<CompanyProfile />}
        />

        {/* Get Quote */}
        <Route path="/get-quote" element={<QuotePage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <BackToTop />
    </>
  );
};

// ========================================
// APP ROUTER
// ========================================

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;
