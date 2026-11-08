
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  X,
  Layers3,
  Code2,
  Globe2,
  BriefcaseBusiness,
  RefreshCw,
} from "lucide-react";

import { HashLink } from "react-router-hash-link";
import api from "../services/api";
import "./Projects.css";

// Category অনুযায়ী icon
const getIcon = (category = "") => {
  const value = category.toLowerCase();

  if (/web|software|development/.test(value)) return Code2;
  if (/network|communication|telecom/.test(value)) return Globe2;
  if (/business|management|solution/.test(value)) return BriefcaseBusiness;

  return Layers3;
};

// Technologies data
const getTechnologies = (value) => {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return value.split("\n").filter(Boolean);
    }
  }

  return [];
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Backend থেকে Projects আনা
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/projects");
      const result = response.data?.data;

      const projectList = Array.isArray(result)
        ? result
        : result?.data || [];

      setProjects(projectList.slice(0, 3));
    } catch (err) {
      console.error("Home Projects API Error:", err);
      setError("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Modal close
  useEffect(() => {
    if (!selectedProject) return;

    const closeModal = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeModal);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeModal);
    };
  }, [selectedProject]);

  return (
    <section className="gs-projects" id="projects">
      <div className="gs-projects-glow" />

      <div className="gs-projects-container">

        {/* Heading */}
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

        {/* Statistics */}
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

        {/* Loading */}
        {loading && (
          <div className="gs-project-empty">
            <RefreshCw size={28} />
            <h3>Loading Projects...</h3>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="gs-project-empty">
            <h3>{error}</h3>
            <button
              className="gs-project-details-btn"
              onClick={fetchProjects}
            >
              Try Again <RefreshCw size={16} />
            </button>
          </div>
        )}

        {/* Project Cards */}
        {!loading && !error && (
          <div className="gs-project-grid">
            {projects.map((project, index) => {
              const Icon = getIcon(project.category);

              return (
                <article
                  key={project.id}
                  className="gs-project-card"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                >
                  <div className="gs-project-card-top">
                    <span className="gs-project-number">
                      {String(index + 1).padStart(2, "0")}
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
                      {project.category || "Project"}
                    </span>

                    <h3>{project.title}</h3>

                    <h4>
                      {project.client_name || project.category}
                    </h4>

                    <p>
                      {project.short_description ||
                        project.description ||
                        "Explore this project to learn more."}
                    </p>
                  </div>

                  <div className="gs-project-card-bottom">
                    <span className="gs-project-details-btn">
                      View Project Details
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </article>
              );
            })}

            {!projects.length && (
              <div className="gs-project-empty">
                <Layers3 size={30} />
                <h3>No Projects Available</h3>
              </div>
            )}
          </div>
        )}

        {/* View All */}
        <div className="gs-project-view-all">
          <HashLink smooth to="/projects">
            Explore All Projects
            <ArrowUpRight size={18} />
          </HashLink>
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="gs-project-modal-title"
          >
            <button
              className="gs-project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <div className="gs-project-modal-label">
              PROJECT DETAILS / {selectedProject.id}
            </div>

            <div className="gs-project-modal-icon">
              {(() => {
                const Icon = getIcon(selectedProject.category);
                return <Icon size={30} />;
              })()}
            </div>

            <span className="gs-project-tag">
              {selectedProject.category || "Project"}
            </span>

            <h2 id="gs-project-modal-title">
              {selectedProject.title}
            </h2>

            <h4>
              {selectedProject.client_name || selectedProject.category}
            </h4>

            <p className="gs-project-modal-description">
              {selectedProject.description ||
                selectedProject.short_description ||
                "No additional description available."}
            </p>

            {/* Technologies */}
            {getTechnologies(selectedProject.technologies).length > 0 && (
              <div className="gs-project-modal-features">
                <h3>Technologies Used</h3>

                <div className="gs-project-feature-list">
                  {getTechnologies(selectedProject.technologies).map(
                    (item, index) => (
                      <div key={index}>
                        <CheckCircle2 size={18} />
                        <span>
                          {typeof item === "string"
                            ? item
                            : item.name || item.title}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Project Website */}
            {selectedProject.project_url && (
              <div className="gs-project-suitable">
                <span>PROJECT WEBSITE</span>
                <p>
                  <a
                    href={selectedProject.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Project Website <ArrowUpRight size={14} />
                  </a>
                </p>
              </div>
            )}

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

export default Projects;
