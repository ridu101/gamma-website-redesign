
import * as MarqueeModule from "react-fast-marquee";
import "./TrustedBy.css";

const Marquee =
  MarqueeModule.default?.default ??
  MarqueeModule.default ??
  MarqueeModule;

const companies = [
  {
    name: "Google",
    logo: "https://cdn.simpleicons.org/google/4285F4",
  },
  {
    name: "Meta",
    logo: "https://cdn.simpleicons.org/meta/0866FF",
  },
  {
    name: "Netflix",
    logo: "https://cdn.simpleicons.org/netflix/E50914",
  },
  {
    name: "Spotify",
    logo: "https://cdn.simpleicons.org/spotify/1DB954",
  },
  {
    name: "Cisco",
    logo: "https://cdn.simpleicons.org/cisco/1BA0D7",
  },
  {
    name: "Shopify",
    logo: "https://cdn.simpleicons.org/shopify/7AB55C",
  },
];

const firstRow = companies.slice(0, 3);
const secondRow = companies.slice(3, 6);

const renderCompanies = (items) =>
  items.map((company) => (
    <div className="gs-trusted-logo-card" key={company.name}>
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <span>{company.name}</span>
    </div>
  ));

const TrustedBy = () => {
  return (
    <section className="gs-trusted-section">
      <div className="gs-trusted-glow gs-trusted-glow-left" />
      <div className="gs-trusted-glow gs-trusted-glow-right" />

      <div className="gs-trusted-container">
        <div className="gs-trusted-heading">
          <div className="gs-trusted-eyebrow">
            <span className="gs-trusted-pulse" />
            OUR GLOBAL NETWORK
          </div>

          <h2>
            Trusted by teams <span>worldwide.</span>
          </h2>

          <p>
            Building meaningful connections through technology,
            innovation, and collaboration.
          </p>
        </div>

        <div className="gs-trusted-marquee gs-trusted-marquee-first">
          <Marquee
            direction="left"
            speed={40}
            delay={0}
            pauseOnHover
            gradient={false}
            autoFill
          >
            {renderCompanies(firstRow)}
          </Marquee>
        </div>

        <div className="gs-trusted-marquee gs-trusted-marquee-second">
          <Marquee
            direction="right"
            speed={40}
            delay={0}
            pauseOnHover
            gradient={false}
            autoFill
          >
            {renderCompanies(secondRow)}
          </Marquee>
        </div>

        <div className="gs-trusted-bottom">
          <span />
          <p>INNOVATION CONNECTS US ALL</p>
          <span />
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
