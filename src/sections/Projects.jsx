
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  X,
} from "lucide-react";
import { HashLink } from "react-router-hash-link";

import { projects } from "../data/projects";
import "./Projects.css";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="gs-projects" id="projects">
      <div className="gs-projects-glow" />

      <div className="gs-projects-container">
        <div className="gs-projects-heading">
          <div className="gs-section-label">
            <Sparkles size={15} />
            <span>OUR PROJECTS & SOLUTIONS</span>
          </div>

          <h2>
            Technology That
            <span> Drives Progress.</span>
          </h2>

          <p>
            Explore our technology solutions designed to simplify
            business operations, improve connectivity and accelerate
            digital transformation.
          </p>
        </div>

        <div className="gs-projects-stats">
          <div className="gs-project-stat">
            <span>{String(projects.length).padStart(2, "0")}</span>
            <p>Solutions & Services</p>
          </div>

          <div className="gs-project-stat">
            <span>06+</span>
            <p>Technology Areas</p>
          </div>

          <div className="gs-project-stat">
            <span>360°</span>
            <p>Digital Solutions</p>
          </div>
        </div>

        <div className="gs-project-grid">
          {featuredProjects.map((project) => {
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
                   
                  >
                    Explore Solution
                    <ArrowRight size={17} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="gs-project-view-all">
          <HashLink smooth to="/projects">
            Explore All Projects
            <ArrowUpRight size={18} />
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
              to="/#contact"
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

export default Projects;
