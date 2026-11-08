
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
  FileText,
  Download,
  Save,
  CalendarDays,
} from "lucide-react";

import api from "../../services/api";

import "./ApplicationDetails.css";

const ApplicationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const fetchApplication = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/admin/applications/${id}`
      );

      const data = response.data.data;

      setApplication(data);
      setStatus(data.status || "pending");
    } catch (error) {
      console.error("Application details error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load application."
      );

      navigate("/admin/applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      setSaving(true);

      await api.patch(`/admin/applications/${id}`, {
        status,
      });

      alert("Application status updated successfully.");

      fetchApplication();
    } catch (error) {
      console.error("Status update error:", error);

      const errors = error.response?.data?.errors;

      if (errors) {
        const firstError = Object.values(errors)[0]?.[0];
        alert(firstError || "Status update failed.");
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to update application status."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadCV = async () => {
    try {
      setDownloading(true);

      const response = await api.get(
        `/admin/applications/${id}/cv`,
        {
          responseType: "blob",
        }
      );

      const blobUrl = window.URL.createObjectURL(
        response.data
      );

      const link = document.createElement("a");

      link.href = blobUrl;

      const disposition =
        response.headers["content-disposition"];

      const filenameMatch = disposition?.match(
        /filename="?([^"]+)"?/i
      );

      link.download =
        filenameMatch?.[1] || `application-${id}-cv`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("CV download error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to download CV."
      );
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-application-details-loading">
        Loading application details...
      </div>
    );
  }

  if (!application) {
    return null;
  }

  const jobTitle =
    application.job?.title ||
    application.job_title ||
    `Job ID: ${application.job_id}`;

  const appliedDate = application.created_at
    ? new Date(application.created_at).toLocaleString()
    : "Not available";

  return (
    <div className="admin-application-details">
      {/* HEADER */}

      <div className="admin-application-details-header">
        <div>
          <button
            className="admin-application-back"
            onClick={() => navigate("/admin/applications")}
          >
            <ArrowLeft size={17} />
            Back to Applications
          </button>

          <span className="admin-application-details-label">
            APPLICATION #{application.id}
          </span>

          <h1>Application Details</h1>

          <p>Review applicant information and recruitment status.</p>
        </div>

        <span
          className={`admin-application-details-status ${application.status}`}
        >
          {application.status}
        </span>
      </div>

      <div className="admin-application-details-grid">
        {/* APPLICANT INFORMATION */}

        <div className="admin-application-details-main">
          <section className="admin-application-details-card">
            <div className="admin-application-section-title">
              <h2>Applicant Information</h2>
              <p>Personal and contact information.</p>
            </div>

            <div className="admin-application-profile">
              <div className="admin-application-profile-avatar">
                <UserRound size={28} />
              </div>

              <div>
                <h3>{application.applicant_name}</h3>
                <span>Applicant #{application.id}</span>
              </div>
            </div>

            <div className="admin-application-info-list">
              <div className="admin-application-info-item">
                <Mail size={17} />

                <div>
                  <span>Email Address</span>
                  <strong>{application.email || "—"}</strong>
                </div>
              </div>

              <div className="admin-application-info-item">
                <Phone size={17} />

                <div>
                  <span>Phone Number</span>
                  <strong>{application.phone || "—"}</strong>
                </div>
              </div>

              <div className="admin-application-info-item">
                <BriefcaseBusiness size={17} />

                <div>
                  <span>Applied Position</span>
                  <strong>{jobTitle}</strong>
                </div>
              </div>

              <div className="admin-application-info-item">
                <CalendarDays size={17} />

                <div>
                  <span>Application Date</span>
                  <strong>{appliedDate}</strong>
                </div>
              </div>
            </div>
          </section>

          {/* COVER LETTER */}

          <section className="admin-application-details-card">
            <div className="admin-application-section-title">
              <h2>Cover Letter</h2>
              <p>Message submitted by the applicant.</p>
            </div>

            <div className="admin-application-cover-letter">
              {application.cover_letter || "No cover letter provided."}
            </div>
          </section>

          {/* CV */}

          <section className="admin-application-details-card">
            <div className="admin-application-section-title">
              <h2>Resume / CV</h2>
              <p>Applicant's uploaded CV document.</p>
            </div>

            <div className="admin-application-cv">
              <div className="admin-application-cv-icon">
                <FileText size={25} />
              </div>

              <div className="admin-application-cv-info">
                <strong>
                  {application.cv_path
                    ? application.cv_path.split("/").pop()
                    : "No CV uploaded"}
                </strong>

                <span>
                  {application.cv_path
                    ? "CV document is available."
                    : "Applicant did not upload a CV."}
                </span>
              </div>

              {application.cv_path && (
                <button
                  onClick={handleDownloadCV}
                  disabled={downloading}
                >
                  <Download size={16} />
                  {downloading ? "Downloading..." : "Download"}
                </button>
              )}
            </div>
          </section>
        </div>

        {/* STATUS MANAGEMENT */}

        <aside className="admin-application-details-sidebar">
          <section className="admin-application-details-card">
            <div className="admin-application-section-title">
              <h2>Application Status</h2>
              <p>Update the applicant's current status.</p>
            </div>

            <div className="admin-application-status-field">
              <label>Current Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </div>

            <button
              className="admin-application-status-save"
              onClick={handleStatusUpdate}
              disabled={
                saving || status === application.status
              }
            >
              <Save size={17} />
              {saving ? "Updating..." : "Update Status"}
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default ApplicationDetails;
