
import { useEffect, useState } from "react";

import {
  FolderKanban,
  Package,
  Newspaper,
  BriefcaseBusiness,
  Users,
  Clock,
  RefreshCw,
  MessageSquare,
  Mail,
  FileText,
  MessagesSquare,
  Star,
} from "lucide-react";

import api from "../../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/admin/dashboard");
      setStats(response.data.data);

      // Fetch testimonial count
      const testimonialResponse = await api.get(
        "/admin/testimonials"
      );

      const testimonialData = testimonialResponse.data?.data;

      const testimonialCount = Array.isArray(testimonialData)
        ? testimonialData.length
        : testimonialData?.total ?? 0;

      setStats((prev) => ({
        ...prev,
        total_testimonials: testimonialCount,
      }));
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load dashboard statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Total Projects",
      value: stats?.total_projects ?? 0,
      icon: FolderKanban,
      color: "orange",
    },
    {
      title: "Total Products",
      value: stats?.total_products ?? 0,
      icon: Package,
      color: "blue",
    },
    {
      title: "Total News",
      value: stats?.total_news ?? 0,
      icon: Newspaper,
      color: "purple",
    },
    {
      title: "Total Jobs",
      value: stats?.total_jobs ?? 0,
      icon: BriefcaseBusiness,
      color: "green",
    },
    {
      title: "Applications",
      value: stats?.total_applications ?? 0,
      icon: Users,
      color: "cyan",
    },
    {
      title: "Pending Applications",
      value: stats?.pending_applications ?? 0,
      icon: Clock,
      color: "yellow",
    },

    // Inquiry statistics
    {
      title: "Total Inquiries",
      value: stats?.total_inquiries ?? 0,
      icon: MessagesSquare,
      color: "orange",
    },
    {
      title: "New Inquiries",
      value: stats?.new_inquiries ?? 0,
      icon: MessageSquare,
      color: "yellow",
    },
    {
      title: "Contact Messages",
      value: stats?.contact_messages ?? 0,
      icon: Mail,
      color: "blue",
    },
    {
      title: "Quote Requests",
      value: stats?.quote_requests ?? 0,
      icon: FileText,
      color: "purple",
    },
    {
      title: "Total Testimonials",
      value: stats?.total_testimonials ?? 0,
      icon: Star,
      color: "green",
    },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-heading">
        <div>
          <span className="dashboard-eyebrow">
            OVERVIEW
          </span>

          <h1>Dashboard</h1>

          <p>
            Welcome to GammaSoft administration panel.
          </p>
        </div>

        <button
          className="dashboard-refresh"
          onClick={fetchDashboard}
          disabled={loading}
        >
          <RefreshCw
            size={16}
            className={loading ? "refresh-spinning" : ""}
          />
          Refresh
        </button>
      </div>

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}

      <div className="dashboard-section-title">
        <h2>Website Overview</h2>
        <span>Live database statistics</span>
      </div>

      <div className="dashboard-stats-grid">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              className="dashboard-stat-card"
              key={card.title}
            >
              <div className="dashboard-stat-top">
                <div
                  className={`dashboard-stat-icon ${card.color}`}
                >
                  <Icon size={21} />
                </div>

                <span className="dashboard-stat-indicator">
                  Database
                </span>
              </div>

              <div className="dashboard-stat-value">
                {loading ? (
                  <span className="dashboard-loading">...</span>
                ) : (
                  card.value
                )}
              </div>

              <div className="dashboard-stat-title">
                {card.title}
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-bottom-card">
        <div className="dashboard-bottom-icon">
          <FolderKanban size={23} />
        </div>

        <div>
          <h3>Content Management</h3>
          <p>
            Manage your projects, products, news, jobs,
            job applications and customer inquiries
            from the sidebar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
