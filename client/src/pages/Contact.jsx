import { Building2, Handshake, Sparkles, Terminal } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ContactForm from '../components/ContactForm.jsx';
import Seo from '../components/Seo.jsx';
import { audienceCards } from '../data/audiences.js';

const audienceIcons = {
  Building2,
  Sparkles,
  Terminal,
  Handshake,
};

export default function Contact() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSector, setSelectedSector] = useState(searchParams.get('sector') || '');

  function handleSelectSector(sector) {
    setSelectedSector(sector);
    setSearchParams({ sector });
  }

  return (
    <>
      <Seo title="Contact | BLUALIEN" />
      <section
        id="contact"
        className="border-b border-ink/20 bg-paper px-5 pb-20 pt-10 sm:px-8 sm:pt-14 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          {/* 2-Column Responsive Layout */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Heading, Audience Selector Cards & Direct Channels */}
            <div className="flex flex-col justify-start lg:col-span-5">
              <div>
                <span className="inline-block bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
                  Let&apos;s talk
                </span>
                <h1 className="mt-4 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[0.92] tracking-[-0.06em] text-ink">
                  Have something worth building?
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-ink/80 sm:text-base">
                  Tell us what you want to build. We review every project and respond with
                  concrete creative and technical directions within 24 hours.
                </p>
              </div>

              {/* Audience Selector Cards */}
              <div className="mt-8 border-t border-ink/15 pt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-ink/70">
                  Select your profile to pre-fill:
                </p>
                <div className="mt-3.5 grid grid-cols-2 gap-3">
                  {audienceCards.map((card) => {
                    const IconComponent = audienceIcons[card.iconName] || Sparkles;
                    const isSelected =
                      selectedSector.toLowerCase() === card.sector.toLowerCase();

                    return (
                      <button
                        key={card.sector}
                        type="button"
                        onClick={() => handleSelectSector(card.sector)}
                        className={`group relative flex flex-col justify-between overflow-hidden border p-3.5 text-left transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink ${
                          isSelected
                            ? 'border-ink bg-lime/10 ring-2 ring-lime before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-lime'
                            : 'border-ink/25 bg-paper hover:border-ink hover:bg-ink/5'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-ink/60">
                            {card.number}
                          </span>
                          <IconComponent
                            size={16}
                            className={isSelected ? 'text-ink font-bold' : 'text-ink/75'}
                          />
                        </div>
                        <div className="mt-3">
                          <span className="block font-display text-sm font-bold text-ink">
                            {card.title}
                          </span>
                          <span className="mt-0.5 block text-[0.65rem] text-ink/65 leading-tight">
                            {card.subtitle}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct Info Box */}
              <div className="mt-8 border border-ink/20 bg-paper p-4 text-xs">
                <p className="font-bold text-ink">Direct communications:</p>
                <p className="mt-1 text-ink/75">
                  General inquiries:{' '}
                  <a
                    href="mailto:contact@blualien.com"
                    className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-2"
                  >
                    contact@blualien.com
                  </a>
                </p>
                <p className="mt-1 text-ink/60">
                  Typical response time: Under 24 hours on business days.
                </p>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="border border-ink bg-paper p-6 sm:p-10 shadow-sm">
                <div className="mb-6 border-b border-ink/15 pb-4">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                    Project Brief
                  </h2>
                  <p className="mt-1 text-xs text-ink/70">
                    Fields marked with * are required. No spam, ever.
                  </p>
                </div>
                <ContactForm initialCompany={selectedSector} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternating Navy Section: Process & Commitment */}
      <section className="bg-ink px-5 py-14 text-paper sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">
            WHAT HAPPENS NEXT
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="border border-paper/20 p-5">
              <span className="font-display text-xl font-bold text-lime">01</span>
              <h3 className="mt-2 font-display text-lg font-bold text-paper">
                Direct Evaluation
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-paper/75">
                Our creative directors and engineering leads review your requirements and
                scope feasibility.
              </p>
            </div>
            <div className="border border-paper/20 p-5">
              <span className="font-display text-xl font-bold text-lime">02</span>
              <h3 className="mt-2 font-display text-lg font-bold text-paper">
                Alignment & Plan
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-paper/75">
                We present a tailored approach with concrete deliverables, AI velocity
                workflows, and milestone timelines.
              </p>
            </div>
            <div className="border border-paper/20 p-5">
              <span className="font-display text-xl font-bold text-lime">03</span>
              <h3 className="mt-2 font-display text-lg font-bold text-paper">
                Sprint Execution
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-paper/75">
                Work begins immediately with continuous updates, transparent assets, and
                high production standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
