import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  return (
    <div className="section pt-32">
      <div className="container">
        <h1 className="heading-xl mb-8">Come build with us.</h1>
        <p className="text-lg max-w-2xl mb-12">
          We're early. That means you won't be joining a finished machine. You'll help build the machine.
        </p>
        
        <h2 className="heading-lg mb-8">Open Roles</h2>
        
        <div className="flex-col gap-6 mb-16">
          <div className="card hover-lift">
            <div className="flex justify-between items-center wrap gap-4">
              <div>
                <h3 className="heading-md mb-2">Creative</h3>
                <p className="text-secondary">What you'll do: Build highly visual creative systems.</p>
              </div>
              <Link to="/contact" className="btn btn-outline">Apply <ArrowRight size={16} className="ml-2" /></Link>
            </div>
            <div className="grid-2 gap-4 mt-6 pt-6 border-top text-sm">
              <div><strong className="text-primary">What we're looking for:</strong> AI-native workflow expertise.</div>
              <div><strong className="text-primary">Why it matters:</strong> Visuals are our advantage.</div>
              <div><strong className="text-primary">Compensation:</strong> Competitive</div>
              <div><strong className="text-primary">Location:</strong> Remote</div>
            </div>
          </div>
          
          <div className="card hover-lift">
            <div className="flex justify-between items-center wrap gap-4">
              <div>
                <h3 className="heading-md mb-2">Media</h3>
                <p className="text-secondary">What you'll do: Scale our distribution networks.</p>
              </div>
              <Link to="/contact" className="btn btn-outline">Apply <ArrowRight size={16} className="ml-2" /></Link>
            </div>
            <div className="grid-2 gap-4 mt-6 pt-6 border-top text-sm">
              <div><strong className="text-primary">What we're looking for:</strong> Editorial mindset + growth hacks.</div>
              <div><strong className="text-primary">Why it matters:</strong> Distribution is leverage.</div>
              <div><strong className="text-primary">Compensation:</strong> Competitive</div>
              <div><strong className="text-primary">Location:</strong> Remote</div>
            </div>
          </div>
          
          <div className="card hover-lift">
            <div className="flex justify-between items-center wrap gap-4">
              <div>
                <h3 className="heading-md mb-2">Product & Engineering</h3>
                <p className="text-secondary">What you'll do: Build ALINET and future products.</p>
              </div>
              <Link to="/contact" className="btn btn-outline">Apply <ArrowRight size={16} className="ml-2" /></Link>
            </div>
            <div className="grid-2 gap-4 mt-6 pt-6 border-top text-sm">
              <div><strong className="text-primary">What we're looking for:</strong> Full-stack velocity.</div>
              <div><strong className="text-primary">Why it matters:</strong> Products create equity.</div>
              <div><strong className="text-primary">Compensation:</strong> Competitive</div>
              <div><strong className="text-primary">Location:</strong> Remote</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
