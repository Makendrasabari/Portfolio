import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  // Flagship Dashboard Simulator States
  const [headlights, setHeadlights] = useState(false);
  const [aeroWing, setAeroWing] = useState(false);
  const [ambientColor, setAmbientColor] = useState("#00f2fe"); // default electric cyan
  const [revving, setRevving] = useState(false);
  const [eqHeights, setEqHeights] = useState([15, 15, 15, 15, 15, 15, 15, 15]);

  // Real-time equalizer visualizer bars fluctuating during sound revs
  useEffect(() => {
    let timer;
    if (revving) {
      timer = setInterval(() => {
        setEqHeights(Array.from({ length: 8 }, () => Math.floor(Math.random() * 65) + 35));
      }, 70);
    } else {
      setEqHeights([15, 15, 15, 15, 15, 15, 15, 15]);
    }
    return () => clearInterval(timer);
  }, [revving]);

  // Synthesize futuristic electric hypercar motor hum using native browser Web Audio API
  const playRevSound = () => {
    if (revving) return;
    setRevving(true);

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) {
        setTimeout(() => setRevving(false), 1300);
        return;
      }
      const ctx = new AudioContext();

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const biquadFilter = ctx.createBiquadFilter();
      const gainNode = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sine';

      const now = ctx.currentTime;

      // Futuristic motor windup pitch ramp
      osc1.frequency.setValueAtTime(55, now);
      osc1.frequency.exponentialRampToValueAtTime(340, now + 0.45);
      osc1.frequency.exponentialRampToValueAtTime(55, now + 1.25);

      osc2.frequency.setValueAtTime(27.5, now);
      osc2.frequency.exponentialRampToValueAtTime(170, now + 0.45);
      osc2.frequency.exponentialRampToValueAtTime(27.5, now + 1.25);

      // Lowpass filter sweep to give that premium enclosed cabin hum
      biquadFilter.type = 'lowpass';
      biquadFilter.Q.setValueAtTime(9, now);
      biquadFilter.frequency.setValueAtTime(110, now);
      biquadFilter.frequency.exponentialRampToValueAtTime(850, now + 0.45);
      biquadFilter.frequency.exponentialRampToValueAtTime(110, now + 1.25);

      // Smooth dynamic volume envelope
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.28);

      osc1.connect(biquadFilter);
      osc2.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.3);
      osc2.stop(now + 1.3);

      setTimeout(() => {
        setRevving(false);
      }, 1300);
    } catch (e) {
      console.warn("Web Audio API blocked or unsupported", e);
      setTimeout(() => setRevving(false), 1300);
    }
  };

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1600"
            alt="Ha Pat Sahara Offroad"
            className="hero-img"
          />
        </div>

        <div className="hero-content animate-fade-in-up">
          <span className="badge">CRAFTED FOR CONNOISSEURS</span>

          <h1 className="hero-title">
            Unleash the Drive <br />
            of <span>Ha Pat</span>
          </h1>

          <p className="hero-desc">
            Welcome to Ha Pat. We combine bespoke craftsmanship, futuristic electric drivetrains, and breathtaking dynamics to deliver the absolute peak of luxury travel.
          </p>

          <div className="hero-btns">
            <Link to="/cars" className="btn-gold">
              Explore Showroom
            </Link>
            <Link to="/contact" className="btn-outline">
              Book Test Drive
            </Link>
          </div>
        </div>
      </section>

      {/* Numeric Stats Dashboard */}
      <section className="stats-bar animate-fade-in">
        <div className="stat-item">
          <div className="stat-num">&lt; 1.85s</div>
          <div className="stat-label">0-100 KM/H SPEED</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">99.8%</div>
          <div className="stat-label">SATISFACTION RATING</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">120+</div>
          <div className="stat-label">PREMIUM SHOWROOMS</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">15+</div>
          <div className="stat-label">YEARS OF INNOVATION</div>
        </div>
      </section>

      {/* Highlights Showcase */}
      <section className="section">
        <div className="section-header animate-fade-in-up">
          <span className="badge">Ha Pat Prestige Limo</span>
          <h2>Redefining Excellence</h2>
          <p>
            Every Ha Pat vehicle is built upon pillars of meticulous engineering, luxurious materials, and next-generation innovation.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="feature-icon-wrapper">⚡</div>
            <h3>Aero-Acoustics</h3>
            <p>
              Optimized wind-slip structures engineered to achieve extremely low drag co-efficient, guaranteeing whisper-quiet cabins even at hyper-speeds.
            </p>
          </div>

          <div className="feature-card animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="feature-icon-wrapper">✨</div>
            <h3>Bespoke Cabin</h3>
            <p>
              Hand-stitched premium Nappa upholstery, customizable ambient aura setups, and adaptive multi-zone acoustic systems tailored to your exact senses.
            </p>
          </div>

          <div className="feature-card animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="feature-icon-wrapper">🔋</div>
            <h3>Electric Zenith</h3>
            <p>
              Proprietary solid-state batteries powering extreme ranges up to 850km, packed into dual-motor torque-vectoring architectures.
            </p>
          </div>
        </div>
      </section>

      {/* The Flagship Segment: Interactive Cockpit Console */}
      <section className="section" style={{ background: "rgba(10, 10, 15, 0.55)", borderTop: "1px solid var(--border-glass)", position: "relative" }}>
        <div className="about-mission animate-fade-in-up" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <span className="badge">Interactive Virtual Garage</span>
          <h2>Flagship Apex GT Console</h2>
          <p style={{ marginBottom: "35px", maxWidth: "750px", marginLeft: "auto", marginRight: "auto" }}>
            Engage with the engineering terminal below. Ignite the active solid-state drivetrain core, customize cabin ambient color, deploy aerodynamic spoilers, and trigger headlights with actual feedback loop simulations.
          </p>

          <div
            className="console-wrapper"
            style={{
              "--ambient-color": ambientColor,
              "--ambient-color-glow": `${ambientColor}22`
            }}
          >
            {/* Visual Screen Column */}
            <div className="console-screen-panel">
              {/* Overlay Ambient Cabin Glow */}
              <div
                className="ambient-glow-overlay"
                style={{ background: `radial-gradient(circle, ${ambientColor}2d 0%, rgba(0,0,0,0.9) 80%)` }}
              ></div>

              {/* Headlight beams overlay */}
              {headlights && (
                <div className="headlight-beam-overlay"></div>
              )}

              {/* Display Image */}
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
                alt="Ha Pat Apex GT"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.7,
                  filter: headlights ? "brightness(0.9)" : "brightness(0.65)",
                  transition: "filter 0.3s ease"
                }}
              />

              {/* Interactive Deployable Spoiler */}
              <div
                className="deployable-wing"
                style={{
                  transform: aeroWing ? "translateY(-14px) rotate(-5deg)" : "translateY(0) rotate(0)",
                  opacity: aeroWing ? 1 : 0.4,
                }}
              >
                <span style={{ fontSize: "7px", color: "#000", fontWeight: "900", display: "block", textAlign: "center", lineHeight: "7px" }}>ACTIVE</span>
              </div>

              {/* Status Indicator Badges */}
              <div className="screen-telemetry-layer">
                <span
                  className="telemetry-item"
                  style={{
                    border: `1px solid ${ambientColor}`,
                    color: ambientColor,
                    textShadow: `0 0 5px ${ambientColor}`
                  }}
                >
                  BEAMS: {headlights ? "ENGAGED" : "OFF"}
                </span>

                <span
                  className="telemetry-item"
                  style={{
                    border: `1px solid ${ambientColor}`,
                    color: ambientColor,
                    textShadow: `0 0 5px ${ambientColor}`
                  }}
                >
                  AERO WING: {aeroWing ? "LEVEL 3 DEPLOY" : "STOWED"}
                </span>
              </div>

              {/* Equalizer Visualizer overlay */}
              <div className="visualizer-screen">
                {eqHeights.map((h, i) => (
                  <div
                    key={i}
                    className="visualizer-bar"
                    style={{
                      height: `${h}px`,
                      boxShadow: `0 0 8px ${ambientColor}`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Controls Terminal Column */}
            <div className="controls-panel">
              <div>
                <h3 className="control-group-title">
                  <span className="control-color-dot" />
                  Telemetry Cockpit
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  Calibrate core electrical structures and custom aero flaps dynamically below. Click rev to hear the synthesized audio core.
                </p>
              </div>

              {/* Ambient cabin lighting controller */}
              <div className="control-group">
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)", marginBottom: "10px" }}>
                  Cabin Ambient Color
                </label>
                <div style={{ display: "flex", gap: "12px" }}>
                  {[
                    { color: "#00f2fe", name: "Electric Cyan" },
                    { color: "#ff007f", name: "Cyber Magenta" },
                    { color: "#8b5cf6", name: "Apex Purple" },
                    { color: "#ff3e3e", name: "Track Crimson" }
                  ].map((item) => (
                    <button
                      key={item.color}
                      type="button"
                      className="color-picker-btn"
                      style={{
                        backgroundColor: item.color,
                        border: ambientColor === item.color ? "3px solid #fff" : "1px solid rgba(255,255,255,0.2)",
                        boxShadow: `0 4px 10px ${item.color}44`,
                      }}
                      onClick={() => setAmbientColor(item.color)}
                      aria-label={item.name}
                    />
                  ))}
                </div>
              </div>

              {/* Quick toggle console triggers */}
              <div style={{ display: "flex", gap: "15px" }}>
                <button
                  type="button"
                  className="action-toggle-btn"
                  style={{
                    background: headlights ? "rgba(255,255,255,0.08)" : "transparent",
                    color: headlights ? "#ffdd57" : "#fff",
                    border: `1px solid ${headlights ? "#ffdd57" : "var(--border-glass)"}`,
                  }}
                  onClick={() => setHeadlights(!headlights)}
                >
                  💡 {headlights ? "Douse Beams" : "Ignite Beams"}
                </button>

                <button
                  type="button"
                  className="action-toggle-btn"
                  style={{
                    background: aeroWing ? "rgba(255,255,255,0.08)" : "transparent",
                    color: aeroWing ? ambientColor : "#fff",
                    border: `1px solid ${aeroWing ? ambientColor : "var(--border-glass)"}`,
                  }}
                  onClick={() => setAeroWing(!aeroWing)}
                >
                  📐 {aeroWing ? "Stow Wing" : "Deploy Wing"}
                </button>
              </div>

              {/* Main Core Rev Trigger */}
              <button
                type="button"
                className="core-rev-btn"
                style={{
                  background: revving ? `linear-gradient(90deg, #ff6f61, ${ambientColor})` : `linear-gradient(90deg, ${ambientColor}, #ff6f61)`,
                  boxShadow: `0 8px 24px ${ambientColor}44`,
                }}
                onClick={playRevSound}
              >
                🏁 {revving ? "REVVING SOLID-STATE CORE..." : "REV ENGINE (AUDIO CORE)"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ha Pat Innovation Suite */}
      <section className="section" style={{ borderTop: "1px solid var(--border-glass)" }}>
        <div className="section-header animate-fade-in-up">
          <span className="badge">CONCEPT ENGINEERING</span>
          <h2>The Ha Pat Innovation Suite</h2>
          <p>
            An inside look at the proprietary technology stacks powering our vehicles. Explore our bleeding-edge patents.
          </p>
        </div>

        <div className="innovation-grid animate-fade-in-up">
          <div className="innovation-card">
            <div className="innovation-num">01</div>
            <h3>Active Aero Wings</h3>
            <p>
              Autonomous aerodynamic control surfaces that self-adjust 200 times per second, optimizing downforce and maximizing cornering traction.
            </p>
          </div>
          <div className="innovation-card">
            <div className="innovation-num">02</div>
            <h3>Solid-State Thermal Management</h3>
            <p>
              Advanced closed-circuit liquid nitrogen loops keeping the solid-state battery array at a perfect 22°C, preventing high-discharge wear.
            </p>
          </div>
          <div className="innovation-card">
            <div className="innovation-num">03</div>
            <h3>Neural Autopilot</h3>
            <p>
              Dual redundant hyper-processors handling 1.2 Petabytes of sensor streams per second, enabling full L4 autonomous highway cruising.
            </p>
          </div>
        </div>
      </section>

      {/* Client Testimony Matrix */}
      <section className="section" style={{ background: "rgba(7, 7, 10, 0.6)", borderTop: "1px solid var(--border-glass)" }}>
        <div className="section-header animate-fade-in-up">
          <span className="badge">TESTIMONIALS</span>
          <h2>The Vanguard Circles</h2>
          <p>Read opinions and experiences directly from validated owners of the Ha Pat registry.</p>
        </div>

        <div className="testimonials-grid animate-fade-in-up">
          <div className="testimonial-card">
            <div className="quote-mark">“</div>
            <p className="quote-text">
              The Ha Pat Stealth EV has transformed my daily commute. The whisper-quiet cabin paired with raw, instantaneous torque is simply unmatched.
            </p>
            <div className="client-info">
              <div className="client-avatar" style={{ backgroundColor: ambientColor }}>A</div>
              <div>
                <h4 className="client-name">Aravind Krishnan</h4>
                <div className="client-role">Tech VC & Collector</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-mark">“</div>
            <p className="quote-text">
              Comissioning my Fortune Apex GT was a dream. The design studio accommodated every custom paint request. The result is a piece of rolling art.
            </p>
            <div className="client-info">
              <div className="client-avatar" style={{ backgroundColor: ambientColor }}>M</div>
              <div>
                <h4 className="client-name">Meera Oberoi</h4>
                <div className="client-role">Creative Director</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;