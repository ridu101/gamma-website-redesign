
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`gs-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="gs-floating-nav">

        {/* Logo */}
        <a href="#home" className="gs-nav-logo" onClick={closeMenu}>
          <img
            src="/images/gammasoft-symbol.png"
            alt="GammaSoft - The Next Innovation"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="gs-nav-links">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="gs-nav-item"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact" className="gs-nav-cta">
          Let's Talk
          <ArrowUpRight size={16} />
        </a>

        {/* Mobile Menu Button */}
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
          <a
            key={link.name}
            href={link.href}
            onClick={closeMenu}
          >
            {link.name}
            <ArrowUpRight size={16} />
          </a>
        ))}

        <a
          href="#contact"
          className="gs-mobile-cta"
          onClick={closeMenu}
        >
          Let's Talk
          <ArrowUpRight size={17} />
        </a>
      </div>
    </header>
  );
};

export default Navbar;
