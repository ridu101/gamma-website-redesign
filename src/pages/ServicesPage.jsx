import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Target,
  Workflow,
  Sparkles,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { services } from "../data/services";
import "../sections/Services.css";

const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedServiceSlug = searchParams.get("service");

  const [selectedSlug, setSelectedSlug] = useState(() => {
    const matchedService = services.find(
      (item) => item.slug === requestedServiceSlug
    );

    return matchedService?.slug || services[0]?.slug;
  });
  const detailsRef = useRef(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  // Sync selected service with URL query parameter
  useEffect(() => {
    if (!requestedServiceSlug) return;

    const matchedService = services.find(
      (item) => item.slug === requestedServiceSlug
    );

    if (matchedService) {
      setSelectedSlug(matchedService.slug);
    }
  }, [requestedServiceSlug]);

  const selectedService =
    services.find((item) => item.slug === selectedSlug) || services[0];

  // Scroll reveal animation
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const elements = root.querySelectorAll(".gs-reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [selectedSlug]);

  // Start dedicated Services page from the top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  if (!selectedService) return null;

  const SelectedIcon = selectedService.icon;

  const selectService = (slug) => {
    if (slug === selectedSlug) return;

    setSelectedSlug(slug);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!detailsRef.current) return;

        const navbarOffset = 105;
        const elementTop =
          detailsRef.current.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: elementTop - navbarOffset,
          behavior: "smooth",
        });
      });
    });
  };

  const goToContact = () => {
    navigate("/#contact");

    window.setTimeout(() => {
      const contactSection = document.querySelector("#contact");

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 120);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="gs-services gs-services-page"
    >
      <div className="gs-services-background">
        <div className="gs-glow gs-glow-left" />
        <div className="gs-glow gs-glow-right" />
        <div className="gs-grid-background" />
      </div>

      <div className="gs-services-container">
        {/* Section heading */}
        <div className="gs-services-heading gs-reveal">
          <div className="gs-eyebrow">
            <Sparkles size={15} />
            WHAT WE DO
          </div>

          <h2>
            Our Areas of <span>Expertise.</span>
          </h2>

          <p>
            Combining technology, creativity and strategy to bring ambitious
            ideas to life. Explore our expertise and discover how we can move
            your business forward.
          </p>
        </div>

        {/* Main layout */}
        <div className="gs-services-layout">
          {/* Left service navigation */}
          <aside className="gs-service-sidebar gs-reveal">
            <div className="gs-sidebar-heading">
              <span>
                OUR EXPERTISE / 01—
                {String(services.length).padStart(2, "0")}
              </span>

              <h3>Explore Services</h3>
              <p>Select a service to explore what we do.</p>
            </div>

            <div className="gs-sidebar-list">
              {services.map((service) => {
                const Icon = service.icon;
                const isActive = selectedSlug === service.slug;

                return (
                  <button
                    type="button"
                    key={service.slug}
                    className={`gs-sidebar-item ${isActive ? "active" : ""}`}
                    onClick={() => selectService(service.slug)}
                    aria-pressed={isActive}
                  >
                    <span className="gs-sidebar-icon">
                      <Icon size={19} strokeWidth={1.7} />
                    </span>

                    <span className="gs-sidebar-text">
                      <strong>{service.shortTitle || service.title}</strong>
                      <small>SERVICE {service.number}</small>
                    </span>

                    <ArrowUpRight
                      size={17}
                      className="gs-sidebar-arrow"
                    />
                  </button>
                );
              })}
            </div>

            <div className="gs-sidebar-footer">
              <span>HAVE A PROJECT?</span>

              <button type="button" onClick={goToContact}>
                Let's Talk
                <ArrowUpRight size={15} />
              </button>
            </div>
          </aside>

          {/* Right service details */}
          <div
            className="gs-service-details"
            key={selectedService.slug}
            ref={detailsRef}
          >
            {/* Detail hero */}
            <div className="gs-detail-hero">
              <div className="gs-detail-glow" />

              <div className="gs-detail-top">
                <span className="gs-detail-badge">
                  <Sparkles size={13} />
                  GAMMASOFT / SERVICE
                </span>

                <span className="gs-detail-number">
                  {selectedService.number} /{" "}
                  {String(services.length).padStart(2, "0")}
                </span>
              </div>

              <div className="gs-detail-intro">
                <div className="gs-detail-main-icon">
                  <SelectedIcon size={34} strokeWidth={1.6} />
                </div>

                <div className="gs-detail-title">
                  <h3>{selectedService.title}</h3>

                  <p className="gs-detail-tagline">
                    {selectedService.tagline}
                  </p>

                  <p className="gs-detail-description">
                    {selectedService.description}
                  </p>

                  <button
                    type="button"
                    className="gs-detail-cta"
                    onClick={goToContact}
                  >
                    Discuss Your Project
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="gs-detail-section gs-overview">
              <div className="gs-section-heading">
                <span>01 / OVERVIEW</span>
                <h4>A smarter approach to your business.</h4>
              </div>

              <p>{selectedService.overview}</p>
            </div>

            {/* Features */}
            <div className="gs-detail-section">
              <div className="gs-section-heading">
                <span>02 / WHAT WE OFFER</span>
                <h4>What's included in this service?</h4>
                <p>
                  Explore the key capabilities and solutions included in our
                  service.
                </p>
              </div>

              <div className="gs-detail-grid">
                {selectedService.features?.map((feature, index) => (
                  <div className="gs-feature-card" key={feature}>
                    <CheckCircle2 size={20} />

                    <div>
                      <small>
                        FEATURE / {String(index + 1).padStart(2, "0")}
                      </small>
                      <p>{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="gs-detail-section gs-benefits">
              <div className="gs-section-heading">
                <span>03 / WHY CHOOSE US</span>
                <h4>The value we bring to you.</h4>
              </div>

              <div className="gs-detail-grid">
                {selectedService.benefits?.map((benefit) => (
                  <div className="gs-benefit-card" key={benefit}>
                    <Target size={21} />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="gs-detail-section">
              <div className="gs-section-heading">
                <span>04 / OUR PROCESS</span>
                <h4>How we make it happen.</h4>
              </div>

              <div className="gs-detail-grid">
                {selectedService.process?.map((step, index) => (
                  <div className="gs-process-card" key={step}>
                    <div className="gs-process-icon">
                      {index === 0 ? (
                        <Target size={21} />
                      ) : (
                        <Workflow size={21} />
                      )}
                    </div>

                    <div>
                      <small>
                        STEP / {String(index + 1).padStart(2, "0")}
                      </small>
                      <p>{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="gs-detail-bottom">
              <div>
                <h4>Have a project in mind?</h4>
                <p>Let's build something extraordinary together.</p>
              </div>

              <button type="button" onClick={goToContact}>
                Contact Us
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="gs-services-footer gs-reveal">
          <div>
            <span>
              01 — {String(services.length).padStart(2, "0")} / OUR EXPERTISE
            </span>

            <h3>
              Technology meets creativity.
              <small>Let's build something extraordinary.</small>
            </h3>
          </div>

          <button type="button" onClick={goToContact}>
            Discuss Your Project
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;