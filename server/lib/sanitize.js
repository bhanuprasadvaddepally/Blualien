export function sanitizeText(value, { multiline = false } = {}) {
  if (typeof value !== 'string') return '';

  const normalized = value.normalize('NFKC').replaceAll('\0', '');
  const withoutMarkup = normalized.replace(/[<>]/g, '');

  if (multiline) {
    return withoutMarkup
      .replace(/\r\n?/g, '\n')
      .replace(/[\t\f\v ]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  return withoutMarkup.replace(/\s+/g, ' ').trim();
}

export function sanitizeEmail(value) {
  return sanitizeText(value).toLowerCase();
}

export function hasHoneypot(body = {}) {
  return Boolean(String(body.website ?? body._honeypot ?? '').trim());
}
