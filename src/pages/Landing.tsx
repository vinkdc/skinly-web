import React, { useRef } from "react";
import { Footer } from "../components/Footer";
import { WobbleCard } from "../components/WobbleCard";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const floatingSkins = [
  {
    id: 1,
    src: "https://wiki.playvalorant.com/en-us/images/Kuronami_Vandal.png",
    alt: "Kuronami Vandal",
    className: "floating-skin-1",
    multiplier: 1.5,
  },
  {
    id: 2,
    src: "https://wiki.playvalorant.com/en-us/images/Reaver_Sheriff.png",
    alt: "Reaver Sheriff",
    className: "floating-skin-2",
    multiplier: -1.2,
  },
  {
    id: 3,
    src: "https://wiki.playvalorant.com/en-us/images/Spectrum_Classic.png",
    alt: "Spectrum Classic",
    className: "floating-skin-3",
    multiplier: 0.8,
  },
  {
    id: 4,
    src: "https://wiki.playvalorant.com/en-us/images/Prime_2.0_Phantom.png",
    alt: "Prime Phantom",
    className: "floating-skin-4",
    multiplier: -0.5,
  }
];
import { Activity, Library, BarChart3, Lock, History, Globe } from "lucide-react";

export function Landing() {
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const previewRotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const previewScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);
  const previewOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
        
        {/* Floating Skins Layer */}
        <div className="floating-skins-container">
          {floatingSkins.map((skin) => {
            const x = useTransform(smoothMouseX, [-1, 1], [skin.multiplier * 30, skin.multiplier * -30]);
            const y = useTransform(smoothMouseY, [-1, 1], [skin.multiplier * 30, skin.multiplier * -30]);
            
            return (
              <motion.img
                key={skin.id}
                src={skin.src}
                alt={skin.alt}
                className={`floating-skin ${skin.className}`}
                style={{ x, y }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, skin.multiplier > 0 ? 5 : -5, 0]
                }}
                transition={{
                  duration: 4 + Math.abs(skin.multiplier) * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>

        <div className="container hero-content-wrapper">
          <h1 className="hero-title">Track your skin usage in real time.</h1>
          <p className="hero-subtitle">
            Skinly quietly runs in the background and logs every cosmetic you hold—including the premium skins you pick up from fallen enemies. Dive into your history or explore the complete skin database to find your next loadout.
          </p>
          <div className="hero-actions">
            <a href="#download" className="btn-primary">Download for Windows</a>
            <a href="#demo" className="btn-secondary">View Demo</a>
          </div>
          
          {/* 3D Tilted Preview */}
          <div style={{ perspective: 1200 }}>
            <motion.div 
              className="hero-preview"
              style={{
                rotateX: previewRotateX,
                scale: previewScale,
                opacity: previewOpacity,
                transformStyle: "preserve-3d"
              }}
            >
              <img src="/app-screenshot.png" alt="Skinly Desktop App Interface" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Features</div>
            <h2 className="section-title">Everything your loadout deserves.</h2>
            <p className="section-subtitle">
              Built for players who care about their collection. Skinly tracks what you own, what you borrow, and helps you discover what you want next.
            </p>
          </div>

          <div className="features-grid">
            <WobbleCard containerClassName="feature-card feature-card-large bento-pink" className="wobble-card-inner">
              <div className="bento-content">
                <h3>Live Tracking powers your session</h3>
                <p>
                  Skinly detects every skin you equip in real time—whether it's from your own collection or a weapon you picked up off the ground. Powered safely by Overwolf's game event API.
                </p>
              </div>
              <img src="/app-screenshot.png" alt="App interface" className="bento-img-right" />
            </WobbleCard>

            <WobbleCard containerClassName="feature-card feature-card-small bento-blue" className="wobble-card-inner">
              <div className="bento-content">
                <h3>Skin Discovery Journey</h3>
                <p>
                  Embark on an exploration journey through the ultimate VALORANT database. Discover unreleased bundles, inspect high-res artwork, and find your next dream skin.
                </p>
              </div>
            </WobbleCard>

            <WobbleCard containerClassName="feature-card feature-card-full bento-indigo" className="wobble-card-inner">
              <div className="bento-content full">
                <h3>Session History & Advanced Usage Analytics</h3>
                <p>
                  Review every game session with a timeline of skin switches, durations, and weapon-level detail. 
                  See how long you've used each skin, which weapons you swap the most, and discover patterns in your play style.
                </p>
              </div>
              <img src="/app-screenshot.png" alt="Analytics interface" className="bento-img-bottom" />
            </WobbleCard>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section" id="how-it-works" style={{ background: "var(--surface-1)" }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "center" }}>
            <div className="section-eyebrow">How It Works</div>
            <h2 className="section-title">Three steps. Zero effort.</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Skinly works automatically in the background while you play.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step">
              <h3>Install Skinly</h3>
              <p>Download the Overwolf companion app. It takes less than a minute to set up.</p>
            </div>

            <div className="step">
              <h3>Play VALORANT</h3>
              <p>Skinly runs silently in the background. No overlays, no interruptions, no performance impact.</p>
            </div>

            <div className="step">
              <h3>See Your Stats</h3>
              <p>Open Skinly after your session to browse your skin history, session timeline, and usage breakdown.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Desktop App Showcase ── */}
      <section className="preview-section" id="preview" style={{ paddingBottom: 120 }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "center" }}>
            <div className="section-eyebrow">Desktop App</div>
            <h2 className="section-title">Browse the complete skin index.</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Explore every bundle and weapon in high resolution, directly from the Skinly desktop app.
            </p>
          </div>

          <div className="app-showcase-wrapper" style={{ marginTop: 60 }}>
            <img 
              src="/index-screenshot.png" 
              alt="Skinly Index Interface" 
              style={{
                width: "100%",
                borderRadius: "var(--radius-lg)",
                boxShadow: "0 32px 80px rgba(255, 70, 85, 0.15)",
                display: "block"
              }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
