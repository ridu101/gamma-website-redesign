
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";

import Navbar from "../components/common/Navbar";

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

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />

        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsCardDetail />} />

        <Route
          path="/company-profile"
          element={<CompanyProfile />}
        />

        <Route path="/get-quote" element={<QuotePage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;
