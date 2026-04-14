import { useNavigate } from 'react-router-dom'
import { useRevealOnMount } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import logo from '../assets/oryntal-logo.png'
import './Home.css'

const WHY_CARDS = [
  { icon: 'brain', title: 'AI-First Thinking', text: 'Every project starts with the question: how can intelligence amplify this? We embed AI at the core, not as an afterthought.' },
  { icon: 'zap', title: 'Speed Without Sacrifice', text: 'AI-enhanced workflows cut timelines by up to 60%. We move fast without compromising the precision your project demands.' },
  { icon: 'target', title: 'Outcome-Obsessed', text: "Built for conversion, retention, and measurable growth. If it doesn't move the needle, we don't build it." },
  { icon: 'globe', title: 'Global Reach, Human Touch', text: 'Internationally-minded team with deeply personal client relationships. We speak the language of global business.' },
]

const SERVICES_PREVIEW = [
  { num: '01', icon: 'bot', title: 'AI & LLM Engineering', text: 'Custom large language models, NLP pipelines, and neural architectures engineered for your domain.' },
  { num: '02', icon: 'messageSquare', title: 'Chatbots & AI Agents', text: 'Autonomous agents handling support, sales, and ops 24/7 so your team can focus on what matters most.' },
  { num: '03', icon: 'palette', title: 'Website & App Design', text: 'Award-worthy UI/UX for web and mobile across Android and iOS, conversion-focused and beautifully crafted.' },
]

const MARQUEE_ITEMS = ['AI LLM Models', 'NLP Pipelines', 'Web Design', 'Neural Architectures', 'Chatbot and AI Agents', 'App Design']

export default function Home() {
  const navigate = useNavigate()
  const pageRef = useRevealOnMount()

  const go = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="home page-enter" ref={pageRef}>
      <section className="hero">
        <div className="blob" style={{ width: 800, height: 800, background: 'rgba(201,168,76,0.07)', top: -250, left: -250 }} />
        <div className="blob" style={{ width: 600, height: 600, background: 'rgba(13,18,48,0.8)', bottom: -200, right: -150 }} />
        <div className="blob" style={{ width: 400, height: 400, background: 'rgba(201,168,76,0.04)', bottom: 0, left: '30%' }} />

        <div className="hero-grid">
          <div className="hero-brand-stage">
            <div className="hero-logo-halo" />
            <div className="hero-logo-orbit hero-logo-orbit-a" />
            <div className="hero-logo-orbit hero-logo-orbit-b" />
           <img 
  src={logo}  
  alt="Oryntal Logo" 
    className="hero-logo hero-logo-large logo-3d"
  style={{ width: '600px', height: '600px' }}
/>
          </div>

          <div className="hero-content">
            <div className="tag hero-meta-tag">
              {['EST 2024', 'AI/Web Agency', 'GST Registered'].map((item) => (
                <span className="hero-meta-item" key={item}>
                  <span className="hero-meta-dot" />
                  {item}
                </span>
              ))}
            </div>
            <div className="hero-heading-wrap">
              <div className="hero-wordmark">ORY<span className="hero-wordmark-n">N</span>TAL</div>
              <h1>We Build <span className="gold-text">Intelligence</span> That Scales</h1>
            </div>
            <p>Oryntal fuses frontier AI engineering with world-class design to deliver outcomes that matter - faster, smarter, and built for the long game.</p>
            <div className="hero-btns">
              <button className="btn-gold" onClick={() => go('/services')}>
                Explore Services <Icon name="arrowRight" size={16} />
              </button>
              <button className="btn-ghost" onClick={() => go('/contact')}>Let&apos;s Talk</button>
            </div>
            <div className="hero-micro-stats">
              {['AI Systems', 'Brand Design', 'Growth Outcomes'].map((item) => (
                <div className="hero-micro-pill" key={item}>
                  <span className="hero-micro-dot" />
                  {item}
                </div>
              ))}
            </div>
            <div className="hero-deco">
              <div className="hero-line" />
              <span className="hero-scroll-text">Scroll</span>
            </div>
          </div>
        </div>
      </section>

      <div className="stats-strip">
        <div className="stats-grid">
          {[['417+', 'Projects Delivered'], ['98%', 'Client Satisfaction'], ['12+', 'Industries Served'], ['24/7', 'Support Availability']].map(([num, label]) => (
            <div className="stat-cell reveal" key={label}>
              <div className="stat-number gold-text">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-section">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              {item} <span className="marquee-sep">•</span>
            </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="why-grid">
            <div className="why-left reveal">
              <div className="tag"><span className="tag-dot" /> Why Us</div>
              <h2 className="section-heading">The Oryntal <span className="gold-text">Difference</span></h2>
              <div className="gold-line" />
              <p className="section-sub" style={{ marginBottom: 18 }}>
                We do not just build products - we engineer outcomes. Every engagement is driven by measurable results, AI-first thinking, and a relentless pursuit of excellence.
              </p>
              <p className="section-sub" style={{ marginBottom: 36 }}>
                Our founders come from the intersection of deep tech and business strategy, giving Oryntal a perspective that most agencies simply cannot replicate.
              </p>
              <button className="btn-ghost" onClick={() => go('/about')}>Our Story</button>
            </div>
            <div className="why-right">
              {WHY_CARDS.map((card) => (
                <div className="glass why-card reveal" key={card.title}>
                  <div className="why-icon"><Icon name={card.icon} size={22} /></div>
                  <div>
                    <div className="why-card-title">{card.title}</div>
                    <p className="why-card-text">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="tag" style={{ margin: '0 auto 16px' }}><span className="tag-dot" /> What We Do</div>
            <h2 className="section-heading">Our Core <span className="gold-text">Services</span></h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              From frontier AI models to pixel-perfect interfaces - we build the full stack of digital intelligence.
            </p>
          </div>
          <div className="services-preview-grid">
            {SERVICES_PREVIEW.map((service) => (
              <div className="neu svc-preview-card reveal" key={service.num}>
                <div className="svc-preview-num">{service.num}</div>
                <div className="svc-preview-icon"><Icon name={service.icon} size={30} /></div>
                <div className="svc-preview-title">{service.title}</div>
                <p className="svc-preview-text">{service.text}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <button className="btn-gold" onClick={() => go('/services')}>
              View All Services <Icon name="arrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      <div className="cta-banner">
        <div className="blob" style={{ width: 600, height: 400, background: 'rgba(201,168,76,0.07)', top: -100, left: '50%', transform: 'translateX(-50%)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="tag" style={{ margin: '0 auto 20px' }}><span className="tag-dot" /> Ready to Transform?</div>
          <h2 className="cta-banner-title">
            Your Competitors Are Already<br />
            <span className="gold-text">Using AI. Are You?</span>
          </h2>
          <button className="btn-gold" onClick={() => go('/contact')}>
            Start Your Project <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
