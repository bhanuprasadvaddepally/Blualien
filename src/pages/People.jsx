import React from 'react';

const People = () => {
  return (
    <div className="section pt-32">
      <div className="container">
        <h1 className="heading-xl mb-12">People</h1>
        
        <div className="grid-2 gap-8 mb-16">
          <div className="card">
            <h2 className="heading-lg mb-2">Rushil Gara</h2>
            <p className="text-primary font-bold mb-4">Founder</p>
            <p className="text-secondary mb-6">
              AI • startups • technology • business. Focusing on building the core products, ecosystem and vision for the AI-native era.
            </p>
            <a href="https://twitter.com/thegararushil" className="text-primary underline">@thegararushil</a>
          </div>
          
          <div className="card">
            <h2 className="heading-lg mb-2">[Name]</h2>
            <p className="text-primary font-bold mb-4">COO</p>
            <p className="text-secondary mb-6">
              Operator • Business • strategy • companies • operations. Scaling the internal systems and the studio business.
            </p>
          </div>
          
          <div className="card border-dashed" style={{borderStyle: 'dashed'}}>
            <h2 className="heading-md mb-2 text-secondary">Future team members</h2>
            <p className="text-tertiary mb-6">
              We're building the machine. Looking for builders in Creative, Media, Product, Engineering and Growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;
