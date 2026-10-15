import { useEffect } from 'react'

/*
 * usePageMeta — per-route <title> + meta description, no external dependency.
 * Descriptions are verbatim strings from /content/content.json.
 */
const DEFAULT_DESCRIPTION =
  'Oryntal — AI & Web Agency. We build intelligence that scales. Premium AI engineering meets world-class design.'

export default function usePageMeta(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    let meta = document.querySelector('meta[name="description"]')
    let created = false
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
      created = true
    }

    const previousDescription = meta.getAttribute('content') || ''
    meta.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      if (created) meta.remove()
      else meta.setAttribute('content', previousDescription)
    }
  }, [title, description])
}
