import React from 'react';

const Products = () => {
  return (
    <div className="section pt-32">
      <div className="container">
        <h1 className="heading-xl mb-8">Products</h1>
        <p className="text-lg max-w-2xl mb-12">
          We build products for the world we're moving toward.
        </p>
        
        <div className="grid-2 gap-8">
          <div className="card">
            <h2 className="heading-md mb-2">ALINET</h2>
            <div className="status-badge mb-4">Building</div>
            <p className="text-secondary mb-4">The professional network for creative talent.</p>
            <p className="text-secondary">Work-first professional identity and reputation built around actual creative proof.</p>
          </div>
          
          <div className="card">
            <h2 className="heading-md mb-2">Speqr</h2>
            <div className="status-badge status-exploring mb-4">Exploring / Parked</div>
            <p className="text-secondary mb-4">AI-native product intelligence for product teams.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
