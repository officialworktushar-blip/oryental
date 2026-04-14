const iconMap = {
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </>
  ),
  chevronLeft: (
    <path d="m15 18-6-6 6-6" />
  ),
  chevronRight: (
    <path d="m9 18 6-6-6-6" />
  ),
  sparkles: (
    <>
      <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
      <path d="m19 15 .7 1.8L21.5 17l-1.8.7L19 19.5l-.7-1.8-1.8-.7 1.8-.7L19 15Z" />
      <path d="m5 15 .7 1.8L7.5 17l-1.8.7L5 19.5l-.7-1.8L2.5 17l1.8-.7L5 15Z" />
    </>
  ),
  brain: (
    <>
      <path d="M9.5 4.5A3.5 3.5 0 0 0 6 8v8a3 3 0 0 0 5 2.2" />
      <path d="M14.5 4.5A3.5 3.5 0 0 1 18 8v8a3 3 0 0 1-5 2.2" />
      <path d="M9 10.5h6" />
      <path d="M10 7.5h4" />
      <path d="M10 13.5h4" />
      <path d="M12 4v16" />
    </>
  ),
  zap: (
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </>
  ),
  bot: (
    <>
      <rect x="5" y="7" width="14" height="11" rx="3" />
      <path d="M12 3v4M8 12h.01M16 12h.01M9 16h6" />
    </>
  ),
  linkedin: (
    <>
      <path d="M7 9v8M7 6.5v.01M11 17v-4.5a2.5 2.5 0 0 1 5 0V17M11 9v8M16 9a3 3 0 0 1 3 3v5" />
    </>
  ),
  x: (
    <>
      <path d="M5 5 19 19M19 5 5 19" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  messageSquare: (
    <>
      <path d="M5 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9l-4 4v-7a3 3 0 0 1-3-3Z" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18h1.2a2.3 2.3 0 0 0 0-4.6H12a3 3 0 0 1 0-6h3a4 4 0 0 0 0-8h-3Z" />
      <circle cx="6.5" cy="10" r="1" />
      <circle cx="9" cy="7" r="1" />
      <circle cx="14.5" cy="7.5" r="1" />
    </>
  ),
  snail: (
    <>
      <path d="M8 16a4 4 0 1 1 8 0H8Z" />
      <path d="M6 16h12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z" />
      <path d="M8 16V9a4 4 0 1 1 8 0" />
      <path d="M16 9h3a2 2 0 0 1 0 4h-3" />
      <path d="M6 11 4.5 9.5M6 8 5 6" />
    </>
  ),
  heartCrack: (
    <>
      <path d="M12 20 5.4 13.5a4.6 4.6 0 0 1 6.5-6.5l.1.1.1-.1a4.6 4.6 0 0 1 6.5 6.5Z" />
      <path d="m12.5 7.5-1.3 3 2 1.2-1.6 4.1" />
    </>
  ),
  badgeDollar: (
    <>
      <path d="M12 2.5 14.7 5l3.7.5.5 3.7 2.6 2.8-2.6 2.8-.5 3.7-3.7.5L12 21.5 9.3 19l-3.7-.5-.5-3.7L2.5 12l2.6-2.8.5-3.7 3.7-.5L12 2.5Z" />
      <path d="M12 8v8M14.5 9.8c0-1-1.1-1.8-2.5-1.8s-2.5.8-2.5 1.8 1.1 1.8 2.5 1.8 2.5.8 2.5 1.8-1.1 1.8-2.5 1.8-2.5-.8-2.5-1.8" />
    </>
  ),
  bridge: (
    <>
      <path d="M4 18V9l4-3 4 3 4-3 4 3v9" />
      <path d="M4 14h16M8 10v8M16 10v8" />
    </>
  ),
  ghost: (
    <>
      <path d="M7 19v-7a5 5 0 1 1 10 0v7l-2-1.5L12 19l-3-1.5Z" />
      <path d="M10 11h.01M14 11h.01" />
    </>
  ),
  flask: (
    <>
      <path d="M10 3v5l-5.8 8.6A2.2 2.2 0 0 0 6 20h12a2.2 2.2 0 0 0 1.8-3.4L14 8V3" />
      <path d="M8 14h8" />
    </>
  ),
  handshake: (
    <>
      <path d="M8 12 5.5 9.5a2 2 0 0 1 0-2.8l1.2-1.2a2 2 0 0 1 2.8 0L12 8l2.5-2.5a2 2 0 0 1 2.8 0l1.2 1.2a2 2 0 0 1 0 2.8L16 12" />
      <path d="m9.5 10.5 2.5 2.5 2.5-2.5M7 14l2 2M17 14l-2 2" />
    </>
  ),
  gem: (
    <>
      <path d="m6 8 3-4h6l3 4-6 12L6 8Z" />
      <path d="M9 4 7 8h10l-2-4M12 4v16" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 2.9 7.8 7 10 4.1-2.2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9.5 12 1.7 1.7 3.3-3.4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19h16" />
      <path d="M7 15V9M12 15V5M17 15v-3" />
    </>
  ),
  languages: (
    <>
      <path d="M4 7h10M9 4c0 6-2.5 10.2-6 12" />
      <path d="M6 12c1.5 1.7 3.4 3 5.5 4" />
      <path d="M14 10h6M17 7l-3 10M20 17l-3-10" />
    </>
  ),
  fileText: (
    <>
      <path d="M8 3h6l4 4v14H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M14 3v4h4M10 12h4M10 16h6" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M12 7v5M10 13l-2.5 3M14 13l2.5 3" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 19c1.5-4 4-6 8-8 2-4 4-6.5 8-7-.5 4-3 6-7 8-2 4-4 6.5-8 7Z" />
      <path d="M9 15 5 19M14 10l4-4" />
    </>
  ),
  phone: (
    <>
      <rect x="8" y="2.5" width="8" height="19" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  apple: (
    <>
      <path d="M15.2 7.2c-.7-.9-.8-2-.4-3.2-1.3.1-2.4.8-3.1 1.8-.8-1-1.9-1.7-3.1-1.8.3 1.2.2 2.3-.5 3.2-1 1.3-1.6 2.9-1.6 4.7C6.5 17 9 20 12 20s5.5-3 5.5-8.1c0-1.8-.5-3.4-1.6-4.7Z" />
      <path d="M12 4c.2-1.2.9-2 2-2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  barChart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-7M12 20V8M17 20v-4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  users: (
    <>
      <path d="M16 19a4 4 0 0 0-8 0" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6 19a3 3 0 0 0-3-3M18 16a3 3 0 0 1 3 3M6 13a2.5 2.5 0 1 1 0-5M18 13a2.5 2.5 0 1 0 0-5" />
    </>
  ),
  star: (
    <path d="m12 3 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.2l5.9-.9L12 3Z" />
  ),
}

export default function Icon({ name, className = '', size = 20, strokeWidth = 1.8, filled = false }) {
  const glyph = iconMap[name]
  if (!glyph) return null

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph}
    </svg>
  )
}
