import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Icon from './Icon'
import './ReviewForm.css'

function detectPlatform(url) {
  const lower = url.toLowerCase()
  if (lower.includes('linkedin.com')) return 'linkedin'
  if (lower.includes('instagram.com') || lower.includes('instagr.am')) return 'instagram'
  return null
}

export default function ReviewForm({ onSubmitted, onClose }) {
  const [name, setName] = useState('')
  const [profileUrl, setProfileUrl] = useState('')
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const platform = detectPlatform(profileUrl)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !profileUrl.trim() || !review.trim()) {
      setError('All fields are required.')
      return
    }

    if (!platform) {
      setError('Please enter a valid LinkedIn or Instagram profile URL.')
      return
    }

    setLoading(true)

    if (!supabase) {
      setLoading(false)
      setError('Reviews are not configured yet.')
      return
    }

    const { error: insertError } = await supabase.from('reviews').insert({
      name: name.trim(),
      linkedin: profileUrl.trim(),
      review: review.trim(),
      rating,
    })

    setLoading(false)

    if (insertError) {
      console.error('Review submit failed:', insertError.message, '| Code:', insertError.code, '| Details:', insertError.details)
      setError(`Submission failed: ${insertError.message}`)
      return
    }

    setSuccess(true)
    setName('')
    setProfileUrl('')
    setReview('')
    setRating(5)
    if (onSubmitted) onSubmitted()
  }

  if (success) {
    return (
      <div className="review-success glass">
        <Icon name="checkCircle" size={32} />
        <h3>Thank you!</h3>
        <p>Your review has been submitted successfully.</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button className="btn-ghost" onClick={() => setSuccess(false)}>Write Another</button>
          {onClose && <button className="btn-gold" onClick={onClose}>Close</button>}
        </div>
      </div>
    )
  }

  return (
    <form className="review-form glass" onSubmit={handleSubmit}>
      <div className="review-form-header">
        <h3 className="review-form-title">Write a Review</h3>
        {onClose && (
          <button type="button" className="review-form-close" onClick={onClose}>✕</button>
        )}
      </div>

      <div className="review-form-row">
        <div className="review-field">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="review-field">
          <label>LinkedIn or Instagram URL *</label>
          <div className="review-url-input-wrap">
            {platform && (
              <span className="review-platform-icon">
                <Icon name={platform} size={16} />
              </span>
            )}
            <input
              type="url"
              placeholder="https://www.linkedin.com/in/yourprofile/"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="review-field">
        <label>Your Review</label>
        <textarea
          rows={4}
          placeholder="Share your experience working with Oryntal..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>

      <div className="review-field">
        <label>Rating</label>
        <div className="review-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={`review-star ${star <= rating ? 'active' : ''}`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {error && <div className="review-error">{error}</div>}

      <button className="btn-gold" type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Review'} {!loading && <Icon name="arrowRight" size={16} />}
      </button>
    </form>
  )
}
