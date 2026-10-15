import { useCallback, useEffect, useRef, useState } from 'react'
import './Intro.css'

const STORAGE_KEY = 'oryntal-intro-seen'
const HOLD_MS = 2800
const LEAVE_MS = 600

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function shouldPlay() {
  if (prefersReducedMotion()) return false
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== '1'
  } catch {
    return true
  }
}

/*
 * Intro — full-screen ink overlay, pure CSS/SVG, once per session.
 * Renders on top of already-painted content so it does not affect LCP.
 * Skipped instantly under prefers-reduced-motion.
 */
export default function Intro() {
  const [active, setActive] = useState(shouldPlay)
  const [leaving, setLeaving] = useState(false)
  const skipRef = useRef(null)

  const markSeen = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* sessionStorage unavailable — intro simply plays each load */
    }
  }, [])

  const dismiss = useCallback(() => {
    markSeen()
    setLeaving(true)
  }, [markSeen])

  useEffect(() => {
    if (!active) return
    markSeen()
    skipRef.current?.focus()
    const timer = setTimeout(() => setLeaving(true), HOLD_MS)
    return () => clearTimeout(timer)
  }, [active, markSeen])

  useEffect(() => {
    if (!leaving) return
    const timer = setTimeout(() => setActive(false), LEAVE_MS)
    return () => clearTimeout(timer)
  }, [leaving])

  if (!active) return null

  return (
    <div className={`intro${leaving ? ' is-leaving' : ''}`} role="dialog" aria-label="Oryntal intro">
      <button ref={skipRef} type="button" className="intro__skip" onClick={dismiss}>
        Skip
      </button>

      <div className="intro__stage" aria-hidden="true">
        <svg className="intro__mark" viewBox="0 0 120 120" width="120" height="120" focusable="false">
          <circle className="intro__circle" cx="60" cy="60" r="46" />
          <g className="intro__globe">
            <ellipse cx="60" cy="60" rx="46" ry="17" />
            <ellipse cx="60" cy="60" rx="17" ry="46" />
            <line x1="14" y1="60" x2="106" y2="60" />
          </g>
        </svg>

        <div className="intro__word">ORYNTAL</div>
        <div className="intro__line" />
      </div>
    </div>
  )
}
