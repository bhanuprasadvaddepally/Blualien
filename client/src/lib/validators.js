import { z } from 'zod';

const text = (minimum, maximum) =>
  z
    .string()
    .trim()
    .min(minimum, `Must be at least ${minimum} characters.`)
    .max(maximum, `Must be ${maximum} characters or fewer.`);

export const contactSchema = z.object({
  name: text(1, 100),
  email: z.string().trim().email('Enter a valid email address.').max(254),
  company: z.string().trim().max(160, 'Must be 160 characters or fewer.'),
  message: text(10, 2000),
  website: z.string().max(0).optional(),
});

export const subscribeSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.').max(254),
  website: z.string().max(0).optional(),
});

export function getFieldErrors(error) {
  return error.issues.reduce((errors, issue) => {
    const field = issue.path[0];
    if (field && !errors[field]) errors[field] = issue.message;
    return errors;
  }, {});
}
