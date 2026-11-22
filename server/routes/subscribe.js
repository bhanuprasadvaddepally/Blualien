import { Router } from 'express';
import { createSubscriber } from '../lib/db.js';
import { hasHoneypot, sanitizeEmail } from '../lib/sanitize.js';
import { subscribeSchema, zodErrors } from '../lib/validation.js';

const router = Router();

router.post('/', (req, res, next) => {
  if (hasHoneypot(req.body)) return res.status(200).json({ ok: true });

  const parsed = subscribeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, errors: zodErrors(parsed.error) });
  }

  try {
    createSubscriber({ email: sanitizeEmail(parsed.data.email), sourceIp: req.ip });
    return res.status(201).json({ ok: true });
  } catch (error) {
    return next(error);
  }
});

export default router;
