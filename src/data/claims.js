/*
 * claims.js — single registry of every claim that may need owner confirmation.
 *
 * RULE: components render a claim ONLY when `verified === true`.
 * Default is `true`; flip to `false` to hide a claim without editing copy.
 * All strings are verbatim from /content/content.json.
 */

export const isVerified = (item) => Boolean(item && item.verified === true)

export const claims = {
  /* Home — stats strip */
  stats: [
    { value: '417+', label: 'Projects Delivered', verified: true },
    { value: '98%', label: 'Client Satisfaction', verified: true },
    { value: '12+', label: 'Industries Served', verified: true },
    { value: '24/7', label: 'Support Availability', verified: true },
  ],

  /* Home — hero meta tags */
  heroMeta: [
    { text: 'EST 2024', verified: true },
    { text: 'AI/Web Agency', verified: true },
    { text: 'GST Registered', verified: true },
  ],

  /* Speed / performance claims */
  speed: {
    homeTimelines: {
      text: 'AI-enhanced workflows cut timelines by up to 60%.',
      verified: true,
    },
    servicesDelivery: {
      title: 'AI-Accelerated Delivery',
      text: '60% faster delivery using AI-enhanced development workflows.',
      verified: true,
    },
  },

  /* Security claim */
  security: {
    title: 'Enterprise Security',
    text: 'SOC2-aligned practices, private deployments, and complete data privacy.',
    verified: true,
  },

  /* Founder experience claim */
  founderExperience: {
    tushar: {
      text: '10+ years of entrepreneurship across tech and business',
      verified: true,
    },
  },

  /* Collaborators strip — names may need owner confirmation */
  collaborators: [
    { name: 'TechVentures IN', verified: true },
    { name: 'NeuralBridge Labs', verified: true },
    { name: 'ScaleUp Studio', verified: true },
    { name: 'FutureMark Digital', verified: true },
    { name: 'ArcLight AI', verified: true },
    { name: 'GrowthStack', verified: true },
  ],

  /* Text testimonials (media testimonials are handled separately) */
  textTestimonials: [
    {
      stars: 5,
      quote:
        'Their AI chatbot handles 80% of our support queries automatically. The ROI was visible within the first month.',
      name: 'Rahul Kapoor',
      org: 'CEO, FinEdge Solutions',
      initials: 'RK',
      verified: true,
    },
    {
      stars: 5,
      quote:
        "Our website conversion rate tripled in just 60 days. Oryntal's design approach is in a different league.",
      name: 'Sneha Mehta',
      org: 'Founder, Verdant Health',
      initials: 'SM',
      verified: true,
    },
    {
      stars: 5,
      quote:
        'The NLP pipeline was live in 6 weeks and saves us over 40 hours per month in manual processing.',
      name: 'Arjun Joshi',
      org: 'CTO, DataPulse Analytics',
      initials: 'AJ',
      verified: true,
    },
    {
      stars: 5,
      quote:
        'Average app session time went from 2 minutes to 18 minutes after Oryntal redesigned the UX.',
      name: 'Priya Desai',
      org: 'Product Lead, Nuvia App',
      initials: 'PD',
      verified: true,
    },
    {
      stars: 5,
      quote:
        'They bring an ownership mindset: responsive, quality-focused, and genuinely invested in your success.',
      name: 'Manish Singh',
      org: 'Founder, BuildWise',
      initials: 'MS',
      verified: true,
    },
    {
      stars: 5,
      quote:
        'The LLM drafts 70% of our legal documents now. We achieved full ROI in the first month of deployment.',
      name: 'Varun Nair',
      org: 'Managing Partner, LexAI Firm',
      initials: 'VN',
      verified: true,
    },
  ],
}

export default claims
