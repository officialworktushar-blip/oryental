import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRevealOnMount } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import logo from '../assets/oryntal-logo.png'
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

const WHY_US = [
  { icon: 'zap', title: 'AI-Accelerated Delivery', text: '60% faster delivery using AI-enhanced development workflows.' },
  { icon: 'shield', title: 'Enterprise Security', text: 'SOC2-aligned practices, private deployments, and complete data privacy.' },
  { icon: 'chart', title: 'Outcome-Focused', text: 'Every project is measured against real business metrics, not vanity metrics.' },
  { icon: 'globe', title: 'Global Experience', text: 'Deployed across 12+ industries in diverse international markets.' },
]

const TECH_CHIPS = [
  'GPT-4 / Claude', 'LangChain', 'LlamaIndex', 'PyTorch', 'TensorFlow',
  'HuggingFace', 'FastAPI', 'React / Next.js', 'Flutter', 'React Native',
  'Figma', 'AWS / GCP', 'Docker / K8s', 'Pinecone', 'Weaviate',
  'OpenAI API', 'RAG Systems', 'Vector DBs',
]

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0)
  const navigate = useNavigate()
  const pageRef = useRevealOnMount()
  const go = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const svc = SERVICES[activeIdx]

  return (
    <div className="services page-enter" ref={pageRef}>
      <section className="svc-hero">
        <div className="blob" style={{ width: 600, height: 600, background: 'rgba(201,168,76,0.06)', top: -150, left: -100 }} />
        <div className="svc-hero-grid">
          <div className="svc-hero-content">
            <div className="tag"><span className="tag-dot" /> What We Do</div>
            <h1>Intelligence <span className="gold-text">Engineered</span> to Deliver</h1>
            <p>Six specialized service lines, each built to transform how your business competes in an AI-first world.</p>
            <div className="svc-hero-pills">
              <div className="svc-hero-pill"><Icon name="brain" size={16} /> AI strategy</div>
              <div className="svc-hero-pill"><Icon name="palette" size={16} /> Product design</div>
              <div className="svc-hero-pill"><Icon name="rocket" size={16} /> Production launch</div>
            </div>
          </div>

          <div className="svc-hero-visual">
            <div className="svc-hero-panel svc-panel-main">
              <img src={logo} alt="Oryntal Logo" className="svc-panel-logo logo-3d" />
              <div className="svc-panel-lines" />
              <div className="svc-panel-copy">Full-stack intelligence</div>
            </div>
            <div className="svc-hero-panel svc-panel-card svc-panel-card-a">
              <Icon name="bot" size={20} />
              <span>AI systems</span>
            </div>
            <div className="svc-hero-panel svc-panel-card svc-panel-card-b">
              <Icon name="shield" size={20} />
              <span>Secure delivery</span>
            </div>
            <div className="svc-hero-panel svc-panel-card svc-panel-card-c">
              <Icon name="barChart" size={20} />
              <span>Growth outcomes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section svc-explorer-section">
        <div className="container">
          <div className="svc-explorer">
            <div className="svc-list">
              {SERVICES.map((service, i) => (
                <button
                  key={service.num}
                  className={`svc-list-item${activeIdx === i ? ' active' : ''}`}
                  onClick={() => setActiveIdx(i)}
                >
                  <span className="svc-list-num">{service.num}</span>
                  <span className="svc-list-title">{service.title}</span>
                  <span className="svc-list-arrow"><Icon name="chevronRight" size={18} /></span>
                </button>
              ))}
            </div>

            <div className="glass svc-detail">
              <div className="svc-detail-tag"><span className="tag-dot" /> {svc.tag} - {svc.num}</div>
              <h2 className="svc-detail-title">{svc.title}</h2>
              <p className="svc-detail-desc">{svc.desc}</p>
              <div className="svc-features">
                {svc.features.map((feature) => (
                  <div className="svc-feature-row" key={feature.text}>
                    <span className="svc-feature-icon"><Icon name={feature.icon} size={18} /></span>
                    <span className="svc-feature-text">{feature.text}</span>
                  </div>
                ))}
              </div>
              <button className="btn-gold" onClick={() => go('/contact')}>
                Start This Project <Icon name="arrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="tag" style={{ margin: '0 auto 16px' }}><span className="tag-dot" /> How We Work</div>
            <h2 className="section-heading">Our <span className="gold-text">Process</span></h2>
          </div>
          <div className="process-row">
            {PROCESS.map((step, i) => (
              <div className="process-step reveal" key={step.num}>
                <div className="process-circle">{step.num}</div>
                {i < PROCESS.length - 1 && <div className="process-connector" />}
                <div className="process-title">{step.title}</div>
                <p className="process-text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="tag" style={{ margin: '0 auto 16px' }}><span className="tag-dot" /> Why Choose Us</div>
            <h2 className="section-heading">The Oryntal <span className="gold-text">Advantage</span></h2>
          </div>
          <div className="why-us-grid">
            {WHY_US.map((item) => (
              <div className="glass why-us-card reveal" key={item.title}>
                <div className="why-us-icon"><Icon name={item.icon} size={28} /></div>
                <div className="why-us-title">{item.title}</div>
                <p className="why-us-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="tag" style={{ margin: '0 auto 16px' }}><span className="tag-dot" /> Our Stack</div>
            <h2 className="section-heading">Technologies We <span className="gold-text">Master</span></h2>
          </div>
          <div className="chips-wrap">
            {TECH_CHIPS.map((chip) => (
              <div className="chip reveal" key={chip}>{chip}</div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-banner" style={{ margin: '0 80px 80px' }}>
        <div className="blob" style={{ width: 500, height: 300, background: 'rgba(201,168,76,0.08)', top: -80, left: '50%', transform: 'translateX(-50%)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="tag" style={{ margin: '0 auto 20px' }}><span className="tag-dot" /> Get Started</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem,3.5vw,3rem)', marginBottom: 30 }}>
            Ready to Deploy <span className="gold-text">Intelligence?</span>
          </h2>
          <button className="btn-gold" onClick={() => go('/contact')}>
            Book a Discovery Call <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
