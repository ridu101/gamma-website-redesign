
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Star,
  Sparkles,
} from "lucide-react";

import {
  testimonials,
  testimonialSection,
} from "../data/testimonials";

import "./Testimonials.css";

const AUTOPLAY_INTERVAL = 5000;

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const totalTestimonials = testimonials.length;

  // Automatic slider
  useEffect(() => {
    if (totalTestimonials <= 1) return;

    const autoplay = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalTestimonials);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(autoplay);
  }, [totalTestimonials, activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalTestimonials);
  };

  const previousSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + totalTestimonials) % totalTestimonials
    );
  };

  const getVisibleTestimonials = () => {
    return [0, 1, 2]
      .map((offset) => {
        const index = (activeIndex + offset) % totalTestimonials;
        return testimonials[index];
      })
      .filter(Boolean);
  };

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
              className={`gs-testimonial-card ${testimonial.color || ""} ${
                index === 1 ? "featured" : ""
              }`}
              key={`${testimonial.id}-${activeIndex}`}
            >
              <div className="gs-testimonial-card-top">
                <div className="gs-testimonial-quote-icon">
                  <Quote size={25} />
                </div>

                <div className="gs-testimonial-stars">
                  {Array.from(
                    { length: testimonial.rating },
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

              <span className="gs-testimonial-category">
                {testimonial.category}
              </span>

              <p className="gs-testimonial-message">
                "{testimonial.message}"
              </p>

              <div className="gs-testimonial-divider"></div>

              <div className="gs-testimonial-author">
                <div className="gs-testimonial-avatar">
                  {testimonial.initials}
                </div>

                <div className="gs-testimonial-author-info">
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.designation}</p>
                  <span>{testimonial.company}</span>
                </div>
              </div>

              {testimonial.isDemo && (
                <span className="gs-testimonial-demo">
                  DEMO CONTENT
                </span>
              )}
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
