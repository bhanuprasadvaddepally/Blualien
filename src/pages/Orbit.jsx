import React from 'react';

const Orbit = () => {
  return (
    <div className="section pt-32">
      <div className="container">
        <h1 className="heading-xl mb-8">Alien's Orbit</h1>
        <p className="text-lg max-w-2xl mb-12">
          The internet is full of things worth knowing. Alien's Orbit explores technology, business, startups, culture, creativity and the strange ideas shaping the future.
        </p>
        
        <div className="card mb-12 bg-alt">
          <h2 className="heading-md mb-4 text-center">Discover something you didn't know you needed to know.</h2>
        </div>
        
        <h3 className="heading-md mb-6">Categories</h3>
        <div className="flex wrap gap-4 mb-16">
          <span className="btn btn-outline border-light">AI</span>
          <span className="btn btn-outline border-light">Technology</span>
          <span className="btn btn-outline border-light">Startups</span>
          <span className="btn btn-outline border-light">Business</span>
          <span className="btn btn-outline border-light">Culture</span>
          <span className="btn btn-outline border-light">Creators</span>
          <span className="btn btn-outline border-light">Internet</span>
          <span className="btn btn-outline border-light">Future of Work</span>
        </div>
        
        <div className="border-top pt-12">
          <h2 className="heading-lg mb-8">Founder / Distribution</h2>
          <div className="grid-2 gap-8">
            <div className="card">
              <h3 className="heading-md mb-2">Rushil</h3>
              <p className="text-secondary mb-4">Founder — AI • startups • technology • business.</p>
              <a href="https://twitter.com/thegararushil" className="text-primary underline">@thegararushil</a>
            </div>
            <div className="card">
              <h3 className="heading-md mb-2">COO</h3>
              <p className="text-secondary mb-4">Operator — Business • strategy • companies • operations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orbit;
