
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
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

import { jobs } from "../data/careerData";
import "./JobApplication.css";

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const job = jobs.find(
    (item) => String(item.id) === String(jobId)
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    linkedin: "",
    coverLetter: "",
  });

  const [resume, setResume] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!job) {
    return (
      <main className="gs-application-not-found">
        <h2>Job Position Not Found</h2>
        <p>This job may have been removed or is no longer available.</p>
        <button onClick={() => navigate("/career")}>
          Back to Careers
        </button>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend demo submission only.
    // Connect an API here for real application storage.
    setShowSuccess(true);
  };

  const closeModal = () => {
    setShowSuccess(false);
    navigate("/career");
  };

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
                {job.department}
              </span>

              <span>
                <MapPin size={16} />
                {job.location}
              </span>

              <span>
                <Clock3 size={16} />
                {job.experience}
              </span>
            </div>
          </div>

          <div className="gs-application-info-card">
            <div>
              <span>Employment Type</span>
              <strong>{job.type}</strong>
            </div>

            <div>
              <span>Salary Range</span>
              <strong>{job.salary || "Negotiable"}</strong>
            </div>
          </div>

          <div className="gs-application-description">
            <h3>About This Role</h3>
            <p>{job.description}</p>
          </div>

          <div className="gs-application-requirements">
            <h3>Skills & Technologies</h3>

            <div className="gs-application-skills">
              {job.skills?.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
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

            <h2>Apply for this <span>Position</span></h2>

            <p>
              Complete the form below. Fields marked with * are required.
            </p>
          </div>

          <form
            className="gs-application-form"
            onSubmit={handleSubmit}
          >
            <div className="gs-form-field">
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="gs-form-field">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="gs-form-field">
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+880 1XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="gs-form-field">
              <label htmlFor="portfolio">Portfolio URL</label>
              <input
                id="portfolio"
                type="url"
                name="portfolio"
                placeholder="https://yourportfolio.com"
                value={formData.portfolio}
                onChange={handleChange}
              />
            </div>

            <div className="gs-form-field">
              <label htmlFor="linkedin">LinkedIn Profile</label>
              <input
                id="linkedin"
                type="url"
                name="linkedin"
                placeholder="https://linkedin.com/in/..."
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="gs-form-field">
              <label htmlFor="resume">Upload Resume / CV *</label>

              <label
                htmlFor="resume"
                className="gs-resume-upload"
              >
                <Upload size={21} />

                <span>
                  {resume
                    ? resume.name
                    : "Choose your resume (PDF, DOC, DOCX)"}
                </span>

                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={(e) =>
                    setResume(e.target.files?.[0] || null)
                  }
                />
              </label>

              <small>Maximum file size: 5MB</small>
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
              />
            </div>

            <button
              type="submit"
              className="gs-application-submit"
            >
              Submit Application
              <Send size={17} />
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
              Form Submitted!
            </h2>

            <p>
              Thank you, {formData.fullName}. Your application for
              <strong> {job.title} </strong>
              has been completed in this demo.
            </p>

            <button
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
