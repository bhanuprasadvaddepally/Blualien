import React from 'react';
import { ArrowRight } from 'lucide-react';

const Journal = () => {
  return (
    <div className="section pt-32">
      <div className="container">
        <h1 className="heading-xl mb-4">Journal</h1>
        <p className="text-lg max-w-2xl mb-12">
          What we're thinking about. Thoughts on AI, product building, and the creative industry.
        </p>
        
        <div className="flex-col gap-8">
          <article className="card hover-lift p-0 overflow-hidden">
            <div className="p-8">
              <span className="text-xs text-secondary uppercase tracking-widest font-bold mb-2 block">AI & Expertise</span>
              <h2 className="heading-lg mb-4">Why AI makes expertise more valuable.</h2>
              <p className="text-secondary mb-6">As generative AI lowers the floor for creation, the ceiling for high-quality, expert-driven taste and curation becomes the ultimate differentiator.</p>
              <button className="arrow-link">Read article <ArrowRight size={16} /></button>
            </div>
          </article>

          <article className="card hover-lift p-0 overflow-hidden">
            <div className="p-8">
              <span className="text-xs text-secondary uppercase tracking-widest font-bold mb-2 block">Product</span>
              <h2 className="heading-lg mb-4">Why we're building ALINET.</h2>
              <p className="text-secondary mb-6">The current professional networks are built for resumes, not for actual creative proof. Here's why the future of work identity needs a complete rebuild.</p>
              <button className="arrow-link">Read article <ArrowRight size={16} /></button>
            </div>
          </article>

          <article className="card hover-lift p-0 overflow-hidden">
            <div className="p-8">
              <span className="text-xs text-secondary uppercase tracking-widest font-bold mb-2 block">Studio Lessons</span>
              <h2 className="heading-lg mb-4">What we learned trying to get our first client.</h2>
              <p className="text-secondary mb-6">Positioning an AI-native company as a reliable studio partner required unlearning traditional agency sales tactics.</p>
              <button className="arrow-link">Read article <ArrowRight size={16} /></button>
            </div>
          </article>

          <article className="card hover-lift p-0 overflow-hidden">
            <div className="p-8">
              <span className="text-xs text-secondary uppercase tracking-widest font-bold mb-2 block">Technology</span>
              <h2 className="heading-lg mb-4">Why we're not building another AI wrapper.</h2>
              <p className="text-secondary mb-6">Sustainable value comes from proprietary data, unique workflows, and solving the last mile of user problems—not just wrapping an API call.</p>
              <button className="arrow-link">Read article <ArrowRight size={16} /></button>
            </div>
          </article>
          
          <article className="card hover-lift p-0 overflow-hidden">
            <div className="p-8">
              <span className="text-xs text-secondary uppercase tracking-widest font-bold mb-2 block">Research</span>
              <h2 className="heading-lg mb-4">What we learned from creative interviews.</h2>
              <p className="text-secondary mb-6">After interviewing 50 top-tier creative professionals, the recurring theme was simple: discovery is broken, and portfolios are too slow.</p>
              <button className="arrow-link">Read article <ArrowRight size={16} /></button>
            </div>
          </article>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .tracking-widest { letter-spacing: 0.1em; }
        .block { display: block; }
        .p-8 { padding: 2rem; }
        .p-0 { padding: 0; }
        .overflow-hidden { overflow: hidden; }
      `}} />
    </div>
  );
};

export default Journal;
