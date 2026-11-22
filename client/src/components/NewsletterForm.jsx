import { useState } from 'react';
import { submitSubscription } from '../lib/api.js';
import { trackEvent } from '../lib/analytics.js';
import { getFieldErrors, subscribeSchema } from '../lib/validators.js';

export default function NewsletterForm() {
  const [values, setValues] = useState({ email: '', website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  function handleChange(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
    setErrors((current) => ({ ...current, [event.target.name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'loading') return;

    const parsed = subscribeSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      setMessage('Please correct the highlighted field.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMessage('');
    setErrors({});

    try {
      await submitSubscription(parsed.data);
      setValues({ email: '', website: '' });
      setStatus('success');
      setMessage('You are on the list.');
      trackEvent('newsletter_subscribe');
    } catch (error) {
      setErrors(error.errors || {});
      setStatus('error');
      setMessage(error.message);
    }
  }

  return (
    <form className="mt-6 max-w-md" onSubmit={handleSubmit} noValidate>
      <label className="text-sm font-bold text-paper" htmlFor="newsletter-email">
        Get updates from Blualien
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
          className="min-h-12 flex-1 border border-paper bg-ink px-3 text-paper placeholder:text-paper/60"
          placeholder="Email address"
          disabled={status === 'loading'}
          required
        />
        <button
          className="min-h-12 border border-lime bg-lime px-4 font-bold text-ink transition-colors hover:border-paper hover:bg-paper disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Joining…' : 'Subscribe'}
        </button>
      </div>
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="newsletter-website">Leave this field blank</label>
        <input
          id="newsletter-website"
          name="website"
          tabIndex="-1"
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>
      {errors.email ? (
        <p className="mt-2 text-sm font-semibold text-lime" id="newsletter-email-error">
          {errors.email}
        </p>
      ) : null}
      <p className="mt-2 min-h-5 text-sm text-paper" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
