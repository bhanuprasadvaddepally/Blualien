import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  Layers,
  Pause,
  Play,
  Shirt,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { workData } from '../data/work.js';

const categoryTabs = [
  { id: 'All', label: 'All', icon: Layers },
  { id: 'Beverage', label: 'Beverage', icon: Droplets },
  { id: 'Fashion & Lifestyle', label: 'Fashion & Lifestyle', icon: Shirt },
  { id: 'Fragrance', label: 'Fragrance', icon: Sparkles },
];

export default function Work({ showCallToAction = true }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const touchStartX = useRef(null);

  const filteredItems =
    selectedCategory === 'All'
      ? workData
      : workData.filter((item) => item.category === selectedCategory);

  const prevSlide = useCallback(() => {
    if (filteredItems.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  const nextSlide = useCallback(() => {
    if (filteredItems.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  // Reset active index when category changes
  useEffect(() => {
    setActiveIndex(0);
    setVideoProgress(0);
  }, [selectedCategory]);

  // Handle video autoplay and auto-scroll behavior
  useEffect(() => {
    setVideoProgress(0);
    const currentItem = filteredItems[activeIndex];
    if (!currentItem) return undefined;

    // If active item has video: play automatically from beginning
    if (currentItem.videoSrc) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = isMuted;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              // Browser autoplay policy requires muted
              if (videoRef.current) {
                videoRef.current.muted = true;
                setIsMuted(true);
                videoRef.current
                  .play()
                  .then(() => setIsPlaying(true))
                  .catch(() => setIsPlaying(false));
              }
            });
        }
      }
      return undefined;
    }

    // For image-only cards: automatically scroll to next card after 5 seconds
    if (isHovered || filteredItems.length <= 1) return undefined;

    const timer = window.setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, filteredItems, isHovered, isMuted, nextSlide]);

  // Pause playback when scrolled out of view
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window))
      return undefined;

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          } else if (
            entry.isIntersecting &&
            filteredItems[activeIndex]?.videoSrc &&
            videoRef.current
          ) {
            videoRef.current
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          }
        });
      },
      { threshold: 0.25 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [activeIndex, filteredItems]);

  function handleVideoTimeUpdate() {
    if (videoRef.current && videoRef.current.duration) {
      const prog = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(prog);
    }
  }

  function handleVideoEnded() {
    setIsPlaying(false);
    setVideoProgress(100);
    // Automatically scroll to next card once video playing is completed
    nextSlide();
  }

  function togglePlay(e) {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true));
          }
        });
    }
  }

  function toggleMute(e) {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;
    if (deltaX > 45) {
      nextSlide();
    } else if (deltaX < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      className="border-t border-paper/30 bg-ink px-5 py-16 text-paper sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      aria-labelledby="work-heading"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">
              WORK
            </p>
            <h2
              id="work-heading"
              className="mt-4 font-display text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
            >
              Work that gets brands noticed.
            </h2>
          </div>
          {showCallToAction && (
            <Link
              to="/contact?sector=Company"
              className="inline-flex items-center gap-2 self-start border border-lime bg-lime px-5 py-2.5 text-sm font-bold text-ink transition-colors duration-150 hover:border-paper hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime sm:self-auto"
            >
              Start your campaign
            </Link>
          )}
        </div>

        {/* Centered Category Pill Tabs with Icons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime ${
                  isActive
                    ? 'border-paper bg-paper text-ink'
                    : 'relative border-paper/30 bg-transparent text-paper/80 hover:text-paper after:absolute after:bottom-1 after:left-4 after:right-4 after:h-[2px] after:w-0 after:bg-lime after:transition-all after:duration-150 hover:after:w-[calc(100%-2rem)]'
                }`}
                aria-pressed={isActive}
              >
                <Icon size={14} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Billo-Style Video Carousel Stage */}
        <div
          className="relative mt-12 flex min-h-[580px] sm:min-h-[640px] items-center justify-center overflow-hidden py-6"
          aria-roledescription="carousel"
          aria-label="Client work video showcase"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative flex h-[540px] sm:h-[580px] w-full max-w-5xl items-center justify-center">
            {filteredItems.map((item, index) => {
              const total = filteredItems.length;
              let diff = index - activeIndex;

              // Circular shortest distance
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              const isCenter = diff === 0;
              const isImmediate = Math.abs(diff) === 1;
              const isVisible = Math.abs(diff) <= 2;

              if (!isVisible) return null;

              // Positioning and scaling values
              const scale = isCenter ? 1 : isImmediate ? 0.86 : 0.72;
              const opacity = isCenter ? 1 : isImmediate ? 0.75 : 0.55;
              const zIndex = isCenter ? 20 : isImmediate ? 10 : 5;
              // Responsive translateX offset
              const offsetPx =
                diff * (typeof window !== 'undefined' && window.innerWidth < 640 ? 220 : 310);

              return (
                <div
                  key={item.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${item.brand} (${index + 1} of ${total})`}
                  onClick={() => {
                    if (!isCenter) setActiveIndex(index);
                  }}
                  style={{
                    transform: `translateX(${offsetPx}px) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                  className={`absolute top-0 flex h-[540px] sm:h-[580px] w-[270px] sm:w-[300px] flex-col overflow-hidden rounded-[28px] border border-paper/30 bg-ink shadow-2xl transition-all duration-500 ease-out select-none ${
                    !isCenter ? 'cursor-pointer hover:opacity-90' : ''
                  }`}
                >
                  {/* Media Area (Phone-like tall container) */}
                  <div className="relative flex-1 overflow-hidden bg-ink">
                    {isCenter && item.videoSrc ? (
                      <>
                        <video
                          ref={videoRef}
                          src={item.videoSrc}
                          poster={item.poster}
                          playsInline
                          autoPlay
                          muted={isMuted}
                          className="h-full w-full object-cover"
                          onTimeUpdate={handleVideoTimeUpdate}
                          onEnded={handleVideoEnded}
                        />

                        {/* Top Right Audio Toggle */}
                        <button
                          type="button"
                          onClick={toggleMute}
                          aria-label={isMuted ? 'Unmute video sound' : 'Mute video sound'}
                          className="absolute right-4 top-4 z-30 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-semibold text-paper border border-paper/20 backdrop-blur-none transition-all duration-150 hover:bg-lime hover:text-ink hover:border-lime"
                        >
                          {isMuted ? (
                            <>
                              <VolumeX size={14} />
                              <span className="text-[0.65rem] uppercase tracking-wider font-bold">Unmute</span>
                            </>
                          ) : (
                            <>
                              <Volume2 size={14} className="text-lime" />
                              <span className="text-[0.65rem] uppercase tracking-wider font-bold">Sound On</span>
                            </>
                          )}
                        </button>

                        {/* Video Playback Progress Bar */}
                        <div className="absolute inset-x-0 bottom-0 z-30 h-1 bg-paper/20">
                          <div
                            className="h-full bg-lime transition-all duration-100 ease-linear"
                            style={{ width: `${videoProgress}%` }}
                          />
                        </div>
                      </>
                    ) : (
                      <img
                        src={item.poster}
                        alt={`${item.brand} visual work preview`}
                        className="h-full w-full object-cover transition-transform duration-300"
                        loading={isCenter ? 'eager' : 'lazy'}
                      />
                    )}

                    {/* Category Chip on Top Left */}
                    <div className="absolute left-4 top-4 z-20">
                      <span className="rounded-full border border-paper/30 bg-ink/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-paper">
                        {item.category}
                      </span>
                    </div>

                    {/* Play/Pause Toggle Indicator for Centre Video Card */}
                    {isCenter && item.videoSrc && (
                      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={togglePlay}
                          aria-label={isPlaying ? 'Pause video' : 'Play video'}
                          className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-ink bg-paper text-ink shadow-lg transition-transform duration-200 hover:scale-[1.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
                        >
                          {isPlaying ? (
                            <Pause size={22} className="fill-ink text-ink" />
                          ) : (
                            <Play size={22} className="ml-1 fill-ink text-ink" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Campaign Preview badge for image showcases */}
                    {isCenter && !item.videoSrc && (
                      <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center">
                        <span className="rounded-full border border-paper/20 bg-ink/80 px-3 py-1 text-[0.65rem] font-medium text-paper/85">
                          Campaign Preview • Auto-scrolls
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Centre Card Info Panel in Solid Paper */}
                  <div className="border-t border-ink/20 bg-paper p-4 text-ink">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                        {item.brand}
                      </h3>
                      <span className="bg-lime px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-ink">
                        {item.category}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink/75">
                      {item.summary}
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-ink/15 pt-2">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[0.6rem] font-semibold text-ink/60"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        to="/contact?sector=Company"
                        className="text-xs font-bold text-ink underline decoration-lime decoration-2 underline-offset-2 hover:text-ink/70"
                      >
                        Start campaign
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows: Circular 44px buttons with 1px lime border */}
          {filteredItems.length > 1 && (
            <div className="pointer-events-none absolute inset-x-4 top-1/2 flex -translate-y-1/2 items-center justify-between sm:inset-x-8">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous work slide"
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-lime text-lime backdrop-blur-none transition-all duration-150 hover:bg-lime hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next work slide"
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-lime text-lime backdrop-blur-none transition-all duration-150 hover:bg-lime hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Carousel indicator dots */}
        {filteredItems.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {filteredItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${item.brand}`}
                className={`h-2 transition-all duration-200 ${
                  idx === activeIndex
                    ? 'w-8 bg-lime'
                    : 'w-2 bg-paper/30 hover:bg-paper/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
