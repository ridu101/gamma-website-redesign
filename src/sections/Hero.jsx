
import { Suspense, useMemo, useRef } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";

import { Box3, Vector3 } from "three";

import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import "./Hero.css";

// ========================================
// GLB MODEL CONFIGURATION
// ========================================

const gamma3D = "/models/image-3d.glb";
const MODEL_TARGET_SIZE = 2.5;

// ========================================
// 3D GAMMASOFT LOGO
// ========================================

const GammaLogoModel = () => {
  const modelRef = useRef(null);

  const { scene } = useGLTF(gamma3D);

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

    modelRef.current.rotation.y += delta * 0.45;
    modelRef.current.rotation.x = -0.12;
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
// MODEL LOADER
// ========================================

const ModelLoader = () => (
  <Html center>
    <div className="gs-model-loader">
      <span />
      <span />
      <span />
    </div>
  </Html>
);

// ========================================
// HERO SECTION
// ========================================

const Hero = () => {
  return (
    <section className="gs-hero" id="home">

      {/* BACKGROUND IMAGE */}
      <div className="gs-hero-bg" />

      {/* BACKGROUND EFFECTS */}
      <div className="gs-hero-glow" />
      <div className="gs-hero-noise" />

      <div className="gs-hero-container">

        {/* LEFT CONTENT */}

        <div className="gs-hero-content">

          <div className="gs-hero-label">
            <span className="gs-label-dot" />
            THE NEXT INNOVATION
          </div>

          <h1 className="gs-hero-title">
            Technology That
            <br />
            Drives <span>Digital Innovation.</span>
          </h1>

          <p className="gs-hero-description">
            We design, develop and deliver intelligent software,
            web applications and technology solutions that help
            businesses innovate, grow and move forward.
          </p>

          <div className="gs-hero-actions">

            <a href="#services" className="gs-hero-primary">
              Explore Solutions
              <ArrowRight size={18} />
            </a>

            <a href="#contact" className="gs-hero-secondary">
              Get a Quote
              <ArrowUpRight size={17} />
            </a>

          </div>

          

        </div>

        {/* RIGHT SIDE — 3D LOGO */}

        <div className="gs-hero-visual">

          <div className="gs-logo-glow" />

          <div className="gs-logo-stage">

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

              {/* LIGHTING */}

              <ambientLight intensity={1.8} />

              <directionalLight
                position={[4, 5, 5]}
                intensity={2.8}
              />

              <directionalLight
                position={[-4, 2, -3]}
                intensity={1.5}
                color="#00d9ff"
              />

              <pointLight
                position={[0, -2, 4]}
                intensity={1.5}
                color="#00c8e8"
              />

              {/* 3D MODEL */}

              <Suspense fallback={<ModelLoader />}>
                <GammaLogoModel />
              </Suspense>

            </Canvas>

          </div>

          <div className="gs-logo-caption">
            <span />
            GAMMASOFT
            <span />
          </div>

        </div>

      </div>

      {/* SCROLL INDICATOR */}

      <a href="#about" className="gs-scroll-indicator">
        <span />
        SCROLL TO EXPLORE
      </a>

    </section>
  );
};

// ========================================
// PRELOAD GLB MODEL
// ========================================

useGLTF.preload(gamma3D);

export default Hero;
