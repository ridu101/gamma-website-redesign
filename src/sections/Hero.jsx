
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="gs-hero" id="home">

      {/* Background Effects */}
      <div className="gs-hero-grid"></div>
      <div className="gs-hero-glow"></div>
      <div className="gs-hero-noise"></div>

      {/* Floating Particles */}
      <div className="gs-particles">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className={`gs-particle particle-${index + 1}`}
          />
        ))}
      </div>

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

          {/* Trust Indicator */}
          <div className="gs-hero-trust">
            <div className="gs-trust-icon">
              <Sparkles size={19} />
            </div>

            <div className="gs-trust-content">
              <strong>Technology Meets Innovation</strong>
              <span>Building smarter digital experiences</span>
            </div>
          </div>

        </div>

        {/* RIGHT VISUAL */}
        <div className="gs-hero-visual">

          <div className="gs-visual-orbit orbit-one"></div>
          <div className="gs-visual-orbit orbit-two"></div>

          <div className="gs-visual-star star-one">✦</div>
          <div className="gs-visual-star star-two">✧</div>

          <div className="gs-logo-stage">

            <div className="gs-logo-back-glow"></div>

            <div className="gs-logo-3d">
              <img
                src="/images/gammasoft-symbol.png"
                alt="GammaSoft 3D brand symbol"
                className="gs-floating-logo"
              />
            </div>

          </div>

          <div className="gs-visual-caption">
            <span></span>
            INNOVATION IN MOTION
          </div>

        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <a href="#about" className="gs-scroll-indicator">
        <span></span>
        SCROLL TO EXPLORE
      </a>

    </section>
  );
};

export default Hero;
