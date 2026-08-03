/* global process, module, require */
const nodemailer = require('nodemailer')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function readSmtpConfig() {
  const required = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    CONTACT_RECEIVER_EMAIL: process.env.CONTACT_RECEIVER_EMAIL,
  }

  const missing = Object.entries(required).filter(([, value]) => value === undefined || value === '')
  if (missing.length > 0) {
    const names = missing.map(([key]) => key).join(', ')
    throw new Error(
      `Missing required SMTP environment variable(s): ${names}. ` +
      'Set them in your Vercel project dashboard (Settings > Environment Variables).'
    )
  }

  const port = Number.parseInt(required.SMTP_PORT, 10)
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error(`Invalid SMTP_PORT "${required.SMTP_PORT}". Expected a number between 1 and 65535.`)
  }

  const secure = String(required.SMTP_SECURE).toLowerCase() === 'true'

  return {
    host: required.SMTP_HOST,
    port,
    secure,
    user: required.SMTP_USER,
    pass: required.SMTP_PASS,
    receiver: required.CONTACT_RECEIVER_EMAIL,
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: `Method ${req.method} not allowed. Use POST.` })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ ok: false, error: 'Request body is not valid JSON.' })
    }
  }

  const { name, email, message, company, service } = body ?? {}

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ ok: false, error: 'Please provide your name.' })
  }
  if (typeof email !== 'string' || !email.trim() || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' })
  }
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ ok: false, error: 'Please provide a message.' })
  }
  if (name.trim().length > 120 || email.trim().length > 254 || message.trim().length > 5000) {
    return res.status(400).json({ ok: false, error: 'One or more fields exceed the maximum length.' })
  }

  let config
  try {
    config = readSmtpConfig()
  } catch (err) {
    console.error('SMTP config error:', err.message)
    return res.status(500).json({
      ok: false,
      error: 'Server SMTP configuration is incomplete.',
      ...(process.env.NODE_ENV !== 'production' && { debug: err.message }),
    })
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  })

  const cleanName = name.trim()
  const cleanEmail = email.trim()
  const cleanCompany = typeof company === 'string' && company.trim() ? company.trim() : 'Not provided'
  const cleanService = typeof service === 'string' && service.trim() ? service.trim() : 'Not specified'
  const cleanMessage = message.trim()

  const bodyText = [
    `Name: ${cleanName}`,
    `Email: ${cleanEmail}`,
    `Company: ${cleanCompany}`,
    `Service: ${cleanService}`,
    '',
    'Message:',
    cleanMessage,
  ].join('\n')

  const bodyHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#1a1a1a">
      <h2 style="color:#C9A84C">New Contact Form Message</h2>
      <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
      <p><strong>Company:</strong> ${escapeHtml(cleanCompany)}</p>
      <p><strong>Service:</strong> ${escapeHtml(cleanService)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(cleanMessage)}</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `Oryntal Website <${config.user}>`,
      to: config.receiver,
      replyTo: cleanEmail,
      subject: `New contact message from ${cleanName}`,
      text: bodyText,
      html: bodyHtml,
    })
    return res.status(200).json({ ok: true, message: 'Your message has been sent.' })
  } catch (err) {
    console.error('SMTP send failed:', {
      message: err.message,
      code: err.code,
      response: err.response,
      command: err.command,
      host: config.host,
      port: config.port,
    })
    return res.status(502).json({
      ok: false,
      error: 'Could not send the email right now. Please try again later.',
      ...(process.env.NODE_ENV !== 'production' && { debug: err.message }),
    })
  }
}
