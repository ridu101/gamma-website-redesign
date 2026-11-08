import { useEffect } from "react";
import {
  ArrowUpRight,
  Code2,
  Cpu,
  Layers3,
  Network,
  Sparkles,
} from "lucide-react";

import "./TechnologyTree.css";

const technologies = [
  {
    name: "React",
    category: "Frontend",
    icon: "react/react-original.svg",
    fallback: "R",
    x: 16,
    y: 17,
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: "nextjs/nextjs-original.svg",
    fallback: "N",
    x: 39,
    y: 9,
  },
  {
    name: "Vue.js",
    category: "Frontend",
    icon: "vuejs/vuejs-original.svg",
    fallback: "V",
    x: 70,
    y: 12,
  },
  {
    name: "JavaScript",
    category: "Frontend",
    icon: "javascript/javascript-original.svg",
    fallback: "JS",
    x: 87,
    y: 31,
  },
  {
    name: "Node.js",
    category: "Backend",
    icon: "nodejs/nodejs-original.svg",
    fallback: "N",
    x: 85,
    y: 61,
  },
  {
    name: "PHP",
    category: "Backend",
    icon: "php/php-original.svg",
    fallback: "PHP",
    x: 68,
    y: 86,
  },
  {
    name: "Laravel",
    category: "Backend",
    icon: "laravel/laravel-original.svg",
    fallback: "L",
    x: 40,
    y: 91,
  },
  {
    name: "MySQL",
    category: "Database",
    icon: "mysql/mysql-original.svg",
    fallback: "DB",
    x: 17,
    y: 81,
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: "mongodb/mongodb-original.svg",
    fallback: "M",
    x: 8,
    y: 55,
  },
  {
    name: "Python",
    category: "Backend",
    icon: "python/python-original.svg",
    fallback: "Py",
    x: 9,
    y: 32,
  },
  {
    name: "AWS",
    category: "Cloud",
    icon: "amazonwebservices/amazonwebservices-original-wordmark.svg",
    fallback: "AWS",
    x: 59,
    y: 26,
  },
  {
    name: "Flutter",
    category: "Mobile",
    icon: "flutter/flutter-original.svg",
    fallback: "F",
    x: 76,
    y: 75,
  },
];

const categories = [
  "Frontend",
  "Backend",
  "Database",
  "Cloud",
  "Mobile",
];

const iconBase =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

const TechnologyTree = () => {
  useEffect(() => {
    const scriptId = "google-model-viewer-script";

    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "module";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";

    document.head.appendChild(script);
  }, []);

  return (
    <section className="gs-tech-section" id="technology">
      <div className="gs-tech-container">
        {/* Heading */}
        <div className="gs-tech-heading">
          <div className="gs-tech-eyebrow">
            <span className="gs-tech-eyebrow-icon">
              <Sparkles size={14} />
            </span>
            <span>OUR TECHNOLOGY ECOSYSTEM</span>
            <span className="gs-tech-eyebrow-line" />
          </div>

          <h2>
            The technology behind
            <br />
            your <span>next big idea.</span>
          </h2>

          <p>
            Powerful technologies. Connected expertise. We combine modern
            tools and proven technologies to build digital solutions that
            move businesses forward.
          </p>
        </div>

        {/* Technology Network */}
        <div className="gs-tech-network">
          <div className="gs-tech-network-glow" />
          {/* <div className="gs-tech-orbit gs-tech-orbit-one" /> */}
          {/* <div className="gs-tech-orbit gs-tech-orbit-two" /> */}
          {/* <div className="gs-tech-orbit gs-tech-orbit-three" /> */}

          <div className="gs-tech-network-label gs-tech-label-left">
            <span className="gs-tech-live-dot" />
            TECHNOLOGY NETWORK
          </div>

          <div className="gs-tech-network-label gs-tech-label-right">
            <Network size={13} />
            CONNECTED SYSTEMS
          </div>

          {/* Connection Lines */}
          <svg
            className="gs-tech-connections"
            viewBox="0 0 1000 620"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="gsTechGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#ff6b35" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ff9b55" stopOpacity="0.12" />
              </linearGradient>

              <filter id="gsTechGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {technologies.map((tech, index) => {
              const x = tech.x * 10;
              const y = tech.y * 6.2;

              return (
                <g key={tech.name}>
                  <path
                    className="gs-tech-connection"
                    d={`M 500 310 Q ${(500 + x) / 2} ${
                      (310 + y) / 2 - 20
                    } ${x} ${y}`}
                  />

                  <path
                    className="gs-tech-connection-active"
                    d={`M 500 310 Q ${(500 + x) / 2} ${
                      (310 + y) / 2 - 20
                    } ${x} ${y}`}
                    style={{ animationDelay: `${index * 0.22}s` }}
                  />

                  <circle
                    className="gs-tech-connection-dot"
                    cx={x}
                    cy={y}
                    r="3"
                  />

                  <circle
                    className="gs-tech-connection-pulse"
                    cx={x}
                    cy={y}
                    r="6"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Central GammaSoft 3D Logo */}
          <div className="gs-tech-center">
            <div className="gs-tech-center-ring gs-tech-center-ring-one" />
            <div className="gs-tech-center-ring gs-tech-center-ring-two" />
            <div className="gs-tech-center-ring gs-tech-center-ring-three" />

            <div className="gs-tech-center-core">
              <div className="gs-tech-model-wrap">
                <model-viewer
                  className="gs-tech-model"
                  src="/models/image-3d.glb"
                  alt="GammaSoft 3D logo"
                  auto-rotate
                  auto-rotate-delay="0"
                  rotation-per-second="18deg"
                  camera-controls
                  disable-zoom
                  interaction-prompt="none"
                  shadow-intensity="0.65"
                  exposure="1.1"
                  environment-image="neutral"
                  camera-orbit="0deg 75deg 110%"
                  field-of-view="30deg"
                  loading="eager"
                  reveal="auto"
                />
              </div>

              <span className="gs-tech-center-name">GammaSoft</span>
            

              
            </div>
          </div>

          {/* Technology Cards */}
          {technologies.map((tech, index) => (
            <div
              className="gs-tech-node"
              key={tech.name}
              style={{
                left: `${tech.x}%`,
                top: `${tech.y}%`,
                animationDelay: `${index * 0.13}s`,
              }}
            >
              <div className="gs-tech-node-card">
                <div className="gs-tech-node-icon">
                  <img
                    src={`${iconBase}${tech.icon}`}
                    alt={`${tech.name} logo`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      event.currentTarget.nextElementSibling.style.display =
                        "flex";
                    }}
                  />
                  <span className="gs-tech-icon-fallback">
                    {tech.fallback}
                  </span>
                </div>

                <div className="gs-tech-node-info">
                  <span className="gs-tech-node-name">{tech.name}</span>
                  <span className="gs-tech-node-category">
                    {tech.category}
                  </span>
                </div>

                <ArrowUpRight
                  className="gs-tech-node-arrow"
                  size={14}
                />
              </div>
            </div>
          ))}

          <div className="gs-tech-corner gs-tech-corner-tl" />
          <div className="gs-tech-corner gs-tech-corner-tr" />
          <div className="gs-tech-corner gs-tech-corner-bl" />
          <div className="gs-tech-corner gs-tech-corner-br" />

          
        </div>

        {/* Technology Categories */}
        <div className="gs-tech-categories">
          <div className="gs-tech-category-heading">
            <span className="gs-tech-category-line" />
            <span>OUR TECHNOLOGY STACK</span>
            <span className="gs-tech-category-line" />
          </div>

          <div className="gs-tech-category-list">
            {categories.map((category) => (
              <div className="gs-tech-category-item" key={category}>
                <span className="gs-tech-category-dot" />
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyTree;