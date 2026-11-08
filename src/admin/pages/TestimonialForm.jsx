
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Star } from "lucide-react";

import api from "../../services/api";
import "./TestimonialForm.css";

const initialForm = {
    name: "",
    designation: "",
    company: "",
    category: "",
    message: "",
    rating: 5,
    color: "purple",
    status: "draft",
    sort_order: 0,
};

const TestimonialForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEdit) {
            fetchTestimonial();
        }
    }, [id]);

    const fetchTestimonial = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                `/admin/testimonials/${id}`
            );

            const data = response.data.data;

            setForm({
                name: data.name || "",
                designation: data.designation || "",
                company: data.company || "",
                category: data.category || "",
                message: data.message || "",
                rating: data.rating || 5,
                color: data.color || "purple",
                status: data.status || "draft",
                sort_order: data.sort_order ?? 0,
            });
        } catch (error) {
            console.error("Testimonial loading error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to load testimonial."
            );

            navigate("/admin/testimonials");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: name === "rating" || name === "sort_order"
                ? Number(value)
                : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setErrors({});

        try {
            const payload = {
                ...form,
                rating: Number(form.rating),
                sort_order: Number(form.sort_order),
                image: null,
            };

            if (isEdit) {
                await api.put(
                    `/admin/testimonials/${id}`,
                    payload
                );

                alert("Testimonial updated successfully.");
            } else {
                await api.post(
                    "/admin/testimonials",
                    payload
                );

                alert("Testimonial created successfully.");
            }

            navigate("/admin/testimonials");
        } catch (error) {
            console.error("Testimonial save error:", error);

            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                alert(
                    error.response?.data?.message ||
                    "Failed to save testimonial."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="testimonial-form-loading">
                Loading testimonial...
            </div>
        );
    }

    return (
        <div className="testimonial-form-page">

            <div className="testimonial-form-header">
                <div>
                    <Link
                        to="/admin/testimonials"
                        className="testimonial-form-back"
                    >
                        <ArrowLeft size={17} />
                        Back to Testimonials
                    </Link>

                    <h1>
                        {isEdit ? "Edit Testimonial" : "Add Testimonial"}
                    </h1>

                    <p>
                        {isEdit
                            ? "Update client testimonial information."
                            : "Add a new client review to your website."
                        }
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="testimonial-form-layout">

                    <div className="testimonial-form-main">

                        {/* Client Information */}
                        <section className="testimonial-form-card">
                            <h2>Client Information</h2>

                            <div className="testimonial-form-grid">

                                <div className="testimonial-form-field">
                                    <label>
                                        Client Name <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter client name"
                                        required
                                    />

                                    {errors.name && (
                                        <small>{errors.name[0]}</small>
                                    )}
                                </div>

                                <div className="testimonial-form-field">
                                    <label>Designation</label>

                                    <input
                                        type="text"
                                        name="designation"
                                        value={form.designation}
                                        onChange={handleChange}
                                        placeholder="e.g. Managing Director"
                                    />

                                    {errors.designation && (
                                        <small>{errors.designation[0]}</small>
                                    )}
                                </div>

                                <div className="testimonial-form-field">
                                    <label>Company</label>

                                    <input
                                        type="text"
                                        name="company"
                                        value={form.company}
                                        onChange={handleChange}
                                        placeholder="Enter company name"
                                    />

                                    {errors.company && (
                                        <small>{errors.company[0]}</small>
                                    )}
                                </div>

                                <div className="testimonial-form-field">
                                    <label>Category</label>

                                    <input
                                        type="text"
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        placeholder="e.g. Website Development"
                                    />

                                    {errors.category && (
                                        <small>{errors.category[0]}</small>
                                    )}
                                </div>

                            </div>
                        </section>

                        {/* Testimonial Message */}
                        <section className="testimonial-form-card">
                            <h2>Client Review</h2>

                            <div className="testimonial-form-field">
                                <label>
                                    Testimonial Message <span>*</span>
                                </label>

                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Write the client's feedback..."
                                    rows={7}
                                    required
                                />

                                <div className="testimonial-form-character-count">
                                    {form.message.length} characters
                                </div>

                                {errors.message && (
                                    <small>{errors.message[0]}</small>
                                )}
                            </div>

                            <div className="testimonial-form-field testimonial-rating-field">
                                <label>Client Rating</label>

                                <div className="testimonial-star-selector">
                                    {[1, 2, 3, 4, 5].map((number) => (
                                        <button
                                            type="button"
                                            key={number}
                                            className={
                                                number <= form.rating
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    rating: number,
                                                }))
                                            }
                                            aria-label={`${number} stars`}
                                        >
                                            <Star
                                                size={27}
                                                fill={
                                                    number <= form.rating
                                                        ? "currentColor"
                                                        : "none"
                                                }
                                            />
                                        </button>
                                    ))}

                                    <span>{form.rating}/5</span>
                                </div>

                                {errors.rating && (
                                    <small>{errors.rating[0]}</small>
                                )}
                            </div>
                        </section>

                    </div>

                    {/* Sidebar */}
                    <aside className="testimonial-form-sidebar">

                        {/* Publishing */}
                        <section className="testimonial-form-card">
                            <h2>Publishing</h2>

                            <div className="testimonial-form-field">
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

                                {errors.status && (
                                    <small>{errors.status[0]}</small>
                                )}
                            </div>

                            <div className="testimonial-form-field">
                                <label>Sort Order</label>

                                <input
                                    type="number"
                                    name="sort_order"
                                    min="0"
                                    value={form.sort_order}
                                    onChange={handleChange}
                                />

                                {errors.sort_order && (
                                    <small>{errors.sort_order[0]}</small>
                                )}
                            </div>
                        </section>

                        {/* Card Design */}
                        <section className="testimonial-form-card">
                            <h2>Card Design</h2>

                            <div className="testimonial-form-field">
                                <label>Card Color</label>

                                <div className="testimonial-color-options">

                                    {[
                                        {
                                            value: "purple",
                                            label: "Purple",
                                        },
                                        {
                                            value: "blue",
                                            label: "Blue",
                                        },
                                        {
                                            value: "green",
                                            label: "Green",
                                        },
                                    ].map((color) => (
                                        <button
                                            type="button"
                                            key={color.value}
                                            className={`testimonial-color-option ${color.value} ${
                                                form.color === color.value
                                                    ? "selected"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    color: color.value,
                                                }))
                                            }
                                        >
                                            <span />
                                            {color.label}
                                        </button>
                                    ))}

                                </div>

                                {errors.color && (
                                    <small>{errors.color[0]}</small>
                                )}
                            </div>
                        </section>

                        {/* Actions */}
                        <section className="testimonial-form-actions">

                            <button
                                type="submit"
                                disabled={saving}
                                className="testimonial-save-btn"
                            >
                                <Save size={17} />
                                {saving
                                    ? "Saving..."
                                    : isEdit
                                        ? "Update Testimonial"
                                        : "Save Testimonial"
                                }
                            </button>

                            <Link
                                to="/admin/testimonials"
                                className="testimonial-cancel-btn"
                            >
                                Cancel
                            </Link>

                        </section>

                    </aside>

                </div>
            </form>

        </div>
    );
};

export default TestimonialForm;
