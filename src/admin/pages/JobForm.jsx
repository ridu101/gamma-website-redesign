
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Save,
} from "lucide-react";

import api from "../../services/api";

import "./JobForm.css";

const initialForm = {
  title: "",
  slug: "",
  department: "",
  location: "",
  employment_type: "Full Time",
  experience: "",
  salary: "",
  description: "",
  requirements: "",
  benefits: "",
  deadline: "",
  status: "draft",
};

const JobForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/admin/jobs/${id}`);

      const job = response.data.data;

      setForm({
        title: job.title || "",
        slug: job.slug || "",
        department: job.department || "",
        location: job.location || "",
        employment_type: job.employment_type || "Full Time",
        experience: job.experience || "",
        salary: job.salary || "",
        description: job.description || "",
        requirements: Array.isArray(job.requirements)
          ? job.requirements.join("\n")
          : job.requirements || "",
        benefits: Array.isArray(job.benefits)
          ? job.benefits.join("\n")
          : job.benefits || "",
        deadline: job.deadline
          ? String(job.deadline).substring(0, 10)
          : "",
        status: job.status || "draft",
      });
    } catch (error) {
      console.error("Job loading error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load job."
      );

      navigate("/admin/jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title" && !isEditing) {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      setForm((prev) => ({
        ...prev,
        title: value,
        slug,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        department: form.department.trim() || null,
        location: form.location.trim() || null,
        employment_type: form.employment_type,
        experience: form.experience.trim() || null,
        salary: form.salary.trim() || null,
        description: form.description.trim(),
        requirements: form.requirements.trim() || null,
        benefits: form.benefits.trim() || null,
        deadline: form.deadline || null,
        status: form.status,
      };

      if (isEditing) {
        await api.put(`/admin/jobs/${id}`, payload);
      } else {
        await api.post("/admin/jobs", payload);
      }

      alert(
        isEditing
          ? "Job updated successfully."
          : "Job created successfully."
      );

      navigate("/admin/jobs");
    } catch (error) {
      console.error("Job save error:", error);

      const errors = error.response?.data?.errors;

      if (errors) {
        const firstError = Object.values(errors)[0]?.[0];

        alert(firstError || "Validation failed.");
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to save job."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-job-form-loading">
        Loading job...
      </div>
    );
  }

  return (
    <div className="admin-job-form-page">
      {/* HEADER */}

      <div className="admin-job-form-header">
        <button
          className="admin-job-back"
          type="button"
          onClick={() => navigate("/admin/jobs")}
        >
          <ArrowLeft size={17} />
          Back to Jobs
        </button>

        <h1>{isEditing ? "Edit Job" : "Add New Job"}</h1>

        <p>
          {isEditing
            ? "Update the job opening information."
            : "Create a new job opening for your company."}
        </p>
      </div>

      <form
        className="admin-job-form"
        onSubmit={handleSubmit}
      >
        <div className="admin-job-form-main">
          {/* BASIC INFORMATION */}

          <section className="admin-job-form-card">
            <div className="admin-job-form-section-title">
              <h2>Basic Information</h2>
              <p>Enter the job title and basic details.</p>
            </div>

            <div className="admin-job-form-grid">
              <div className="admin-job-field full">
                <label>
                  Job Title <span>*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  required
                />
              </div>

              <div className="admin-job-field full">
                <label>
                  Slug <span>*</span>
                </label>

                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="frontend-developer"
                  required
                />
              </div>

              <div className="admin-job-field">
                <label>Department</label>

                <input
                  type="text"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="Software Development"
                />
              </div>

              <div className="admin-job-field">
                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Dhaka, Bangladesh"
                />
              </div>

              <div className="admin-job-field">
                <label>Employment Type</label>

                <select
                  name="employment_type"
                  value={form.employment_type}
                  onChange={handleChange}
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="admin-job-field">
                <label>Experience</label>

                <input
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="e.g. 1-2 Years"
                />
              </div>

              <div className="admin-job-field">
                <label>Salary</label>

                <input
                  type="text"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="e.g. Negotiable"
                />
              </div>

              <div className="admin-job-field">
                <label>Application Deadline</label>

                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* JOB DESCRIPTION */}

          <section className="admin-job-form-card">
            <div className="admin-job-form-section-title">
              <h2>Job Description</h2>
              <p>Describe the responsibilities and role.</p>
            </div>

            <div className="admin-job-field">
              <label>
                Description <span>*</span>
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="8"
                placeholder="Write the full job description..."
                required
              />
            </div>
          </section>

          {/* REQUIREMENTS */}

          <section className="admin-job-form-card">
            <div className="admin-job-form-section-title">
              <h2>Requirements</h2>
              <p>
                Write each requirement on a separate line.
              </p>
            </div>

            <div className="admin-job-field">
              <label>Job Requirements</label>

              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                rows="7"
                placeholder={`React knowledge
JavaScript proficiency
HTML and CSS
REST API knowledge`}
              />
            </div>
          </section>

          {/* BENEFITS */}

          <section className="admin-job-form-card">
            <div className="admin-job-form-section-title">
              <h2>Benefits</h2>
              <p>
                Write each benefit on a separate line.
              </p>
            </div>

            <div className="admin-job-field">
              <label>Job Benefits</label>

              <textarea
                name="benefits"
                value={form.benefits}
                onChange={handleChange}
                rows="6"
                placeholder={`Competitive salary
Learning opportunities
Career growth`}
              />
            </div>
          </section>
        </div>

        {/* PUBLISH SETTINGS */}

        <aside className="admin-job-form-sidebar">
          <section className="admin-job-form-card">
            <div className="admin-job-form-section-title">
              <h2>Publish Settings</h2>
              <p>Control job visibility.</p>
            </div>

            <div className="admin-job-field">
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
          </section>

          <button
            type="submit"
            className="admin-job-save"
            disabled={saving}
          >
            <Save size={17} />

            {saving
              ? "Saving..."
              : isEditing
                ? "Update Job"
                : "Create Job"}
          </button>

          <button
            type="button"
            className="admin-job-cancel"
            onClick={() => navigate("/admin/jobs")}
          >
            Cancel
          </button>
        </aside>
      </form>
    </div>
  );
};

export default JobForm;
