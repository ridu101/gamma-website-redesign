
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  MoveUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { services } from "../data/services";
import { newsData } from "../data/newsData";
import "./Footer.css";

const Footer = () => {
  // Automatically get the latest 3 news articles
  const recentNews = [...newsData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const socialLinks = [
    {
      name: "Facebook",
      label: "f",
      url: "https://www.facebook.com/",
    },
    {
      name: "LinkedIn",
      label: "in",
      url: "https://www.linkedin.com/",
    },
    {
      name: "Instagram",
      label: "◎",
      url: "https://www.instagram.com/",
    },
    {
      name: "YouTube",
      label: "▶",
      url: "https://www.youtube.com/",
    },
  ];

  return (
    <footer className="gs-footer">
      {/* Large Background Visual */}
      <div className="gs-footer-visual">
        <div className="gs-footer-image"></div>
        <div className="gs-footer-image-overlay"></div>

        <div className="gs-footer-visual-content">
          <span className="gs-footer-kicker">
            THE FUTURE STARTS WITH AN IDEA
          </span>

          <h2>
            LET'S BUILD
            <br />
            <span>WHAT'S NEXT.</span>
          </h2>

          <a href="mailto:info@gammasoftbd.com">
            Start a Conversation
            <ArrowUpRight size={19} />
          </a>
        </div>

        <div className="gs-footer-visual-bottom">
          <span>INNOVATION</span>
          <span>INTEGRITY</span>
          <span>IMPACT</span>
        </div>
      </div>

      {/* Footer Main Content */}
      <div className="gs-footer-main">
        <div className="gs-footer-top">

          {/* Brand */}
          <div className="gs-footer-brand">
            <Link to="/" className="gs-footer-logo">
              <img
                src="/images/gammasoft-symbol.png"
                alt="GammaSoft logo"
              />

              <span>
                GAMMA<span>SOFT</span>
              </span>
            </Link>

            <p>
              Gamma Soft Ltd. is committed to delivering innovative
              technology solutions that empower businesses and create
              meaningful digital experiences.
            </p>

            {/* Social Links */}
            <div className="gs-footer-socials">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.label}
                </a>
              ))}
            </div>

            {/* Company Profile Button */}
            <Link
              to="/company-profile"
              className="gs-footer-company-profile"
            >
              Company Profile
              <ArrowUpRight size={17} />
            </Link>
          </div>

          {/* Dynamic Quick Links */}
          <div className="gs-footer-column">
            <h3>Quick Links</h3>

            <ul className="gs-footer-links">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services?service=${encodeURIComponent(
                      service.slug
                    )}`}
                  >
                    <MoveUpRight size={12} />
                    {service.shortTitle || service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Recent News */}
          <div className="gs-footer-column gs-footer-news">
            <h3>Recent News</h3>

            <div className="gs-footer-news-list">
              {recentNews.map((news) => (
                <Link
                  to={`/news/${news.slug}`}
                  className="gs-footer-news-item"
                  key={news.id}
                >
                  <span className="gs-footer-news-date">
                    {news.date}
                  </span>

                  <strong>{news.title}</strong>

                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="gs-footer-column gs-footer-contact">
            <h3>Contact Us</h3>

            <div className="gs-footer-contact-item">
              <MapPin size={18} />

              <p>
                Motahar Lodge (7A),
                <br />
                04 Purana Paltan,
                <br />
                Dhaka-1000, Bangladesh
              </p>
            </div>

            <a
              href="tel:+8801894448136"
              className="gs-footer-contact-item"
            >
              <Phone size={18} />
              <span>+88-0189-4448136</span>
            </a>

            <a
              href="mailto:info@gammasoftbd.com"
              className="gs-footer-contact-item"
            >
              <Mail size={18} />
              <span>info@gammasoftbd.com</span>
            </a>

            <div className="gs-footer-contact-item">
              <Clock size={18} />

              <p>
                Week Days: 10:00 AM – 6:00 PM
                <br />
                Friday: Holiday
              </p>
            </div>
          </div>
        </div>

        {/* Email CTA */}
        <div className="gs-footer-email-cta">
          <div>
            <span>HAVE A PROJECT OR INQUIRY?</span>

            <h3>Let's talk about your next big idea.</h3>

            <p>
              Have a project or inquiry? Drop us an email – we'll
              respond promptly.
            </p>
          </div>

          <a href="mailto:info@gammasoftbd.com">
            Send Email
            <ArrowUpRight size={19} />
          </a>
        </div>

        {/* Bottom Footer */}
        <div className="gs-footer-bottom">
          <p>
            © 2026 Gamma Soft BD. All rights reserved.
          </p>

          <p className="gs-footer-bottom-address">
            Motahar Lodge (7A), 04 Purana Paltan, Dhaka-1000
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
