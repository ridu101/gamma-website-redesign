
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  BriefcaseBusiness,
  RefreshCw,
  MapPin,
  CalendarDays,
} from "lucide-react";

import api from "../../services/api";

import "./Jobs.css";

const Jobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchJobs = async (currentPage = page) => {
    try {
      setLoading(true);

      const response = await api.get("/admin/jobs", {
        params: {
          page: currentPage,
        },
      });

      const result = response.data.data;

      setJobs(result.data || []);
      setPage(result.current_page || 1);
      setLastPage(result.last_page || 1);
    } catch (error) {
      console.error("Jobs loading error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(1);
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/jobs/${id}`);

      alert("Job deleted successfully.");

      const nextPage = jobs.length === 1 && page > 1
        ? page - 1
        : page;

      fetchJobs(nextPage);
    } catch (error) {
      console.error("Job delete error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete job."
      );
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const keyword = search.toLowerCase();

    return (
      job.title?.toLowerCase().includes(keyword) ||
      job.department?.toLowerCase().includes(keyword) ||
      job.location?.toLowerCase().includes(keyword) ||
      job.slug?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="admin-jobs">
      {/* HEADER */}

      <div className="admin-jobs-header">
        <div>
          <span className="admin-jobs-label">
            CONTENT MANAGEMENT
          </span>

          <h1>Jobs</h1>

          <p>
            Manage job openings and recruitment information.
          </p>
        </div>

        <button
          className="admin-jobs-add"
          onClick={() => navigate("/admin/jobs/create")}
        >
          <Plus size={18} />
          Add Job
        </button>
      </div>

      {/* STATISTICS */}

      <div className="admin-jobs-stats">
        <div className="admin-jobs-stat-card">
          <div className="admin-jobs-stat-icon">
            <BriefcaseBusiness size={21} />
          </div>

          <div>
            <span>Total Jobs</span>
            <h3>{jobs.length}</h3>
          </div>
        </div>
      </div>

      {/* TABLE */}

      <div className="admin-jobs-card">
        <div className="admin-jobs-toolbar">
          <div>
            <h2>All Jobs</h2>
            <p>Manage your company's job openings.</p>
          </div>

          <div className="admin-jobs-actions">
            <div className="admin-jobs-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              className="admin-jobs-refresh"
              onClick={() => fetchJobs(page)}
              title="Refresh"
            >
              <RefreshCw size={17} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="admin-jobs-loading">
            <RefreshCw
              className="admin-jobs-spinner"
              size={25}
            />
            <p>Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="admin-jobs-empty">
            <BriefcaseBusiness size={35} />

            <h3>No Jobs Found</h3>

            <p>
              {search
                ? "Try another search keyword."
                : "Start by adding your first job."}
            </p>
          </div>
        ) : (
          <>
            <div className="admin-jobs-table-wrapper">
              <table className="admin-jobs-table">
                <thead>
                  <tr>
                    <th>JOB TITLE</th>
                    <th>DEPARTMENT</th>
                    <th>LOCATION</th>
                    <th>EMPLOYMENT</th>
                    <th>DEADLINE</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id}>
                      <td>
                        <div className="admin-job-info">
                          <div className="admin-job-icon">
                            <BriefcaseBusiness size={20} />
                          </div>

                          <div>
                            <strong>{job.title}</strong>
                            <span>{job.slug}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        {job.department || "—"}
                      </td>

                      <td>
                        <span className="admin-job-location">
                          <MapPin size={13} />
                          {job.location || "—"}
                        </span>
                      </td>

                      <td>
                        <span className="admin-job-type">
                          {job.employment_type || "—"}
                        </span>
                      </td>

                      <td>
                        <span className="admin-job-deadline">
                          <CalendarDays size={13} />
                          {job.deadline || "—"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`admin-job-status ${job.status}`}
                        >
                          {job.status}
                        </span>
                      </td>

                      <td>
                        <div className="admin-job-row-actions">
                          <button
                            title="Edit Job"
                            onClick={() =>
                              navigate(
                                `/admin/jobs/${job.id}/edit`
                              )
                            }
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            className="delete"
                            title="Delete Job"
                            onClick={() =>
                              handleDelete(job.id)
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

            <div className="admin-jobs-pagination">
              <span>
                Page {page} of {lastPage}
              </span>

              <div>
                <button
                  disabled={page <= 1}
                  onClick={() => fetchJobs(page - 1)}
                >
                  Previous
                </button>

                <button
                  disabled={page >= lastPage}
                  onClick={() => fetchJobs(page + 1)}
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

export default Jobs;
