import { useState } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  X,
  CheckCircle2,
  Sparkles,
  Layers3,
} from "lucide-react";

import { projects, projectCategories } from "../data/projects";

import "./Projects.css";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  return (
    <section className="gs-projects" id="projects">
      <div className="gs-projects-glow"></div>

      <div className="gs-projects-container">

        {/* Section Heading */}

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

        {/* Project Statistics */}

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

        {/* Category Filters */}

        <div className="gs-project-filters">
          {projectCategories.map((category) => (
            <button
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

        {/* Projects Grid */}

        <div className="gs-project-grid">

          {filteredProjects.map((project) => {
            const Icon = project.icon;

            return (
              <article
                className={`gs-project-card ${project.color}`}
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

        {/* Empty State */}

        {filteredProjects.length === 0 && (
          <div className="gs-project-empty">
            <Layers3 size={35} />
            <h3>No projects found</h3>
            <p>Try selecting another category.</p>
          </div>
        )}

        {/* Bottom CTA */}

        <div className="gs-project-cta">

          <div>
            <span>HAVE A PROJECT IN MIND?</span>
            <h3>
              Let's build something
              <strong> extraordinary.</strong>
            </h3>
          </div>

          <a href="#contact">
            Start a Conversation
            <ArrowUpRight size={19} />
          </a>

        </div>

      </div>

      {/* Project Details Modal */}

      {selectedProject && (
        <div
          className="gs-project-modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="gs-project-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
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

            <h2>{selectedProject.name}</h2>

            <h4>{selectedProject.subtitle}</h4>

            <p className="gs-project-modal-description">
              {selectedProject.details}
            </p>

            <div className="gs-project-modal-features">

              <h3>Key Features</h3>

              <div className="gs-project-feature-list">
                {selectedProject.features.map((feature, index) => (
                  <div key={index}>
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

            <a
              href="#contact"
              className="gs-project-modal-cta"
              onClick={() => setSelectedProject(null)}
            >
              Discuss This Project
              <ArrowUpRight size={18} />
            </a>

          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;