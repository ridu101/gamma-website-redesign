
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

import { newsData } from "../data/newsData";
import "./NewsCardDetail.css";

const NewsCardDetail = () => {
  const { slug } = useParams();

  const news = newsData.find((item) => item.slug === slug);

  const handleShare = async () => {
    const shareData = {
      title: news.title,
      text: news.excerpt,
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
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Unable to share article:", error);
      }
    }
  };

  if (!news) {
    return (
      <main className="news-detail-page">
        <div className="news-container news-not-found">
          <span>404 — ARTICLE NOT FOUND</span>
          <h1>This story doesn't exist.</h1>
          <p>
            The article may have been removed or the link is incorrect.
          </p>

          <Link to="/news" className="news-detail-back-button">
            <ArrowLeft size={17} />
            Back to News
          </Link>
        </div>
      </main>
    );
  }

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
                {news.category}
              </div>

              <h1>{news.title}</h1>

              <p className="news-detail-description">
                {news.excerpt}
              </p>
            </div>

            <div className="news-detail-heading-side">
              <div className="news-detail-meta-item">
                <CalendarDays size={17} />
                <div>
                  <span>PUBLISHED ON</span>
                  <strong>{news.date}</strong>
                </div>
              </div>

              <div className="news-detail-meta-item">
                <Clock3 size={17} />
                <div>
                  <span>READING TIME</span>
                  <strong>{news.readTime}</strong>
                </div>
              </div>

              <div className="news-detail-meta-item">
                <BookOpen size={17} />
                <div>
                  <span>WRITTEN BY</span>
                  <strong>{news.author}</strong>
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
                <img src={news.image} alt={news.title} />

                <div className="news-detail-cover-overlay" />

                <div className="news-detail-cover-label">
                  <Sparkles size={16} />
                  GAMMASOFT INSIGHTS
                </div>
              </div>

              {/* ARTICLE INTRO */}
              <div className="news-detail-intro">
                <span>ARTICLE OVERVIEW</span>
                <p>{news.excerpt}</p>
              </div>

              {/* ARTICLE SECTIONS */}
              <div className="news-detail-body">
                {(news.sections || []).map((section, index) => (
                  <section
                    className="news-detail-section"
                    key={`${news.id}-${index}`}
                  >
                    <div className="news-detail-section-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <h2>{section.heading}</h2>

                    {(section.paragraphs || []).map(
                      (paragraph, paragraphIndex) => (
                        <p key={paragraphIndex}>{paragraph}</p>
                      )
                    )}
                  </section>
                ))}
              </div>

              {/* CONCLUSION */}
              {news.conclusion && (
                <div className="news-detail-conclusion">
                  <div className="news-conclusion-icon">
                    <BookOpen size={22} />
                  </div>

                  <div>
                    <span>FINAL THOUGHTS</span>
                    <p>{news.conclusion}</p>
                  </div>
                </div>
              )}

              {/* ARTICLE FOOTER */}
              <div className="news-detail-footer">
                <div className="news-detail-author">
                  <div className="news-author-avatar">G</div>

                  <div>
                    <span>WRITTEN BY</span>
                    <strong>{news.author}</strong>
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
