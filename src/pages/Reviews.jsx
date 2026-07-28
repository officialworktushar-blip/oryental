import { useState, useEffect } from 'react'
import { useRevealOnMount } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import ReviewForm from '../components/ReviewForm'
import { supabase } from '../lib/supabase'
import './Reviews.css'

function renderStars(count) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={`review-star-display ${i < count ? 'filled' : ''}`}>★</span>
  ))
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
  const pageRef = useRevealOnMount()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const fetchReviews = async () => {
    setLoading(true)
    if (!supabase) { setLoading(false); return }
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error('[Reviews] Fetch error:', error)
    if (data) setReviews(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showModal])

  return (
    <div className="reviews-page page-enter" ref={pageRef}>
      <section className="reviews-hero">
        <div className="blob" style={{ width: 600, height: 600, background: 'rgba(201,168,76,0.07)', top: -200, right: -150 }} />
        <div className="blob" style={{ width: 400, height: 400, background: 'rgba(13,18,48,0.8)', bottom: -100, left: -100 }} />
        <div className="reviews-hero-content">
          <div className="tag"><span className="tag-dot" /> Testimonials</div>
          <h1>What Our <span className="gold-text">Clients</span> Say</h1>
          <p className="section-sub">Real experiences from real people. Every review is linked to the reviewer&apos;s social profile for full transparency.</p>
          <div style={{ marginTop: 28 }}>
            <button className="btn-gold" onClick={() => setShowModal(true)}>
              Write a Review <Icon name="arrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="tag" style={{ margin: '0 auto 16px' }}><span className="tag-dot" /> All Reviews</div>
            <h2 className="section-heading">Verified <span className="gold-text">Client</span> Feedback</h2>
          </div>
          {loading ? (
            <p className="section-sub" style={{ textAlign: 'center' }}>Loading reviews...</p>
          ) : reviews.length > 0 ? (
            <div className="reviews-full-grid">
              {reviews.map((item) => (
                <div className="glass review-card-full reveal" key={item.id}>
                  <div className="review-card-header">
                    <div className="review-stars-display">{renderStars(item.rating)}</div>
                    <div className="review-date">
                      {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <p className="review-text-full">&ldquo;{item.review}&rdquo;</p>
                  <div className="review-author-full">
                    <a className="review-link-full" href={getProfileUrl(item)} target="_blank" rel="noreferrer">
                      <Icon name={getPlatform(item)} size={18} />
                      <span>{item.name}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="section-sub" style={{ textAlign: 'center' }}>No reviews yet. Be the first to share your experience!</p>
          )}
        </div>
      </section>

      {showModal && (
        <div className="review-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
            <ReviewForm onSubmitted={fetchReviews} onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
