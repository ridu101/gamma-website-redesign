
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Star,
  Sparkles,
} from "lucide-react";

import api from "../services/api";

import {
  testimonialSection,
} from "../data/testimonials";

import "./Testimonials.css";

const AUTOPLAY_INTERVAL = 5000;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch published testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);

        const response = await api.get("/testimonials");

        const payload = response.data?.data;

        const testimonialData = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
          ? payload.data
          : [];

        setTestimonials(testimonialData);
      } catch (error) {
        console.error("Testimonials loading error:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const totalTestimonials = testimonials.length;

  // Automatic slider
  useEffect(() => {
    if (totalTestimonials <= 1) return;

    const autoplay = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalTestimonials);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(autoplay);
  }, [totalTestimonials]);

  const nextSlide = () => {
    if (totalTestimonials <= 1) return;

    setActiveIndex((prev) => (prev + 1) % totalTestimonials);
  };

  const previousSlide = () => {
    if (totalTestimonials <= 1) return;

    setActiveIndex(
      (prev) => (prev - 1 + totalTestimonials) % totalTestimonials
    );
  };

  const getVisibleTestimonials = () => {
    return Array.from(
      { length: Math.min(3, totalTestimonials) },
      (_, offset) => {
        const index = (activeIndex + offset) % totalTestimonials;
        return testimonials[index];
      }
    ).filter(Boolean);
  };

  const getInitials = (name) => {
    return (name || "GS")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  if (loading) {
    return (
      <section className="gs-testimonials" id="testimonials">
        <div className="gs-testimonials-container">
          <p>Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (!totalTestimonials) {
    return null;
  }

  return (
    <section className="gs-testimonials" id="testimonials">
      <div className="gs-testimonials-glow"></div>
      <div className="gs-testimonials-glow-two"></div>

      <div className="gs-testimonials-container">

        {/* Section Heading */}

        <div className="gs-testimonials-header">
          <div className="gs-testimonials-heading">
            <div className="gs-section-label">
              <Sparkles size={15} />
              <span>{testimonialSection.eyebrow}</span>
            </div>

            <h2>
              {testimonialSection.title}
              <span>{testimonialSection.highlight}</span>
            </h2>

            <p>{testimonialSection.description}</p>
          </div>

          {/* Slider Navigation */}

          <div className="gs-testimonials-navigation">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous testimonials"
              className="gs-testimonial-nav-btn"
              disabled={totalTestimonials <= 1}
            >
              <ArrowLeft size={19} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonials"
              className="gs-testimonial-nav-btn next"
              disabled={totalTestimonials <= 1}
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>

        {/* Testimonial Cards */}

        <div className="gs-testimonials-grid">
          {getVisibleTestimonials().map((testimonial, index) => (
            <article
              className={`gs-testimonial-card ${
                testimonial.color || ""
              } ${index === 1 ? "featured" : ""}`}
              key={testimonial.id}
            >
              <div className="gs-testimonial-card-top">
                <div className="gs-testimonial-quote-icon">
                  <Quote size={25} />
                </div>

                <div className="gs-testimonial-stars">
                  {Array.from(
                    {
                      length: Math.min(
                        5,
                        Math.max(0, Number(testimonial.rating) || 0)
                      ),
                    },
                    (_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={15}
                        fill="currentColor"
                      />
                    )
                  )}
                </div>
              </div>

              {testimonial.category && (
                <span className="gs-testimonial-category">
                  {testimonial.category}
                </span>
              )}

              <p className="gs-testimonial-message">
                "{testimonial.message}"
              </p>

              <div className="gs-testimonial-divider"></div>

              <div className="gs-testimonial-author">
                <div className="gs-testimonial-avatar">
                  {getInitials(testimonial.name)}
                </div>

                <div className="gs-testimonial-author-info">
                  <h3>{testimonial.name}</h3>

                  {testimonial.designation && (
                    <p>{testimonial.designation}</p>
                  )}

                  {testimonial.company && (
                    <span>{testimonial.company}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}

        <div className="gs-testimonials-pagination">
          <div className="gs-testimonial-dots">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                className={`gs-testimonial-dot ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={
                  activeIndex === index ? "true" : undefined
                }
              />
            ))}
          </div>

          <div className="gs-testimonial-counter">
            <span>
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            <div className="gs-testimonial-counter-line"></div>

            <span>
              {String(totalTestimonials).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Bottom CTA */}

        <div className="gs-testimonial-bottom">
          <div>
            <span>YOUR EXPERIENCE MATTERS</span>

            <h3>
              Let's create something
              <strong> remarkable together.</strong>
            </h3>
          </div>

          <a href="#contact">
            Let's Talk
            <ArrowRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
