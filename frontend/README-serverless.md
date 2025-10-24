Serverless Email Endpoint (api/send-email.js)

What this does
- Provides a serverless endpoint at /api/send-email that accepts POST requests with JSON payload:
  {
    to_admin: 'admin@example.com',
    to_customer: 'customer@example.com',
    subject: 'Subject',
    html: '<p>HTML body</p>',
    text: 'Plain text body'
  }
- Uses Nodemailer and SMTP credentials configured via environment variables to send emails.

Environment variables (set these in your deployment platform, e.g. Vercel):
- SMTP_HOST (e.g. smtp.gmail.com)
- SMTP_PORT (e.g. 587)
- SMTP_USER (your SMTP username, e.g. your Gmail address)
- SMTP_PASS (your SMTP password or app-specific password)

Deployment notes (Vercel)
1. Ensure your project is a git repo and push to GitHub.
2. Create a new Vercel project and point to this repo.
3. In Vercel dashboard, open Project Settings -> Environment Variables and add the SMTP_* variables.
4. Deploy. The serverless function will be available at https://<your-deployment>/api/send-email

Local testing
- For local developer testing, you can use a local SMTP test server like MailHog or a real SMTP account with an app password.
- Alternatively, use "nodemailer" with Ethereal email for development (example not included here).

Security
- Keep SMTP credentials secret. Do not commit them to the repo.
- For production, verify Razorpay payments server-side before sending official invoices.

If you want, I can also add a small serverless verification endpoint for Razorpay signature verification and record keeping.