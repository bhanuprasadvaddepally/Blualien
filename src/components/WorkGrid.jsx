import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { workData } from '../data/workData';
import './WorkGrid.css';

const WorkCarousel = ({ work }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRefs = useRef([]);
  const containerRef = useRef(null);

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    let timeout;

    const handleNext = () => {
      setCurrentIndex((prev) => (prev + 1) % work.media.length);
    };

    if (isVisible && !isHovered && work.media.length > 1) {
      const currentMedia = work.media[currentIndex];
      const isVideo = currentMedia.endsWith('.mp4');

      let duration = 3000;
      if (isVideo) {
        const videoElement = videoRefs.current[currentIndex];
        if (videoElement) {
          if (videoElement.duration && videoElement.duration < 6) {
             duration = videoElement.duration * 1000;
          } else {
             duration = 6000; // max 6s for long videos
          }
        } else {
          duration = 6000;
        }
      }

      timeout = setTimeout(handleNext, duration);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isVisible, isHovered, work.media]);

  // Handle video playback
  useEffect(() => {
    if (!isVisible) {
      videoRefs.current.forEach(v => v && v.pause());
      return;
    }

    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === currentIndex) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => { /* handle autoplay block */ });
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex, isVisible]);

  return (
    <div 
      className="work-carousel-card" 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setCurrentIndex((prev) => (prev + 1) % work.media.length)}
    >
      <div className="work-carousel-media">
        {work.media.map((src, idx) => {
          const isVideo = src.endsWith('.mp4');
          return (
            <div 
              key={idx} 
              className={`work-slide ${idx === currentIndex ? 'active' : ''}`}
            >
              {isVideo ? (
                <video
                  ref={el => videoRefs.current[idx] = el}
                  src={src}
                  muted
                  loop
                  playsInline
                  className="work-media-content"
                />
              ) : (
                <img 
                  src={src} 
                  alt={`${work.brand} work sample ${idx + 1}`} 
                  loading="lazy"
                  className="work-media-content"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="work-card-overlay">
        <div className="work-card-header">
          <span className="work-brand-tag">{work.category}</span>
        </div>
        <div className="work-card-footer">
          <h3 className="work-brand-name">{work.brand}</h3>
        </div>
      </div>

      {work.media.length > 1 && (
        <div className="work-progress-bars">
          {work.media.map((_, idx) => (
            <div 
              key={idx} 
              className={`progress-segment ${idx === currentIndex ? 'active' : ''}`}
              aria-label={`Slide ${idx + 1} of ${work.media.length}`}
            >
              <div className="progress-fill" style={{ 
                animationDuration: idx === currentIndex && isVisible && !isHovered ? 
                  (work.media[idx].endsWith('.mp4') ? '6s' : '3s') : '0s' 
              }}></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const WorkGrid = () => {
  return (
    <section className="section theme-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div className="work-section-header">
          <span className="eyebrow" style={{ color: '#1a5fff', opacity: 0.8 }}>WORK</span>
          <h2 className="heading-xl mb-12 text-white">Work that gets brands noticed.</h2>
        </div>

        <div className="work-grid">
          {workData.map((work, idx) => (
            <div 
              className="work-grid-item" 
              key={idx}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <WorkCarousel work={work} />
            </div>
          ))}
        </div>

        <div className="work-cta-container mt-16">
          <p className="text-xl text-center mb-6 text-muted">Want results like these?</p>
          <div className="flex justify-center">
            <Link to="/contact" className="btn btn-primary">
              LET'S TALK <ArrowRight size={20} className="arrow ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;
