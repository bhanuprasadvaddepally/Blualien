import {
  ArrowRight,
  BarChart3,
  Box,
  Building2,
  Camera,
  Code,
  FlaskConical,
  Globe,
  Handshake,
  Layers,
  Lightbulb,
  Mail,
  Monitor,
  PenTool,
  Rocket,
  Search,
  Settings,
  Share2,
  Smartphone,
  Sparkles,
  Terminal,
  TrendingUp,
  User,
  Video,
  Wrench,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import Seo from '../components/Seo.jsx';
import Work from '../components/Work.jsx';
import Section from '../components/ui/Section.jsx';
import { audienceCards } from '../data/audiences.js';
import { roleLinks, trustClients } from '../data/nav.js';
import { pillarsData } from '../data/pillars.js';
import { processSteps } from '../data/process.js';
import { studioServices } from '../data/services.js';
import { trackEvent } from '../lib/analytics.js';

const iconMap = {
  ArrowRight,
  BarChart3,
  Box,
  Building2,
  Camera,
  Code,
  FlaskConical,
  Globe,
  Handshake,
  Layers,
  Lightbulb,
  Mail,
  Monitor,
  PenTool,
  Rocket,
  Search,
  Settings,
  Share2,
  Smartphone,
  Sparkles,
  Terminal,
  TrendingUp,
  User,
  Video,
  Wrench,
};

function ResolveIcon({ name, size = 18, className = '' }) {
  const Component = iconMap[name] || Sparkles;
  return <Component aria-hidden="true" size={size} className={className} />;
}

function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [canParallax, setCanParallax] = useState(false);
  const collageRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    setCanParallax(!isTouch && !prefersReducedMotion);
  }, []);

  function handleMouseMove(e) {
    if (!canParallax || !collageRef.current) return;
    const rect = collageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Normalize coordinates from -1 to 1, capped at 8px max movement
    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));
    setMousePos({ x: normX * 8, y: normY * 8 });
  }

  function handleMouseLeave() {
    setMousePos({ x: 0, y: 0 });
  }

  function seeWork(event) {
    event.preventDefault();
    document
      .getElementById('work')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    trackEvent('hero_see_work_click');
  }

  function scrollToPillar(pillarId) {
    const el =
      document.getElementById(pillarId) || document.getElementById('what-is-blualien');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Animation variants for entrance staggering (70ms apart, 400ms duration)
  const fadeUp = (delayIndex = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: delayIndex * 0.07, ease: 'easeOut' },
  });

  return (
    <section
      className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-center border-b border-ink/20 bg-paper px-5 py-5 sm:px-8 sm:py-6 lg:px-12 lg:py-8"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Messaging, CTAs, Role Buttons, Offerings & Trust */}
          <div className="flex flex-col justify-center lg:col-span-7">
            {/* Eyebrow */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-block bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
                AI-native studio
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              {...fadeUp(1)}
              tabIndex={-1}
              className="mt-3.5 font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold leading-[0.92] tracking-[-0.06em] text-ink focus:outline-none"
            >
              Building what comes next.
            </motion.h1>

            {/* Subline */}
            <motion.p
              {...fadeUp(2)}
              className="mt-3.5 max-w-xl text-sm leading-relaxed text-ink/80 sm:text-base sm:leading-7"
            >
              We help companies make content, campaigns and digital experiences faster,
              using creative direction, storytelling and AI.
            </motion.p>

            {/* Main Action Buttons */}
            <motion.div
              {...fadeUp(3)}
              className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                className="group inline-flex min-h-11 items-center justify-center gap-2 border border-lime bg-lime px-6 py-2.5 text-sm font-bold text-ink transition-all duration-150 hover:border-ink hover:bg-ink hover:text-lime active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                onClick={() => trackEvent('hero_start_project_click')}
                to="/contact"
              >
                Start a project
                <ArrowRight
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-150 group-hover:translate-x-1"
                />
              </Link>
              <a
                className="inline-flex min-h-11 items-center justify-center border border-ink bg-transparent px-6 py-2.5 text-sm font-bold text-ink transition-colors duration-150 hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                href="#work"
                onClick={seeWork}
              >
                See our work
              </a>
            </motion.div>

            {/* Role-based Entry Row */}
            <motion.div {...fadeUp(4)} className="mt-4 border-t border-ink/15 pt-3.5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-ink/65">
                Explore by role:
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {roleLinks.map((role) => (
                  <Link
                    key={role.label}
                    to={role.to}
                    className="group inline-flex items-center gap-1.5 border border-ink/30 bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition-all duration-150 hover:border-ink hover:bg-lime hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                  >
                    {role.label}
                    <ArrowRight
                      size={12}
                      aria-hidden="true"
                      className="transition-transform duration-150 group-hover:translate-x-0.5"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Offerings Row with sliding lime highlight on hover */}
            <motion.ul
              {...fadeUp(5)}
              className="mt-4 flex flex-wrap border-y border-ink/20 text-xs font-semibold text-ink"
            >
              {[
                { label: 'Products', target: 'what-is-blualien' },
                { label: 'Creative Systems', target: 'studio' },
                { label: 'Technology', target: 'what-is-blualien' },
                { label: 'Media', target: 'what-is-blualien' },
              ].map(({ label, target }) => (
                <li key={label} className="border-r border-ink/20 last:border-r-0">
                  <button
                    type="button"
                    onClick={() => scrollToPillar(target)}
                    className="group relative z-10 block overflow-hidden px-3.5 py-1.5 text-left text-xs font-semibold text-ink transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-lime before:transition-transform before:duration-200 hover:before:scale-x-100"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </motion.ul>

            {/* Trust Strip */}
            <motion.div
              {...fadeUp(6)}
              className="mt-4 flex flex-wrap items-center gap-2.5 text-xs text-ink/75"
            >
              <span className="font-bold uppercase tracking-wider text-ink/70">
                Trusted by:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {trustClients.map((client) => (
                  <span
                    key={client}
                    className="inline-flex cursor-default items-center border border-ink/20 bg-paper px-2.5 py-1 font-display text-xs font-semibold text-ink transition-all duration-150 hover:-translate-y-0.5 hover:border-ink hover:bg-lime hover:text-ink"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Collage of 3 Real Work Images with subtle parallax */}
          <div
            ref={collageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative mx-auto flex w-full max-w-md items-center justify-center lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full max-h-[58svh]">
              {/* Back Card 1 - Drink Niro */}
              <div
                style={{
                  transform: canParallax
                    ? `translate3d(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px, 0)`
                    : undefined,
                  transition: 'transform 250ms ease-out',
                }}
                className="group absolute left-0 top-0 w-3/5 border border-ink bg-paper p-1.5 shadow-sm transition-all duration-250 hover:z-30 hover:-translate-y-1.5 hover:rotate-1 hover:shadow-md"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-ink">
                  <img
                    src="/media/We asked ourselves one question...What if Niro had no creative limits@the.blualien @nirobrothers.jpg"
                    alt="Drink Niro campaign work by Blualien"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="eager"
                    width="400"
                    height="533"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-ink/10 px-2 py-1 text-[0.65rem] font-bold">
                  <span className="text-ink">Drink Niro</span>
                  <span className="bg-lime px-1.5 py-0.5 text-[0.6rem] text-ink font-bold">
                    Creative
                  </span>
                </div>
              </div>

              {/* Back Card 2 - One8 */}
              <div
                style={{
                  transform: canParallax
                    ? `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * -0.5}px, 0)`
                    : undefined,
                  transition: 'transform 250ms ease-out',
                }}
                className="group absolute bottom-2 left-4 w-3/5 border border-ink bg-paper p-1.5 shadow-sm transition-all duration-250 hover:z-30 hover:-translate-y-1.5 hover:rotate-1 hover:shadow-md"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-ink">
                  <img
                    src="/media/We didnt want to make another ad for sneakers.We wanted to build something people would rememb.heic.jpg"
                    alt="One8 fashion campaign work by Blualien"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    width="400"
                    height="533"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-ink/10 px-2 py-1 text-[0.65rem] font-bold">
                  <span className="text-ink">One8</span>
                  <span className="bg-lime px-1.5 py-0.5 text-[0.6rem] text-ink font-bold">
                    Campaign
                  </span>
                </div>
              </div>

              {/* Front Card 3 - VOID Energy */}
              <div
                style={{
                  transform: canParallax
                    ? `translate3d(${mousePos.x * 0.9}px, ${mousePos.y * 0.9}px, 0)`
                    : undefined,
                  transition: 'transform 250ms ease-out',
                }}
                className="group absolute right-0 top-10 z-10 w-3/5 border border-ink bg-paper p-2 shadow-md transition-all duration-250 hover:z-30 hover:-translate-y-1.5 hover:rotate-1 hover:shadow-lg"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-ink">
                  <img
                    src="/media/What happens when energy meets imagination. BlueAlien × VOID Energy DrinkWe reimagined the produ.jpg"
                    alt="VOID Energy Drink campaign work by Blualien"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="eager"
                    width="400"
                    height="533"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-ink/10 px-2 py-1.5 text-[0.7rem] font-bold">
                  <span className="text-ink">VOID Energy</span>
                  <span className="bg-lime px-1.5 py-0.5 text-[0.6rem] text-ink font-bold">
                    Beverage
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  const [studioExpanded, setStudioExpanded] = useState(false);
  const [labsExpanded, setLabsExpanded] = useState(false);

  return (
    <Section
      id="what-is-blualien"
      labelledBy="ecosystem-heading"
      className="bg-ink text-paper"
    >
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">
          WHAT IS BLUALIEN?
        </p>
        <h2
          id="ecosystem-heading"
          className="mt-4 font-display text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
        >
          One company.
          <br />
          Multiple ways to build.
        </h2>
      </Reveal>

      <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-4">
        {/* 1. PRODUCTS */}
        <Reveal>
          <article className="flex h-full flex-col justify-between border border-paper/30 bg-ink p-6 transition-all duration-200 hover:-translate-y-1 hover:border-lime">
            <div>
              <div className="flex items-start justify-between border-b border-paper/20 pb-4">
                <span className="font-display text-2xl font-semibold text-lime">01</span>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-paper">
                  PRODUCTS
                </h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-paper/80">
                AI-native products solving real problems.
              </p>
              <div className="mt-6 border border-paper/20 p-4">
                <Box aria-hidden="true" className="text-lime" size={24} />
                <h4 className="mt-3 font-bold text-paper">ALINET</h4>
                <p className="mt-2 text-xs leading-5 text-paper/75">
                  [Add one-line ALINET description] Work-first professional identity and
                  reputation built around actual creative proof.
                </p>
              </div>
            </div>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-lime transition-colors duration-150 hover:underline"
            >
              Explore Products <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </article>
        </Reveal>

        {/* 2. STUDIO */}
        <Reveal delay={0.05}>
          <article className="flex h-full flex-col justify-between border border-paper/30 bg-ink p-6 transition-all duration-200 hover:-translate-y-1 hover:border-lime">
            <div>
              <div className="flex items-start justify-between border-b border-paper/20 pb-4">
                <span className="font-display text-2xl font-semibold text-lime">02</span>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-paper">
                  STUDIO
                </h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-paper/80">
                AI-native creative and growth systems for companies.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-paper/80">
                {pillarsData[1].primaryServices.map((service) => (
                  <li
                    className="flex items-center gap-2 border-t border-paper/10 pt-2"
                    key={service.name}
                  >
                    <ResolveIcon
                      name={service.iconName}
                      size={15}
                      className="text-lime"
                    />
                    <span>{service.name}</span>
                  </li>
                ))}
                {studioExpanded &&
                  pillarsData[1].expandedServices.map((service) => (
                    <li
                      className="flex items-center gap-2 border-t border-paper/10 pt-2"
                      key={service.name}
                    >
                      <ResolveIcon
                        name={service.iconName}
                        size={15}
                        className="text-lime"
                      />
                      <span>{service.name}</span>
                    </li>
                  ))}
              </ul>
              {!studioExpanded ? (
                <button
                  type="button"
                  className="mt-4 text-xs font-bold text-lime underline hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
                  onClick={() => setStudioExpanded(true)}
                  aria-label="Show 5 more studio services"
                >
                  + 5 more
                </button>
              ) : (
                <button
                  type="button"
                  className="mt-4 text-xs font-bold text-paper/60 underline hover:text-paper"
                  onClick={() => setStudioExpanded(false)}
                >
                  Show less
                </button>
              )}
            </div>
            <Link
              to="/studio"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-lime transition-colors duration-150 hover:underline"
            >
              Explore Studio <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </article>
        </Reveal>

        {/* 3. DISTRIBUTION */}
        <Reveal delay={0.1}>
          <article className="flex h-full flex-col justify-between border border-paper/30 bg-ink p-6 transition-all duration-200 hover:-translate-y-1 hover:border-lime">
            <div>
              <div className="flex items-start justify-between border-b border-paper/20 pb-4">
                <span className="font-display text-2xl font-semibold text-lime">03</span>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-paper">
                  DISTRIBUTION
                </h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-paper/80">
                Media built around ideas worth knowing.
              </p>
              <div className="mt-6 space-y-3">
                {pillarsData[2].channels.map((ch) => (
                  <div key={ch.name} className="border border-paper/20 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ResolveIcon name={ch.iconName} size={16} className="text-lime" />
                        <h4 className="text-xs font-bold text-paper">{ch.name}</h4>
                      </div>
                      {ch.url && ch.url !== '#' && (
                        <a
                          href={ch.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.65rem] font-bold text-lime hover:underline"
                          aria-label={`Visit ${ch.name}`}
                        >
                          Visit →
                        </a>
                      )}
                    </div>
                    <p className="mt-1 text-[0.7rem] text-paper/70">{ch.niche}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to="/contact?sector=Creator"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-lime transition-colors duration-150 hover:underline"
            >
              Explore Distribution <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </article>
        </Reveal>

        {/* 4. LABS */}
        <Reveal delay={0.15}>
          <article className="flex h-full flex-col justify-between border border-paper/30 bg-ink p-6 transition-all duration-200 hover:-translate-y-1 hover:border-lime">
            <div>
              <div className="flex items-start justify-between border-b border-paper/20 pb-4">
                <span className="font-display text-2xl font-semibold text-lime">04</span>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-paper">
                  LABS
                </h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-paper/80">
                Experiments, prototypes and things Blualien is exploring.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-paper/80">
                {pillarsData[3].primaryItems.map((item) => (
                  <li
                    className="flex items-center gap-2 border-t border-paper/10 pt-2"
                    key={item.name}
                  >
                    <ResolveIcon name={item.iconName} size={15} className="text-lime" />
                    <span>{item.name}</span>
                  </li>
                ))}
                {labsExpanded &&
                  pillarsData[3].expandedItems.map((item) => (
                    <li
                      className="flex items-center gap-2 border-t border-paper/10 pt-2"
                      key={item.name}
                    >
                      <ResolveIcon name={item.iconName} size={15} className="text-lime" />
                      <span>{item.name}</span>
                    </li>
                  ))}
              </ul>
              {!labsExpanded ? (
                <button
                  type="button"
                  className="mt-4 text-xs font-bold text-lime underline hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
                  onClick={() => setLabsExpanded(true)}
                  aria-label="Show 2 more labs items"
                >
                  + 2 more
                </button>
              ) : (
                <button
                  type="button"
                  className="mt-4 text-xs font-bold text-paper/60 underline hover:text-paper"
                  onClick={() => setLabsExpanded(false)}
                >
                  Show less
                </button>
              )}
            </div>
            <Link
              to="/labs"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-lime transition-colors duration-150 hover:underline"
            >
              Explore Labs <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}

function Studio() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleExpand = (title) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <Section id="studio" labelledBy="studio-heading" className="bg-paper text-ink">
      <Reveal>
        <span className="inline-block bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
          Studio.
        </span>
        <h2
          id="studio-heading"
          className="mt-4 max-w-5xl font-display text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
        >
          AI-native creative systems for ambitious companies.
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink/80 sm:text-xl sm:leading-8">
          AI is the infrastructure. Creativity is the advantage. We combine creative
          direction, storytelling, technology and AI to help companies create better
          content, campaigns and digital experiences faster.
        </p>
      </Reveal>

      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
        {studioServices.map((col, index) => {
          const isExpanded = Boolean(expandedSections[col.title]);
          const visibleItems = isExpanded ? col.items : col.items.slice(0, 4);
          const hasMore = col.items.length > 4;

          return (
            <Reveal delay={index * 0.05} key={col.title}>
              <article className="group relative flex h-full flex-col justify-between overflow-hidden border border-ink bg-paper p-6 transition-all duration-200 hover:-translate-y-1 before:absolute before:inset-x-0 before:top-0 before:h-1 before:origin-left before:scale-x-0 before:bg-lime before:transition-transform hover:before:scale-x-100">
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink">
                    {col.title}
                  </h3>
                  <p className="mt-2 text-xs text-ink/70">{col.description}</p>
                  <ul className="mt-6 space-y-3">
                    {visibleItems.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center gap-3 border-t border-ink/15 pt-3 text-sm font-medium text-ink/85"
                      >
                        <ResolveIcon
                          name={item.iconName}
                          size={16}
                          className="text-ink"
                        />
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                  {hasMore && (
                    <button
                      type="button"
                      className="mt-4 text-xs font-bold text-ink underline decoration-lime decoration-2 underline-offset-4 transition-colors hover:text-ink/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                      onClick={() => toggleExpand(col.title)}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? 'Show fewer' : `+ ${col.items.length - 4} more`}
                    </button>
                  )}
                </div>

                <div className="mt-8 border-t border-ink/10 pt-4">
                  <Link
                    to="/studio"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink underline decoration-lime decoration-2 underline-offset-4 transition-colors duration-150 hover:text-ink/70"
                  >
                    View {col.title} details <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function Process() {
  return (
    <Section labelledBy="process-heading" className="bg-ink text-paper">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">
          HOW WE WORK.
        </p>
        <h2
          id="process-heading"
          className="mt-4 max-w-5xl font-display text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
        >
          Our proven approach to building products and companies that{' '}
          <span className="text-lime">create impact.</span>
        </h2>
      </Reveal>

      {/* 5 Steps in equal height cards with thin progress connector line */}
      <div className="relative mt-12">
        {/* Horizontal connector line on desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-6 right-6 top-8 hidden h-[1px] bg-paper/20 lg:block"
        />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal delay={index * 0.05} key={step.number}>
              <li className="relative flex h-full flex-col justify-between border border-paper/30 bg-ink p-5 transition-all duration-200 hover:-translate-y-1 hover:border-lime">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-8 w-8 items-center justify-center border border-lime bg-ink font-display text-sm font-bold text-lime">
                      {step.number}
                    </span>
                    <ResolveIcon name={step.iconName} size={24} className="text-lime" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-[-0.03em] text-paper">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-paper/75">
                    {step.explanation}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function BuildWithUs() {
  return (
    <Section labelledBy="build-heading" className="bg-paper text-ink">
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="inline-block bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
          BUILD WITH US
        </span>
        <h2
          id="build-heading"
          className="mt-4 font-display text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
        >
          Have something
          <br />
          worth building?
        </h2>
        <p className="mt-6 text-base leading-relaxed text-ink/80 sm:text-lg">
          Different people. One vision. Let&apos;s create, innovate and bring ideas to
          life with Blualien.
        </p>
      </Reveal>

      <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
        {audienceCards.map((card, index) => (
          <Reveal delay={index * 0.05} key={card.title}>
            <article className="group relative flex h-full flex-col justify-between overflow-hidden border border-ink bg-paper p-6 transition-all duration-200 hover:-translate-y-1 before:absolute before:inset-x-0 before:top-0 before:h-1 before:origin-left before:scale-x-0 before:bg-lime before:transition-transform hover:before:scale-x-100">
              <div>
                <div className="flex items-center justify-between border-b border-ink/15 pb-4">
                  <span className="inline-flex h-7 w-7 items-center justify-center bg-lime font-display text-xs font-bold text-ink">
                    {card.number}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center border border-ink/30 bg-paper text-ink">
                    <ResolveIcon name={card.iconName} size={20} />
                  </div>
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.04em] text-ink">
                  {card.title}
                </h3>
                <h4 className="mt-1 text-xs font-bold text-ink/80">{card.subtitle}</h4>
                <p className="mt-3 text-xs leading-5 text-ink/75">{card.description}</p>
              </div>

              <div className="mt-8 border-t border-ink/10 pt-4">
                <Link
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink underline decoration-lime decoration-2 underline-offset-4 transition-colors duration-150 hover:text-ink/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                  to={`/contact?sector=${encodeURIComponent(card.sector)}`}
                >
                  {card.action}{' '}
                  <ArrowRight
                    aria-hidden="true"
                    size={14}
                    className="transition-transform duration-150 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Ecosystem />
      <Studio />
      <Process />
      <Work />
      <BuildWithUs />
    </>
  );
}
