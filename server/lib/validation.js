import { z } from 'zod';

const emptyToUndefined = (value) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
};

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.').max(100, 'Name is too long.'),
  email: z
    .string()
    .trim()
    .email('Enter a valid email address.')
    .max(254, 'Email is too long.'),
  company: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(160, 'Company is too long.').optional(),
  ),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message must be 2,000 characters or fewer.'),
});

export const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Enter a valid email address.')
    .max(254, 'Email is too long.'),
});

export function zodErrors(error) {
  return error.issues.reduce((errors, issue) => {
    const field = issue.path[0] || 'form';
    if (!errors[field]) errors[field] = issue.message;
    return errors;
  }, {});
}
