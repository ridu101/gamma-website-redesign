import { useCallback, useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  Eye,
  Trash2,
  X,
  Mail,
  Phone,
  CalendarDays,
  Building2,
  Package,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Filter,
  Inbox,
} from "lucide-react";

import {
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "../services/inquiryService";

import "./Inquiries.css";

const statusOptions = [
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
  { value: "closed", label: "Closed" },
];

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        per_page: 10,
      };

      if (search.trim()) params.search = search.trim();
      if (type !== "all") params.type = type;
      if (status !== "all") params.status = status;

      const response = await getInquiries(params);
      const result = response.data;

      setInquiries(result.data || []);

      setPagination({
        current_page: result.current_page || 1,
        last_page: result.last_page || 1,
        total: result.total || 0,
        per_page: result.per_page || 10,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load inquiries. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [page, search, type, status]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setActionLoading(true);

      await updateInquiryStatus(id, newStatus);

      setInquiries((previous) =>
        previous.map((item) =>
          item.id === id
            ? { ...item, status: newStatus }
            : item
        )
      );

      setSelectedInquiry((previous) =>
        previous?.id === id
          ? { ...previous, status: newStatus }
          : previous
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to update inquiry status."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (inquiry) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the inquiry from ${inquiry.name}?`
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);

      await deleteInquiry(inquiry.id);

      setSelectedInquiry(null);

      if (inquiries.length === 1 && page > 1) {
        setPage((previous) => previous - 1);
      } else {
        fetchInquiries();
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to delete inquiry."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const openDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
  };

  const getStatusLabel = (value) =>
    statusOptions.find((item) => item.value === value)?.label ||
    value;

  return (
    <div className="admin-inquiries">
      {/* Header */}
      <div className="inquiries-header">
        <div>
          <span className="inquiries-eyebrow">
            CUSTOMER COMMUNICATION
          </span>

          <h1>Inquiry Management</h1>

          <p>
            Manage contact messages and quotation requests from
            your website.
          </p>
        </div>

        <button
          className="inquiries-refresh-btn"
          onClick={fetchInquiries}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <div className="inquiries-stats">
        <div className="inquiry-stat-card">
          <div className="inquiry-stat-icon total">
            <Inbox size={20} />
          </div>

          <div>
            <span>Total Inquiries</span>
            <strong>{pagination.total}</strong>
          </div>
        </div>

        <div className="inquiry-stat-card">
          <div className="inquiry-stat-icon new">
            <MessageSquare size={20} />
          </div>

          <div>
            <span>Showing Results</span>
            <strong>{inquiries.length}</strong>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="inquiries-toolbar">
        <div className="inquiry-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search name, email, phone..."
            value={search}
            onChange={(e) =>
              handleFilterChange(setSearch, e.target.value)
            }
          />
        </div>

        <div className="inquiry-filter">
          <Filter size={16} />

          <select
            value={type}
            onChange={(e) =>
              handleFilterChange(setType, e.target.value)
            }
          >
            <option value="all">All Types</option>
            <option value="contact">Contact</option>
            <option value="quote">Quote</option>
          </select>
        </div>

        <div className="inquiry-filter">
          <select
            value={status}
            onChange={(e) =>
              handleFilterChange(setStatus, e.target.value)
            }
          >
            <option value="all">All Statuses</option>

            {statusOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="inquiries-error">
          {error}
          <button onClick={fetchInquiries}>Retry</button>
        </div>
      )}

      {/* Table */}
      <div className="inquiries-table-wrapper">
        <table className="inquiries-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Type</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="inquiries-empty">
                  Loading inquiries...
                </td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td colSpan="6" className="inquiries-empty">
                  <Inbox size={32} />
                  <strong>No inquiries found</strong>
                  <span>
                    New contact messages and quote requests will
                    appear here.
                  </span>
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td>
                    <div className="inquiry-customer">
                      <strong>{inquiry.name}</strong>
                      <span>{inquiry.email}</span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`inquiry-type ${inquiry.type}`}
                    >
                      {inquiry.type}
                    </span>
                  </td>

                  <td>{inquiry.service || "—"}</td>

                  <td className="inquiry-date">
                    {formatDate(inquiry.created_at)}
                  </td>

                  <td>
                    <span
                      className={`inquiry-status ${inquiry.status}`}
                    >
                      {getStatusLabel(inquiry.status)}
                    </span>
                  </td>

                  <td>
                    <div className="inquiry-actions">
                      <button
                        title="View details"
                        onClick={() => openDetails(inquiry)}
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        title="Delete inquiry"
                        className="delete"
                        onClick={() => handleDelete(inquiry)}
                        disabled={actionLoading}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && pagination.total > 0 && (
        <div className="inquiries-pagination">
          <span>
            Page {pagination.current_page} of{" "}
            {pagination.last_page} · {pagination.total} records
          </span>

          <div>
            <button
              disabled={page <= 1}
              onClick={() => setPage((previous) => previous - 1)}
            >
              <ChevronLeft size={17} />
            </button>

            <button
              disabled={page >= pagination.last_page}
              onClick={() => setPage((previous) => previous + 1)}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedInquiry && (
        <div
          className="inquiry-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedInquiry(null);
            }
          }}
        >
          <div className="inquiry-modal">
            <div className="inquiry-modal-header">
              <div>
                <span className="inquiries-eyebrow">
                  INQUIRY DETAILS
                </span>
                <h2>{selectedInquiry.name}</h2>
              </div>

              <button
                className="inquiry-modal-close"
                onClick={() => setSelectedInquiry(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="inquiry-modal-content">
              <div className="inquiry-detail-grid">
                <div className="inquiry-detail-item">
                  <Mail size={17} />
                  <div>
                    <span>Email</span>
                    <a href={`mailto:${selectedInquiry.email}`}>
                      {selectedInquiry.email}
                    </a>
                  </div>
                </div>

                <div className="inquiry-detail-item">
                  <Phone size={17} />
                  <div>
                    <span>Phone</span>
                    <a
                      href={
                        selectedInquiry.phone
                          ? `tel:${selectedInquiry.phone}`
                          : undefined
                      }
                    >
                      {selectedInquiry.phone || "Not provided"}
                    </a>
                  </div>
                </div>

                <div className="inquiry-detail-item">
                  <Building2 size={17} />
                  <div>
                    <span>Company</span>
                    <strong>
                      {selectedInquiry.company || "Not provided"}
                    </strong>
                  </div>
                </div>

                <div className="inquiry-detail-item">
                  <CalendarDays size={17} />
                  <div>
                    <span>Submitted</span>
                    <strong>
                      {formatDate(selectedInquiry.created_at)}
                    </strong>
                  </div>
                </div>

                <div className="inquiry-detail-item">
                  <MessageSquare size={17} />
                  <div>
                    <span>Service</span>
                    <strong>
                      {selectedInquiry.service || "Not provided"}
                    </strong>
                  </div>
                </div>

                <div className="inquiry-detail-item">
                  <Package size={17} />
                  <div>
                    <span>Type</span>
                    <strong>
                      {selectedInquiry.type === "quote"
                        ? "Quote Request"
                        : "Contact Message"}
                    </strong>
                  </div>
                </div>
              </div>

              {selectedInquiry.type === "quote" && (
                <div className="inquiry-quote-info">
                  <h3>Quote Information</h3>

                  <div>
                    <span>Budget</span>
                    <strong>
                      {selectedInquiry.budget || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Timeline</span>
                    <strong>
                      {selectedInquiry.timeline || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Product Name</span>
                    <strong>
                      {selectedInquiry.product_name || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Product Type</span>
                    <strong>
                      {selectedInquiry.product_type || "Not provided"}
                    </strong>
                  </div>
                </div>
              )}

              <div className="inquiry-message-box">
                <h3>Message</h3>
                <p>{selectedInquiry.message}</p>
              </div>

              <div className="inquiry-status-control">
                <label htmlFor="inquiry-status">
                  Update Status
                </label>

                <select
                  id="inquiry-status"
                  value={selectedInquiry.status}
                  disabled={actionLoading}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedInquiry.id,
                      e.target.value
                    )
                  }
                >
                  {statusOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="inquiry-modal-footer">
              <button
                className="inquiry-delete-btn"
                onClick={() => handleDelete(selectedInquiry)}
                disabled={actionLoading}
              >
                <Trash2 size={16} />
                Delete Inquiry
              </button>

              <button
                className="inquiry-done-btn"
                onClick={() => setSelectedInquiry(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;