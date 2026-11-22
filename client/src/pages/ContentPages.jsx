import {
  ArrowRight,
  Box,
  Building2,
  Camera,
  Code,
  FlaskConical,
  Globe,
  Layers,
  PenTool,
  Rocket,
  Search,
  Share2,
  Smartphone,
  Sparkles,
  TrendingUp,
  User,
  Video,
  Wrench,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Work from '../components/Work.jsx';
import { pillarsData } from '../data/pillars.js';
import { processSteps } from '../data/process.js';
import { studioServices } from '../data/services.js';

const pageClass = 'bg-paper px-5 pb-20 pt-16 sm:px-8 lg:px-12';
const containerClass = 'mx-auto max-w-7xl';
const cardClass =
  'group relative overflow-hidden border border-ink bg-paper p-6 sm:p-8 transition-all duration-200 hover:-translate-y-1 before:absolute before:inset-x-0 before:top-0 before:h-1 before:origin-left before:scale-x-0 before:bg-lime before:transition-transform hover:before:scale-x-100';
const tagClass =
  'inline-flex border border-ink bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ink';

const iconMap = {
  Box,
  Building2,
  Camera,
  Code,
  FlaskConical,
  Globe,
  Layers,
  PenTool,
  Rocket,
  Search,
  Share2,
  Smartphone,
  Sparkles,
  TrendingUp,
  User,
  Video,
  Wrench,
};

function ResolveIcon({ name, size = 18, className = '' }) {
  const Component = iconMap[name] || Sparkles;
  return <Component aria-hidden="true" size={size} className={className} />;
}

function PageIntro({ title, eyebrow = '', children }) {
  return (
    <section className={pageClass}>
      <div className={containerClass}>
        {eyebrow && (
          <span className="inline-block bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-ink">
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}

function PageCopy({ children }) {
  return (
    <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink/80 sm:text-lg sm:leading-8">
      {children}
    </p>
  );
}

function OutlineLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 border border-ink px-5 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      {children}
      <ArrowRight aria-hidden="true" size={16} />
    </Link>
  );
}

/* =========================================================================
   PRODUCTS PAGE
========================================================================= */
export function Products() {
  return (
    <PageIntro title="Products" eyebrow="INNOVATION">
      <PageCopy>We build products for the world we're moving toward.</PageCopy>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <article className={cardClass}>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink">
            ALINET
          </h2>
          <span className={`${tagClass} mt-4`}>Building</span>
          <p className="mt-4 text-ink/80">
            The professional network for creative talent.
          </p>
          <p className="mt-3 text-ink/80">
            Work-first professional identity and reputation built around actual creative
            proof.
          </p>
          <div className="mt-8 border-t border-ink/15 pt-4">
            <Link
              to="/contact?sector=Builder"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink underline decoration-lime decoration-2 underline-offset-4"
            >
              Collaborate on ALINET <ArrowRight size={14} />
            </Link>
          </div>
        </article>

        <article className={cardClass}>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink">
            Speqr
          </h2>
          <span className={`${tagClass} mt-4`}>Exploring / Parked</span>
          <p className="mt-4 text-ink/80">
            AI-native product intelligence for product teams.
          </p>
        </article>
      </div>

      <div className="mt-16 border-t border-ink/20 pt-12">
        <OutlineLink to="/contact">Discuss building a product with us</OutlineLink>
      </div>
    </PageIntro>
  );
}

/* =========================================================================
   STUDIO PAGE (UPGRADED)
========================================================================= */
export function Studio() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleExpand = (title) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      {/* 1. Studio Hero - fits within first screen */}
      <section className="flex min-h-[calc(100svh-5rem)] flex-col justify-center border-b border-ink/20 bg-paper px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <span className="inline-block bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
            STUDIO
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.06em] text-ink">
            AI-native creative systems for ambitious companies.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg">
            AI is the infrastructure. Creativity is the advantage. We combine creative
            direction, storytelling, technology and AI to help companies create better
            content, campaigns and digital experiences faster.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/contact?sector=Company"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-lime bg-lime px-6 py-3 font-bold text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-lime"
            >
              Start a project <ArrowRight size={16} />
            </Link>
            <a
              href="#studio-services"
              className="inline-flex min-h-12 items-center justify-center border border-ink bg-transparent px-6 py-3 font-bold text-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
            >
              Explore services
            </a>
          </div>
        </div>
      </section>

      {/* 2. Interactive Service Groups with in-place expand */}
      <section
        id="studio-services"
        className="border-b border-ink/20 bg-paper px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <span className="inline-block bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
            CAPABILITIES
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.05em] text-ink">
            Three focused disciplines.
          </h2>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {studioServices.map((col) => {
              const isExpanded = Boolean(expandedSections[col.title]);
              const visibleItems = isExpanded ? col.items : col.items.slice(0, 4);
              const hasMore = col.items.length > 4;

              return (
                <article
                  key={col.title}
                  className="group relative flex h-full flex-col justify-between overflow-hidden border border-ink bg-paper p-6 transition-all duration-200 hover:-translate-y-1 sm:p-8 before:absolute before:inset-x-0 before:top-0 before:h-1 before:origin-left before:scale-x-0 before:bg-lime before:transition-transform hover:before:scale-x-100"
                >
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
                        className="mt-4 text-xs font-bold text-ink underline decoration-lime decoration-2 underline-offset-4 transition-colors hover:text-ink/70"
                        onClick={() => toggleExpand(col.title)}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? 'Show fewer' : `+ ${col.items.length - 4} more`}
                      </button>
                    )}
                  </div>

                  <div className="mt-8 border-t border-ink/10 pt-4">
                    <Link
                      to="/contact?sector=Company"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink underline decoration-lime decoration-2 underline-offset-4 transition-colors duration-150 hover:text-ink/70"
                    >
                      Book {col.title} sprint <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. 5-step process with connecting line (Navy Section) */}
      <section className="bg-ink px-5 py-16 text-paper sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">
            HOW WE WORK
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
            From concept to execution in rapid cycles.
          </h2>

          <div className="relative mt-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-6 right-6 top-8 hidden h-[1px] bg-paper/20 lg:block"
            />
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step) => (
                <li
                  key={step.number}
                  className="relative flex h-full flex-col justify-between border border-paper/30 bg-ink p-5 transition-all duration-200 hover:-translate-y-1 hover:border-lime"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-8 w-8 items-center justify-center border border-lime bg-ink font-display text-sm font-bold text-lime">
                        {step.number}
                      </span>
                      <ResolveIcon name={step.iconName} size={22} className="text-lime" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-paper">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-paper/75">
                      {step.explanation}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 4. Compact Work Carousel */}
      <Work showCallToAction={false} />

      {/* 5. Closing CTA */}
      <section className="border-t border-ink/20 bg-paper px-5 py-16 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
            WORK WITH US
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.05em] text-ink">
            Ready to build high-impact campaigns?
          </h2>
          <p className="mt-4 text-base text-ink/80">
            Tell us about your brand goals. We evaluate scope and kick off fast.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/contact?sector=Company"
              className="inline-flex min-h-12 items-center gap-2 border border-lime bg-lime px-8 py-3 font-bold text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-lime"
            >
              Start a project with Studio <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================================
   LABS PAGE
========================================================================= */
const labs = [
  {
    state: 'Building',
    title: 'ALINET',
    subtitle: 'Creative talent network',
    problem: 'Creative professionals lack a work-first identity platform.',
    idea: 'Reputation built on actual creative proof, not resumes.',
  },
  {
    state: 'Exploring',
    title: 'REVIVE',
    subtitle: 'Autonomous revenue recovery agent',
    problem: 'Failed payments and churn cost companies significantly.',
    idea: 'An AI agent that negotiates and recovers failed subscriptions autonomously.',
  },
  {
    state: 'Exploring',
    title: 'StockVision AI',
    subtitle: 'AI-powered market intelligence prototype',
    problem: 'Retail investors lack institutional-grade market synthesis.',
    idea: 'Real-time narrative extraction from earnings and news using LLMs.',
  },
];

export function Labs() {
  return (
    <PageIntro title="Labs" eyebrow="RESEARCH & EXPERIMENTS">
      <PageCopy>
        Some ideas need to exist before they become products. Documenting experiments,
        prototypes, research and lessons learned.
      </PageCopy>

      <div className="mt-8 flex flex-wrap gap-2.5" aria-label="Lab status legend">
        {['Live', 'Building', 'Exploring', 'Archived'].map((status) => (
          <span className={tagClass} key={status}>
            {status}
          </span>
        ))}
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab) => (
          <article className={cardClass} key={lab.title}>
            <span className={tagClass}>{lab.state}</span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-ink">
              {lab.title}
            </h2>
            <p className="mt-2 text-ink/80">{lab.subtitle}</p>
            <div className="mt-6 space-y-3 border-t border-ink/20 pt-5 text-sm leading-6 text-ink/80">
              <p>
                <strong className="text-ink">Problem:</strong> {lab.problem}
              </p>
              <p>
                <strong className="text-ink">Idea:</strong> {lab.idea}
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageIntro>
  );
}

/* =========================================================================
   ABOUT PAGE (UPGRADED)
========================================================================= */
export function About() {
  return (
    <>
      <PageIntro title="About Blualien" eyebrow="WHO WE ARE">
        <PageCopy>
          We're building a company for the AI-native era. AI is changing how products are
          built, how companies operate, how creative work gets produced and how people
          discover opportunities. Blualien exists to build at that intersection.
        </PageCopy>
      </PageIntro>

      {/* Four Pillars Section */}
      <section className="border-t border-ink/20 bg-paper px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <span className="inline-block bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
            THE ARCHITECTURE
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.05em] text-ink">
            Four interconnected pillars.
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillarsData.map((pillar) => (
              <article key={pillar.number} className={cardClass}>
                <span className="inline-flex h-7 w-7 items-center justify-center bg-lime font-display text-xs font-bold text-ink">
                  {pillar.number}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/75">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Flywheel Section (Ink-navy) */}
      <section className="bg-ink px-5 py-16 text-paper sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">
            ECOSYSTEM LOGIC
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
            The Blualien Flywheel.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/80 sm:text-base">
            Everything we build should feed something else. Products create equity, studio
            creates cash flow, distribution creates attention, and labs create future
            leverage.
          </p>

          <div className="mt-10 border border-paper/30 bg-ink p-6 font-display text-sm font-semibold leading-relaxed tracking-wider text-lime sm:text-base">
            BLUALIEN → PRODUCTS → PEOPLE → DISTRIBUTION → ATTENTION → STUDIO → CUSTOMERS →
            NETWORK → TALENT → PRODUCTS
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-ink/20 bg-paper px-5 py-16 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
            JOIN THE ECOSYSTEM
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.05em] text-ink">
            Build what comes next.
          </h2>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center gap-2 border border-lime bg-lime px-8 py-3 font-bold text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-lime"
            >
              Get in touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================================
   PEOPLE PAGE
========================================================================= */
export function People() {
  return (
    <PageIntro title="People" eyebrow="LEADERSHIP & TALENT">
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <article className={cardClass}>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink">
            Rushil Gara
          </h2>
          <span className={`${tagClass} mt-3`}>Founder</span>
          <p className="mt-4 leading-7 text-ink/80">
            AI • startups • technology • business. Focusing on building the core products,
            ecosystem and vision for the AI-native era.
          </p>
          <a
            className="mt-5 inline-block font-bold text-ink underline decoration-lime decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
            href="https://twitter.com/thegararushil"
            target="_blank"
            rel="noopener noreferrer"
          >
            @thegararushil →
          </a>
        </article>

        <article className={cardClass}>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink">
            [Name]
          </h2>
          <span className={`${tagClass} mt-3`}>COO</span>
          <p className="mt-4 leading-7 text-ink/80">
            Operator • Business • strategy • companies • operations. Scaling the internal
            systems and the studio business.
          </p>
        </article>

        <article className="border border-dashed border-ink p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink/70">
            Future team members
          </h2>
          <p className="mt-4 leading-7 text-ink/70">
            We're building the machine. Looking for builders in Creative, Media, Product,
            Engineering and Growth.
          </p>
          <div className="mt-6">
            <OutlineLink to="/careers">View open roles</OutlineLink>
          </div>
        </article>
      </div>
    </PageIntro>
  );
}

/* =========================================================================
   CAREERS PAGE
========================================================================= */
const roles = [
  {
    title: 'Creative',
    summary: "What you'll do: Build highly visual creative systems.",
    lookingFor: 'AI-native workflow expertise.',
    matters: 'Visuals are our advantage.',
  },
  {
    title: 'Media',
    summary: "What you'll do: Scale our distribution networks.",
    lookingFor: 'Editorial mindset + growth hacks.',
    matters: 'Distribution is leverage.',
  },
  {
    title: 'Product & Engineering',
    summary: "What you'll do: Build ALINET and future products.",
    lookingFor: 'Full-stack velocity.',
    matters: 'Products create equity.',
  },
];

export function Careers() {
  return (
    <PageIntro title="Come build with us." eyebrow="CAREERS">
      <PageCopy>
        We're early. That means you won't be joining a finished machine. You'll help build
        the machine.
      </PageCopy>

      <section className="mt-16">
        <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-semibold tracking-[-0.05em] text-ink">
          Open Roles
        </h2>
        <div className="mt-8 space-y-5">
          {roles.map((role) => (
            <article className={cardClass} key={role.title}>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-ink/80">{role.summary}</p>
                </div>
                <OutlineLink to="/contact?sector=Builder">Apply</OutlineLink>
              </div>
              <dl className="mt-6 grid gap-4 border-t border-ink/20 pt-6 text-sm leading-6 md:grid-cols-2">
                <div>
                  <dt className="font-bold text-ink">What we're looking for:</dt>
                  <dd className="text-ink/80">{role.lookingFor}</dd>
                </div>
                <div>
                  <dt className="font-bold text-ink">Why it matters:</dt>
                  <dd className="text-ink/80">{role.matters}</dd>
                </div>
                <div>
                  <dt className="font-bold text-ink">Compensation:</dt>
                  <dd className="text-ink/80">Competitive</dd>
                </div>
                <div>
                  <dt className="font-bold text-ink">Location:</dt>
                  <dd className="text-ink/80">Remote</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </PageIntro>
  );
}

/* =========================================================================
   JOURNAL PAGE
========================================================================= */
const journalEntries = [
  {
    category: 'AI & Expertise',
    title: 'Why AI makes expertise more valuable.',
    body: 'As generative AI lowers the floor for creation, the ceiling for high-quality, expert-driven taste and curation becomes the ultimate differentiator.',
  },
  {
    category: 'Product',
    title: "Why we're building ALINET.",
    body: "The current professional networks are built for resumes, not for actual creative proof. Here's why the future of work identity needs a complete rebuild.",
  },
  {
    category: 'Studio Lessons',
    title: 'What we learned trying to get our first client.',
    body: 'Positioning an AI-native company as a reliable studio partner required unlearning traditional agency sales tactics.',
  },
  {
    category: 'Technology',
    title: "Why we're not building another AI wrapper.",
    body: 'Sustainable value comes from proprietary data, unique workflows, and solving the last mile of user problems—not just wrapping an API call.',
  },
  {
    category: 'Research',
    title: 'What we learned from creative interviews.',
    body: 'After interviewing 50 top-tier creative professionals, the recurring theme was simple: discovery is broken, and portfolios are too slow.',
  },
];

export function Journal() {
  return (
    <PageIntro title="Journal" eyebrow="INSIGHTS & ESSAYS">
      <PageCopy>
        What we're thinking about. Thoughts on AI, product building, and the creative
        industry.
      </PageCopy>

      <div className="mt-12 space-y-5">
        {journalEntries.map((entry) => (
          <article className={cardClass} key={entry.title}>
            <span className={tagClass}>{entry.category}</span>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.05em] text-ink">
              {entry.title}
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-ink/80">{entry.body}</p>
            <p
              className="mt-6 inline-flex items-center gap-2 font-bold text-ink underline decoration-lime decoration-2 underline-offset-4"
              aria-hidden="true"
            >
              Read article <ArrowRight size={16} />
            </p>
          </article>
        ))}
      </div>
    </PageIntro>
  );
}

/* =========================================================================
   NOT FOUND PAGE
========================================================================= */
export function NotFound() {
  return (
    <PageIntro title="Page not found" eyebrow="404 ERROR">
      <PageCopy>The page you are looking for does not exist.</PageCopy>
      <div className="mt-10">
        <OutlineLink to="/">Back to home</OutlineLink>
      </div>
    </PageIntro>
  );
}
