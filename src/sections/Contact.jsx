
import { useState } from "react";
import {
  ArrowUpRight,
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  MessageCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import api from "../services/api";
import "./Contact.css";

const contactInfo = [
  {
    icon: MapPin,
    label: "Our Location",
    value: "Dhaka, Bangladesh",
    link: "https://maps.google.com/?q=Dhaka+Bangladesh",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+880 1711-000000",
    link: "tel:+8801711000000",
  },
  {
    icon: Mail,
    label: "Email Address",
    value: "info@gammasoftbd.com",
    link: "mailto:info@gammasoftbd.com",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Saturday – Thursday, 9 AM – 6 PM",
    link: null,
  },
];

const services = [
  "Software Development",
  "Web Application",
  "Mobile Application",
  "ERP & Business Solutions",
  "Digital Marketing",
  "Graphics Design",
  "IT Consultancy",
  "Other",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState(initialForm);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // Submit contact message to Laravel API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    try {
      const response = await api.post("/inquiries/contact", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        service: formData.service,
        message: formData.message.trim(),
      });

      if (response.data?.success) {
        setSubmitted(true);
        setFormData({ ...initialForm });
      } else {
        setError(
          response.data?.message ||
            "Unable to send your message. Please try again."
        );
      }
    } catch (submissionError) {
      const validationErrors =
        submissionError.response?.data?.errors;

      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0]?.[0];

        setError(
          firstError ||
            "Please check your submitted information."
        );
      } else {
        setError(
          submissionError.response?.data?.message ||
            "Unable to send your message. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset success screen and allow another submission
  const handleSendAnother = () => {
    setSubmitted(false);
    setError("");
    setFormData({ ...initialForm });
  };

  return (
    <section className="gs-contact" id="contact">
      <div className="gs-contact-glow gs-contact-glow-one"></div>
      <div className="gs-contact-glow gs-contact-glow-two"></div>

      <div className="gs-contact-grid"></div>

      <div className="gs-contact-container">
        {/* Section Heading */}
        <div className="gs-contact-heading">
          <div className="gs-contact-eyebrow">
            <Sparkles size={15} />
            <span>LET'S CONNECT</span>
          </div>

          <h2>
            Have an idea?
            <br />
            <span>Let's make it happen.</span>
          </h2>

          <p>
            Whether you need a powerful software solution or want to
            transform your business digitally, our team is ready to help.
          </p>
        </div>

        {/* Main Content */}
        <div className="gs-contact-layout">
          {/* Left Information */}
          <div className="gs-contact-info">
            <div className="gs-contact-info-top">
              <span className="gs-contact-small-label">
                GET IN TOUCH
              </span>

              <h3>
                Let's start a
                <br />
                <span>conversation.</span>
              </h3>

              <p>
                Tell us about your project, goals, or challenges.
                We will help you find the right solution.
              </p>
            </div>

            <div className="gs-contact-info-list">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div className="gs-contact-info-item" key={index}>
                    <div className="gs-contact-info-icon">
                      <Icon size={20} />
                    </div>

                    <div className="gs-contact-info-text">
                      <span>{item.label}</span>

                      {item.link ? (
                        <a
                          href={item.link}
                          target={
                            item.link.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            item.link.startsWith("http")
                              ? "noreferrer"
                              : undefined
                          }
                        >
                          {item.value}
                          <ArrowUpRight size={14} />
                        </a>
                      ) : (
                        <strong>{item.value}</strong>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="gs-contact-social">
              <span>FOLLOW OUR JOURNEY</span>

              <div className="gs-contact-social-links">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  f
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  in
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  ◎
                </a>

                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                >
                  ▶
                </a>
              </div>
            </div>

            <div className="gs-contact-decoration">
              <div className="gs-contact-decoration-circle">
                <Globe size={27} />
              </div>

              <div>
                <strong>Building the future together.</strong>
                <span>Technology · Innovation · Growth</span>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="gs-contact-form-wrapper">
            <div className="gs-contact-form-heading">
              <div>
                <span className="gs-contact-small-label">
                  SEND US A MESSAGE
                </span>

                <h3>Tell us what you need.</h3>
              </div>

              <div className="gs-contact-form-icon">
                <MessageCircle size={23} />
              </div>
            </div>

            {submitted ? (
              <div className="gs-contact-success">
                <div className="gs-contact-success-icon">
                  <CheckCircle2 size={42} />
                </div>

                <h3>Thank you!</h3>

                <p>
                  Your message has been sent successfully.
                  Our team will review your inquiry and get back to you soon.
                </p>

                <button
                  type="button"
                  onClick={handleSendAnother}
                >
                  Send Another Message
                  <ArrowUpRight size={16} />
                </button>
              </div>
            ) : (
              <form
                className="gs-contact-form"
                onSubmit={handleSubmit}
              >
                {/* Name and Email */}
                <div className="gs-contact-input-row">
                  <div className="gs-contact-field">
                    <label htmlFor="contact-name">
                      Full Name <span>*</span>
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                      maxLength={100}
                    />
                  </div>

                  <div className="gs-contact-field">
                    <label htmlFor="contact-email">
                      Email Address <span>*</span>
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      maxLength={150}
                    />
                  </div>
                </div>

                {/* Phone and Service */}
                <div className="gs-contact-input-row">
                  <div className="gs-contact-field">
                    <label htmlFor="contact-phone">
                      Phone Number
                    </label>

                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="+880 1XXXXXXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      maxLength={30}
                    />
                  </div>

                  <div className="gs-contact-field">
                    <label htmlFor="contact-service">
                      Interested In <span>*</span>
                    </label>

                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select a service
                      </option>

                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="gs-contact-field">
                  <label htmlFor="contact-message">
                    Project Details <span>*</span>
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    placeholder="Tell us about your project, requirements or ideas..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={5000}
                  />
                </div>

                {/* API Error */}
                {error && (
                  <div
                    className="gs-contact-error"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="gs-contact-submit"
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>

                  <Send size={17} />
                </button>

                <p className="gs-contact-form-note">
                  <span></span>
                  Your information will be kept confidential.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="gs-contact-bottom">
          <div>
            <span>HAVE SOMETHING BIG IN MIND?</span>
            <h3>Let's build something extraordinary.</h3>
          </div>

          <a href="mailto:info@gammasoftbd.com">
            Talk to our team
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
