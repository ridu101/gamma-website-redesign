
import {
  ArrowLeft,
  ArrowUpRight,
  Lightbulb,
  ShieldCheck,
  Target,
  Sparkles,
  Code2,
  Users,
  Rocket,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "../sections/About.css";

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

const strengths = [
  {
    icon: Code2,
    title: "Technical Expertise",
    description:
      "Combining modern technologies with practical development experience.",
  },
  {
    icon: Users,
    title: "Collaborative Approach",
    description:
      "Working closely with clients to understand their goals and requirements.",
  },
  {
    icon: Rocket,
    title: "Future-Ready Solutions",
    description:
      "Creating scalable digital solutions designed for long-term growth.",
  },
];

const AboutPage = () => {
  const navigate = useNavigate();

  const handleGetInTouch = () => {
    navigate("/#contact");

    window.setTimeout(() => {
      const contactSection = document.querySelector("#contact");

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  return (
    <main className="gs-about-page">

      {/* HERO SECTION */}
      <section className="gs-about-page-hero">
        <div className="gs-about-page-hero-grid" />

        <div className="gs-about-page-container">

          <div className="gs-about-eyebrow">
            <span className="gs-about-dot" />
            ABOUT GAMMASOFT
            <span className="gs-about-line" />
          </div>

          <h1>
            Technology With
            <br />
            <span>Purpose & Vision.</span>
          </h1>

          <p>
            We transform ideas into meaningful digital experiences
            through technology, creativity and innovation.
          </p>

        </div>
      </section>

      {/* OUR STORY */}
      <section className="gs-about-page-container gs-about-page-story">

        <div className="gs-about-page-story-content">

          <span className="gs-about-small-label">
            <Sparkles size={15} />
            OUR STORY
          </span>

          <h2>
            Building the Future,
            <br />
            <span>One Innovation at a Time.</span>
          </h2>

          <p>
            Gamma Soft Ltd. was founded in 2022 with a vision to
            transform businesses through innovative technology
            and creative digital solutions.
          </p>

          <p>
            We specialize in software development, graphics design,
            mobile application development and digital marketing.
            Our goal is to help businesses build a stronger digital
            presence through reliable, effective and modern solutions.
          </p>

          <p>
            We believe technology should solve real problems.
            That is why we focus on understanding each client's
            requirements and delivering solutions that create
            practical value.
          </p>

        </div>

        {/* STORY VISUAL */}
        <div className="gs-about-page-story-visual">

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
        </div>

      </section>

      {/* MISSION & VISION */}
      <section className="gs-about-page-container gs-about-page-mission">

        <div className="gs-about-page-info-card">

          <span className="gs-about-info-icon">
            <Target size={25} />
          </span>

          <span className="gs-about-small-label">
            OUR MISSION
          </span>

          <h3>
            Making Technology Work for Everyone.
          </h3>

          <p>
            To deliver accessible, reliable and innovative digital
            solutions that help businesses grow, operate efficiently
            and achieve their goals.
          </p>

        </div>

        <div className="gs-about-page-info-card">

          <span className="gs-about-info-icon">
            <Sparkles size={25} />
          </span>

          <span className="gs-about-small-label">
            OUR VISION
          </span>

          <h3>
            Creating a Smarter Digital Future.
          </h3>

          <p>
            To become a trusted technology partner by continuously
            embracing innovation, quality and meaningful digital
            transformation.
          </p>

        </div>

      </section>

      {/* WHY GAMMASOFT */}
      <section className="gs-about-page-container gs-about-page-strengths">

        <div className="gs-about-page-section-heading">

          <span className="gs-about-small-label">
            WHY GAMMASOFT
          </span>

          <h2>
            What Makes Us <span>Different.</span>
          </h2>

          <p>
            Our approach combines technology, creativity and
            collaboration to deliver meaningful results.
          </p>

        </div>

        <div className="gs-about-page-strength-grid">

          {strengths.map((item) => {
            const Icon = item.icon;

            return (
              <article
                className="gs-about-page-strength-card"
                key={item.title}
              >
                <div className="gs-value-icon">
                  <Icon size={24} />
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </article>
            );
          })}

        </div>

      </section>

      {/* OUR VALUES */}
      <section className="gs-about-page-container gs-about-page-values">

        <div className="gs-about-page-section-heading">

          <span className="gs-about-small-label">
            WHAT DRIVES US
          </span>

          <h2>
            Our Commitment to <span>Excellence.</span>
          </h2>

        </div>

        <div className="gs-values-grid">

          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <article
                className="gs-value-card"
                key={value.title}
              >
                <div className="gs-value-icon">
                  <Icon size={24} />
                </div>

                <span className="gs-value-number">
                  0{index + 1}
                </span>

                <h4>{value.title}</h4>

                <p>{value.description}</p>
              </article>
            );
          })}

        </div>

      </section>

      {/* CTA SECTION */}
      <section className="gs-about-page-container gs-about-page-cta">

        <div>

          <span className="gs-about-small-label">
            LET'S BUILD SOMETHING GREAT
          </span>

          <h2>
            Have an Idea?
            <br />
            <span>Let's Make It Happen.</span>
          </h2>

          <p>
            Let's discuss how technology can help move your business forward.
          </p>

        </div>

        <button
          type="button"
          className="gs-about-cta-button"
          onClick={handleGetInTouch}
        >
          Get in Touch
          <ArrowUpRight size={19} />
        </button>

      </section>

    </main>
  );
};

export default AboutPage;
