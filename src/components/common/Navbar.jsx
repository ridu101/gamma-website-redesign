
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

import "./Navbar.css";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about", path: "/about" },
  { name: "Services", href: "#services", path: "/services" },
  { name: "Products", href: "#products", path: "/products" },
  { name: "Projects", href: "#projects", path: "/projects" },
  { name: "Testimonials", href: "#testimonials" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = (href) => {
    setMenuOpen(false);

    if (href) {
      setActiveLink(href);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  const handlePageNavigation = (path, href) => {
    closeMenu(href);

    if (location.pathname === path) {
      scrollToTop();
      return;
    }

    navigate(path);
  };

  useEffect(() => {
    setMenuOpen(false);

    // Dedicated pages: About, Services, Products, Projects
    if (location.pathname !== "/") {
      const currentPage = navLinks.find(
        (link) => link.path === location.pathname
      );

      setActiveLink(currentPage?.href || "");
      setScrolled(true);

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });

      return;
    }

    // Homepage section detection
    const sections = navLinks
      .filter((link) => !link.path)
      .map((link) => ({
        href: link.href,
        element: document.querySelector(link.href),
      }))
      .filter((item) => item.element);

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const offset = 170;
      let currentSection = "#home";

      sections.forEach(({ href, element }) => {
        const sectionTop = element.getBoundingClientRect().top;

        if (sectionTop <= offset) {
          currentSection = href;
        }
      });

      // Last section active at page bottom
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;

      if (isAtBottom && sections.length > 0) {
        currentSection = sections[sections.length - 1].href;
      }

      setActiveLink(currentSection);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [location.pathname, location.hash]);

  const getLinkClass = (href) =>
    `nav-link ${activeLink === href ? "active" : ""}`;

  const renderNavLinks = () =>
    navLinks.map((link) => {
      if (link.path) {
        return (
          <Link
            key={link.name}
            to={link.path}
            className={getLinkClass(link.href)}
            onClick={() =>
              handlePageNavigation(link.path, link.href)
            }
          >
            {link.name}
          </Link>
        );
      }

      return (
        <HashLink
          key={link.name}
          smooth
          to={`/${link.href}`}
          className={getLinkClass(link.href)}
          onClick={() => closeMenu(link.href)}
        >
          {link.name}
        </HashLink>
      );
    });

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="navbar-container">

        {/* BRAND LOGO */}
        <HashLink
          smooth
          to="/#home"
          onClick={() => closeMenu("#home")}
          className="navbar-brand"
        >
          <img
            src="/images/gammasoft-symbol.png"
            alt="GammaSoft logo"
          />

          <span>
            GAMMA<span className="brand-accent">SOFT</span>
          </span>
        </HashLink>

        {/* DESKTOP NAVIGATION */}
        <div className="desktop-navigation">
          {renderNavLinks()}
        </div>

        {/* DESKTOP CTA */}
        <HashLink
          smooth
          to="/#contact"
          onClick={() => closeMenu("#contact")}
          className="navbar-cta"
        >
          Let's Talk
          <ArrowUpRight size={17} />
        </HashLink>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

      </nav>

      {/* MOBILE NAVIGATION */}
      <div className={`mobile-navigation ${menuOpen ? "open" : ""}`}>
        {renderNavLinks()}

        <HashLink
          smooth
          to="/#contact"
          onClick={() => closeMenu("#contact")}
          className="mobile-cta"
        >
          Let's Talk
          <ArrowUpRight size={17} />
        </HashLink>
      </div>
    </header>
  );
};

export default Navbar;
