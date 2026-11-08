
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  FolderKanban,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

import api from "../../services/api";
import "./Projects.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(
  "/api",
  ""
);

const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http")) return image;

  return `${API_BASE}/storage/${image.replace(/^\/+/, "")}`;
};

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProjects = async (currentPage = page) => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/admin/projects", {
        params: { page: currentPage },
      });

      const result = response.data.data;

      setProjects(result.data || []);
      setPage(result.current_page || 1);
      setLastPage(result.last_page || 1);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(1);
  }, []);

  const filteredProjects = projects.filter((project) => {
    const keyword = search.toLowerCase();

    return (
      project.title?.toLowerCase().includes(keyword) ||
      project.category?.toLowerCase().includes(keyword) ||
      project.slug?.toLowerCase().includes(keyword)
    );
  });

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) return;

    setDeletingId(project.id);

    try {
      await api.delete(`/admin/projects/${project.id}`);

      await fetchProjects(page);
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to delete project."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusClass = (status) => {
    return `project-status status-${status}`;
  };

  return (
    <div className="admin-projects">
      <div className="projects-heading">
        <div>
          <span className="projects-eyebrow">
            CONTENT MANAGEMENT
          </span>

          <h1>Projects</h1>

          <p>
            Manage your company projects and portfolio.
          </p>
        </div>

        <button
          className="projects-add-button"
          onClick={() => navigate("/admin/projects/create")}
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      <div className="projects-toolbar">
        <div className="projects-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className="projects-refresh-button"
          onClick={() => fetchProjects(1)}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="projects-error">
          {error}
        </div>
      )}

      <div className="projects-table-card">
        <div className="projects-table-header">
          <div>
            <h2>All Projects</h2>
            <span>
              {projects.length} projects on this page
            </span>
          </div>
        </div>

        {loading ? (
          <div className="projects-empty">
            Loading projects...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="projects-empty">
            <FolderKanban size={35} />
            <h3>No Projects Found</h3>
            <p>
              {search
                ? "Try another search keyword."
                : "Add your first project to get started."}
            </p>
          </div>
        ) : (
          <div className="projects-table-scroll">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>PROJECT</th>
                  <th>CATEGORY</th>
                  <th>STATUS</th>
                  <th>FEATURED</th>
                  <th>ORDER</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <div className="project-table-info">
                        <div className="project-table-image">
                          {project.image ? (
                            <img
                              src={getImageUrl(project.image)}
                              alt={project.title}
                            />
                          ) : (
                            <FolderKanban size={20} />
                          )}
                        </div>

                        <div className="project-table-title">
                          <strong>{project.title}</strong>
                          <span>{project.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="project-category">
                        {project.category || "Uncategorized"}
                      </span>
                    </td>

                    <td>
                      <span className={getStatusClass(project.status)}>
                        {project.status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          project.is_featured
                            ? "project-featured yes"
                            : "project-featured no"
                        }
                      >
                        {project.is_featured ? "Yes" : "No"}
                      </span>
                    </td>

                    <td>{project.sort_order ?? 0}</td>

                    <td>
                      <div className="project-actions">
                        <button
                          title="Edit Project"
                          onClick={() =>
                            navigate(`/admin/projects/${project.id}/edit`)
                          }
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          title="Delete Project"
                          className="project-delete-button"
                          disabled={deletingId === project.id}
                          onClick={() => handleDelete(project)}
                        >
                          <Trash2 size={16} />
                        </button>

                        {project.project_url && (
                          <a
                            href={project.project_url}
                            target="_blank"
                            rel="noreferrer"
                            title="Open Project"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && lastPage > 1 && (
          <div className="projects-pagination">
            <button
              disabled={page <= 1}
              onClick={() => fetchProjects(page - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {lastPage}
            </span>

            <button
              disabled={page >= lastPage}
              onClick={() => fetchProjects(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
