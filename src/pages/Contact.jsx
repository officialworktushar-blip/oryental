import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { useRevealOnMount } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import logo from '../assets/oryntal-logo.png'
import './Contact.css'

// ─────────────────────────────────────────────────────────────
// EmailJS configuration
// 1. Sign up free at https://www.emailjs.com
// 2. Add a Gmail service  →  copy the Service ID below
// 3. Create an email template (use variables: {{from_name}}, {{from_email}},
//    {{company}}, {{service}}, {{message}})  →  copy the Template ID below
// 4. Go to Account → API Keys  →  copy your Public Key below
// ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // e.g. 'AbcDeFgHiJkLmNoP'

const CONTACT_EMAIL = 'oryntal.agency@gmail.com'

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

const COLLABS = ['TechVentures IN', 'NeuralBridge Labs', 'ScaleUp Studio', 'FutureMark Digital', 'ArcLight AI', 'GrowthStack']

const TESTIMONIALS = [
  {
    stars: 5,
    name: 'Killian',
    org: 'California, USA',
    initials: 'K',
    type: 'video',
    mediaLabel: 'Client Video Testimonial',
    flag: '🇺🇸',
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
    flag: '🇨🇳',
    src: '/testimonials/xing-ming-review.mp4',
    quote: 'Xing Ming speaks about the value, experience, and delivery quality in this short review.',
  },
  {
    stars: 5,
    name: 'Xing Ming',
    org: 'China',
    initials: 'XM',
    type: 'audio',
    mediaLabel: 'Client Audio Testimonial',
    flag: '🇨🇳',
    src: '/testimonials/xing-ming-review.mp4',
    quote: 'Hear Xing Ming’s audio testimonial on the speed, clarity, and quality of the project.',
  },
  { stars: 5, quote: 'Their AI chatbot handles 80% of our support queries automatically. The ROI was visible within the first month.', name: 'Rahul Kapoor', org: 'CEO, FinEdge Solutions', initials: 'RK' },
  { stars: 5, quote: "Our website conversion rate tripled in just 60 days. Oryntal's design approach is in a different league.", name: 'Sneha Mehta', org: 'Founder, Verdant Health', initials: 'SM' },
  { stars: 5, quote: 'The NLP pipeline was live in 6 weeks and saves us over 40 hours per month in manual processing.', name: 'Arjun Joshi', org: 'CTO, DataPulse Analytics', initials: 'AJ' },
  { stars: 5, quote: 'Average app session time went from 2 minutes to 18 minutes after Oryntal redesigned the UX.', name: 'Priya Desai', org: 'Product Lead, Nuvia App', initials: 'PD' },
  { stars: 5, quote: 'They bring an ownership mindset: responsive, quality-focused, and genuinely invested in your success.', name: 'Manish Singh', org: 'Founder, BuildWise', initials: 'MS' },
  { stars: 5, quote: 'The LLM drafts 70% of our legal documents now. We achieved full ROI in the first month of deployment.', name: 'Varun Nair', org: 'Managing Partner, LexAI Firm', initials: 'VN' },
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
  const [curSlide, setCurSlide] = useState(0)
  const [formData, setFormData] = useState({ fname: '', lname: '', email: '', company: '', service: '', message: '' })
  const [formError, setFormError] = useState('')
  const [formStatus, setFormStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const intervalRef = useRef(null)
  const navigate = useNavigate()
  const pageRef = useRevealOnMount()

  const go = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goSlide = (n) => setCurSlide((n + SLIDES.length) % SLIDES.length)

  useEffect(() => {
    intervalRef.current = setInterval(() => setCurSlide((s) => (s + 1) % SLIDES.length), 4000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }))

  const resetForm = () => {
    setFormData({ fname: '', lname: '', email: '', company: '', service: '', message: '' })
    setFormStatus('idle')
    setFormError('')
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const { fname, email, message } = formData
    if (!fname || !email || !message) {
      setFormError('Please fill in your name, email, and message.')
      return
    }
    setFormError('')
    setFormStatus('sending')

    // Check if EmailJS has been configured
    if (
      EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
    ) {
      // Fallback to mailto when EmailJS is not yet configured
      const sub  = encodeURIComponent(`New Project Inquiry from ${fname} ${formData.lname} - Oryntal`)
      const body = encodeURIComponent(
        `Name: ${fname} ${formData.lname}\nEmail: ${email}\nCompany: ${formData.company}\nService: ${formData.service}\n\nMessage:\n${message}`
      )
      window.open(`mailto:${CONTACT_EMAIL}?subject=${sub}&body=${body}`)
      setFormStatus('success')
      return
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email:  CONTACT_EMAIL,
          from_name: `${fname} ${formData.lname}`.trim(),
          from_email: email,
          company:   formData.company || 'Not provided',
          service:   formData.service || 'Not specified',
          message,
        },
        EMAILJS_PUBLIC_KEY
      )
      setFormStatus('success')
    } catch (err) {
      console.error('EmailJS error:', err)
      setFormStatus('error')
      setFormError('Something went wrong. Please email us directly at ' + CONTACT_EMAIL)
    }
  }

  return (
    <div className="contact page-enter" ref={pageRef}>
      <section className="slideshow-hero">
        <div className="slide-track" style={{ transform: `translateX(-${curSlide * 100}%)` }}>
          {SLIDES.map((slide) => (
            <div className="slide" key={slide.title}>
              <div className="blob" style={{ width: 700, height: 500, background: 'rgba(201,168,76,0.07)', top: -100, left: '30%' }} />
              <div className="slide-grid">
                <div className="slide-content">
                  <div className="tag"><span className="tag-dot" /> {slide.tag}</div>
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-body">{slide.body}</p>
                  <div className="slide-btns">
                    <button className="btn-gold" onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}>
                      Get in Touch <Icon name="arrowRight" size={16} />
                    </button>
                    <button className="btn-ghost" onClick={() => go('/services')}>View Services</button>
                  </div>
                </div>

                <div className="slide-visual">
                  <div className="slide-visual-core">
                    <img src={logo} alt="Oryntal Logo" className="slide-visual-logo logo-3d" />
                    <div className="slide-visual-grid" />
                  </div>
                  {slide.points.map((point, index) => (
                    <div className={`slide-float-point slide-float-${String.fromCharCode(97 + index)}`} key={point}>
                      <span className="slide-float-point-dot" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="slide-btn slide-prev" onClick={() => goSlide(curSlide - 1)} aria-label="Previous">
          <Icon name="chevronLeft" size={20} />
        </button>
        <button className="slide-btn slide-next" onClick={() => goSlide(curSlide + 1)} aria-label="Next">
          <Icon name="chevronRight" size={20} />
        </button>
        <div className="slide-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`sdot${curSlide === i ? ' active' : ''}`} onClick={() => goSlide(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>

      <section className="section contact-form-section" id="contact-form">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info reveal">
              <div className="tag"><span className="tag-dot" /> Let&apos;s Talk</div>
              <h2 className="section-heading">Ready to Build Something <span className="gold-text">Extraordinary?</span></h2>
              <p className="section-sub contact-intro-copy">
                Share a few details and your message will open directly to <span className="gold-text">{CONTACT_EMAIL}</span> in your email app.
              </p>
              <div className="gold-line" />
              <div className="info-cards">
                {CONTACT_INFO.map((info) => (
                  <div className="info-card glass" key={info.label}>
                    <div className="info-icon"><Icon name={info.icon} size={22} /></div>
                    <div>
                      <div className="info-label">{info.label}</div>
                      {info.href
                        ? <a className="info-value info-link" href={info.href}>{info.value}</a>
                        : <div className="info-value">{info.value}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass contact-form-card reveal">
              {formStatus === 'success' ? (
                <div className="form-success">
                  <div className="form-success-icon">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="24" r="23" stroke="#C9A84C" strokeWidth="2" />
                      <path d="M14 24l7 7 13-13" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="form-success-title">Message Sent!</h3>
                  <p className="form-success-body">
                    Thank you for reaching out. Your message has been delivered to{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="gold-text">{CONTACT_EMAIL}</a>.
                    We'll get back to you within 24 business hours.
                  </p>
                  <button className="btn-gold" style={{ marginTop: 24 }} onClick={resetForm}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-header">
                    <div className="tag"><span className="tag-dot" /> Send a Message</div>
                    <p className="form-destination">
                      Sends directly to{' '}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="gold-text">{CONTACT_EMAIL}</a>
                    </p>
                  </div>
                  <form onSubmit={submitForm} className="contact-form" noValidate>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="fname">First Name</label>
                        <input id="fname" name="fname" type="text" placeholder="Rahul" value={formData.fname} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lname">Last Name</label>
                        <input id="lname" name="lname" type="text" placeholder="Kapoor" value={formData.lname} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input id="email" name="email" type="email" placeholder="rahul@company.com" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company / Organisation</label>
                      <input id="company" name="company" type="text" placeholder="FinEdge Solutions" value={formData.company} onChange={handleChange} />
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
                      <textarea id="message" name="message" rows={5} placeholder="Describe your project, goals, and timeline..." value={formData.message} onChange={handleChange} required />
                    </div>
                    {formError && <div className="form-error">{formError}</div>}
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ width: '100%', justifyContent: 'center', opacity: formStatus === 'sending' ? 0.7 : 1 }}
                      disabled={formStatus === 'sending'}
                    >
                      {formStatus === 'sending' ? (
                        <><span className="form-spinner" /> Sending…</>
                      ) : (
                        <>Send Message <Icon name="arrowRight" size={16} /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="collabs-strip">
        <div className="collabs-label">Trusted and Collaborated With</div>
        <div className="collabs-row">
          {COLLABS.map((collab) => <div className="collab-pill" key={collab}>{collab}</div>)}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="tag" style={{ margin: '0 auto 16px' }}><span className="tag-dot" /> Client Results</div>
            <h2 className="section-heading">What Our <span className="gold-text">Clients Say</span></h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((testimonial) => (
              <div className={`glass testimonial-card reveal${testimonial.type ? ` testimonial-card-media testimonial-card-${testimonial.type}` : ''}`} key={`${testimonial.name}-${testimonial.type ?? 'quote'}`}>
                <div className="testi-stars">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Icon key={i} name="star" size={14} filled />
                  ))}
                </div>
                {testimonial.type === 'video' ? (
                  <div className="testimonial-media-shell">
                    <div className="testi-media-label">{testimonial.mediaLabel}</div>
                    <div className="testimonial-frame">
                      <div className="testimonial-flag-badge" aria-label={testimonial.org}>{testimonial.flag}</div>
                      <video className="testimonial-video" controls preload="metadata">
                        <source src={testimonial.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                ) : testimonial.type === 'audio' ? (
                  <div className="testimonial-media-shell">
                    <div className="testi-media-label">{testimonial.mediaLabel}</div>
                    <div className="testimonial-frame testimonial-audio-frame">
                      <div className="testimonial-flag-badge" aria-label={testimonial.org}>{testimonial.flag}</div>
                      <div className="testimonial-audio-content">
                        <div className="testimonial-audio-caption">Audio Playback</div>
                        <audio className="testimonial-audio" controls preload="metadata">
                          <source src={testimonial.src} type="audio/mp4" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="testi-quote-mark">"</div>
                )}
                <p className="testi-text">{testimonial.quote}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{testimonial.initials}</div>
                  <div>
                    <div className="testi-name">{testimonial.name}</div>
                    <div className="testi-org">{testimonial.org}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <div className="tag" style={{ margin: '0 auto 16px' }}><span className="tag-dot" /> Free Resources</div>
            <h2 className="section-heading">Start With <span className="gold-text">Zero Risk</span></h2>
          </div>
          <div className="cta-strip-grid">
            {CTA_CARDS.map((card) => (
              <div className="neu cta-strip-card reveal" key={card.title} onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}>
                <div className="cta-strip-icon"><Icon name={card.icon} size={28} /></div>
                <div className="cta-strip-title">{card.title}</div>
                <p className="cta-strip-text">{card.text}</p>
                <div className="cta-strip-link">Learn more <Icon name="arrowRight" size={14} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
