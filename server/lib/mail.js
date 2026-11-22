import { Resend } from 'resend';

function configuredMail() {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !FROM_EMAIL) return null;
  return { RESEND_API_KEY, CONTACT_TO_EMAIL, FROM_EMAIL };
}

export async function sendContactNotification(lead) {
  const config = configuredMail();
  if (!config) {
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        'Contact lead stored without an email notification: mail env vars are incomplete.',
      );
    }
    return { sent: false, skipped: true };
  }

  const resend = new Resend(config.RESEND_API_KEY);
  const text = [
    'BLUALIEN',
    'NEW CONTACT LEAD',
    '',
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company || 'Not provided'}`,
    '',
    'Message:',
    lead.message,
  ].join('\n');

  const { error } = await resend.emails.send({
    from: config.FROM_EMAIL,
    to: [config.CONTACT_TO_EMAIL],
    replyTo: lead.email,
    subject: `New BLUALIEN contact: ${lead.name}`,
    text,
  });

  if (error)
    throw new Error(error.message || 'Resend could not deliver the notification.');
  return { sent: true, skipped: false };
}
