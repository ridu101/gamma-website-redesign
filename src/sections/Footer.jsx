
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  MoveUpRight,
} from "lucide-react";

import "./Footer.css";

const quickLinks = [
  "CATV Solutions",
  "Digital Marketing",
  "E-Commerce Solutions",
  "Graphics & Motion",
  "IT Services",
  "Mobile Apps Development",
  "Search Engine Optimization",
  "Software Development",
  "Web Application",
];

const recentNews = [
  {
    title: "Why Local SEO Services in Bangladesh Get",
    date: "May 10, 2025",
  },
  {
    title: "Awesome Image",
    date: "May 5, 2025",
  },
  {
    title: "IT Consultancy",
    date: "May 5, 2025",
  },
];

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

const Footer = () => {
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
            <a href="#home" className="gs-footer-logo">
              <img
                src="/images/gammasoft-symbol.png"
                alt="GammaSoft logo"
              />

              <span>
                GAMMA<span>SOFT</span>
              </span>
            </a>

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
          </div>

          {/* Quick Links */}
          <div className="gs-footer-column">
            <h3>Quick Links</h3>

            <ul className="gs-footer-links">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#contact">
                    <MoveUpRight size={12} />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent News */}
          <div className="gs-footer-column gs-footer-news">
            <h3>Recent News</h3>

            <div className="gs-footer-news-list">
              {recentNews.map((news) => (
                <a
                  href="#"
                  className="gs-footer-news-item"
                  key={news.title}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="gs-footer-news-date">
                    {news.date}
                  </span>

                  <strong>{news.title}</strong>

                  <ArrowUpRight size={14} />
                </a>
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

          <a href="#home">
            Back to top
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
