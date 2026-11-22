import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Work from '../components/Work.jsx';

const caseStudies = [
  {
    title: 'Drink Niro',
    subtitle: 'Premium Indian beverage campaign',
    problem: 'Standing out in a crowded market',
    idea: 'Highly aesthetic, AI-driven visual storytelling',
  },
  {
    title: 'Khet Perfumes',
    subtitle: 'Premium product storytelling',
    problem: 'Conveying scent visually',
    idea: 'AI-generated environmental renders and moodscapes',
  },
  {
    title: 'UNKNWN',
    subtitle: 'Fashion / product / brand creative',
    problem: 'Scaling high-end fashion shoots',
    idea: 'AI model photography and creative direction',
  },
];

export default function WorkPage() {
  return (
    <>
      <Seo title="Work | BLUALIEN" />
      <section className="border-b border-ink/20 bg-paper px-5 pb-16 pt-12 sm:px-8 sm:pt-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <span className="inline-block bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
            Case Studies
          </span>
          <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-ink">
            Work that gets brands noticed.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg">
            A curated selection of campaigns, brand creative, and digital productions
            engineered with AI velocity and human creative direction.
          </p>

          <div className="mt-12 space-y-6">
            {caseStudies.map((study) => (
              <article
                className="group relative overflow-hidden border border-ink bg-paper p-6 transition-all duration-200 hover:-translate-y-1 sm:p-8 before:absolute before:inset-x-0 before:top-0 before:h-1 before:origin-left before:scale-x-0 before:bg-lime before:transition-transform hover:before:scale-x-100"
                key={study.title}
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
                  <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.05em] text-ink group-hover:underline">
                    {study.title}
                  </h2>
                  <span className="bg-lime px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-ink">
                    {study.subtitle}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 border-t border-ink/20 pt-5 text-sm leading-relaxed text-ink/80 md:grid-cols-2">
                  <p>
                    <strong className="text-ink">Problem:</strong> {study.problem}
                  </p>
                  <p>
                    <strong className="text-ink">Idea:</strong> {study.idea}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
                  <Link
                    to="/contact?sector=Company"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink underline decoration-lime decoration-2 underline-offset-4 transition-colors duration-150 hover:text-ink/70"
                  >
                    Discuss a project like this{' '}
                    <ArrowRight
                      aria-hidden="true"
                      size={14}
                      className="transition-transform duration-150 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Gallery / Video Carousel */}
      <Work showCallToAction={true} />
    </>
  );
}
