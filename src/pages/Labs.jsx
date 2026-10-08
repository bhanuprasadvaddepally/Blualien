import React from 'react';

const Labs = () => {
  return (
    <div className="section pt-32">
      <div className="container">
        <h1 className="heading-xl mb-8">Labs</h1>
        <p className="text-lg max-w-2xl mb-12">
          Some ideas need to exist before they become products. Documenting experiments, prototypes, research and lessons learned.
        </p>
        
        <div className="flex gap-4 mb-12 wrap">
          <div className="status-badge">Live</div>
          <div className="status-badge">Building</div>
          <div className="status-badge status-exploring">Exploring</div>
          <div className="status-badge" style={{opacity: 0.5}}>Archived</div>
        </div>
        
        <div className="grid-2 gap-8 mb-16">
          <div className="card">
            <div className="status-badge mb-4">Building</div>
            <h2 className="heading-md mb-2">ALINET</h2>
            <p className="text-secondary mb-4">Creative talent network</p>
            <div className="text-sm border-top pt-4 mt-4">
              <p><strong className="text-primary">Problem:</strong> Creative professionals lack a work-first identity platform.</p>
              <p className="mt-2"><strong className="text-primary">Idea:</strong> Reputation built on actual creative proof, not resumes.</p>
            </div>
          </div>
          
          <div className="card">
            <div className="status-badge status-exploring mb-4">Exploring</div>
            <h2 className="heading-md mb-2">REVIVE</h2>
            <p className="text-secondary mb-4">Autonomous revenue recovery agent</p>
            <div className="text-sm border-top pt-4 mt-4">
              <p><strong className="text-primary">Problem:</strong> Failed payments and churn cost companies significantly.</p>
              <p className="mt-2"><strong className="text-primary">Idea:</strong> An AI agent that negotiates and recovers failed subscriptions autonomously.</p>
            </div>
          </div>
          
          <div className="card">
            <div className="status-badge status-exploring mb-4">Exploring</div>
            <h2 className="heading-md mb-2">StockVision AI</h2>
            <p className="text-secondary mb-4">AI-powered market intelligence prototype</p>
            <div className="text-sm border-top pt-4 mt-4">
              <p><strong className="text-primary">Problem:</strong> Retail investors lack institutional-grade market synthesis.</p>
              <p className="mt-2"><strong className="text-primary">Idea:</strong> Real-time narrative extraction from earnings and news using LLMs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labs;
