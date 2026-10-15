import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRevealOnMount } from '../hooks/useScrollReveal'
import usePageMeta from '../hooks/usePageMeta'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import Hl from '../components/Hl'
import { claims, isVerified } from '../data/claims'
import './Services.css'

const SERVICES = [
  {
    num: '01',
    tag: 'AI Vertical',
    title: 'Custom LLM Models',
    desc: 'We build domain-specific large language models fine-tuned on your proprietary data, running privately, securely, and improving continuously with usage.',
    features: [
      { icon: 'shield', text: 'Private, secure deployments on-prem or in the cloud' },
      { icon: 'chart', text: 'Models that improve continuously with usage data' },
      { icon: 'languages', text: 'Multilingual capabilities for cross-market deployment' },
      { icon: 'target', text: 'Domain-specific fine-tuning on your proprietary data' },
    ],
  },
  {
    num: '02',
    tag: 'AI Vertical',
    title: 'NLP Pipelines',
    desc: 'Enterprise-scale natural language processing pipelines from automated document extraction to real-time sentiment analysis and entity recognition.',
    features: [
      { icon: 'fileText', text: 'Automated document processing and data extraction' },
      { icon: 'brain', text: 'Sentiment analysis, entity recognition, and topic modeling' },
      { icon: 'zap', text: 'Real-time processing at enterprise scale' },
      { icon: 'network', text: 'Seamless integration with your existing data stack' },
    ],
  },
  {
    num: '03',
    tag: 'AI Vertical',
    title: 'Neural AI Architectures',
    desc: 'Custom neural network architectures designed for computer vision, predictive analytics, recommendation systems, and anomaly detection at production scale.',
    features: [
      { icon: 'eye', text: 'Computer vision and image recognition systems' },
      { icon: 'target', text: 'Recommendation engines and ranking systems' },
      { icon: 'search', text: 'Anomaly detection and predictive analytics' },
      { icon: 'rocket', text: 'Production-optimized with low-latency inference' },
    ],
  },
  {
    num: '04',
    tag: 'AI Vertical',
    title: 'Chatbots and AI Agents',
    desc: 'Autonomous conversational agents equipped with memory, context, and deep integrations, handling support, sales, and ops 24/7 without interruption.',
    features: [
      { icon: 'messageSquare', text: 'Multi-turn AI with persistent memory and context' },
      { icon: 'network', text: 'Deep integration with CRM, helpdesk, and databases' },
      { icon: 'phone', text: 'Voice-capable agents for phone and IVR systems' },
      { icon: 'bot', text: 'Autonomous task execution and workflow automation' },
    ],
  },
  {
    num: '05',
    tag: 'Design Vertical',
    title: 'Website Design',
    desc: 'Award-worthy web experiences built for conversion. Bespoke UI/UX, pixel-perfect responsiveness, and performance-optimized code built to score high on Core Web Vitals.',
    features: [
      { icon: 'sparkles', text: 'Bespoke UI and UX tailored to your brand identity' },
      { icon: 'phone', text: 'Fully responsive across all devices and screen sizes' },
      { icon: 'rocket', text: 'Performance-minded builds with Core Web Vitals in focus' },
      { icon: 'barChart', text: 'Conversion-focused layouts backed by UX research' },
    ],
  },
  {
    num: '06',
    tag: 'Design Vertical',
    title: 'App Design for iOS and Android',
    desc: 'Native-quality mobile experiences following Apple HIG and Material Design 3, with interactive prototypes, user testing, and a relentless focus on engagement.',
    features: [
      { icon: 'apple', text: 'iOS interfaces aligned with Human Interface Guidelines' },
      { icon: 'bot', text: 'Material Design 3 thinking for Android excellence' },
      { icon: 'palette', text: 'Interactive prototypes before development starts' },
      { icon: 'flask', text: 'UX research, user testing, and conversion optimization' },
    ],
  },
]

const PROCESS = [
  { num: '01', title: 'Discovery', text: 'Deep dive into your goals, market landscape, and technical environment.' },
  { num: '02', title: 'Strategy', text: 'Architecture design and outcome roadmap with clear, measurable milestones.' },
  { num: '03', title: 'Build', text: 'Agile development sprints with weekly client touchpoints and full transparency.' },
  { num: '04', title: 'Launch', text: 'Rigorous QA, performance testing, and seamless production deployment.' },
  { num: '05', title: 'Scale', text: 'Ongoing optimization, monitoring, and long-term growth partnership.' },
]

const TECH_CHIPS = [
  'GPT-4 / Claude',
  'LangChain',
  'LlamaIndex',
  'PyTorch',
  'TensorFlow',
  'HuggingFace',
  'FastAPI',
  'React / Next.js',
  'Flutter',
  'React Native',
  'Figma',
  'AWS / GCP',
  'Docker / K8s',
  'Pinecone',
  'Weaviate',
  'OpenAI API',
  'RAG Systems',
  'Vector DBs',
]

export default function Services() {
  usePageMeta(
    'Services — Oryntal',
    'Six specialized service lines, each built to transform how your business competes in an AI-first world.'
  )
  const [activeIdx, setActiveIdx] = useState(0)
  const navigate = useNavigate()
  const pageRef = useRevealOnMount()
  const go = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const svc = SERVICES[activeIdx]

  const whyItems = [
    isVerified(claims.speed.servicesDelivery) && {
      icon: 'zap',
      title: claims.speed.servicesDelivery.title,
      text: claims.speed.servicesDelivery.text,
    },
    isVerified(claims.security) && {
      icon: 'shield',
      title: claims.security.title,
      text: claims.security.text,
    },
    { icon: 'chart', title: 'Outcome-Focused', text: 'Every project is measured against real business metrics, not vanity metrics.' },
    { icon: 'globe', title: 'Global Experience', text: 'Deployed across 12+ industries in diverse international markets.' },
  ].filter(Boolean)

  return (
    <div className="services page-enter" ref={pageRef}>
      <section className="section section--ivory svc-hero">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">What We Do</div>
            <h1>
              Intelligence <Hl>Engineered</Hl> to Deliver
            </h1>
            <p className="lead">
              Six specialized service lines, each built to transform how your business competes in an AI-first world.
            </p>
          </div>
          <ul className="svc-hero__pills">
            {['AI strategy', 'Product design', 'Production launch'].map((pill) => (
              <li key={pill} className="svc-hero__pill">
                <Icon name={pill === 'AI strategy' ? 'brain' : pill === 'Product design' ? 'palette' : 'rocket'} size={16} />
                {pill}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--white">
        <div className="container svc-explorer">
          <div className="svc-explorer__list">
            {SERVICES.map((service, i) => (
              <button
                key={service.num}
                aria-pressed={activeIdx === i}
                className={`svc-explorer__item${activeIdx === i ? ' is-active' : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                <span className="svc-explorer__num">{service.num}</span>
                <span className="svc-explorer__title">{service.title}</span>
                <Icon name="chevronRight" size={18} />
              </button>
            ))}
          </div>

          <article className="card svc-detail reveal">
            <div className="eyebrow">
              {svc.tag} - {svc.num}
            </div>
            <h2 className="svc-detail__title">{svc.title}</h2>
            <p className="svc-detail__desc">{svc.desc}</p>
            <ul className="svc-detail__features">
              {svc.features.map((feature) => (
                <li key={feature.text}>
                  <span className="svc-detail__icon">
                    <Icon name={feature.icon} size={18} />
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>
            <button className="btn btn-primary" onClick={() => go('/contact')}>
              Start This Project <Icon name="arrowRight" size={16} />
            </button>
          </article>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">How We Work</div>
            <h2>
              Our <Hl>Process</Hl>
            </h2>
          </div>
          <ol className="process">
            {PROCESS.map((step) => (
              <li className="process__step reveal" key={step.num}>
                <span className="process__num">{step.num}</span>
                <h3 className="process__title">{step.title}</h3>
                <p className="process__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">Why Choose Us</div>
            <h2>
              The Oryntal <Hl>Advantage</Hl>
            </h2>
          </div>
          <div className="grid grid--4">
            {whyItems.map((item) => (
              <article className="card reveal" key={item.title}>
                <span className="icon-badge">
                  <Icon name={item.icon} size={24} />
                </span>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">Our Stack</div>
            <h2>
              Technologies We <Hl>Master</Hl>
            </h2>
          </div>
          <ul className="chips">
            {TECH_CHIPS.map((chip) => (
              <li className="chip reveal" key={chip}>
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container cta">
          <div className="eyebrow">Get Started</div>
          <h2 className="cta__title">
            Ready to Deploy <Hl>Intelligence?</Hl>
          </h2>
          <button className="btn btn-primary" onClick={() => go('/contact')}>
            Book a Discovery Call <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
