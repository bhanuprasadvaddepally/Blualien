async function post(path, payload) {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const error = new Error(result.message || 'Something went wrong. Please try again.');
    error.errors = result.errors || {};
    throw error;
  }

  return result;
}

export const submitContact = (payload) => post('/api/contact', payload);
export const submitSubscription = (payload) => post('/api/subscribe', payload);
