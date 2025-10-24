const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const {
      to_admin = 'bhavikasmart15@gmail.com',
      to_customer,
      subject = 'Order / Appointment Notification',
      html,
      text
    } = req.body;

    // SMTP config via environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      res.status(500).json({ error: 'SMTP credentials not configured in environment' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    // Send admin email
    const adminResult = await transporter.sendMail({
      from: `${smtpUser}`,
      to: to_admin,
      subject,
      text: text || html?.replace(/<[^>]+>/g, '') || 'No content',
      html: html || undefined
    });

    // Optionally send customer email
    let customerResult = null;
    if (to_customer) {
      customerResult = await transporter.sendMail({
        from: `${smtpUser}`,
        to: to_customer,
        subject: `Confirmation - ${subject}`,
        text: text || html?.replace(/<[^>]+>/g, '') || 'No content',
        html: html || undefined
      });
    }

    res.status(200).json({ ok: true, adminResult, customerResult });
  } catch (err) {
    console.error('send-email error', err);
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
};