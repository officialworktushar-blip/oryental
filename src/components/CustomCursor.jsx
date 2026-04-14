import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      ringX: window.innerWidth / 2,
      ringY: window.innerHeight / 2,
      pressed: false,
      hovering: false,
    }

    let frameId = 0
    const interactiveSelector = 'a, button, input, textarea, select, .glass, .neu, .svc-list-item, .chip, .collab-pill'

    const render = () => {
      state.ringX += (state.x - state.ringX) * 0.18
      state.ringY += (state.y - state.ringY) * 0.18

      dot.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(${state.pressed ? 0.72 : 1})`
      ring.style.transform = `translate3d(${state.ringX}px, ${state.ringY}px, 0) translate(-50%, -50%) scale(${state.pressed ? 0.88 : 1})`
      ring.classList.toggle('ring-hover', state.hovering)

      frameId = window.requestAnimationFrame(render)
    }

    const onMove = (e) => {
      state.x = e.clientX
      state.y = e.clientY
      state.hovering = Boolean(e.target.closest(interactiveSelector))
    }

    const onDown = () => {
      state.pressed = true
    }

    const onUp = () => {
      state.pressed = false
    }

    const onLeaveWindow = () => {
      ring.classList.remove('ring-hover')
      state.hovering = false
    }

    frameId = window.requestAnimationFrame(render)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onMove)
    document.addEventListener('mouseleave', onLeaveWindow)

    return () => {
      window.cancelAnimationFrame(frameId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onMove)
      document.removeEventListener('mouseleave', onLeaveWindow)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
