import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics.js';
import { submitContact } from '../lib/api.js';
import { contactSchema, getFieldErrors } from '../lib/validators.js';

const fieldClass =
  'mt-2 min-h-12 w-full border border-ink bg-paper px-3.5 py-2.5 text-ink placeholder:text-ink/40 transition-colors duration-150 focus:border-ink focus:outline-none focus:ring-2 focus:ring-lime disabled:cursor-not-allowed disabled:opacity-60';

export default function ContactForm({ initialCompany = '' }) {
  const nameRef = useRef(null);
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: initialCompany,
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (initialCompany) {
      setValues((prev) => ({ ...prev, company: initialCompany }));
    }
  }, [initialCompany]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'loading') return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      setMessage('Please correct the highlighted fields.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMessage('');
    setErrors({});

    try {
      await submitContact(parsed.data);
      setValues({ name: '', email: '', company: '', message: '', website: '' });
      setStatus('success');
      setMessage("Your message has reached BLUALIEN. We'll be in touch.");
      trackEvent('contact_submit');
    } catch (error) {
      setErrors(error.errors || {});
      setStatus('error');
      setMessage(error.message);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {/* Honeypot field */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field blank</label>
        <input
          id="contact-website"
          name="website"
          tabIndex="-1"
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="text-sm font-bold text-ink" htmlFor="contact-name">
          Name{' '}
          <span className="font-bold text-ink" aria-hidden="true">
            *
          </span>
        </label>
        <input
          ref={nameRef}
          className={fieldClass}
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={values.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          disabled={status === 'loading'}
          required
        />
        {errors.name && (
          <p className="mt-1.5 text-xs font-bold text-red-600" id="contact-name-error">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-bold text-ink" htmlFor="contact-email">
          Email{' '}
          <span className="font-bold text-ink" aria-hidden="true">
            *
          </span>
        </label>
        <input
          className={fieldClass}
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={values.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          disabled={status === 'loading'}
          required
        />
        {errors.email && (
          <p className="mt-1.5 text-xs font-bold text-red-600" id="contact-email-error">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-bold text-ink" htmlFor="contact-company">
          I am a / Company{' '}
          <span className="text-xs font-normal text-ink/60">(optional)</span>
        </label>
        <input
          className={fieldClass}
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="e.g. Brand, Creator, Builder, Partner, or Company name"
          value={values.company}
          onChange={handleChange}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? 'contact-company-error' : undefined}
          disabled={status === 'loading'}
        />
        {errors.company && (
          <p className="mt-1.5 text-xs font-bold text-red-600" id="contact-company-error">
            {errors.company}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-bold text-ink" htmlFor="contact-message">
          Message{' '}
          <span className="font-bold text-ink" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          className={`${fieldClass} min-h-32 py-3`}
          id="contact-message"
          name="message"
          rows="4"
          placeholder="Tell us what you're looking to build or achieve..."
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          disabled={status === 'loading'}
          required
        />
        {errors.message && (
          <p className="mt-1.5 text-xs font-bold text-red-600" id="contact-message-error">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'success' && (
        <div
          className="border border-ink bg-lime p-4 text-ink transition-all duration-200"
          role="status"
          aria-live="polite"
        >
          <p className="font-display text-sm font-bold uppercase tracking-wider">
            TRANSMISSION RECEIVED.
          </p>
          <p className="mt-1 text-xs leading-relaxed font-medium">{message}</p>
        </div>
      )}

      {status === 'error' && message && (
        <div
          className="border border-ink bg-paper p-4 text-xs font-semibold text-red-600"
          role="alert"
        >
          {message}
        </div>
      )}

      <button
        className="inline-flex min-h-12 w-full items-center justify-center border border-lime bg-lime px-6 py-3 font-bold text-ink transition-all duration-150 hover:border-ink hover:bg-ink hover:text-lime active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Connecting…' : 'Send transmission →'}
      </button>
    </form>
  );
}
