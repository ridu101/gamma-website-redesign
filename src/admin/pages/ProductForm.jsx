
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon,
  X,
  Monitor,
  Cpu,
} from "lucide-react";

import api from "../../services/api";

import "./ProductForm.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(
  /\/api\/?$/,
  ""
);

const initialForm = {
  title: "",
  slug: "",
  category: "",
  product_type: "software",
  short_description: "",
  description: "",
  image: "",
  product_url: "",
  is_featured: false,
  sort_order: 0,
  status: "draft",
};

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // =============================================
  // FETCH PRODUCT FOR EDIT
  // =============================================

  useEffect(() => {
    if (isEditing) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/admin/products/${id}`);

      const product = response.data.data;

      setForm({
        title: product.title || "",
        slug: product.slug || "",
        category: product.category || "",
        product_type: product.product_type || "software",
        short_description: product.short_description || "",
        description: product.description || "",
        image: product.image || "",
        product_url: product.product_url || "",
        is_featured: Boolean(product.is_featured),
        sort_order: product.sort_order ?? 0,
        status: product.status || "draft",
      });

      if (product.image) {
        setImagePreview(
          product.image.startsWith("http")
            ? product.image
            : `${API_BASE}/storage/${product.image.replace(/^\/+/, "")}`
        );
      }
    } catch (error) {
      console.error("Product loading error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load product."
      );

      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  // =============================================
  // HANDLE INPUT CHANGE
  // =============================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Auto-generate slug for new products
      if (name === "title" && !isEditing) {
        updated.slug = value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }

      return updated;
    });
  };

  // =============================================
  // HANDLE IMAGE CHANGE
  // =============================================

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

  // =============================================
  // REMOVE IMAGE
  // =============================================

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");

    setForm((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // =============================================
  // SUBMIT FORM
  // =============================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      let imagePath = form.image;

      // IMAGE UPLOAD

      if (imageFile) {
        const uploadData = new FormData();

        uploadData.append("type", "products");
        uploadData.append("image", imageFile);

        const uploadResponse = await api.post(
          "/admin/media/upload",
          uploadData
        );

        imagePath = uploadResponse.data.data.path;
      }

      // PRODUCT PAYLOAD

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        category: form.category.trim() || null,

        product_type: form.product_type,

        short_description:
          form.short_description.trim() || null,

        description:
          form.description.trim() || null,

        image: imagePath || null,

        product_url:
          form.product_url.trim() || null,

        is_featured: form.is_featured,

        sort_order: Number(form.sort_order) || 0,

        status: form.status,
      };

      // CREATE / UPDATE

      if (isEditing) {
        await api.put(`/admin/products/${id}`, payload);
      } else {
        await api.post("/admin/products", payload);
      }

      alert(
        isEditing
          ? "Product updated successfully."
          : "Product created successfully."
      );

      navigate("/admin/products");

    } catch (error) {
      console.error("Product save error:", error);

      const errors = error.response?.data?.errors;

      if (errors) {
        const firstError = Object.values(errors)[0]?.[0];

        alert(firstError || "Validation failed.");
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to save product."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // =============================================
  // LOADING
  // =============================================

  if (loading) {
    return (
      <div className="admin-product-form-loading">
        Loading product...
      </div>
    );
  }

  // =============================================
  // RENDER
  // =============================================

  return (
    <div className="admin-product-form-page">

      {/* HEADER */}

      <div className="admin-product-form-header">
        <div>

          <button
            type="button"
            className="admin-product-back"
            onClick={() => navigate("/admin/products")}
          >
            <ArrowLeft size={17} />
            Back to Products
          </button>

          <h1>
            {isEditing ? "Edit Product" : "Add New Product"}
          </h1>

          <p>
            {isEditing
              ? "Update your product information."
              : "Create a new product for your company."}
          </p>

        </div>
      </div>

      {/* MAIN FORM */}

      <form
        className="admin-product-form"
        onSubmit={handleSubmit}
      >

        <div className="admin-product-form-main">

          {/* BASIC INFORMATION */}

          <section className="admin-product-form-card">

            <div className="admin-product-form-section-title">
              <h2>Basic Information</h2>
              <p>Enter the main product details.</p>
            </div>

            {/* PRODUCT TITLE */}

            <div className="admin-product-field">
              <label>
                Product Title <span>*</span>
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter product title"
                required
              />
            </div>

            {/* SLUG */}

            <div className="admin-product-field">
              <label>
                Slug <span>*</span>
              </label>

              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="product-slug"
                required
              />
            </div>

            {/* PRODUCT TYPE */}

            <div className="admin-product-field">
              <label>
                Product Type <span>*</span>
              </label>

              <select
                name="product_type"
                value={form.product_type}
                onChange={handleChange}
                required
              >
                <option value="software">
                  Software Solution
                </option>

                <option value="device">
                  Device Solution
                </option>
              </select>

              <small>
                Select whether this product is software or a physical device.
              </small>
            </div>

            {/* CATEGORY */}

            <div className="admin-product-field">
              <label>Category</label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder={
                  form.product_type === "software"
                    ? "e.g. Business Software"
                    : "e.g. Networking Devices"
                }
              />
            </div>

            {/* SHORT DESCRIPTION */}

            <div className="admin-product-field">
              <label>Short Description</label>

              <textarea
                name="short_description"
                value={form.short_description}
                onChange={handleChange}
                rows="3"
                placeholder="Write a short product description..."
              />
            </div>

            {/* FULL DESCRIPTION */}

            <div className="admin-product-field">
              <label>Full Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="7"
                placeholder="Write full product details..."
              />
            </div>

            {/* PRODUCT URL */}

            <div className="admin-product-field">
              <label>Product Website URL</label>

              <input
                type="url"
                name="product_url"
                value={form.product_url}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>

          </section>

          {/* IMAGE */}

          <section className="admin-product-form-card">

            <div className="admin-product-form-section-title">
              <h2>Product Image</h2>
              <p>
                Upload a JPG, PNG or WEBP image. Maximum 5 MB.
              </p>
            </div>

            {imagePreview ? (
              <div className="admin-product-image-preview">

                <img
                  src={imagePreview}
                  alt="Product preview"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  title="Remove image"
                >
                  <X size={17} />
                </button>

              </div>
            ) : (
              <label className="admin-product-upload">

                <ImageIcon size={35} />

                <strong>Upload Product Image</strong>

                <span>Click to select an image</span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                />

              </label>
            )}

            {imagePreview && (
              <label className="admin-product-change-image">
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

        {/* SIDEBAR SETTINGS */}

        <aside className="admin-product-form-sidebar">

          <section className="admin-product-form-card">

            <div className="admin-product-form-section-title">
              <h2>Publish Settings</h2>
              <p>Control product visibility.</p>
            </div>

            {/* TYPE PREVIEW */}

            <div className="admin-product-type-preview">
              {form.product_type === "software" ? (
                <Monitor size={22} />
              ) : (
                <Cpu size={22} />
              )}

              <div>
                <strong>
                  {form.product_type === "software"
                    ? "Software Solution"
                    : "Device Solution"}
                </strong>

                <small>Selected product type</small>
              </div>
            </div>

            {/* STATUS */}

            <div className="admin-product-field">
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

            {/* SORT ORDER */}

            <div className="admin-product-field">
              <label>Sort Order</label>

              <input
                type="number"
                min="0"
                name="sort_order"
                value={form.sort_order}
                onChange={handleChange}
              />
            </div>

            {/* FEATURED */}

            <label className="admin-product-featured-toggle">

              <input
                type="checkbox"
                name="is_featured"
                checked={form.is_featured}
                onChange={handleChange}
              />

              <span>
                <strong>Featured Product</strong>
                <small>Highlight this product.</small>
              </span>

            </label>

          </section>

          {/* SAVE */}

          <button
            type="submit"
            className="admin-product-save"
            disabled={saving}
          >
            <Save size={17} />

            {saving
              ? "Saving..."
              : isEditing
                ? "Update Product"
                : "Create Product"}
          </button>

          {/* CANCEL */}

          <button
            type="button"
            className="admin-product-cancel"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </button>

        </aside>

      </form>
    </div>
  );
};

export default ProductForm;
