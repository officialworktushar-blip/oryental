/* global process */
import express from 'express'
import nodemailer from 'nodemailer'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(express.json())

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

app.post('/api/contact', async (req, res) => {
  const { name, email, message, company, service } = req.body ?? {}

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

  const host = process.env.SMTP_HOST
  const port = Number.parseInt(process.env.SMTP_PORT, 10)
  const secure = String(process.env.SMTP_SECURE).toLowerCase() === 'true'
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const receiver = process.env.CONTACT_RECEIVER_EMAIL

  if (!host || !port || !user || !pass || !receiver) {
    return res.status(500).json({ ok: false, error: 'Server SMTP configuration is incomplete.' })
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
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
      from: `Oryntal Website <${user}>`,
      to: receiver,
      replyTo: cleanEmail,
      subject: `New contact message from ${cleanName}`,
      text: bodyText,
      html: bodyHtml,
    })
    return res.status(200).json({ ok: true, message: 'Your message has been sent.' })
  } catch (err) {
    console.error('SMTP send failed:', err)
    return res.status(502).json({ ok: false, error: 'Could not send the email right now. Please try again later.' })
  }
})

const distPath = path.join(__dirname, '..', 'dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'))
    }
    next()
  })
}

const PORT = Number.parseInt(process.env.PORT, 10) || 3001
app.listen(PORT, () => {
  console.log(`Oryntal server listening on http://localhost:${PORT}`)
})
