import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
require('dotenv').config();
// Load .env for local development (SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT)
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple request logger for debugging
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// Health check endpoint
app.get('/ping', (req, res) => {
  res.json({ ok: true, now: new Date().toISOString(), port: process.env.PORT || 3001 });
});

// Test SMTP and send a single test email for debugging
app.post('/test-send', async (req, res) => {
  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) return res.status(400).json({ error: 'SMTP_USER or SMTP_PASS not set' });

    const testTransport = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
      logger: true,
      debug: true
    });

    // verify connection configuration
    await testTransport.verify();

    const info = await testTransport.sendMail({
      from: smtpUser,
      to: smtpUser,
      subject: 'SMTP Test from local server',
      text: 'This is a test message from your local dev server.'
    });

    const preview = nodemailer.getTestMessageUrl(info) || null;
    res.json({ ok: true, info: { accepted: info.accepted, rejected: info.rejected, response: info.response }, preview });
  } catch (err) {
    console.error('Test send error', err);
    // return concise error to client for debugging (do not return credentials)
    res.status(500).json({ error: 'Test send failed', message: err && err.message ? err.message : String(err) });
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    const {
      to_admin = 'bhavikasmart15@gmail.com',
      to_customer,
      subject = 'Order / Appointment Notification',
      html,
      text
    } = req.body;

    // For local dev, allow specifying SMTP via environment or fall back to a Nodemailer test account (Ethereal)
    let transporter;
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_PASS;

    if (smtpUser && smtpPass) {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass }
      });
    } else {
      // No SMTP creds -> create a test account so developer can preview messages at a test URL
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: { user: testAccount.user, pass: testAccount.pass }
      });
      console.warn('No SMTP credentials provided. Using Nodemailer test account. Emails will not be delivered to real inboxes. Preview URL is returned in the response.');
    }

    const adminResult = await transporter.sendMail({
      from: smtpUser || 'no-reply@example.com',
      to: to_admin,
      subject,
      text: text || (html ? html.replace(/<[^>]+>/g, '') : 'No content'),
      html: html || undefined
    });

    let customerResult = null;
    if (to_customer) {
      customerResult = await transporter.sendMail({
        from: smtpUser,
        to: to_customer,
        subject: `Confirmation - ${subject}`,
        text: text || (html ? html.replace(/<[^>]+>/g, '') : 'No content'),
        html: html || undefined
      });
    }

    // If using test account, include preview URLs
    const result = { ok: true, adminResult, customerResult };
    try {
      const adminPreview = nodemailer.getTestMessageUrl(adminResult);
      if (adminPreview) result.adminPreview = adminPreview;
      if (customerResult) {
        const customerPreview = nodemailer.getTestMessageUrl(customerResult);
        if (customerPreview) result.customerPreview = customerPreview;
      }
    } catch (e) {
      // ignore
    }
    res.json(result);
  } catch (err) {
    console.error('Local send-email error', err);
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Local email server listening on port ${port}`));
