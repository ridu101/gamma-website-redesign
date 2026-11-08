
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Share2,
  ChevronRight,
  Sparkles,
  BookOpen,
} from "lucide-react";

import api from "../services/api";
import "./NewsCardDetail.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, "");

const getImageUrl = (path) => {
  if (!path) return null;

  if (path.startsWith("http")) return path;

  if (path.startsWith("/storage/")) {
    return `${API_BASE}${path}`;
  }

  return `${API_BASE}/storage/${path.replace(/^\/+/, "")}`;
};

const formatDate = (date) => {
  if (!date) return "Date not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date not available";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const getReadTime = (content = "") => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const NewsCardDetail = () => {
  const { slug } = useParams();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");
        setNews(null);

        const response = await api.get(
          `/news/${encodeURIComponent(slug)}`
        );

        setNews(response.data?.data || null);
      } catch (err) {
        console.error("News details loading error:", err);

        setError(
          err.response?.status === 404
            ? "The article may have been removed or the link is incorrect."
            : "Unable to load this article. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchNews();
    }
  }, [slug]);

  const handleShare = async () => {
    if (!news) return;

    const shareData = {
      title: news.title,
      text: news.excerpt || news.title,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Article link copied!");
      } else {
        alert("Sharing is not supported on this browser.");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Unable to share article:", err);
      }
    }
  };

  if (loading) {
    return (
      <main className="news-detail-page">
        <div className="news-container news-not-found">
          <span>GAMMASOFT NEWS</span>
          <h1>Loading article...</h1>
        </div>
      </main>
    );
  }

  if (error || !news) {
    return (
      <main className="news-detail-page">
        <div className="news-container news-not-found">
          <span>404 — ARTICLE NOT FOUND</span>
          <h1>This story doesn't exist.</h1>
          <p>
            {error ||
              "The article may have been removed or the link is incorrect."}
          </p>

          <Link to="/news" className="news-detail-back-button">
            <ArrowLeft size={17} />
            Back to News
          </Link>
        </div>
      </main>
    );
  }

  const paragraphs = (news.content || "")
    .split(/\r?\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main className="news-detail-page">
      {/* COMPACT ARTICLE HEADER */}
      <section className="news-detail-header">
        <div className="news-container">
          <div className="news-detail-breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/news">News & Insights</Link>
            <ChevronRight size={14} />
            <span>Article</span>
          </div>

          <Link to="/news" className="news-detail-back-link">
            <ArrowLeft size={15} />
            BACK TO ALL ARTICLES
          </Link>

          <div className="news-detail-heading">
            <div className="news-detail-heading-main">
              <div className="news-detail-category">
                <span />
                {news.category || "Company News"}
              </div>

              <h1>{news.title}</h1>

              <p className="news-detail-description">
                {news.excerpt || ""}
              </p>
            </div>

            <div className="news-detail-heading-side">
              <div className="news-detail-meta-item">
                <CalendarDays size={17} />
                <div>
                  <span>PUBLISHED ON</span>
                  <strong>{formatDate(news.published_at)}</strong>
                </div>
              </div>

              <div className="news-detail-meta-item">
                <Clock3 size={17} />
                <div>
                  <span>READING TIME</span>
                  <strong>{getReadTime(news.content || "")}</strong>
                </div>
              </div>

              <div className="news-detail-meta-item">
                <BookOpen size={17} />
                <div>
                  <span>WRITTEN BY</span>
                  <strong>{news.author || "GammaSoft Team"}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="news-detail-content-section">
        <div className="news-container">
          <div className="news-detail-layout">
            <article className="news-detail-article">
              {/* COVER IMAGE */}
              <div className="news-detail-cover">
                {news.image && (
                  <img
                    src={getImageUrl(news.image)}
                    alt={news.title}
                  />
                )}

                <div className="news-detail-cover-overlay" />

                <div className="news-detail-cover-label">
                  <Sparkles size={16} />
                  GAMMASOFT INSIGHTS
                </div>
              </div>

              {/* ARTICLE INTRO */}
              {news.excerpt && (
                <div className="news-detail-intro">
                  <span>ARTICLE OVERVIEW</span>
                  <p>{news.excerpt}</p>
                </div>
              )}

              {/* ARTICLE BODY */}
              <div className="news-detail-body">
                {paragraphs.length > 0 ? (
                  <section className="news-detail-section">
                    <div className="news-detail-section-number">
                      01
                    </div>

                    {paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </section>
                ) : (
                  <p>Article content is not available.</p>
                )}
              </div>

              {/* ARTICLE FOOTER */}
              <div className="news-detail-footer">
                <div className="news-detail-author">
                  <div className="news-author-avatar">G</div>

                  <div>
                    <span>WRITTEN BY</span>
                    <strong>{news.author || "GammaSoft Team"}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="news-detail-share"
                  onClick={handleShare}
                >
                  <Share2 size={16} />
                  Share Article
                </button>
              </div>

              <Link to="/news" className="news-detail-bottom-back">
                <ArrowLeft size={16} />
                Explore More Articles
              </Link>
            </article>

            {/* SIDEBAR */}
            <aside className="news-detail-sidebar">
              <div className="news-detail-sidebar-card">
                <div className="news-sidebar-icon">
                  <Sparkles size={20} />
                </div>

                <span className="news-sidebar-label">
                  MORE FROM GAMMASOFT
                </span>

                <h3>
                  Explore more <strong>insights.</strong>
                </h3>

                <p>
                  Discover more ideas, technology updates and digital
                  perspectives from our editorial team.
                </p>

                <Link to="/news">
                  Browse All Articles
                  <ArrowUpRight size={17} />
                </Link>
              </div>

              <div className="news-detail-sidebar-note">
                <Sparkles size={18} />
                <span>Ideas for a smarter digital future.</span>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsCardDetail;
