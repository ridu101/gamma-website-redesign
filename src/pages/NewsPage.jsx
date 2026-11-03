import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  TrendingUp,
  Newspaper,
  Sparkles,
  ChevronRight
} from "lucide-react";

import { newsData } from "../data/newsData";
import "./NewsPage.css";

const NewsPage = () => {
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

        <div className="news-hero-index">01 — INSIGHTS</div>
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
              <span>06 ARTICLES</span>
            </div>
          </div>

          <div className="news-card-grid">
            {newsData.map((news, index) => (
              <article
                className={`news-card ${news.featured ? "news-card-featured" : ""}`}
                key={news.id}
              >
                <Link
                  to={`/news/${news.slug}`}
                  className="news-card-image"
                  aria-label={`Read ${news.title}`}
                >
                  <img src={news.image} alt={news.title} loading="lazy" />

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
                    {news.category}
                  </div>

                  <h3>
                    <Link to={`/news/${news.slug}`}>
                      {news.title}
                    </Link>
                  </h3>

                  <p className="news-card-excerpt">
                    {news.excerpt}
                  </p>

                  <div className="news-card-meta">
                    <span>
                      <CalendarDays size={14} />
                      {news.date}
                    </span>

                    <span>
                      <Clock3 size={14} />
                      {news.readTime}
                    </span>
                  </div>

                  <div className="news-card-footer">
                    <span>GAMMASOFT EDITORIAL</span>

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