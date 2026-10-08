import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Verify Environment Variables
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ message: 'Server Configuration Error: RESEND_API_KEY is missing.' });
  }
  if (!process.env.CONTACT_EMAIL) {
    return res.status(500).json({ message: 'Server Configuration Error: CONTACT_EMAIL is missing.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, email, sector, message, _honeypot } = req.body;

  // Spam Protection (Honeypot)
  if (_honeypot) {
    // Silently drop spam but return success to avoid signaling spammer
    return res.status(200).json({ message: 'Transmission received' });
  }

  // Server-Side Validation
  if (!name || typeof name !== 'string' || name.trim() === '' || name.length > 100) {
    return res.status(400).json({ message: 'Invalid name' });
  }

  if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email) || email.length > 200) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  if (!message || typeof message !== 'string' || message.trim() === '' || message.length > 10000) {
    return res.status(400).json({ message: 'Invalid message' });
  }

  // Sanitize Inputs
  const cleanName = name.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cleanEmail = email.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cleanSector = (sector || 'N/A').toString().trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cleanMessage = message.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const dateStr = new Date().toLocaleString('en-US', { timeZoneName: 'short' });

  const textBody = `━━━━━━━━━━━━━━━━━━━━━━━━

BLUALIEN
NEW CONTACT TRANSMISSION

━━━━━━━━━━━━━━━━━━━━━━━━

NAME
${cleanName}

EMAIL
${cleanEmail}

SECTOR
${cleanSector}

MESSAGE
${cleanMessage}

━━━━━━━━━━━━━━━━━━━━━━━━

SUBMITTED
${dateStr}

━━━━━━━━━━━━━━━━━━━━━━━━

BLUALIEN
Contact Form`;

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.CONTACT_EMAIL;

    const { error } = await resend.emails.send({
      from: `BLUALIEN System <${fromEmail}>`,
      to: [toEmail],
      subject: `New BLUALIEN Contact — ${cleanName}`,
      text: textBody,
      replyTo: cleanEmail,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({ message: `Email service error: ${error.message || 'Unknown Resend error'}` });
    }

    return res.status(200).json({ message: 'Transmission received' });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
}
