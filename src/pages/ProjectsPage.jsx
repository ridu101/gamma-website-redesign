
// import { useEffect, useState } from "react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  X,
  CheckCircle2,
  Sparkles,
  Layers3,
} from "lucide-react";
import { HashLink } from "react-router-hash-link";

import { projects, projectCategories } from "../data/projects";
import "../sections/Projects.css";
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

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section className="gs-projects gs-projects-page">
      <div className="gs-projects-glow" />

      <div className="gs-projects-container">
        <div className="gs-projects-heading">
          <div className="gs-section-label">
            <Sparkles size={15} />
            <span>OUR COMPLETE PORTFOLIO</span>
          </div>

          <h2>
            Explore Our
            <span> Projects & Solutions.</span>
          </h2>

          <p>
            Discover our complete range of software, communication,
            networking and technology solutions built to help
            businesses move forward.
          </p>
        </div>

     <div className="gs-projects-stats">
  <div className="gs-project-stat">
    <AnimatedNumber
      target={projects.length}
      pad
      duration={1800}
    />
    <p>Solutions & Services</p>
  </div>

  <div className="gs-project-stat">
    <AnimatedNumber
      target={6}
      suffix="+"
      duration={1800}
    />
    <p>Technology Areas</p>
  </div>

  <div className="gs-project-stat">
    <AnimatedNumber
      target={360}
      suffix="°"
      duration={2000}
    />
    <p>Digital Solutions</p>
  </div>
</div>
        <div className="gs-project-filters">
          {projectCategories.map((category) => (
            <button
              type="button"
              key={category}
              className={`gs-project-filter ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gs-project-grid">
          {filteredProjects.map((project) => {
            const Icon = project.icon;

            return (
              <article
                className={`gs-project-card ${project.color || ""}`}
                key={project.id}
              >
                <div className="gs-project-card-top">
                  <span className="gs-project-number">
                    {project.number}
                  </span>

                  <div className="gs-project-icon">
                    <Icon size={25} strokeWidth={1.7} />
                  </div>

                  <span className="gs-project-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </div>

                <div className="gs-project-card-content">
                  <span className="gs-project-tag">
                    {project.tag}
                  </span>

                  <h3>{project.name}</h3>
                  <h4>{project.subtitle}</h4>
                  <p>{project.description}</p>
                </div>

                <div className="gs-project-card-bottom">
                  <button
                    type="button"
                    className="gs-project-details-btn"
                    onClick={() => setSelectedProject(project)}
                  >
                    Explore Solution
                    <ArrowRight size={17} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="gs-project-empty">
            <Layers3 size={35} />
            <h3>No projects found</h3>
            <p>Try selecting another category.</p>
          </div>
        )}

        <div className="gs-project-cta">
          <div>
            <span>HAVE A PROJECT IN MIND?</span>
            <h3>
              Let's build something
              <strong> extraordinary.</strong>
            </h3>
          </div>

          <HashLink smooth to="/#contact">
            Start a Conversation
            <ArrowUpRight size={19} />
          </HashLink>
        </div>
      </div>

      {selectedProject && (
        <div
          className="gs-project-modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="gs-project-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gs-project-modal-title"
          >
            <button
              type="button"
              className="gs-project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              <X size={22} />
            </button>

            <div className="gs-project-modal-label">
              PROJECT DETAILS / {selectedProject.number}
            </div>

            <div className="gs-project-modal-icon">
              {(() => {
                const Icon = selectedProject.icon;
                return <Icon size={30} />;
              })()}
            </div>

            <span className="gs-project-tag">
              {selectedProject.tag}
            </span>

            <h2 id="gs-project-modal-title">
              {selectedProject.name}
            </h2>

            <h4>{selectedProject.subtitle}</h4>

            <p className="gs-project-modal-description">
              {selectedProject.details}
            </p>

            <div className="gs-project-modal-features">
              <h3>Key Features</h3>

              <div className="gs-project-feature-list">
                {selectedProject.features.map((feature, index) => (
                  <div key={`${selectedProject.id}-${index}`}>
                    <CheckCircle2 size={18} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="gs-project-suitable">
              <span>IDEAL FOR</span>
              <p>{selectedProject.suitableFor}</p>
            </div>

            <HashLink
              smooth
              to="/get-quote"
              className="gs-project-modal-cta"
              onClick={() => setSelectedProject(null)}
            >
              Discuss This Project
              <ArrowUpRight size={18} />
            </HashLink>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsPage;
