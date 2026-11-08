
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  TrendingUp,
  Newspaper,
  Sparkles,
} from "lucide-react";

import api from "../services/api";
import "./NewsPage.css";

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
    month: "short",
    year: "numeric",
  });
};

const getReadTime = (content = "") => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
};

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/news");

      const result = response.data?.data;
      const articles = Array.isArray(result)
        ? result
        : result?.data || [];

      setNewsData(articles);
    } catch (err) {
      console.error("Public news loading error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load news articles. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <main className="news-page">
      {/* HERO SECTION */}
      <section className="news-hero">
        <div className="news-hero-grid" />
        <div className="news-hero-glow news-glow-one" />
        <div className="news-hero-glow news-glow-two" />

        <div className="news-container news-hero-content">
          <div className="news-eyebrow">
            <span className="news-eyebrow-dot" />
            GAMMASOFT BD
            <span className="news-eyebrow-divider">/</span>
            NEWS & INSIGHTS
          </div>

          <h1>
            Ideas that move
            <br />
            <span>business forward.</span>
          </h1>

          <p>
            Explore technology insights, digital innovation, business
            strategies and the latest ideas shaping tomorrow.
          </p>

          <div className="news-hero-bottom">
            <div className="news-hero-tag">
              <TrendingUp size={17} />
              Knowledge for modern business
            </div>

            <a href="#news-articles" className="news-hero-scroll">
              EXPLORE ARTICLES
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* NEWS LISTING */}
      <section className="news-list-section" id="news-articles">
        <div className="news-container">
          <div className="news-section-top">
            <div>
              <div className="news-section-eyebrow">
                <Sparkles size={15} />
                OUR LATEST STORIES
              </div>

              <h2>
                News & <span>Insights.</span>
              </h2>

              <p>
                Ideas, knowledge and perspectives to help you stay ahead
                in the digital world.
              </p>
            </div>

            <div className="news-total">
              <Newspaper size={18} />
              <span>
                {newsData.length.toString().padStart(2, "0")} ARTICLES
              </span>
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="news-api-message">
              <p>Loading latest news...</p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="news-api-message">
              <p>{error}</p>
              <button type="button" onClick={fetchNews}>
                Try Again
              </button>
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && newsData.length === 0 && (
            <div className="news-api-message">
              <Newspaper size={35} />
              <h3>No News Available</h3>
              <p>New articles will appear here when published.</p>
            </div>
          )}

          {/* NEWS CARDS */}
          {!loading && !error && newsData.length > 0 && (
            <div className="news-card-grid">
              {newsData.map((news, index) => (
                <article
                  className={`news-card ${
                    index === 0 ? "news-card-featured" : ""
                  }`}
                  key={news.id}
                >
                  <Link
                    to={`/news/${news.slug}`}
                    className="news-card-image"
                    aria-label={`Read ${news.title}`}
                  >
                    {news.image ? (
                      <img
                        src={getImageUrl(news.image)}
                        alt={news.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="news-card-image-placeholder">
                        <Newspaper size={35} />
                      </div>
                    )}

                    <span className="news-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="news-card-image-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </Link>

                  <div className="news-card-content">
                    <div className="news-card-category">
                      <span />
                      {news.category || "Company News"}
                    </div>

                    <h3>
                      <Link to={`/news/${news.slug}`}>
                        {news.title}
                      </Link>
                    </h3>

                    <p className="news-card-excerpt">
                      {news.excerpt ||
                        news.content?.slice(0, 160) ||
                        "Read the latest update from GammaSoft."}
                    </p>

                    <div className="news-card-meta">
                      <span>
                        <CalendarDays size={14} />
                        {formatDate(news.published_at)}
                      </span>

                      <span>
                        <Clock3 size={14} />
                        {getReadTime(news.content || news.excerpt || "")}
                      </span>
                    </div>

                    <div className="news-card-footer">
                      <span>
                        {news.author || "GAMMASOFT EDITORIAL"}
                      </span>

                      <Link
                        to={`/news/${news.slug}`}
                        className="news-card-button"
                      >
                        View Full Details
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* BOTTOM CTA */}
          <div className="news-bottom-cta">
            <div className="news-cta-icon">
              <Sparkles size={23} />
            </div>

            <div>
              <span>HAVE A PROJECT IN MIND?</span>
              <h3>
                Let's create something <strong>meaningful.</strong>
              </h3>
              <p>
                Have an idea or need a digital solution? Let's talk about it.
              </p>
            </div>

            <Link to="/#contact" className="news-cta-button">
              Let's Talk
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsPage;
