import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { useEffect } from "react";

// Public Components
import BackToTop from "../components/BackToTop";
import Navbar from "../components/common/Navbar";

// Public Pages
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

// Admin Pages
import AdminLogin from "../admin/pages/Login";
import Dashboard from "../admin/pages/Dashboard";

import Projects from "../admin/pages/Projects";
import ProjectForm from "../admin/pages/ProjectForm";

import Products from "../admin/pages/Products";
import ProductForm from "../admin/pages/ProductForm";

import News from "../admin/pages/News";
import NewsForm from "../admin/pages/NewsForm";

import Jobs from "../admin/pages/Jobs";
import JobForm from "../admin/pages/JobForm";

import Applications from "../admin/pages/Applications";
import ApplicationDetails from "../admin/pages/ApplicationDetails";

import Inquiries from "../admin/pages/Inquiries";

import Testimonials from "../admin/pages/Testimonials";
import TestimonialForm from "../admin/pages/TestimonialForm";

// Admin Components
import AdminLayout from "../admin/AdminLayout";
import ProtectedRoute from "../admin/components/ProtectedRoute";

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
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />

      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* PUBLIC WEBSITE */}

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />

        <Route
          path="/testimonials"
          element={<TestimonialsPage />}
        />

        <Route path="/career" element={<Career />} />

        <Route
          path="/career/apply/:jobId"
          element={<JobApplication />}
        />

        <Route path="/news" element={<NewsPage />} />

        <Route
          path="/news/:slug"
          element={<NewsCardDetail />}
        />

        <Route
          path="/company-profile"
          element={<CompanyProfile />}
        />

        <Route path="/get-quote" element={<QuotePage />} />

        {/* ADMIN LOGIN */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* PROTECTED ADMIN PANEL */}

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index
              element={<Navigate to="dashboard" replace />}
            />

            {/* DASHBOARD */}

            <Route
              path="dashboard"
              element={<Dashboard />}
            />

            {/* PROJECTS */}

            <Route
              path="projects"
              element={<Projects />}
            />

            <Route
              path="projects/create"
              element={<ProjectForm />}
            />

            <Route
              path="projects/:id/edit"
              element={<ProjectForm />}
            />

            {/* PRODUCTS */}

            <Route
              path="products"
              element={<Products />}
            />

            <Route
              path="products/create"
              element={<ProductForm />}
            />

            <Route
              path="products/:id/edit"
              element={<ProductForm />}
            />

            {/* NEWS */}

            <Route
              path="news"
              element={<News />}
            />

            <Route
              path="news/create"
              element={<NewsForm />}
            />

            <Route
              path="news/:id/edit"
              element={<NewsForm />}
            />

            {/* JOBS */}

            <Route
              path="jobs"
              element={<Jobs />}
            />

            <Route
              path="jobs/create"
              element={<JobForm />}
            />

            <Route
              path="jobs/:id/edit"
              element={<JobForm />}
            />

            {/* JOB APPLICATIONS */}

            <Route
              path="applications"
              element={<Applications />}
            />

            <Route
              path="applications/:id"
              element={<ApplicationDetails />}
            />

            {/* INQUIRY MANAGEMENT */}

            <Route
              path="inquiries"
              element={<Inquiries />}
            />

            {/* TESTIMONIAL MANAGEMENT */}

            <Route
              path="testimonials"
              element={<Testimonials />}
            />

            <Route
              path="testimonials/create"
              element={<TestimonialForm />}
            />

            <Route
              path="testimonials/:id/edit"
              element={<TestimonialForm />}
            />

          </Route>
        </Route>

        {/* 404 */}

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <BackToTop />}
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
