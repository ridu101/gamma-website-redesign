import { ArrowUpRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import { useEffect, useRef, useState } from "react";
const About = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    window.scrollTo(0, 0);
    navigate("/about");
  };
  const AnimatedNumber = ({ target, suffix = "", duration = 1800, pad = false }) => {
  const [count, setCount] = useState(0);
  const numberRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = numberRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let animationFrame;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Smooth ease-out animation
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started, target, duration]);

  return (
    <span ref={numberRef} className="gs-highlight-number">
      {pad ? String(count).padStart(2, "0") : count}
      {suffix}
    </span>
  );
};

  return (
    <section className="gs-about gs-about-preview" id="about">
      <div className="gs-about-container">
        <div className="gs-about-heading">
          <div className="gs-about-eyebrow">
            <span className="gs-about-dot" />
            WHO WE ARE
            <span className="gs-about-line" />
          </div>

          <h2 className="gs-about-title">
            We Turn Ideas Into
            <br />
            <span>Digital Excellence.</span>
          </h2>

          <p className="gs-about-subtitle">
            Driven by innovation. Powered by technology.
            Focused on creating meaningful digital experiences.
          </p>
        </div>

        <div className="gs-about-overview">
          <div className="gs-about-overview-left">
            <span className="gs-about-small-label">
              <Sparkles size={15} />
              OUR STORY
            </span>

            <h3>
              Building the Future,
              <br />
              <span>One Innovation at a Time.</span>
            </h3>

            <p>
              Gamma Soft Ltd. was founded in 2022 with a vision to
              transform businesses through innovative technology
              and creative digital solutions.
            </p>

            <p>
              We specialize in software development, graphics design,
              mobile application development and digital marketing.
              Our team combines technical expertise with creativity
              to deliver solutions tailored to our clients' needs.
            </p>

            <button
              type="button"
              onClick={handleExplore}
              className="gs-about-link"
            >
              More About GammaSoft
              <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="gs-about-visual">
            <div className="gs-about-visual-glow" />

            <div className="gs-about-visual-content">
              <div className="gs-about-visual-icon">
                <img
                  src="/images/gammasoft-symbol.png"
                  alt="GammaSoft symbol"
                />
              </div>

              <span className="gs-about-visual-name">
                GAMMA SOFT LTD.
              </span>

              <span className="gs-about-visual-tagline">
                THE NEXT INNOVATION
              </span>

              <div className="gs-about-visual-divider" />

              <span className="gs-about-visual-year">
                EST. 2022
              </span>
            </div>

            <span className="gs-about-decoration decoration-a">
              ✳
            </span>

            <span className="gs-about-decoration decoration-b">
              +
            </span>

            <div className="gs-about-floating-badge">
              <span className="gs-about-badge-dot" />
              Innovation Driven
            </div>
          </div>
        </div>

      <div className="gs-about-highlights">
  <div className="gs-about-highlight">
    <AnimatedNumber target={2022} />
    <span className="gs-highlight-label">Year Established</span>
  </div>

  <div className="gs-about-highlight">
    <AnimatedNumber target={4} pad />
    <span className="gs-highlight-label">Core Service Areas</span>
  </div>

  <div className="gs-about-highlight">
    <AnimatedNumber target={360} suffix="°" />
    <span className="gs-highlight-label">Digital Solutions</span>
  </div>

  <div className="gs-about-highlight">
    <span className="gs-highlight-number gs-infinity-number">∞</span>
    <span className="gs-highlight-label">
      Possibilities to Innovate
    </span>
  </div>
</div>

        <div className="gs-about-preview-action">
          <button
            type="button"
            onClick={handleExplore}
            className="gs-about-more-button"
          >
            Explore Our Company
            <ArrowUpRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;