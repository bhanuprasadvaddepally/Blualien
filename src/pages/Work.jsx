import React from 'react';
import { ArrowRight } from 'lucide-react';

const Work = () => {
  return (
    <div className="section pt-32">
      <div className="container">
        <h1 className="heading-xl mb-12">Work / Case Studies</h1>
        
        <div className="flex-col gap-12">
          <div className="card hover-lift p-0 overflow-hidden">
            <div className="p-8">
              <h2 className="heading-lg mb-2">Drink Niro</h2>
              <p className="text-secondary mb-6">Premium Indian beverage campaign</p>
              
              <div className="grid-2 gap-4 text-sm text-tertiary mb-6">
                <div><strong className="text-primary">Problem:</strong> Standing out in a crowded market</div>
                <div><strong className="text-primary">Idea:</strong> Highly aesthetic, AI-driven visual storytelling</div>
              </div>
              
              <button className="arrow-link">View case study <ArrowRight size={16} /></button>
            </div>
          </div>
          
          <div className="card hover-lift p-0 overflow-hidden">
            <div className="p-8">
              <h2 className="heading-lg mb-2">Khet Perfumes</h2>
              <p className="text-secondary mb-6">Premium product storytelling</p>
              
              <div className="grid-2 gap-4 text-sm text-tertiary mb-6">
                <div><strong className="text-primary">Problem:</strong> Conveying scent visually</div>
                <div><strong className="text-primary">Idea:</strong> AI-generated environmental renders and moodscapes</div>
              </div>
              
              <button className="arrow-link">View case study <ArrowRight size={16} /></button>
            </div>
          </div>
          
          <div className="card hover-lift p-0 overflow-hidden">
            <div className="p-8">
              <h2 className="heading-lg mb-2">UNKNWN</h2>
              <p className="text-secondary mb-6">Fashion / product / brand creative</p>
              
              <div className="grid-2 gap-4 text-sm text-tertiary mb-6">
                <div><strong className="text-primary">Problem:</strong> Scaling high-end fashion shoots</div>
                <div><strong className="text-primary">Idea:</strong> AI model photography and creative direction</div>
              </div>
              
              <button className="arrow-link">View case study <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
