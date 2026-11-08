
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  RefreshCw,
  Eye,
  Trash2,
  FileText,
  UserRound,
  BriefcaseBusiness,
  Mail,
  Phone,
} from "lucide-react";

import api from "../../services/api";

import "./Applications.css";

const Applications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchApplications = async (currentPage = page) => {
    try {
      setLoading(true);

      const response = await api.get("/admin/applications", {
        params: {
          page: currentPage,
        },
      });

      const result = response.data.data;

      setApplications(result.data || []);
      setPage(result.current_page || 1);
      setLastPage(result.last_page || 1);
    } catch (error) {
      console.error("Applications loading error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(1);
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/applications/${id}`);

      alert("Application deleted successfully.");

      const nextPage =
        applications.length === 1 && page > 1
          ? page - 1
          : page;

      fetchApplications(nextPage);
    } catch (error) {
      console.error("Application delete error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete application."
      );
    }
  };

  const filteredApplications = applications.filter((application) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      application.applicant_name?.toLowerCase().includes(keyword) ||
      application.email?.toLowerCase().includes(keyword) ||
      application.phone?.toLowerCase().includes(keyword) ||
      application.job?.title?.toLowerCase().includes(keyword);

    const matchesStatus =
      statusFilter === "all" ||
      application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getJobTitle = (application) => {
    return (
      application.job?.title ||
      application.job_title ||
      `Job ID: ${application.job_id}`
    );
  };

  return (
    <div className="admin-applications">
      {/* HEADER */}

      <div className="admin-applications-header">
        <div>
          <span className="admin-applications-label">
            RECRUITMENT MANAGEMENT
          </span>

          <h1>Job Applications</h1>

          <p>
            Review applicants and manage recruitment requests.
          </p>
        </div>

        <button
          className="admin-applications-refresh"
          onClick={() => fetchApplications(page)}
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {/* STATISTICS */}

      <div className="admin-applications-stats">
        <div className="admin-applications-stat-card">
          <div className="admin-applications-stat-icon">
            <FileText size={21} />
          </div>

          <div>
            <span>Applications on This Page</span>
            <h3>{applications.length}</h3>
          </div>
        </div>

        <div className="admin-applications-stat-card">
          <div className="admin-applications-stat-icon pending">
            <UserRound size={21} />
          </div>

          <div>
            <span>Pending on This Page</span>
            <h3>
              {
                applications.filter(
                  (item) => item.status === "pending"
                ).length
              }
            </h3>
          </div>
        </div>
      </div>

      {/* APPLICATIONS TABLE */}

      <div className="admin-applications-card">
        <div className="admin-applications-toolbar">
          <div>
            <h2>All Applications</h2>
            <p>Review and manage submitted job applications.</p>
          </div>

          <div className="admin-applications-filters">
            <div className="admin-applications-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search applicant..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
              <option value="hired">Hired</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="admin-applications-loading">
            <RefreshCw
              className="admin-applications-spinner"
              size={25}
            />
            <p>Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="admin-applications-empty">
            <FileText size={36} />

            <h3>No Applications Found</h3>

            <p>
              No applications match your search or selected filter.
            </p>
          </div>
        ) : (
          <>
            <div className="admin-applications-table-wrapper">
              <table className="admin-applications-table">
                <thead>
                  <tr>
                    <th>APPLICANT</th>
                    <th>CONTACT</th>
                    <th>APPLIED FOR</th>
                    <th>CV</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApplications.map((application) => (
                    <tr key={application.id}>
                      <td>
                        <div className="admin-applicant-info">
                          <div className="admin-applicant-avatar">
                            <UserRound size={19} />
                          </div>

                          <div>
                            <strong>
                              {application.applicant_name}
                            </strong>

                            <span>
                              Application #{application.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="admin-applicant-contact">
                          <span>
                            <Mail size={13} />
                            {application.email}
                          </span>

                          <span>
                            <Phone size={13} />
                            {application.phone || "—"}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className="admin-applied-job">
                          <BriefcaseBusiness size={14} />
                          {getJobTitle(application)}
                        </span>
                      </td>

                      <td>
                        {application.cv_path ? (
                          <span className="admin-cv-available">
                            <FileText size={14} />
                            Available
                          </span>
                        ) : (
                          <span className="admin-cv-missing">
                            Not available
                          </span>
                        )}
                      </td>

                      <td>
                        <span
                          className={`admin-application-status ${application.status}`}
                        >
                          {application.status}
                        </span>
                      </td>

                      <td>
                        <div className="admin-application-actions">
                          <button
                            title="View Details"
                            onClick={() =>
                              navigate(
                                `/admin/applications/${application.id}`
                              )
                            }
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            className="delete"
                            title="Delete Application"
                            onClick={() =>
                              handleDelete(application.id)
                            }
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

            <div className="admin-applications-pagination">
              <span>
                Page {page} of {lastPage}
              </span>

              <div>
                <button
                  disabled={page <= 1}
                  onClick={() => fetchApplications(page - 1)}
                >
                  Previous
                </button>

                <button
                  disabled={page >= lastPage}
                  onClick={() => fetchApplications(page + 1)}
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

export default Applications;
