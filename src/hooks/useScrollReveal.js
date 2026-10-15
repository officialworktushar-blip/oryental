import { useEffect, useRef } from 'react'

const STAGGER_MS = 80
const STAGGER_CAP = 6

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px', ...optionsRef.current }
    )

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            sectionObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const items = el.querySelectorAll('.reveal')
    items.forEach((item, i) => {
      item.style.transitionDelay = `${(i % STAGGER_CAP) * STAGGER_MS}ms`
      observer.observe(item)
    })

    if (el.classList.contains('reveal')) observer.observe(el)

    el.querySelectorAll('section').forEach((s) => sectionObserver.observe(s))
    if (el.tagName === 'SECTION') sectionObserver.observe(el)

    return () => {
      observer.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  return ref
}

export function useRevealOnMount() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            sectionObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const observeReveal = () => {
      const items = el.querySelectorAll('.reveal:not(.visible)')
      items.forEach((item, i) => {
        item.style.transitionDelay = `${(i % STAGGER_CAP) * STAGGER_MS}ms`
        revealObserver.observe(item)
      })
    }

    observeReveal()

    const mutationObserver = new MutationObserver(observeReveal)
    mutationObserver.observe(el, { childList: true, subtree: true })

    el.querySelectorAll('section').forEach((s) => sectionObserver.observe(s))
    if (el.tagName === 'SECTION') sectionObserver.observe(el)

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return ref
}
