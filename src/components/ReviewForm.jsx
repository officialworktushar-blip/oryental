import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { supabase } from '../lib/supabase'
import Icon from './Icon'
import './ReviewForm.css'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const emailjsConfigured = EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY

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

    if (emailjsConfigured) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            to_email: 'support.oryntal@agency.org.in',
            from_name: name.trim(),
            subject: 'New Review Submitted',
            review_text: review.trim(),
            rating,
            profile_url: profileUrl.trim(),
          },
          EMAILJS_PUBLIC_KEY
        )
      } catch (err) {
        console.error('EmailJS notification failed (review):', err)
      }
    }

    if (onSubmitted) onSubmitted()
  }

  if (success) {
    return (
      <div className="review-success card" role="status" aria-live="polite">
        <span className="review-success__icon">
          <Icon name="checkCircle" size={32} />
        </span>
        <h3>Thank you!</h3>
        <p className="card-text">Your review has been submitted successfully.</p>
        <div className="btn-row" style={{ marginTop: 'var(--sp-4)' }}>
          <button className="btn btn-secondary" onClick={() => setSuccess(false)}>
            Write Another
          </button>
          {onClose && (
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <form className="review-form card" onSubmit={handleSubmit}>
      <div className="review-form__header">
        <h3>Write a Review</h3>
        {onClose && (
          <button type="button" className="review-form__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        )}
      </div>

      <div className="review-form__field">
        <label htmlFor="review-name">Your Name</label>
        <input
          id="review-name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="review-form__field">
        <label htmlFor="review-url">LinkedIn or Instagram URL *</label>
        <div className="review-form__url">
          {platform && (
            <span className="review-form__platform">
              <Icon name={platform} size={16} />
            </span>
          )}
          <input
            id="review-url"
            type="url"
            placeholder="https://www.linkedin.com/in/yourprofile/"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="review-form__field">
        <label htmlFor="review-text">Your Review</label>
        <textarea
          id="review-text"
          rows={4}
          placeholder="Share your experience working with Oryntal..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>

      <div className="review-form__field">
        <span className="review-form__label" id="review-rating-label">Rating</span>
        <div className="review-form__stars" role="group" aria-labelledby="review-rating-label">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={`review-form__star${star <= rating ? ' is-active' : ''}`}
              onClick={() => setRating(star)}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
              aria-pressed={star <= rating}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="review-form__error" role="alert" aria-live="polite">
          {error}
        </div>
      )}

      <button className="btn btn-primary review-form__submit" type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}
