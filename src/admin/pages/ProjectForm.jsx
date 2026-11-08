
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";

import api from "../../services/api";
import "./ProjectForm.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(
  "/api",
  ""
);

const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http")) return image;

  return `${API_BASE}/storage/${image.replace(/^\/+/, "")}`;
};

const initialForm = {
  title: "",
  slug: "",
  category: "",
  short_description: "",
  description: "",
  image: "",
  client_name: "",
  project_url: "",
  technologies: "",
  is_featured: false,
  sort_order: 0,
  status: "draft",
};

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    const fetchProject = async () => {
      try {
        const response = await api.get(`/admin/projects/${id}`);
        const project = response.data.data;

        setForm({
          ...initialForm,
          ...project,
          technologies: Array.isArray(project.technologies)
            ? project.technologies.join(", ")
            : project.technologies || "",
          is_featured: Boolean(project.is_featured),
          sort_order: project.sort_order ?? 0,
        });

        if (project.image) {
          setImagePreview(getImageUrl(project.image));
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load project details."
        );
      } finally {
        setFetching(false);
      }
    };

    fetchProject();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "title" && !isEdit) {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      setForm((previous) => ({
        ...previous,
        title: value,
        slug,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imagePath = form.image || "";

      // Upload image first, if a new image is selected
      if (imageFile) {
        const imageData = new FormData();

        imageData.append("type", "projects");
        imageData.append("image", imageFile);

        const uploadResponse = await api.post(
          "/admin/media/upload",
          imageData
        );

        imagePath = uploadResponse.data.data.path;
      }

      const payload = {
        ...form,
        image: imagePath || null,
        is_featured: form.is_featured,
        sort_order: Number(form.sort_order),
        project_url: form.project_url || null,
        client_name: form.client_name || null,
        technologies: form.technologies || null,
      };

      if (isEdit) {
        await api.put(`/admin/projects/${id}`, payload);
      } else {
        await api.post("/admin/projects", payload);
      }

      navigate("/admin/projects");
    } catch (err) {
      const validationErrors = err.response?.data?.errors;

      if (validationErrors) {
        setError(
          Object.values(validationErrors).flat().join(" ")
        );
      } else {
        setError(
          err.response?.data?.message ||
          "Unable to save project."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="project-form-loading">
        Loading project details...
      </div>
    );
  }

  return (
    <div className="project-form-page">
      <div className="project-form-heading">
        <div>
          <button
            type="button"
            className="project-form-back"
            onClick={() => navigate("/admin/projects")}
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>

          <h1>{isEdit ? "Edit Project" : "Add New Project"}</h1>

          <p>
            {isEdit
              ? "Update your project information."
              : "Add a new project to your company portfolio."}
          </p>
        </div>
      </div>

      {error && (
        <div className="project-form-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="project-form-layout">
          <div className="project-form-main">
            <section className="project-form-card">
              <div className="project-form-card-heading">
                <h2>Basic Information</h2>
                <p>Project title and descriptions.</p>
              </div>

              <div className="project-form-fields">
                <div className="project-form-field">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div className="project-form-field">
                  <label>Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="project-url-slug"
                    required
                  />
                </div>

                <div className="project-form-field">
                  <label>Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="e.g. Web Development"
                    required
                  />
                </div>

                <div className="project-form-field">
                  <label>Client Name</label>
                  <input
                    type="text"
                    name="client_name"
                    value={form.client_name || ""}
                    onChange={handleChange}
                    placeholder="Client or company name"
                  />
                </div>

                <div className="project-form-field full">
                  <label>Short Description *</label>
                  <textarea
                    name="short_description"
                    value={form.short_description}
                    onChange={handleChange}
                    placeholder="Write a short project summary"
                    rows={3}
                    required
                  />
                </div>

                <div className="project-form-field full">
                  <label>Full Description *</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Write complete project details"
                    rows={7}
                    required
                  />
                </div>

                <div className="project-form-field full">
                  <label>Technologies</label>
                  <input
                    type="text"
                    name="technologies"
                    value={form.technologies || ""}
                    onChange={handleChange}
                    placeholder="React, Laravel, MySQL"
                  />
                  <small>Separate technologies with commas.</small>
                </div>

                <div className="project-form-field full">
                  <label>Project Website URL</label>
                  <input
                    type="url"
                    name="project_url"
                    value={form.project_url || ""}
                    onChange={handleChange}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="project-form-side">
            <section className="project-form-card">
              <div className="project-form-card-heading">
                <h2>Project Image</h2>
                <p>Upload JPG, PNG or WEBP. Maximum 5 MB.</p>
              </div>

              <div className="project-image-upload">
                {imagePreview ? (
                  <div className="project-image-preview">
                    <img src={imagePreview} alt="Project preview" />

                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                        setForm((previous) => ({
                          ...previous,
                          image: "",
                        }));
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="project-image-dropzone">
                    <ImageIcon size={32} />
                    <strong>Choose Project Image</strong>
                    <span>JPG, PNG or WEBP</span>

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                    />
                  </label>
                )}

                {imagePreview && (
                  <label className="project-image-change">
                    <Upload size={16} />
                    Change Image
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </section>

            <section className="project-form-card">
              <div className="project-form-card-heading">
                <h2>Publishing</h2>
                <p>Control project visibility.</p>
              </div>

              <div className="project-form-field">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="project-form-field project-order-field">
                <label>Sort Order</label>
                <input
                  type="number"
                  min="0"
                  name="sort_order"
                  value={form.sort_order}
                  onChange={handleChange}
                />
              </div>

              <label className="project-featured-toggle">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={form.is_featured}
                  onChange={handleChange}
                />

                <span>
                  <strong>Featured Project</strong>
                  <small>Highlight this project on the website.</small>
                </span>
              </label>
            </section>

            <div className="project-form-actions">
              <button
                type="button"
                className="project-cancel-button"
                onClick={() => navigate("/admin/projects")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="project-save-button"
                disabled={loading}
              >
                <Save size={17} />
                {loading
                  ? "Saving..."
                  : isEdit
                    ? "Update Project"
                    : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
