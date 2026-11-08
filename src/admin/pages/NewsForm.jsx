
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon,
  X,
} from "lucide-react";

import api from "../../services/api";

import "./NewsForm.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace("/api", "");

const initialForm = {
  title: "",
  slug: "",
  category: "",
  excerpt: "",
  content: "",
  image: "",
  author: "",
  published_at: "",
  status: "draft",
};

const formatDateTimeForInput = (date) => {
  if (!date) return "";

  return date.replace(" ", "T").slice(0, 16);
};

const NewsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (isEditing) {
      fetchNews();
    }
  }, [id]);

  const fetchNews = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/admin/news/${id}`);

      const item = response.data.data;

      setForm({
        title: item.title || "",
        slug: item.slug || "",
        category: item.category || "",
        excerpt: item.excerpt || "",
        content: item.content || "",
        image: item.image || "",
        author: item.author || "",
        published_at: formatDateTimeForInput(
          item.published_at
        ),
        status: item.status || "draft",
      });

      if (item.image) {
        setImagePreview(
          item.image.startsWith("http")
            ? item.image
            : `${API_BASE}/storage/${item.image}`
        );
      }
    } catch (error) {
      console.error("News loading error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load news."
      );

      navigate("/admin/news");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title" && !isEditing) {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      setForm((prev) => ({
        ...prev,
        title: value,
        slug,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      alert("Only JPG, PNG and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");

    setForm((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      let imagePath = form.image;

      // IMAGE UPLOAD

      if (imageFile) {
        const uploadData = new FormData();

        uploadData.append("type", "news");
        uploadData.append("image", imageFile);

        const uploadResponse = await api.post(
          "/admin/media/upload",
          uploadData
        );

        imagePath = uploadResponse.data.data.path;
      }

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        category: form.category.trim() || null,
        excerpt: form.excerpt.trim() || null,
        content: form.content.trim(),
        image: imagePath || null,
        author: form.author.trim() || null,
        published_at: form.published_at
          ? `${form.published_at.replace("T", " ")}:00`
          : null,
        status: form.status,
      };

      if (isEditing) {
        await api.put(`/admin/news/${id}`, payload);
      } else {
        await api.post("/admin/news", payload);
      }

      alert(
        isEditing
          ? "News updated successfully."
          : "News created successfully."
      );

      navigate("/admin/news");
    } catch (error) {
      console.error("News save error:", error);

      const errors = error.response?.data?.errors;

      if (errors) {
        const firstError = Object.values(errors)[0]?.[0];
        alert(firstError || "Validation failed.");
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to save news."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-news-form-loading">
        Loading news...
      </div>
    );
  }

  return (
    <div className="admin-news-form-page">
      {/* HEADER */}

      <div className="admin-news-form-header">
        <div>
          <button
            type="button"
            className="admin-news-back"
            onClick={() => navigate("/admin/news")}
          >
            <ArrowLeft size={17} />
            Back to News
          </button>

          <h1>{isEditing ? "Edit News" : "Add New News"}</h1>

          <p>
            {isEditing
              ? "Update your news article information."
              : "Create a new company news article."}
          </p>
        </div>
      </div>

      <form
        className="admin-news-form"
        onSubmit={handleSubmit}
      >
        <div className="admin-news-form-main">
          {/* BASIC INFORMATION */}

          <section className="admin-news-form-card">
            <div className="admin-news-form-section-title">
              <h2>News Information</h2>
              <p>Enter the article details.</p>
            </div>

            <div className="admin-news-field">
              <label>
                News Title <span>*</span>
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter news title"
                required
              />
            </div>

            <div className="admin-news-field">
              <label>
                Slug <span>*</span>
              </label>

              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="news-article-slug"
                required
              />
            </div>

            <div className="admin-news-field">
              <label>Category</label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Company News"
              />
            </div>

            <div className="admin-news-field">
              <label>Short Excerpt</label>

              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                rows="3"
                placeholder="Write a short summary of the news..."
              />
            </div>

            <div className="admin-news-field">
              <label>
                Full Content <span>*</span>
              </label>

              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows="12"
                placeholder="Write the full news article..."
                required
              />
            </div>
          </section>

          {/* IMAGE */}

          <section className="admin-news-form-card">
            <div className="admin-news-form-section-title">
              <h2>News Image</h2>
              <p>Upload JPG, PNG or WEBP. Maximum 5 MB.</p>
            </div>

            {imagePreview ? (
              <div className="admin-news-image-preview">
                <img src={imagePreview} alt="News preview" />

                <button
                  type="button"
                  onClick={removeImage}
                  title="Remove image"
                >
                  <X size={17} />
                </button>
              </div>
            ) : (
              <label className="admin-news-upload">
                <ImageIcon size={35} />

                <strong>Upload News Image</strong>

                <span>Click to select an image</span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                />
              </label>
            )}

            {imagePreview && (
              <label className="admin-news-change-image">
                <Upload size={16} />
                Change Image

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </section>
        </div>

        {/* PUBLISH SETTINGS */}

        <aside className="admin-news-form-sidebar">
          <section className="admin-news-form-card">
            <div className="admin-news-form-section-title">
              <h2>Publish Settings</h2>
              <p>Set author and publication details.</p>
            </div>

            <div className="admin-news-field">
              <label>Author</label>

              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="e.g. GammaSoft Team"
              />
            </div>

            <div className="admin-news-field">
              <label>Publication Date & Time</label>

              <input
                type="datetime-local"
                name="published_at"
                value={form.published_at}
                onChange={handleChange}
              />
            </div>

            <div className="admin-news-field">
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
          </section>

          <button
            type="submit"
            className="admin-news-save"
            disabled={saving}
          >
            <Save size={17} />

            {saving
              ? "Saving..."
              : isEditing
                ? "Update News"
                : "Create News"}
          </button>

          <button
            type="button"
            className="admin-news-cancel"
            onClick={() => navigate("/admin/news")}
          >
            Cancel
          </button>
        </aside>
      </form>
    </div>
  );
};

export default NewsForm;
