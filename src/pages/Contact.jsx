import { useState } from 'react'
import { useRevealOnMount } from '../hooks/useScrollReveal'
import usePageMeta from '../hooks/usePageMeta'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import Hl from '../components/Hl'
import { claims, isVerified } from '../data/claims'
import './Contact.css'

const CONTACT_EMAIL = 'support.oryntal@agency.org.in'

const SLIDES = [
  {
    tag: 'Work With Us',
    title: 'Transform Your Business with Intelligent AI',
    body: 'Stop watching competitors pull ahead. Oryntal deploys AI that generates real, quantifiable returns instead of proofs of concept.',
    points: ['AI strategy mapping', 'Automation-led growth', 'Measurable deployment wins'],
  },
  {
    tag: 'Design Excellence',
    title: 'Websites and Apps That Convert and Captivate',
    body: 'First impressions are permanent. We craft digital experiences so sophisticated they become a competitive moat for your brand.',
    points: ['Premium interface systems', 'Conversion-focused journeys', 'Responsive product polish'],
  },
  {
    tag: 'Your Growth Partner',
    title: 'More Than an Agency, a Strategic Partner',
    body: 'We do not disappear after launch. We stay, optimize, and scale with you as your business grows and the market evolves.',
    points: ['Long-term optimization', 'Fast strategic support', 'Scale-ready execution'],
  },
]

const MEDIA_TESTIMONIALS = [
  {
    stars: 5,
    name: 'Killian',
    org: 'California, USA',
    initials: 'K',
    type: 'video',
    mediaLabel: 'Client Video Testimonial',
    src: '/testimonials/killian-review.mp4',
    quote: 'Killian shares his experience working with Oryntal in this client video testimonial.',
  },
  {
    stars: 5,
    name: 'Xing Ming',
    org: 'China',
    initials: 'XM',
    type: 'video',
    mediaLabel: 'Client Video Testimonial',
    src: '/testimonials/xing-ming-review.mp4',
    quote: 'Xing Ming speaks about the value, experience, and delivery quality in this short review.',
  },
]

const CTA_CARDS = [
  { icon: 'phone', title: 'Free Discovery Call', text: '30 minutes, no commitment. Walk away with a clear AI strategy for your business.' },
  { icon: 'search', title: 'Free Digital Audit', text: 'We review your digital presence and identify your biggest growth opportunities.' },
  { icon: 'barChart', title: 'AI Feasibility Report', text: 'Map out exactly what is possible with AI and what it will cost for your use case.' },
  { icon: 'handshake', title: 'Partnership Program', text: 'Agencies can join the Oryntal Partner Network and deliver AI at scale.' },
]

const CONTACT_INFO = [
  { icon: 'mail', label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: 'mapPin', label: 'Location', value: 'India • Remote-First • Global Reach' },
  { icon: 'clock', label: 'Response Time', value: 'Within 24 business hours' },
  { icon: 'globe', label: 'Serving', value: 'Clients Worldwide • 12+ Industries' },
]

export default function Contact() {
  usePageMeta('Contact — Oryntal', "Share a few details and we'll get back to you within 24 business hours.")
  const [formData, setFormData] = useState({ fname: '', lname: '', email: '', company: '', service: '', message: '' })
  const [formError, setFormError] = useState('')
  const [formStatus, setFormStatus] = useState('idle')
  const pageRef = useRevealOnMount()

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }))

  const resetForm = () => {
    setFormData({ fname: '', lname: '', email: '', company: '', service: '', message: '' })
    setFormStatus('idle')
    setFormError('')
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const { fname, email, message } = formData
    if (!fname.trim() || !email.trim() || !message.trim()) {
      setFormError('Please fill in your name, email, and message.')
      return
    }
    setFormError('')
    setFormStatus('sending')

    let responseData = null

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${fname} ${formData.lname}`.trim(),
          email: email.trim(),
          company: formData.company || 'Not provided',
          service: formData.service || 'Not specified',
          message: message.trim(),
        }),
      })

      responseData = await res.json().catch(() => null)

      if (!res.ok || !responseData?.ok) {
        throw new Error(responseData?.error || `Request failed with status ${res.status}`)
      }

      setFormStatus('success')
    } catch (err) {
      console.error('Contact submit failed. Full error:', err)
      if (responseData) {
        console.error('Contact submit failed. API response body:', responseData)
      }
      setFormStatus('error')
      setFormError(err.message || 'Something went wrong. Please email us directly at ' + CONTACT_EMAIL)
    }
  }

  const collaborators = claims.collaborators.filter(isVerified)
  const textTestimonials = claims.textTestimonials.filter(isVerified)

  return (
    <div className="contact page-enter" ref={pageRef}>
      <section className="section section--ivory">
        <div className="container">
          <div className="grid grid--3 contact-intro">
            {SLIDES.map((slide) => (
              <article className="contact-intro__block reveal" key={slide.title}>
                <div className="eyebrow">{slide.tag}</div>
                <h2 className="contact-intro__title">{slide.title}</h2>
                <p className="card-text">{slide.body}</p>
                <ul className="contact-intro__points">
                  {slide.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white" id="contact-form">
        <div className="container contact-grid">
          <div className="contact-info reveal">
            <div className="eyebrow">Let&apos;s Talk</div>
            <h2>
              Ready to Build Something <Hl>Extraordinary?</Hl>
            </h2>
            <p className="lead">Share a few details and we&apos;ll get back to you within 24 business hours.</p>
            <ul className="info-cards">
              {CONTACT_INFO.map((info) => (
                <li className="card info-card" key={info.label}>
                  <span className="info-card__icon">
                    <Icon name={info.icon} size={20} />
                  </span>
                  <div>
                    <div className="info-card__label">{info.label}</div>
                    {info.href ? (
                      <a className="info-card__value info-card__link" href={info.href}>
                        {info.value}
                      </a>
                    ) : (
                      <div className="info-card__value">{info.value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card contact-form-card reveal">
            {formStatus === 'success' ? (
              <div className="form-success">
                <span className="form-success__icon">
                  <Icon name="checkCircle" size={40} />
                </span>
                <h3>Message Sent!</h3>
                <p className="card-text">
                  Thank you for reaching out. Your message has been delivered to{' '}
                  <strong>{CONTACT_EMAIL}</strong>. We&apos;ll get back to you within 24 business hours.
                </p>
                <button className="btn btn-primary" style={{ marginTop: 'var(--sp-6)' }} onClick={resetForm}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="eyebrow">Send a Message</div>
                <p className="form-destination">
                  Delivered to <strong>{CONTACT_EMAIL}</strong>
                </p>
                <form onSubmit={submitForm} className="contact-form" noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fname">First Name</label>
                      <input
                        id="fname"
                        name="fname"
                        type="text"
                        placeholder="Rahul"
                        value={formData.fname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lname">Last Name</label>
                      <input
                        id="lname"
                        name="lname"
                        type="text"
                        placeholder="Kapoor"
                        value={formData.lname}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="rahul@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company / Organisation</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="FinEdge Solutions"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">Service Interested In</label>
                    <select id="service" name="service" value={formData.service} onChange={handleChange}>
                      <option value="">Select a service...</option>
                      <option>AI LLM Models</option>
                      <option>NLP Pipelines</option>
                      <option>Neural AI Architectures</option>
                      <option>Chatbots and AI Agents</option>
                      <option>Website Design</option>
                      <option>App Design iOS and Android</option>
                      <option>Full Package</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Tell Us About Your Project</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Describe your project, goals, and timeline..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {formError && (
                    <div className="form-error" role="alert">
                      {formError}
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary form-submit" disabled={formStatus === 'sending'}>
                    {formStatus === 'sending' ? 'Sending…' : (
                      <>
                        Send Message <Icon name="arrowRight" size={16} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {collaborators.length > 0 && (
        <section className="section section--ink collabs">
          <div className="container">
            <div className="eyebrow">Trusted and Collaborated With</div>
            <ul className="collabs__row">
              {collaborators.map((collab) => (
                <li className="collab-pill" key={collab.name}>
                  {collab.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section section--ivory">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">Client Results</div>
            <h2>
              What Our <Hl>Clients</Hl> Say
            </h2>
          </div>
          <div className="grid grid--3">
            {MEDIA_TESTIMONIALS.map((t) => (
              <article className="card testimonial reveal" key={`${t.name}-${t.src}`}>
                <div className="eyebrow">{t.mediaLabel}</div>
                {/* TODO: add real poster frames and WebVTT captions (<track kind="captions" src="..." srclang="en" label="English" />) for each testimonial video */}
                <video
                  className="testimonial__video"
                  controls
                  preload="none"
                  poster="/oryntal-logo.png"
                  width="640"
                  height="360"
                  aria-label={`${t.name} client video testimonial`}
                >
                  <source src={t.src} type="video/mp4" />
                </video>
                <p className="card-text testimonial__quote">{t.quote}</p>
                <div className="testimonial__author">
                  <span className="testimonial__avatar" aria-hidden="true">
                    {t.initials}
                  </span>
                  <div>
                    <div className="testimonial__name">{t.name}</div>
                    <div className="testimonial__org">{t.org}</div>
                  </div>
                </div>
              </article>
            ))}

            {textTestimonials.map((t) => (
              <article className="card testimonial reveal" key={t.name}>
                <div className="stars" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }, (_, i) => (
                    <span key={i} className="stars__star is-filled" aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
                <p className="card-text testimonial__quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testimonial__author">
                  <span className="testimonial__avatar" aria-hidden="true">
                    {t.initials}
                  </span>
                  <div>
                    <div className="testimonial__name">{t.name}</div>
                    <div className="testimonial__org">{t.org}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">Free Resources</div>
            <h2>
              Start With <Hl>Zero Risk</Hl>
            </h2>
          </div>
          <div className="grid grid--4">
            {CTA_CARDS.map((card) => (
              <article className="card reveal" key={card.title}>
                <span className="icon-badge">
                  <Icon name={card.icon} size={24} />
                </span>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-text">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
