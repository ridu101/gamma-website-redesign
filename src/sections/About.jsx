
import {
  ArrowUpRight,
  Sparkles,
  Target,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";

import "./About.css";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "Embracing new technologies and creative ideas to deliver smarter digital solutions.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Trust",
    description:
      "Building reliable products through professional expertise and a commitment to quality.",
  },
  {
    icon: Target,
    title: "Client Focus",
    description:
      "Understanding every client's unique needs and creating solutions around their goals.",
  },
];

const About = () => {
  return (
    <section className="gs-about" id="about">
      {/* Background Effects */}
      <div className="gs-about-grid" />
      <div className="gs-about-glow gs-about-glow-one" />
      <div className="gs-about-glow gs-about-glow-two" />

      <div className="gs-about-container">
        {/* Section Heading */}
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

        {/* Company Overview */}
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
              We are a technology-driven software company
              specializing in software development, graphics
              design, mobile application development and
              digital marketing. Our team of skilled professionals
              combines technical expertise with creativity to
              deliver high-quality solutions tailored to the
              unique needs of our clients.
            </p>

            <p>
              From building robust web applications and
              enterprise platforms to creating engaging visual
              identities and effective marketing strategies,
              we help businesses navigate the evolving digital
              landscape with confidence.
            </p>

            <a href="#services" className="gs-about-link">
              Explore Our Expertise
              <ArrowUpRight size={18} />
            </a>
          </div>

          {/* Visual Panel */}
          <div className="gs-about-visual">
            <div className="gs-about-visual-glow" />

            <div className="gs-about-visual-orbit orbit-a" />
            <div className="gs-about-visual-orbit orbit-b" />

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

        {/* Company Highlights */}
        <div className="gs-about-highlights">
          <div className="gs-about-highlight">
            <span className="gs-highlight-number">2022</span>
            <span className="gs-highlight-label">
              Year Established
            </span>
          </div>

          <div className="gs-about-highlight">
            <span className="gs-highlight-number">04</span>
            <span className="gs-highlight-label">
              Core Service Areas
            </span>
          </div>

          <div className="gs-about-highlight">
            <span className="gs-highlight-number">360°</span>
            <span className="gs-highlight-label">
              Digital Solutions
            </span>
          </div>

          <div className="gs-about-highlight">
            <span className="gs-highlight-number">∞</span>
            <span className="gs-highlight-label">
              Possibilities to Innovate
            </span>
          </div>
        </div>

        {/* Company Values */}
        <div className="gs-about-values">
          <div className="gs-values-heading">
            <span className="gs-about-small-label">
              WHAT DRIVES US
            </span>

            <h3>
              Our Commitment to <span>Excellence.</span>
            </h3>
          </div>

          <div className="gs-values-grid">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div className="gs-value-card" key={value.title}>
                  <div className="gs-value-icon">
                    <Icon size={24} />
                  </div>

                  <span className="gs-value-number">
                    0{index + 1}
                  </span>

                  <h4>{value.title}</h4>

                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="gs-about-cta">
          <div className="gs-about-cta-glow" />

          <div className="gs-about-cta-content">
            <span>LET'S CREATE SOMETHING GREAT</span>

            <h3>
              Have an idea?
              <br />
              <span>Let's make it happen.</span>
            </h3>
          </div>

          <a href="#contact" className="gs-about-cta-button">
            Let's Talk
            <ArrowUpRight size={19} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
