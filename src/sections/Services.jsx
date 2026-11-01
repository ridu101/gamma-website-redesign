import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { services } from "../data/services";
import "./Services.css";

const Services = () => {
  return (
    <section id="services" className="gs-services gs-services-home">
      <div className="gs-services-background">
        <div className="gs-glow gs-glow-left" />
        <div className="gs-glow gs-glow-right" />
        <div className="gs-grid-background" />
      </div>

      <div className="gs-services-container">
        <div className="gs-services-heading">
          <div className="gs-eyebrow">
            <Sparkles size={15} />
            WHAT WE DO
          </div>

          <h2>
            Our Areas of <span>Expertise.</span>
          </h2>

          <p>
            Combining technology, creativity and strategy to bring ambitious
            ideas to life. Discover how our services can move your business
            forward.
          </p>
        </div>

        <div className="gs-home-services-grid">
          {services.slice(0, 6).map((service) => {
            const Icon = service.icon;

            return (
              <article className="gs-home-service-card" key={service.slug}>
                <div className="gs-home-service-top">
                  <span> SERVICE {service.number}</span>

                  <div className="gs-home-service-icon">
                    <Icon size={23} strokeWidth={1.7} />
                  </div>
                </div>

                <h3>{service.shortTitle || service.title}</h3>

                <p>{service.description}</p>

                <Link to="/services" className="gs-home-service-link">
                  Explore Service
                  <ArrowUpRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="gs-home-services-action">
          <Link to="/services">
            Explore All Services
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;