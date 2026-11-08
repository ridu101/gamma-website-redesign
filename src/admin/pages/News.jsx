
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Newspaper,
  RefreshCw,
  CalendarDays,
} from "lucide-react";

import api from "../../services/api";

import "./News.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace("/api", "");

const getImageUrl = (path) => {
  if (!path) return null;

  if (path.startsWith("http")) {
    return path;
  }

  return `${API_BASE}/storage/${path}`;
};

const News = () => {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchNews = async (currentPage = 1) => {
    try {
      setLoading(true);

      const response = await api.get("/admin/news", {
        params: {
          page: currentPage,
        },
      });

      const result = response.data.data;

      setNews(result.data || []);
      setPage(result.current_page || 1);
      setLastPage(result.last_page || 1);
    } catch (error) {
      console.error("News loading error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load news."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(1);
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/news/${id}`);

      alert("News deleted successfully.");

      fetchNews(page);
    } catch (error) {
      console.error("News delete error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete news."
      );
    }
  };

  const filteredNews = news.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.title?.toLowerCase().includes(keyword) ||
      item.category?.toLowerCase().includes(keyword) ||
      item.slug?.toLowerCase().includes(keyword) ||
      item.author?.toLowerCase().includes(keyword)
    );
  });

  const formatDate = (date) => {
    if (!date) return "Not scheduled";

    return new Date(date.replace(" ", "T")).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="admin-news">
      {/* HEADER */}

      <div className="admin-news-header">
        <div>
          <span className="admin-news-label">
            CONTENT MANAGEMENT
          </span>

          <h1>News & Updates</h1>

          <p>
            Create and manage company news and announcements.
          </p>
        </div>

        <button
          className="admin-news-add"
          onClick={() => navigate("/admin/news/create")}
        >
          <Plus size={18} />
          Add News
        </button>
      </div>

      {/* STATISTICS */}

      <div className="admin-news-stats">
        <div className="admin-news-stat-card">
          <div className="admin-news-stat-icon">
            <Newspaper size={21} />
          </div>

          <div>
            <span>Total News</span>
            <h3>{news.length}</h3>
          </div>
        </div>
      </div>

      {/* NEWS TABLE */}

      <div className="admin-news-card">
        <div className="admin-news-toolbar">
          <div>
            <h2>All News</h2>
            <p>Manage your news articles and announcements.</p>
          </div>

          <div className="admin-news-actions">
            <div className="admin-news-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              className="admin-news-refresh"
              onClick={() => fetchNews(page)}
              title="Refresh"
            >
              <RefreshCw size={17} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="admin-news-loading">
            <RefreshCw
              className="admin-news-spinner"
              size={25}
            />
            <p>Loading news...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="admin-news-empty">
            <Newspaper size={35} />
            <h3>No News Found</h3>
            <p>
              {search
                ? "Try another search keyword."
                : "Start by adding your first news article."}
            </p>
          </div>
        ) : (
          <>
            <div className="admin-news-table-wrapper">
              <table className="admin-news-table">
                <thead>
                  <tr>
                    <th>NEWS ARTICLE</th>
                    <th>CATEGORY</th>
                    <th>AUTHOR</th>
                    <th>PUBLISHED DATE</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredNews.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="admin-news-info">
                          {item.image ? (
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.title}
                            />
                          ) : (
                            <div className="admin-news-placeholder">
                              <Newspaper size={21} />
                            </div>
                          )}

                          <div>
                            <strong>{item.title}</strong>
                            <span>{item.slug}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="admin-news-category">
                          {item.category || "Uncategorized"}
                        </span>
                      </td>

                      <td>{item.author || "—"}</td>

                      <td>
                        <span className="admin-news-date">
                          <CalendarDays size={14} />
                          {formatDate(item.published_at)}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`admin-news-status ${item.status}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <div className="admin-news-row-actions">
                          <button
                            title="Edit News"
                            onClick={() =>
                              navigate(
                                `/admin/news/${item.id}/edit`
                              )
                            }
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            className="delete"
                            title="Delete News"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}

            <div className="admin-news-pagination">
              <span>
                Page {page} of {lastPage}
              </span>

              <div>
                <button
                  disabled={page <= 1}
                  onClick={() => fetchNews(page - 1)}
                >
                  Previous
                </button>

                <button
                  disabled={page >= lastPage}
                  onClick={() => fetchNews(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default News;
