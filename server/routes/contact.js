import { Router } from 'express';
import { createLead } from '../lib/db.js';
import { sendContactNotification } from '../lib/mail.js';
import { hasHoneypot, sanitizeEmail, sanitizeText } from '../lib/sanitize.js';
import { contactSchema, zodErrors } from '../lib/validation.js';

const router = Router();

router.post('/', async (req, res, next) => {
  if (hasHoneypot(req.body)) return res.status(200).json({ ok: true });

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, errors: zodErrors(parsed.error) });
  }

  const lead = {
    name: sanitizeText(parsed.data.name),
    email: sanitizeEmail(parsed.data.email),
    company: sanitizeText(parsed.data.company || ''),
    message: sanitizeText(parsed.data.message, { multiline: true }),
    sourceIp: req.ip,
  };

  try {
    createLead(lead);
  } catch (error) {
    return next(error);
  }

  try {
    await sendContactNotification(lead);
  } catch (error) {
    // The submission has safely persisted. Returning success avoids a visitor
    // retrying and creating an accidental duplicate when only delivery failed.
    console.error('Contact notification failed:', error.message);
  }

  return res.status(201).json({ ok: true });
});

export default router;
