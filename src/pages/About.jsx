import React from 'react';

const About = () => {
  return (
    <div className="section pt-32">
      <div className="container">
        <h1 className="heading-xl mb-8">About</h1>
        <p className="text-lg max-w-2xl mb-12">
          We're building a company for the AI-native era. AI is changing how products are built, how companies operate, how creative work gets produced and how people discover opportunities. Blualien exists to build at that intersection.
        </p>
        
        <div className="grid-2 gap-12 mb-16">
          <div>
            <h2 className="heading-lg mb-6">Ecosystem logic</h2>
            <ul className="flex-col gap-4 text-lg">
              <li className="flex gap-4"><strong>Products</strong> &rarr; <span className="text-secondary">equity / value creation</span></li>
              <li className="flex gap-4"><strong>Studio</strong> &rarr; <span className="text-secondary">revenue / cash flow</span></li>
              <li className="flex gap-4"><strong>Distribution</strong> &rarr; <span className="text-secondary">attention</span></li>
              <li className="flex gap-4"><strong>Network</strong> &rarr; <span className="text-secondary">talent / opportunity</span></li>
              <li className="flex gap-4"><strong>Labs</strong> &rarr; <span className="text-secondary">experimentation / future products</span></li>
            </ul>
          </div>
          
          <div className="card bg-alt">
            <h2 className="heading-md mb-6">Blualien Flywheel</h2>
            <p className="text-secondary mb-6">Everything we build should feed something else.</p>
            
            <div className="flywheel text-sm leading-relaxed border-light p-6 rounded" style={{border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}}>
              BLUALIEN &rarr; PRODUCTS &rarr; PEOPLE &rarr; DISTRIBUTION &rarr; ATTENTION &rarr; STUDIO &rarr; CUSTOMERS &rarr; NETWORK &rarr; TALENT &rarr; PRODUCTS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
