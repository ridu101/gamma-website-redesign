
import { ArrowUpRight } from "lucide-react";
import { services } from "../data/services";
import "./Services.css";

const Services = () => {
  return (
    <section className="gs-services" id="services">
      {/* Background Effects */}
      <div className="gs-services-grid-bg" />
      <div className="gs-services-glow" />

      <div className="gs-services-container">
        {/* Section Heading */}
        <div className="gs-services-heading">
          <div className="gs-services-heading-left">
            <span className="gs-services-eyebrow">
              <span className="gs-services-dot" />
              WHAT WE DO
            </span>

            <h2>
              Our Areas of <span>Expertise.</span>
            </h2>
          </div>

          <p>
            Combining technology, creativity and strategy
            to bring ambitious ideas to life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="gs-services-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                className="gs-service-card"
                key={service.number}
              >
                <div className="gs-service-card-top">
                  <span className="gs-service-number">
                    / {service.number}
                  </span>

                  <div className="gs-service-icon">
                    <Icon size={25} strokeWidth={1.7} />
                  </div>
                </div>

                <h3>{service.title}</h3>

                <p className="gs-service-description">
                  {service.description}
                </p>

                <div className="gs-service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="gs-service-card-bottom"
                  aria-label={`Explore ${service.title}`}
                >
                  <span>EXPLORE SERVICE</span>
                  <ArrowUpRight size={19} />
                </a>
              </article>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="gs-services-bottom">
          <span>01 — 04</span>
          <p>
            Technology meets creativity. Let's build something
            extraordinary together.
          </p>
          <a href="#contact">
            Discuss Your Project
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
