import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRevealOnMount } from '../hooks/useScrollReveal'
import usePageMeta from '../hooks/usePageMeta'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import Hl from '../components/Hl'
import ReviewForm from '../components/ReviewForm'
import { supabase } from '../lib/supabase'
import { claims, isVerified } from '../data/claims'
import logo from '../assets/oryntal-logo.png'
import './Home.css'

const SERVICES_PREVIEW = [
  {
    num: '01',
    icon: 'bot',
    title: 'AI & LLM Engineering',
    text: 'Custom large language models, NLP pipelines, and neural architectures engineered for your domain.',
  },
  {
    num: '02',
    icon: 'messageSquare',
    title: 'Chatbots & AI Agents',
    text: 'Autonomous agents handling support, sales, and ops 24/7 so your team can focus on what matters most.',
  },
  {
    num: '03',
    icon: 'palette',
    title: 'Website & App Design',
    text: 'Award-worthy UI/UX for web and mobile across Android and iOS, conversion-focused and beautifully crafted.',
  },
]

function Stars({ count }) {
  return (
    <div className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`stars__star${i < count ? ' is-filled' : ''}`} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  )
}

function getProfileUrl(item) {
  return item.linkedin || item.profile_url || '#'
}

function getPlatform(item) {
  const url = (item.linkedin || item.profile_url || '').toLowerCase()
  if (url.includes('instagram.com') || url.includes('instagr.am')) return 'instagram'
  return 'linkedin'
}

export default function Home() {
  usePageMeta('Oryntal — AI & Web Agency')
  const navigate = useNavigate()
  const pageRef = useRevealOnMount()
  const [reviews, setReviews] = useState([])
  const [showModal, setShowModal] = useState(false)

  const go = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const refreshReviews = async () => {
    if (!supabase) return
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6)
    if (error) console.error('[Reviews] Fetch error:', error)
    if (data) setReviews(data)
  }

  useEffect(() => {
    if (!supabase) return
    let active = true
    supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data, error }) => {
        if (!active) return
        if (error) console.error('[Reviews] Fetch error:', error)
        if (data) setReviews(data)
      })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!showModal) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [showModal])

  return (
    <div className="home page-enter" ref={pageRef}>
      <section className="section section--ivory hero">
        <div className="container hero__grid">
          <div className="hero__content">
            {claims.heroMeta.filter(isVerified).length > 0 && (
              <div className="eyebrow eyebrow--plain">
                {claims.heroMeta.filter(isVerified).map((item) => (
                  <span key={item.text}>{item.text}</span>
                ))}
              </div>
            )}
            <h1>
              We Build <Hl>Intelligence</Hl> That Scales
            </h1>
            <p className="lead hero__lead">
              Oryntal fuses frontier AI engineering with world-class design to deliver outcomes that matter - faster,
              smarter, and built for the long game.
            </p>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => go('/services')}>
                Explore Services <Icon name="arrowRight" size={16} />
              </button>
              <a
                href="https://oryntal-portfolio-showcase.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Check Portfolio <Icon name="arrowRight" size={16} />
              </a>
            </div>
            <p className="hero__note">AI Systems · Brand Design · Growth Outcomes</p>
          </div>

          <div className="hero__figure">
            <img
              src={logo}
              alt="Oryntal Logo"
              className="hero__logo"
              width="320"
              height="320"
            />
          </div>
        </div>
      </section>

      {claims.stats.filter(isVerified).length > 0 && (
        <section className="section section--ink stats">
          <div className="container">
            <div className="grid grid--4">
              {claims.stats.filter(isVerified).map((stat) => (
                <div className="stat reveal" key={stat.label}>
                  <div className="stat__number">{stat.value}</div>
                  <div className="stat__label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section--white">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">Client Reviews</div>
            <h2>
              What Our <Hl>Clients</Hl> Say
            </h2>
            <div className="btn-row" style={{ justifyContent: 'center', marginTop: 'var(--sp-6)' }}>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Write a Review <Icon name="arrowRight" size={16} />
              </button>
            </div>
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid--3">
              {reviews.map((item) => (
                <article className="card review-card reveal" key={item.id}>
                  <Stars count={item.rating} />
                  <p className="review-card__text">&ldquo;{item.review}&rdquo;</p>
                  <a className="review-card__author" href={getProfileUrl(item)} target="_blank" rel="noreferrer">
                    <Icon name={getPlatform(item)} size={16} />
                    <span>{item.name}</span>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <p className="lead" style={{ textAlign: 'center', marginInline: 'auto' }}>
              No reviews yet. Be the first to share your experience!
            </p>
          )}
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ReviewForm onSubmitted={refreshReviews} onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      <section className="section section--ivory">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Why Us</div>
            <h2>
              The Oryntal <Hl>Difference</Hl>
            </h2>
          </div>
          <div className="grid grid--2">
            <article className="card reveal">
              <span className="icon-badge">
                <Icon name="brain" size={22} />
              </span>
              <h3 className="card-title">AI-First Thinking</h3>
              <p className="card-text">
                Every project starts with the question: how can intelligence amplify this? We embed AI at the core, not
                as an afterthought.
              </p>
            </article>
            {isVerified(claims.speed.homeTimelines) && (
              <article className="card reveal">
                <span className="icon-badge">
                  <Icon name="zap" size={22} />
                </span>
                <h3 className="card-title">Speed Without Sacrifice</h3>
                <p className="card-text">{claims.speed.homeTimelines.text}</p>
              </article>
            )}
            <article className="card reveal">
              <span className="icon-badge">
                <Icon name="target" size={22} />
              </span>
              <h3 className="card-title">Outcome-Obsessed</h3>
              <p className="card-text">
                Built for conversion, retention, and measurable growth. If it doesn&apos;t move the needle, we don&apos;t
                build it.
              </p>
            </article>
            <article className="card reveal">
              <span className="icon-badge">
                <Icon name="globe" size={22} />
              </span>
              <h3 className="card-title">Global Reach, Human Touch</h3>
              <p className="card-text">
                Internationally-minded team with deeply personal client relationships. We speak the language of global
                business.
              </p>
            </article>
          </div>

          <div className="why__copy reveal">
            <p className="lead">
              We do not just build products - we engineer outcomes. Every engagement is driven by measurable results,
              AI-first thinking, and a relentless pursuit of excellence.
            </p>
            <p className="lead">
              Our founders come from the intersection of deep tech and business strategy, giving Oryntal a perspective
              that most agencies simply cannot replicate.
            </p>
            <button className="btn btn-secondary" onClick={() => go('/about')}>
              Our Story
            </button>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">What We Do</div>
            <h2>
              Our Core <Hl>Services</Hl>
            </h2>
            <p className="lead">
              From frontier AI models to pixel-perfect interfaces - we build the full stack of digital intelligence.
            </p>
          </div>
          <div className="grid grid--3">
            {SERVICES_PREVIEW.map((service) => (
              <article className="card reveal" key={service.num}>
                <div className="svc-preview__num">{service.num}</div>
                <span className="icon-badge">
                  <Icon name={service.icon} size={26} />
                </span>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-text">{service.text}</p>
              </article>
            ))}
          </div>
          <div className="btn-row" style={{ justifyContent: 'center', marginTop: 'var(--sp-12)' }}>
            <button className="btn btn-primary" onClick={() => go('/services')}>
              View All Services <Icon name="arrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container cta">
          <div className="eyebrow">Ready to Transform?</div>
          <h2 className="cta__title">
            Your Competitors Are Already
            <br />
            Using AI. <Hl>Are You?</Hl>
          </h2>
          <button className="btn btn-primary" onClick={() => go('/contact')}>
            Start Your Project <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
