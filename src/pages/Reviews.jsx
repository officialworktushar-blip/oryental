import { useState, useEffect, useRef } from 'react'
import { useRevealOnMount } from '../hooks/useScrollReveal'
import usePageMeta from '../hooks/usePageMeta'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import Hl from '../components/Hl'
import ReviewForm from '../components/ReviewForm'
import { supabase } from '../lib/supabase'
import './Reviews.css'

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

export default function Reviews() {
  usePageMeta(
    'Reviews — Oryntal',
    "Real experiences from real people. Every review is linked to the reviewer's social profile for full transparency."
  )
  const pageRef = useRevealOnMount()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const dialogRef = useRef(null)

  const refreshReviews = async () => {
    if (!supabase) return
    const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })
    if (error) console.error('[Reviews] Fetch error:', error)
    if (data) setReviews(data)
  }

  useEffect(() => {
    if (!supabase) {
      return
    }
    let active = true
    supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return
        if (error) console.error('[Reviews] Fetch error:', error)
        if (data) setReviews(data)
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!showModal) return
    const previouslyFocused = document.activeElement
    document.body.style.overflow = 'hidden'

    const node = dialogRef.current
    const getFocusable = () =>
      node ? Array.from(node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')) : []

    const focusable = getFocusable()
    if (focusable.length) focusable[0].focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false)
        return
      }
      if (e.key !== 'Tab') return
      const items = getFocusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        focusable[focusable.length - 1].focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        focusable[0].focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus()
    }
  }, [showModal])

  return (
    <div className="reviews-page page-enter" ref={pageRef}>
      <section className="section section--ink reviews-hero">
        <div className="container section-head section-head--center">
          <div className="eyebrow">Testimonials</div>
          <h1>
            What Our <Hl>Clients</Hl> Say
          </h1>
          <p className="lead">
            Real experiences from real people. Every review is linked to the reviewer&apos;s social profile for full
            transparency.
          </p>
          <div className="btn-row" style={{ justifyContent: 'center', marginTop: 'var(--sp-8)' }}>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Write a Review <Icon name="arrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">All Reviews</div>
            <h2>
              Verified <Hl>Client</Hl> Feedback
            </h2>
          </div>

          {loading ? (
            <p className="lead" role="status" aria-live="polite" style={{ textAlign: 'center', marginInline: 'auto' }}>
              Loading reviews...
            </p>
          ) : reviews.length > 0 ? (
            <div className="grid grid--3">
              {reviews.map((item) => (
                <article className="card review-card-full reveal" key={item.id}>
                  <div className="review-card-full__head">
                    <Stars count={item.rating} />
                    <time className="review-card-full__date" dateTime={item.created_at}>
                      {new Date(item.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                  <p className="review-card-full__text">&ldquo;{item.review}&rdquo;</p>
                  <a className="review-card__author" href={getProfileUrl(item)} target="_blank" rel="noreferrer">
                    <Icon name={getPlatform(item)} size={18} />
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
          <div
            ref={dialogRef}
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-label="Write a Review"
            onClick={(e) => e.stopPropagation()}
          >
            <ReviewForm onSubmitted={refreshReviews} onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
