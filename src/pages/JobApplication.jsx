import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
  Clock3,
  CheckCircle2,
  X,
  Send,
  Upload,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import api from "../services/api";
import "./JobApplication.css";

// Convert requirements into an array of skills.
const getJobSkills = (requirements) => {
  if (!requirements) return [];

  if (Array.isArray(requirements)) {
    return requirements;
  }

  if (typeof requirements === "string") {
    try {
      const parsed = JSON.parse(requirements);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // Continue with normal string handling.
    }

    return requirements
      .split(/[,;\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

// Format employment type for display.
const formatEmploymentType = (type) => {
  if (!type) return "Not specified";

  return type
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const JobApplication = () => {
  // The URL parameter now contains the job slug.
  const { jobId: jobSlug } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [jobError, setJobError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    linkedin: "",
    coverLetter: "",
  });

  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // ========================================
  // FETCH JOB DETAILS
  // ========================================

  const fetchJob = async () => {
    try {
      setLoadingJob(true);
      setJobError("");

      const response = await api.get(
        `/jobs/${encodeURIComponent(jobSlug)}`
      );

      const result = response.data?.data;

      const jobData =
        result?.data ||
        result ||
        response.data?.job ||
        null;

      if (!jobData || !jobData.id) {
        throw new Error("Job position not found.");
      }

      setJob(jobData);
    } catch (error) {
      console.error("Job details loading error:", error);

      setJob(null);

      setJobError(
        error.response?.data?.message ||
          error.message ||
          "Unable to load this job position. Please try again."
      );
    } finally {
      setLoadingJob(false);
    }
  };

  useEffect(() => {
    if (jobSlug) {
      fetchJob();
    }
  }, [jobSlug]);

  // ========================================
  // FORM HANDLERS
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0] || null;

    setSubmitError("");

    if (!file) {
      setResume(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setResume(null);
      e.target.value = "";

      setSubmitError("Please upload your CV in PDF format.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setResume(null);
      e.target.value = "";

      setSubmitError("CV file size must not exceed 5MB.");
      return;
    }

    setResume(file);
  };

  // ========================================
  // SUBMIT APPLICATION TO LARAVEL API
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setSubmitError("Please upload your CV in PDF format.");
      return;
    }

    if (resume.size > 5 * 1024 * 1024) {
      setSubmitError("CV file size must not exceed 5MB.");
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError("");

      const applicationData = new FormData();

      applicationData.append(
        "applicant_name",
        formData.fullName
      );

      applicationData.append(
        "email",
        formData.email
      );

      applicationData.append(
        "phone",
        formData.phone
      );

      applicationData.append(
        "cv",
        resume
      );

      applicationData.append(
        "cover_letter",
        formData.coverLetter
      );

      const response = await api.post(
        `/jobs/${encodeURIComponent(jobSlug)}/apply`,
        applicationData
      );

      if (response.data?.success) {
        setShowSuccess(true);
      } else {
        setSubmitError(
          response.data?.message ||
            "Unable to submit your application. Please try again."
        );
      }
    } catch (error) {
      console.error("Job application submission error:", error);

      const validationErrors = error.response?.data?.errors;

      if (validationErrors) {
        const firstError = Object.values(validationErrors)
          .flat()
          .find(Boolean);

        setSubmitError(
          firstError ||
            "Please check your information and try again."
        );
      } else {
        setSubmitError(
          error.response?.data?.message ||
            "Application submission failed. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowSuccess(false);
    navigate("/career");
  };

  // ========================================
  // LOADING STATE
  // ========================================

  if (loadingJob) {
    return (
      <main className="gs-application-loading">
        <div className="gs-application-loading-logo">
          G
        </div>

        <p>LOADING POSITION</p>

        <div className="gs-application-loading-bar" />
      </main>
    );
  }

  // ========================================
  // JOB NOT FOUND / API ERROR
  // ========================================

  if (!job) {
    return (
      <main className="gs-application-not-found">
        <h2>Job Position Not Found</h2>

        <p>
          {jobError ||
            "This job may have been removed or is no longer available."}
        </p>

        <button
          type="button"
          onClick={fetchJob}
          style={{ marginBottom: "12px" }}
        >
          Try Again
        </button>

        <button
          type="button"
          onClick={() => navigate("/career")}
        >
          Back to Careers
        </button>
      </main>
    );
  }

  const skills = getJobSkills(job.requirements);

  // ========================================
  // RENDER
  // ========================================

  return (
    <main className="gs-application-page">

      {/* PAGE HEADER */}

      <section className="gs-application-header">
        <div className="gs-application-header-glow" />

        <div className="gs-application-header-content">

          <div className="gs-application-eyebrow">
            <Sparkles size={15} />
            CAREER OPPORTUNITY
          </div>

          <h1>
            Join Our <span>Team.</span>
          </h1>

          <p>
            Take the next step in your career journey with GammaSoft.
          </p>

        </div>
      </section>

      {/* MAIN CONTENT */}

      <section className="gs-application-layout">

        {/* LEFT: JOB DETAILS */}

        <div className="gs-application-details">

          <div className="gs-application-job-heading">

            <span className="gs-application-label">
              POSITION DETAILS
            </span>

            <h2>{job.title}</h2>

            <div className="gs-application-meta">

              <span>
                <BriefcaseBusiness size={16} />
                {job.department || "General"}
              </span>

              <span>
                <MapPin size={16} />
                {job.location || "Not specified"}
              </span>

              <span>
                <Clock3 size={16} />
                {job.experience || "Not specified"}
              </span>

            </div>
          </div>

          <div className="gs-application-info-card">

            <div>
              <span>Employment Type</span>

              <strong>
                {formatEmploymentType(job.employment_type)}
              </strong>
            </div>

            <div>
              <span>Salary Range</span>

              <strong>
                {job.salary || "Negotiable"}
              </strong>
            </div>

          </div>

          <div className="gs-application-description">
            <h3>About This Role</h3>

            <p>
              {job.description || "No description available."}
            </p>
          </div>

          <div className="gs-application-requirements">

            <h3>Skills & Technologies</h3>

            <div className="gs-application-skills">

              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span key={`${job.id}-skill-${index}`}>
                    {skill}
                  </span>
                ))
              ) : (
                <span>No specific requirements listed</span>
              )}

            </div>
          </div>

          <div className="gs-application-note">

            <ShieldCheck size={20} />

            <div>
              <strong>Why Apply at GammaSoft?</strong>

              <p>
                Work with a passionate team, explore new technologies
                and grow your professional skills.
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT: APPLICATION FORM */}

        <aside className="gs-application-form-wrapper">

          <div className="gs-application-form-heading">

            <span className="gs-application-label">
              START YOUR APPLICATION
            </span>

            <h2>
              Apply for this <span>Position</span>
            </h2>

            <p>
              Complete the form below. Fields marked with * are required.
            </p>

          </div>

          <form
            className="gs-application-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >

            <div className="gs-form-field">

              <label htmlFor="fullName">
                Full Name *
              </label>

              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                maxLength={255}
                required
                disabled={submitting}
              />

            </div>

            <div className="gs-form-field">

              <label htmlFor="email">
                Email Address *
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                maxLength={255}
                required
                disabled={submitting}
              />

            </div>

            <div className="gs-form-field">

              <label htmlFor="phone">
                Phone Number *
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+880 1XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                maxLength={30}
                required
                disabled={submitting}
              />

            </div>

            <div className="gs-form-field">

              <label htmlFor="portfolio">
                Portfolio URL
              </label>

              <input
                id="portfolio"
                type="url"
                name="portfolio"
                placeholder="https://yourportfolio.com"
                value={formData.portfolio}
                onChange={handleChange}
                disabled={submitting}
              />

            </div>

            <div className="gs-form-field">

              <label htmlFor="linkedin">
                LinkedIn Profile
              </label>

              <input
                id="linkedin"
                type="url"
                name="linkedin"
                placeholder="https://linkedin.com/in/..."
                value={formData.linkedin}
                onChange={handleChange}
                disabled={submitting}
              />

            </div>

            <div className="gs-form-field">

              <label htmlFor="resume">
                Upload Resume / CV *
              </label>

              <label
                htmlFor="resume"
                className="gs-resume-upload"
              >

                <Upload size={21} />

                <span>
                  {resume
                    ? resume.name
                    : "Choose your resume (PDF only)"}
                </span>

                <input
                  id="resume"
                  type="file"
                  accept=".pdf,application/pdf"
                  required
                  disabled={submitting}
                  onChange={handleResumeChange}
                />

              </label>

              <small>
                PDF format only. Maximum file size: 5MB.
              </small>

            </div>

            <div className="gs-form-field">

              <label htmlFor="coverLetter">
                Cover Letter / Message
              </label>

              <textarea
                id="coverLetter"
                name="coverLetter"
                rows="5"
                placeholder="Tell us briefly why you are interested in this position..."
                value={formData.coverLetter}
                onChange={handleChange}
                disabled={submitting}
              />

            </div>

            {submitError && (
              <p
                role="alert"
                style={{
                  color: "#dc2626",
                  fontSize: "12px",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {submitError}
              </p>
            )}

            <button
              type="submit"
              className="gs-application-submit"
              disabled={submitting}
            >

              {submitting ? (
                <>
                  <span className="gs-submit-spinner" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <Send size={17} />
                </>
              )}

            </button>

            <p className="gs-application-privacy">
              <ShieldCheck size={14} />
              Your information will be handled confidentially.
            </p>

          </form>
        </aside>

      </section>

      {/* SUCCESS MODAL */}

      {showSuccess && (
        <div
          className="gs-application-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSuccess(false);
            }
          }}
        >

          <div
            className="gs-application-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-success-title"
          >

            <button
              type="button"
              className="gs-application-modal-close"
              onClick={() => setShowSuccess(false)}
              aria-label="Close modal"
            >
              <X size={19} />
            </button>

            <div className="gs-application-success-icon">
              <CheckCircle2 size={42} />
            </div>

            <span className="gs-application-label">
              APPLICATION COMPLETED
            </span>

            <h2 id="application-success-title">
              Application Submitted!
            </h2>

            <p>
              Thank you, {formData.fullName}. Your application for
              <strong> {job.title} </strong>
              has been successfully submitted to GammaSoft.
            </p>

            <button
              type="button"
              className="gs-application-modal-btn"
              onClick={closeModal}
            >
              Back to Careers
              <ArrowUpRight size={17} />
            </button>

          </div>
        </div>
      )}

    </main>
  );
};

export default JobApplication;