import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSector = queryParams.get('sector') || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sector: initialSector,
    message: '',
    _honeypot: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, sent, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading' || status === 'sent' || status === 'success') return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errText = 'Failed to send transmission';
        try {
          const errData = await response.json();
          if (errData && errData.message) {
            errText = errData.message;
          }
        } catch (_e) {
          if (response.status === 404) {
            errText = 'API endpoint not found. Ensure you are using the Vercel server.';
          }
        }
        throw new Error(errText);
      }

      setStatus('sent');
      
      // Show "Transmission Sent ✓" briefly, then transition to full success state
      setTimeout(() => {
        setStatus('success');
        // Clear form ONLY after success per requirements
        setFormData({ name: '', email: '', sector: '', message: '', _honeypot: '' });
      }, 1500);

    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setStatus('error');
    }
  };

  let buttonText = 'Send \u2192';
  if (status === 'loading') buttonText = 'Connecting...';
  if (status === 'sent') buttonText = 'Transmission Sent \u2713';

  return (
    <div className="section pt-32">
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 className="heading-xl mb-12 text-center">Let's talk</h1>

        <div className="card p-8" style={{ color: '#ffff', backgroundColor: '#05050a', border: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative', overflow: 'hidden' }}>
          
          {status === 'success' ? (
            <div className="flex-col gap-6" style={{ alignItems: 'center', textAlign: 'center', padding: '2rem 0' }}>
              <div className="hero-blue-motion" style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '1rem', position: 'relative', background: '#1a5fff', boxShadow: '0 0 40px #1a5fff', animation: 'pulse 2s infinite ease-in-out' }}></div>
              <h2 className="text-xl font-bold mb-2">TRANSMISSION RECEIVED.</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                Your message has reached BLUALIEN.<br />
                We'll be in touch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-col gap-6">
              {status === 'error' && (
                <div style={{ backgroundColor: 'rgba(255, 50, 50, 0.1)', border: '1px solid rgba(255, 50, 50, 0.3)', padding: '1rem', borderRadius: '6px', textAlign: 'center', color: '#ff6b6b' }}>
                  <h3 className="font-bold mb-1">TRANSMISSION FAILED.</h3>
                  <p className="text-sm">{errorMsg || 'Something went wrong. Please try again.'}</p>
                </div>
              )}

              {/* Honeypot Spam Protection */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="_honeypot">Leave this field blank</label>
                <input
                  type="text"
                  id="_honeypot"
                  name="_honeypot"
                  value={formData._honeypot}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <div className="flex-col gap-2">
                <label htmlFor="name" className="text-sm font-bold">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  disabled={status === 'loading' || status === 'sent'}
                  className="input-field"
                />
              </div>

              <div className="flex-col gap-2">
                <label htmlFor="email" className="text-sm font-bold">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  disabled={status === 'loading' || status === 'sent'}
                  className="input-field"
                />
              </div>

              <div className="flex-col gap-2">
                <label htmlFor="sector" className="text-sm font-bold">Sector</label>
                <input
                  type="text"
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  maxLength={100}
                  disabled={status === 'loading' || status === 'sent'}
                  className="input-field"
                  placeholder="E.g. Company, Creator, Builder, etc."
                />
              </div>

              <div className="flex-col gap-2">
                <label htmlFor="message" className="text-sm font-bold">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={10000}
                  disabled={status === 'loading' || status === 'sent'}
                  className="input-field"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary mt-4" 
                disabled={status === 'loading' || status === 'sent'}
                style={{ width: '100%', justifyContent: 'center', opacity: (status === 'loading' || status === 'sent') ? 0.7 : 1 }}
              >
                {buttonText}
              </button>
            </form>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .input-field {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem 1rem;
          color: #fff;
          border-radius: 6px;
          font-family: inherit;
          transition: all var(--transition-fast);
        }
        .input-field:focus {
          outline: none;
          border-color: #1a5fff;
          box-shadow: 0 0 0 2px rgba(0, 76, 255, 0.42);
          background: rgba(255, 255, 255, 0.08);
        }
        .input-field:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .input-field::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(26, 95, 255, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(26, 95, 255, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(26, 95, 255, 0); }
        }
      `}} />
    </div>
  );
};

export default Contact;
