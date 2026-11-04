
import { Suspense, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
  Clock3,
  Sparkles,
  ShieldCheck,
  Globe2,
  Search,
} from "lucide-react";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";

import { jobs, categories, benefits } from "../data/careerData";

import "./Career.css";

// ========================================
// SHARED GLB MODEL NORMALIZATION
// ========================================

const MODEL_PATH = "/models/image-3d.glb";
const MODEL_TARGET_SIZE = 2.5;

// ========================================
// GAMMASOFT 3D LOGO MODEL
// ========================================

const CareerLogoModel = () => {
  const modelRef = useRef(null);

  const { scene } = useGLTF(MODEL_PATH);

  // Clone and automatically normalize the GLB model
  const normalizedModel = useMemo(() => {
    const clonedScene = scene.clone(true);

    const box = new Box3().setFromObject(clonedScene);

    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());

    const maxDimension = Math.max(
      size.x,
      size.y,
      size.z
    );

    const scale =
      maxDimension > 0
        ? MODEL_TARGET_SIZE / maxDimension
        : 1;

    return {
      scene: clonedScene,
      center,
      scale,
    };
  }, [scene]);

  useFrame((state, delta) => {
    if (!modelRef.current) return;

    // Smooth continuous rotation
    modelRef.current.rotation.y += delta * 0.45;

    // Subtle floating movement
    modelRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.8) * 0.08;

    // Slight tilt
    modelRef.current.rotation.x = -0.1;
  });

  return (
    <group
      ref={modelRef}
      scale={normalizedModel.scale}
    >
      <primitive
        object={normalizedModel.scene}
        position={[
          -normalizedModel.center.x,
          -normalizedModel.center.y,
          -normalizedModel.center.z,
        ]}
      />
    </group>
  );
};

// ========================================
// 3D CANVAS
// ========================================

const CareerLogo3D = () => {
  return (
    <div className="gs-career-3d-container">
      <div className="gs-career-3d-glow" />

      <div className="gs-career-3d-orbit orbit-one" />
      <div className="gs-career-3d-orbit orbit-two" />

      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 40,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={2.2} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={3}
        />

        <pointLight
          position={[-4, 2, 3]}
          intensity={2.5}
          color="#ff6b1a"
        />

        <pointLight
          position={[4, -3, -2]}
          intensity={1.5}
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <CareerLogoModel />
        </Suspense>
      </Canvas>

      <div className="gs-career-3d-caption">
        <span>GAMMASOFT</span>
        <strong>INNOVATION IN MOTION</strong>
      </div>
    </div>
  );
};

// Preload GLB model
useGLTF.preload(MODEL_PATH);

// ========================================
// CAREER PAGE
// ========================================

const Career = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] =
    useState("All Positions");

  const [searchTerm, setSearchTerm] = useState("");

  // ========================================
  // FILTER JOBS
  // ========================================

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesCategory =
        activeCategory === "All Positions" ||
        job.department === activeCategory;

      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        job.title.toLowerCase().includes(search) ||
        job.department.toLowerCase().includes(search) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(search)
        );

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  // ========================================
  // APPLY FUNCTION
  // ========================================

  const handleApply = (job) => {
    navigate(`/career/apply/${job.id}`);
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <main className="gs-career">

      {/* HERO SECTION */}

      <section className="gs-career-hero" id="career">
        <div className="gs-career-hero-grid" />

        <div className="gs-career-orb gs-career-orb-one" />
        <div className="gs-career-orb gs-career-orb-two" />

        <div className="gs-career-hero-content">
          <div className="gs-career-eyebrow">
            <Sparkles size={15} />
            <span>BUILD YOUR FUTURE WITH US</span>
          </div>

          <h1>
            Your Talent.
            <br />
            Our <span>Future.</span>
          </h1>

          <p>
            Join GammaSoft and turn your ideas into meaningful
            digital experiences. Discover opportunities to learn,
            innovate and grow with a team that builds the future.
          </p>

          <div className="gs-career-hero-actions">
            <a
              href="#open-positions"
              className="gs-career-primary-btn"
            >
              Explore Open Positions
              <ArrowUpRight size={18} />
            </a>

            <a
              href="#why-gammasoft"
              className="gs-career-secondary-btn"
            >
              Why GammaSoft?
            </a>
          </div>
        </div>

        <div className="gs-career-hero-visual">
          <CareerLogo3D />
        </div>
      </section>

      {/* INTRO STRIP */}

      <section className="gs-career-intro">
        <div className="gs-career-intro-icon">
          <BriefcaseBusiness size={25} />
        </div>

        <div>
          <span>YOUR NEXT CHAPTER STARTS HERE</span>
          <h2>Find Your Place at GammaSoft</h2>
        </div>

        <p>
          We are always looking for curious minds, creative thinkers
          and passionate professionals.
        </p>
      </section>

      {/* JOB LISTINGS */}

      <section
        className="gs-career-jobs"
        id="open-positions"
      >
        <div className="gs-career-section-heading">
          <div>
            <span className="gs-career-section-label">
              CAREER OPPORTUNITIES
            </span>

            <h2>
              Explore Open <span>Positions</span>
            </h2>

            <p>
              Find a role that matches your skills, interests and ambitions.
            </p>
          </div>

          <div className="gs-career-job-count">
            <strong>
              {filteredJobs.length.toString().padStart(2, "0")}
            </strong>
            <span>Positions Found</span>
          </div>
        </div>

        {/* SEARCH AND FILTER */}

        <div className="gs-career-job-toolbar">
          <div className="gs-career-filters">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategory === category ? "active" : ""
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="gs-career-search">
            <Search size={17} />

            <input
              type="search"
              placeholder="Search jobs or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* JOB CARDS */}

        <div className="gs-career-job-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const JobIcon = job.icon;

              return (
                <article
                  className="gs-career-job-card"
                  key={job.id}
                >
                  <div className="gs-career-job-main">
                    <div className="gs-career-job-icon">
                      <JobIcon size={26} />
                    </div>

                    <div className="gs-career-job-info">
                      <div className="gs-career-job-badges">
                        {job.featured && (
                          <span className="featured-badge">
                            <Sparkles size={12} />
                            Featured
                          </span>
                        )}

                        <span className="job-type-badge">
                          {job.type}
                        </span>
                      </div>

                      <h3>{job.title}</h3>

                      <div className="gs-career-job-meta">
                        <span>
                          <BriefcaseBusiness size={14} />
                          {job.department}
                        </span>

                        <span>
                          <MapPin size={14} />
                          {job.location}
                        </span>

                        <span>
                          <Clock3 size={14} />
                          {job.experience}
                        </span>
                      </div>

                      <p>{job.description}</p>

                      <div className="gs-career-skills">
                        {job.skills.map((skill) => (
                          <span key={skill}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="gs-career-job-action">
                    <span className="gs-career-salary">
                      {job.salary}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleApply(job)}
                    >
                      Apply Now
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="gs-career-empty">
              <Search size={30} />

              <h3>No positions found</h3>

              <p>
                Try another search term or select a different category.
              </p>
            </div>
          )}
        </div>

        <p className="gs-career-demo-note">
          <ShieldCheck size={15} />
          These are sample job listings for demonstration purposes.
          Actual vacancies and application details will be published here.
        </p>
      </section>

      {/* WHY GAMMASOFT */}

      <section
        className="gs-career-benefits"
        id="why-gammasoft"
      >
        <div className="gs-career-benefits-heading">
          <span className="gs-career-section-label">
            THE GAMMASOFT EXPERIENCE
          </span>

          <h2>
            More Than Just a <span>Workplace</span>
          </h2>

          <p>
            A place where your ideas, skills and ambitions can make
            a meaningful impact.
          </p>
        </div>

        <div className="gs-career-benefit-grid">
          {benefits.map((benefit, index) => {
            const BenefitIcon = benefit.icon;

            return (
              <div
                className="gs-career-benefit-card"
                key={benefit.title}
              >
                <div className="gs-career-benefit-number">
                  0{index + 1}
                </div>

                <div className="gs-career-benefit-icon">
                  <BenefitIcon size={27} />
                </div>

                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="gs-career-cta">
        <div className="gs-career-cta-glow" />

        <div className="gs-career-cta-content">
          <span>
            <Globe2 size={15} />
            LET'S BUILD THE FUTURE TOGETHER
          </span>

          <h2>
            Don't See Your Role?
            <br />
            <span>Let's Connect.</span>
          </h2>

          <p>
            We would love to hear from talented people who are
            passionate about technology and innovation.
          </p>

          <a href="mailto:careers@gammasoftbd.com">
            Send Your Resume
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

    </main>
  );
};

export default Career;
