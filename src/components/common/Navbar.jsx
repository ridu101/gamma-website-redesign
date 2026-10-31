
import { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import "./Navbar.css";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Products", href: "#products" },
  { name: "Projects", href: "#projects" },
  { name: "Company", href: "#testimonials" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      let currentSection = "#home";

      navLinks.forEach((link) => {
        const section = document.querySelector(link.href);

        if (section && section.getBoundingClientRect().top <= 160) {
          currentSection = link.href;
        }
      });

      setActiveLink(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = (href) => {
    setMenuOpen(false);
    setActiveLink(href);
  };

  return (
    <header className={`gs-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="gs-floating-nav">

        {/* Brand Logo */}
        <HashLink
          smooth
          to="/#home"
          className="gs-nav-logo"
          onClick={() => closeMenu("#home")}
        >
          <img
            src="/images/gammasoft-symbol.png"
            alt="GammaSoft logo"
          />

          <span>
            GAMMA<span>SOFT</span>
          </span>
        </HashLink>

        {/* Desktop Navigation */}
        <div className="gs-nav-links">
          {navLinks.map((link) => (
            <HashLink
              smooth
              key={link.name}
              to={`/${link.href}`}
              className={`gs-nav-item ${
                activeLink === link.href ? "active" : ""
              }`}
              onClick={() => closeMenu(link.href)}
            >
              {link.name}
            </HashLink>
          ))}
        </div>

        {/* CTA */}
        <HashLink
          smooth
          to="/#contact"
          className="gs-nav-cta"
          onClick={() => closeMenu("#contact")}
        >
          Let's Talk
          <ArrowUpRight size={16} />
        </HashLink>

        {/* Mobile Toggle */}
        <button
          className="gs-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`gs-mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <HashLink
            smooth
            key={link.name}
            to={`/${link.href}`}
            className={activeLink === link.href ? "active" : ""}
            onClick={() => closeMenu(link.href)}
          >
            {link.name}
            <ArrowUpRight size={16} />
          </HashLink>
        ))}

        <HashLink
          smooth
          to="/#contact"
          className="gs-mobile-cta"
          onClick={() => closeMenu("#contact")}
        >
          Let's Talk
          <ArrowUpRight size={17} />
        </HashLink>
      </div>
    </header>
  );
};

export default Navbar;
