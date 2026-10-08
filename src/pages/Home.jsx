import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Lightbulb, Settings, BarChart, Rocket, Box, Camera, User, Video, PenTool, Globe, Smartphone, Share2, TrendingUp, FlaskConical, Layers, Wrench, Code, Navigation } from 'lucide-react';
import './Home.css';
import WorkGrid from '../components/WorkGrid';
import heroBg from '../assets/hero-bg.png';

// Simple Reveal Component wrapper
const Reveal = ({ children, className = '', delay = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div ref={ref} className={`reveal-hidden ${delay} ${className}`}>
      {children}
    </div>
  );
};

const Home = () => {
  const [studioExpanded, setStudioExpanded] = useState(false);
  const [labsExpanded, setLabsExpanded] = useState(false);

  return (
    <div className="home-wrapper">

      {/* 01 — HERO */}
      <section className="section hero-section theme-dark" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-blue-motion"></div>
        <div
          className="hero-background-image"
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `url("${heroBg}")`,
            backgroundSize: "contain",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.4,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        ></div>
        <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '13vh', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Reveal>
            <div className="hero-huge-text" style={{
              fontSize: 'clamp(1rem, 10vw, 8rem)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.9)',
              letterSpacing: '0.05em',
              lineHeight: 1,
              marginBottom: '2rem',
              fontFamily: 'system-ui, sans-serif'
            }}>
              BLUALIEN
            </div>
          </Reveal>

          <Reveal delay="delay-1">
            <h1 className="heading-xl mb-8" style={{ textTransform: 'none', color: '#fff', fontWeight: 600 }}>
              Building what <span className="text-brand hero-accent">comes next.</span>
            </h1>
          </Reveal>

          <Reveal delay="delay-2">
            <div className="flex wrap gap-6 mt-8 justify-center">
              <Link to="/contact" className="btn btn-primary">
                WORK WITH US <ArrowRight size={20} className="arrow ml-2" />
              </Link>
              <a href="#ecosystem" className="btn btn-outline" style={{ border: 'none', paddingLeft: 0, paddingRight: 0 }}>
                EXPLORE BLUALIEN <ArrowRight size={20} className="arrow ml-2" style={{ transform: 'rotate(90deg)' }} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — ECOSYSTEM */}
      <section id="ecosystem" className="section theme-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow" style={{ color: '#1a5fff', opacity: 0.8 }}>WHAT IS BLUALIEN?</span>
            <h2 className="heading-xl mb-24" style={{ color: '#fff' }}>One company.<br />Multiple ways to build.</h2>
          </Reveal>

          <div className="ecosystem-grid">
            {/* Products */}
            <Reveal delay="delay-1" className="h-full">
              <div className="eco-column-card">
                <div className="eco-col-header">
                  <span className="eco-col-num">1</span>
                  <h3>PRODUCTS</h3>
                </div>
                <div className="eco-col-desc">AI-native products solving real problems.</div>
                <div className="eco-inner-card mt-8">
                  <div className="eco-inner-icon"><Box /></div>
                  <div className="eco-inner-content">
                    <h4>ALINET</h4>
                    <p>Feature prominently as the flagship product shaping professional identity.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Studio */}
            <Reveal delay="delay-2" className="h-full">
              <div className="eco-column-card">
                <div className="eco-col-header">
                  <span className="eco-col-num">2</span>
                  <h3>STUDIO</h3>
                </div>
                <div className="eco-col-desc">AI-native creative and growth systems for companies.</div>
                <div className={`eco-inner-card-list mt-8 ${studioExpanded ? 'expanded' : ''}`}>
                  <div className="eco-inner-item"><Camera size={16} /> <span>AI creative production</span></div>
                  <div className="eco-inner-item"><Camera size={16} /> <span>Product photography</span></div>
                  <div className="eco-inner-item"><User size={16} /> <span>Model photography</span></div>
                  <div className="eco-inner-item"><Video size={16} /> <span>Story-driven ads</span></div>
                  {studioExpanded && (
                    <>
                      <div className="eco-inner-item"><PenTool size={16} /> <span>Branding</span></div>
                      <div className="eco-inner-item"><Globe size={16} /> <span>Websites</span></div>
                      <div className="eco-inner-item"><Smartphone size={16} /> <span>Apps</span></div>
                      <div className="eco-inner-item"><Share2 size={16} /> <span>Social media</span></div>
                      <div className="eco-inner-item"><TrendingUp size={16} /> <span>Performance marketing</span></div>
                    </>
                  )}
                  {!studioExpanded && (
                    <button className="eco-more-btn" onClick={() => setStudioExpanded(true)}>+ 5 more</button>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Distribution */}
            <Reveal delay="delay-3" className="h-full">
              <div className="eco-column-card">
                <div className="eco-col-header">
                  <span className="eco-col-num">3</span>
                  <h3>DISTRIBUTION</h3>
                </div>
                <div className="eco-col-desc">Media built around ideas worth knowing.</div>
                <div className="eco-inner-cards mt-8">
                  <div className="eco-inner-card">
                    <div className="eco-inner-icon"><User size={20} /></div>
                    <div className="eco-inner-content">
                      <h4>@thegararushil</h4>
                      <p>AI • Business • Startups</p>
                    </div>
                  </div>
                  <div className="eco-inner-card">
                    <div className="eco-inner-icon"><Globe size={20} /></div>
                    <div className="eco-inner-content">
                      <h4>Alien's Orbit</h4>
                      <p>Culture • Tech • Internet</p>
                    </div>
                  </div>
                  <div className="eco-inner-card">
                    <div className="eco-inner-icon"><TrendingUp size={20} /></div>
                    <div className="eco-inner-content">
                      <h4>Beyond 100X</h4>
                      <p>AI education • future of work</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Labs */}
            <Reveal delay="delay-4" className="h-full">
              <div className="eco-column-card">
                <div className="eco-col-header">
                  <span className="eco-col-num">4</span>
                  <h3>LABS</h3>
                </div>
                <div className="eco-col-desc">Experiments, prototypes and things Blualien is exploring.</div>
                <div className={`eco-inner-card-list mt-8 ${labsExpanded ? 'expanded' : ''}`}>
                  <div className="eco-inner-item"><FlaskConical size={16} /> <span>AI experiments</span></div>
                  <div className="eco-inner-item"><Layers size={16} /> <span>Prototypes</span></div>
                  <div className="eco-inner-item"><Wrench size={16} /> <span>Internal tools</span></div>
                  <div className="eco-inner-item"><Search size={16} /> <span>Research</span></div>
                  {labsExpanded && (
                    <>
                      <div className="eco-inner-item"><Code size={16} /> <span>Hackathon projects</span></div>
                      <div className="eco-inner-item"><Rocket size={16} /> <span>Future products</span></div>
                    </>
                  )}
                  {!labsExpanded && (
                    <button className="eco-more-btn" onClick={() => setLabsExpanded(true)}>+ 2 more</button>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>



      {/* 04 — STUDIO */}
      <section className="section theme-dark">
        <div className="container">
          <Reveal>
            <span style={{ color: '#1a5fff' }} className="eyebrow">Studio.</span>
            <h2 className="heading-xl mb-6 text-white max-w-4xl">
              AI-native creative systems for ambitious companies.
            </h2>
            <p className="text-xl max-w-3xl text-muted mb-24">
              AI is the infrastructure. Creativity is the advantage. We combine creative direction, storytelling, technology and AI to help companies create better content, campaigns and digital experiences faster.
            </p>
          </Reveal>

          <div className="grid-3 gap-8">
            <Reveal delay="delay-1">
              <div className="card dark-card h-full">
                <h3 className="heading-md mb-8">Creative</h3>
                <ul className="service-list">
                  <li>AI Product Photography</li>
                  <li>AI Model Photography</li>
                  <li>Story-driven Video</li>
                  <li>Creative Direction</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay="delay-2">
              <div className="card dark-card h-full">
                <h3 className="heading-md mb-8">Growth</h3>
                <ul className="service-list">
                  <li>Social Media</li>
                  <li>Instagram as a Service</li>
                  <li>LinkedIn Marketing</li>
                  <li>Performance Marketing</li>
                  <li>Email Campaigns</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay="delay-3">
              <div className="card dark-card h-full">
                <h3 className="heading-md mb-8">Digital</h3>
                <ul className="service-list">
                  <li>Websites</li>
                  <li>Web Apps</li>
                  <li>Branding</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW WE WORK (Redesigned) */}
      <section className="section theme-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <Reveal>
            <div className="flex justify-between items-start mb-12">
              <div>
                <span className="eyebrow text-bright-blue" style={{ color: '#1a5fff', opacity: 0.8, letterSpacing: '0.15em' }}>HOW WE WORK.</span>
                <h2 className="heading-xl max-w-4xl text-white" style={{ marginTop: '1.5rem', lineHeight: '1.2' }}>
                  Our proven approach to building products and companies that <span className="text-bright-blue">create impact.</span>
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="how-we-work-container">
            <Reveal delay="delay-1" className="hww-step">
              <div className="hww-card">
                <span className="hww-card-num">01</span>
                <div className="hww-card-icon">
                  <Search size={48} />
                </div>
                <h3 className="hww-title">Understand<br />The Problem</h3>
              </div>
            </Reveal>

            <Reveal delay="delay-2" className="hww-step">
              <div className="hww-card">
                <span className="hww-card-num">02</span>
                <div className="hww-card-icon">
                  <Lightbulb size={48} />
                </div>
                <h3 className="hww-title">Ideate & Plan<br />With AI + Human</h3>
              </div>
            </Reveal>

            <Reveal delay="delay-3" className="hww-step">
              <div className="hww-card">
                <span className="hww-card-num">03</span>
                <div className="hww-card-icon">
                  <Settings size={48} />
                </div>
                <h3 className="hww-title">Create & Build<br />Fast</h3>
              </div>
            </Reveal>

            <Reveal delay="delay-4" className="hww-step">
              <div className="hww-card">
                <span className="hww-card-num">04</span>
                <div className="hww-card-icon">
                  <BarChart size={48} />
                </div>
                <h3 className="hww-title">Deliver<br />High Impact</h3>
              </div>
            </Reveal>

            <Reveal delay="delay-5" className="hww-step">
              <div className="hww-card">
                <span className="hww-card-num">05</span>
                <div className="hww-card-icon">
                  <Rocket size={48} />
                </div>
                <h3 className="hww-title">Iterate & Scale<br />Relentlessly</h3>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 — WORK */}
      <WorkGrid />


      {/* 08 — BUILD WITH US */}
      <section className="section theme-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <Reveal>
            <div className="flex justify-center items-center mb-6" style={{ gap: '1.5rem' }}>
              <span style={{ width: '40px', height: '1px', backgroundColor: 'rgba(26, 95, 255, 0.5)' }}></span>
              <span className="eyebrow" style={{ color: '#fff', margin: 0, letterSpacing: '0.2em' }}>BUILD WITH US</span>
              <span style={{ width: '40px', height: '1px', backgroundColor: 'rgba(26, 95, 255, 0.5)' }}></span>
            </div>
            <h2 className="heading-xl text-white text-center mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Have something<br />worth building?
            </h2>
            <p className="text-center text-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '400px', marginBottom: '4rem' }}>
              Different people. One vision. Let's create, innovate and bring ideas to life with Blualien.
            </p>
          </Reveal>

          <div className="build-cards-grid">
            <Reveal delay="delay-1" className="h-full">
              <div className="build-card">
                <span className="build-card-num">01</span>
                <div className="build-card-icon-wrapper">
                  <div style={{ position: 'relative', width: '60px', height: '70px', filter: 'drop-shadow(0 0 15px rgba(26,95,255,0.6))' }}>
                    <div style={{ position: 'absolute', bottom: '0', left: '0', width: '40px', height: '40px', background: 'rgba(26,95,255,0.1)', border: '2px solid rgba(26,95,255,0.8)', transform: 'skewY(-20deg)', boxShadow: 'inset 0 0 10px rgba(26,95,255,0.3)' }}></div>
                    <div style={{ position: 'absolute', bottom: '25px', left: '20px', width: '40px', height: '40px', background: 'rgba(26,95,255,0.2)', border: '2px solid rgba(26,95,255,1)', transform: 'skewY(-20deg)', boxShadow: 'inset 0 0 15px rgba(26,95,255,0.5)' }}></div>
                  </div>
                </div>
                <div className="build-card-content">
                  <h3 className="build-card-title">Company</h3>
                  <h4 className="build-card-subtitle">Work with Blualien</h4>
                  <p className="build-card-desc">Bring your business challenges. Let's build tailored solutions together.</p>
                  <Link to="/contact?sector=Company" className="build-card-link-wrapper">
                    <span className="build-card-link-text">EXPLORE <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px' }} /></span>
                    <span className="build-card-link-btn"><ArrowRight size={18} /></span>
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay="delay-2" className="h-full">
              <div className="build-card">
                <span className="build-card-num">02</span>
                <div className="build-card-icon-wrapper">
                  <div style={{ position: 'relative', width: '70px', height: '70px', filter: 'drop-shadow(0 0 15px rgba(26,95,255,0.6))' }}>
                    <div style={{ position: 'absolute', top: '5px', left: '5px', width: '60px', height: '60px', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, rgba(26,95,255,0.4), rgba(0,0,0,0.8))', border: '1px solid rgba(26,95,255,0.8)', boxShadow: 'inset 0 0 20px rgba(26,95,255,0.4)' }}></div>
                    <div style={{ position: 'absolute', top: '30px', left: '-10px', width: '90px', height: '15px', borderRadius: '50%', border: '2px solid rgba(26,95,255,1)', transform: 'rotate(-20deg)' }}></div>
                  </div>
                </div>
                <div className="build-card-content">
                  <h3 className="build-card-title">Creator</h3>
                  <h4 className="build-card-subtitle">Build with Blualien</h4>
                  <p className="build-card-desc">Turn your ideas into real products with the right tech and support.</p>
                  <Link to="/contact?sector=Creator" className="build-card-link-wrapper">
                    <span className="build-card-link-text">LET'S CREATE <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px' }} /></span>
                    <span className="build-card-link-btn"><ArrowRight size={18} /></span>
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay="delay-3" className="h-full">
              <div className="build-card">
                <span className="build-card-num">03</span>
                <div className="build-card-icon-wrapper">
                  <div style={{ position: 'relative', width: '70px', height: '70px', filter: 'drop-shadow(0 0 15px rgba(26,95,255,0.8))' }}>
                    <Navigation size={70} color="rgba(26,95,255,1)" fill="rgba(26,95,255,0.2)" strokeWidth={1} style={{ transform: 'rotate(45deg)' }} />
                  </div>
                </div>
                <div className="build-card-content">
                  <h3 className="build-card-title">Builder</h3>
                  <h4 className="build-card-subtitle">Join the team</h4>
                  <p className="build-card-desc">Work on meaningful problems, with a team that moves fast.</p>
                  <Link to="/contact?sector=Builder" className="build-card-link-wrapper">
                    <span className="build-card-link-text">VIEW OPPORTUNITIES <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px' }} /></span>
                    <span className="build-card-link-btn"><ArrowRight size={18} /></span>
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay="delay-4" className="h-full">
              <div className="build-card">
                <span className="build-card-num">04</span>
                <div className="build-card-icon-wrapper">
                  <div style={{ position: 'relative', width: '80px', height: '60px', filter: 'drop-shadow(0 0 15px rgba(26,95,255,0.6))' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, width: '50px', height: '50px', borderRadius: '50%', border: '3px solid rgba(26,95,255,1)', background: 'radial-gradient(circle at center, rgba(26,95,255,0.1), transparent)' }}></div>
                    <div style={{ position: 'absolute', right: 0, top: '10px', width: '50px', height: '50px', borderRadius: '50%', border: '3px solid rgba(26,95,255,0.6)', background: 'radial-gradient(circle at center, rgba(26,95,255,0.1), transparent)' }}></div>
                  </div>
                </div>
                <div className="build-card-content">
                  <h3 className="build-card-title">Investor / Partner</h3>
                  <h4 className="build-card-subtitle">Start a conversation</h4>
                  <p className="build-card-desc">Explore opportunities to collaborate, invest, or partner with us.</p>
                  <Link to="/contact?sector=Investor%20%2F%20Partner" className="build-card-link-wrapper">
                    <span className="build-card-link-text">GET IN TOUCH <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px' }} /></span>
                    <span className="build-card-link-btn"><ArrowRight size={18} /></span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
