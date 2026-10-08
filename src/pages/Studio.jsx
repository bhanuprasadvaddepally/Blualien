import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Studio = () => {
  return (
    <div className="section pt-32">
      <div className="container">
        <h1 className="heading-xl mb-8">Studio</h1>
        <p className="text-lg max-w-2xl mb-12">
          AI-native creative systems for ambitious companies. We combine creative direction, storytelling, technology and AI to help companies create better content, campaigns and digital experiences faster.
        </p>
        
        <div className="grid-3 gap-8 mb-16">
          <div className="card">
            <h3 className="heading-md mb-4">Creative</h3>
            <ul className="flex-col gap-2 text-secondary">
              <li>AI Product Photography</li>
              <li>AI Model Photography</li>
              <li>Story-driven Video</li>
              <li>Creative Direction</li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="heading-md mb-4">Growth</h3>
            <ul className="flex-col gap-2 text-secondary">
              <li>Social Media</li>
              <li>Instagram as a Service</li>
              <li>LinkedIn Marketing</li>
              <li>Performance Marketing</li>
              <li>Email Campaigns</li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="heading-md mb-4">Digital</h3>
            <ul className="flex-col gap-2 text-secondary">
              <li>Websites</li>
              <li>Web Apps</li>
              <li>Branding</li>
            </ul>
          </div>
        </div>
        
        <h2 className="heading-lg mb-8">Why Blualien?</h2>
        <p className="text-lg mb-8">AI is the infrastructure. Creativity is the advantage.</p>
        <div className="grid-3 gap-8 mb-12">
          <div className="card">
            <h4 className="font-bold mb-2">Think first</h4>
            <p className="text-secondary">Creative direction before generation.</p>
          </div>
          <div className="card">
            <h4 className="font-bold mb-2">Build faster</h4>
            <p className="text-secondary">AI-native workflows reduce production friction.</p>
          </div>
          <div className="card">
            <h4 className="font-bold mb-2">Make it matter</h4>
            <p className="text-secondary">Output must communicate, sell, entertain or build a brand.</p>
          </div>
        </div>

        <Link to="/work" className="btn btn-outline">View our case studies <ArrowRight size={16} className="ml-2" /></Link>
      </div>
    </div>
  );
};

export default Studio;
