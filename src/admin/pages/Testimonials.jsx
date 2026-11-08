
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Star,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
} from "lucide-react";

import api from "../../services/api";
import "./Testimonials.css";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchTestimonials = useCallback(async (page = 1) => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/admin/testimonials", {
                params: { page },
            });

            const result = response.data?.data;

            // Supports Laravel pagination and normal array responses.
            const records = Array.isArray(result)
                ? result
                : Array.isArray(result?.data)
                    ? result.data
                    : [];

            setTestimonials(records);
            setCurrentPage(
                result?.current_page || response.data?.current_page || page
            );
            setLastPage(
                result?.last_page || response.data?.last_page || 1
            );
            setTotal(
                result?.total ?? response.data?.total ?? records.length
            );
        } catch (err) {
            console.error("Testimonials loading error:", err);
            setError(
                err.response?.data?.message ||
                "Failed to load testimonials."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTestimonials(1);
    }, [fetchTestimonials]);

    const filteredTestimonials = useMemo(() => {
        return testimonials.filter((item) => {
            const keyword = search.trim().toLowerCase();

            const matchesSearch =
                !keyword ||
                item.name?.toLowerCase().includes(keyword) ||
                item.designation?.toLowerCase().includes(keyword) ||
                item.company?.toLowerCase().includes(keyword) ||
                item.category?.toLowerCase().includes(keyword) ||
                item.message?.toLowerCase().includes(keyword);

            const matchesStatus =
                statusFilter === "all" || item.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [testimonials, search, statusFilter]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this testimonial?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/admin/testimonials/${id}`);

            alert("Testimonial deleted successfully.");

            // Reload current page, or previous page if it becomes empty.
            const pageToLoad =
                testimonials.length === 1 && currentPage > 1
                    ? currentPage - 1
                    : currentPage;

            fetchTestimonials(pageToLoad);
        } catch (err) {
            console.error("Testimonial delete error:", err);
            alert(
                err.response?.data?.message ||
                "Failed to delete testimonial."
            );
        }
    };

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join("") || "C";
    };

    const getStatusClass = (status) => {
        return `testimonial-status ${status || "draft"}`;
    };

    return (
        <div className="admin-testimonials-page">
            <div className="admin-testimonials-header">
                <div>
                    <span className="admin-testimonials-eyebrow">
                        CONTENT MANAGEMENT
                    </span>

                    <h1>Testimonials</h1>

                    <p>
                        Manage client reviews displayed on your website.
                    </p>
                </div>

                <Link
                    to="/admin/testimonials/create"
                    className="admin-testimonial-add-btn"
                >
                    <Plus size={18} />
                    Add Testimonial
                </Link>
            </div>

            <div className="admin-testimonials-summary">
                <div className="admin-testimonial-summary-icon">
                    <MessageSquare size={21} />
                </div>

                <div>
                    <span>Total Testimonials</span>
                    <strong>{total}</strong>
                </div>
            </div>

            <div className="admin-testimonials-toolbar">
                <div className="admin-testimonial-search">
                    <Search size={17} />

                    <input
                        type="text"
                        placeholder="Search by name, company, category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter testimonials by status"
                >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                </select>

                <button
                    type="button"
                    className="admin-testimonial-refresh"
                    onClick={() => fetchTestimonials(currentPage)}
                    disabled={loading}
                    aria-label="Refresh testimonials"
                >
                    <RefreshCw
                        size={17}
                        className={loading ? "refresh-spinning" : ""}
                    />
                </button>
            </div>

            {error && (
                <div className="admin-testimonial-error">
                    {error}
                    <button
                        type="button"
                        onClick={() => fetchTestimonials(currentPage)}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {loading ? (
                <div className="admin-testimonial-loading">
                    Loading testimonials...
                </div>
            ) : filteredTestimonials.length === 0 ? (
                <div className="admin-testimonial-empty">
                    <MessageSquare size={35} />

                    <h3>
                        {testimonials.length === 0
                            ? "No testimonials found"
                            : "No matching testimonials"}
                    </h3>

                    <p>
                        {testimonials.length === 0
                            ? "Add your first client testimonial to get started."
                            : "Try changing your search or status filter."}
                    </p>

                    {testimonials.length === 0 && (
                        <Link to="/admin/testimonials/create">
                            <Plus size={16} />
                            Add Testimonial
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    <div className="admin-testimonials-grid">
                        {filteredTestimonials.map((item) => (
                            <article
                                className={`admin-testimonial-card ${item.color || "purple"}`}
                                key={item.id}
                            >
                                <div className="admin-testimonial-card-top">
                                    <div className="admin-testimonial-quote">
                                        “
                                    </div>

                                    <div className="admin-testimonial-rating">
                                        {Array.from(
                                            { length: Number(item.rating) || 0 },
                                            (_, index) => (
                                                <Star
                                                    key={index}
                                                    size={14}
                                                    fill="currentColor"
                                                />
                                            )
                                        )}
                                    </div>
                                </div>

                                <span className="admin-testimonial-category">
                                    {item.category || "General"}
                                </span>

                                <p className="admin-testimonial-message">
                                    {item.message}
                                </p>

                                <div className="admin-testimonial-divider" />

                                <div className="admin-testimonial-author">
                                    <div className="admin-testimonial-avatar">
                                        {getInitials(item.name)}
                                    </div>

                                    <div className="admin-testimonial-author-info">
                                        <h3>{item.name}</h3>

                                        {item.designation && (
                                            <p>{item.designation}</p>
                                        )}

                                        {item.company && (
                                            <span>{item.company}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="admin-testimonial-card-footer">
                                    <span className={getStatusClass(item.status)}>
                                        {item.status || "draft"}
                                    </span>

                                    <span className="admin-testimonial-sort">
                                        Order: {item.sort_order ?? 0}
                                    </span>
                                </div>

                                <div className="admin-testimonial-actions">
                                    <Link
                                        to={`/admin/testimonials/${item.id}/edit`}
                                        className="admin-testimonial-edit"
                                    >
                                        <Edit size={15} />
                                        Edit
                                    </Link>

                                    <button
                                        type="button"
                                        className="admin-testimonial-delete"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <Trash2 size={15} />
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    {lastPage > 1 && (
                        <div className="admin-testimonial-pagination">
                            <span>
                                Page {currentPage} of {lastPage}
                            </span>

                            <div>
                                <button
                                    type="button"
                                    disabled={currentPage <= 1 || loading}
                                    onClick={() =>
                                        fetchTestimonials(currentPage - 1)
                                    }
                                >
                                    <ChevronLeft size={17} />
                                    Previous
                                </button>

                                <button
                                    type="button"
                                    disabled={currentPage >= lastPage || loading}
                                    onClick={() =>
                                        fetchTestimonials(currentPage + 1)
                                    }
                                >
                                    Next
                                    <ChevronRight size={17} />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Testimonials;
