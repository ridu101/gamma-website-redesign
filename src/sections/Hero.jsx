import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="gs-hero" id="home">
      {/* Lightweight Background */}
      <div className="gs-hero-grid"></div>
      <div className="gs-hero-glow"></div>

      <div className="gs-hero-container">
        {/* LEFT CONTENT */}
        <div className="gs-hero-content">
          <div className="gs-hero-label">
            <span className="gs-label-dot"></span>
            THE NEXT INNOVATION
          </div>

          <h1 className="gs-hero-title">
            Technology That
            <br />
            Drives
            <br />
            <span>Digital Innovation.</span>
          </h1>

          <p className="gs-hero-description">
            We design, develop and deliver intelligent software,
            web applications and technology solutions that help
            businesses innovate, grow and move forward.
          </p>

          {/* CTA Buttons */}
          <div className="gs-hero-actions">
            <a href="#services" className="gs-hero-primary">
              Explore Solutions
              <ArrowRight size={18} />
            </a>

            <a href="#contact" className="gs-hero-secondary">
              Get a Quote
              <ArrowUpRight size={17} />
            </a>
          </div>

         
        </div>

        {/* RIGHT VISUAL */}
        <div className="gs-hero-visual">
          <div className="gs-visual-card">
            <div className="gs-visual-top-line">
              <span></span>
              <span>GAMMASOFT / INNOVATION</span>
            </div>

            <div className="gs-logo-stage">
              <div className="gs-logo-back-glow"></div>

              <img
                src="/images/gammasoft-symbol.png"
                alt="GammaSoft brand symbol"
                className="gs-floating-logo"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <div className="gs-visual-bottom">
              <div className="gs-visual-caption">
                <span className="gs-caption-line"></span>
                <span>INNOVATION IN MOTION</span>
              </div>

              <span className="gs-visual-index">01 / 01</span>
            </div>
          </div>

          <div className="gs-visual-accent"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a href="#about" className="gs-scroll-indicator">
        <span></span>
        SCROLL TO EXPLORE
      </a>
    </section>
  );
};

export default Hero;