import { useNavigate } from 'react-router-dom'
import { useRevealOnMount } from '../hooks/useScrollReveal'
import usePageMeta from '../hooks/usePageMeta'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import Hl from '../components/Hl'
import { claims, isVerified } from '../data/claims'
import logo from '../assets/oryntal-logo.png'
import './About.css'

const PAIN_POINTS = [
  { icon: 'snail', title: 'Agencies Are Painfully Slow', text: 'Six-month timelines for a website? We cut that to weeks without sacrificing quality.' },
  { icon: 'heartCrack', title: 'Beautiful But Broken', text: 'Stunning designs that do not convert. We build for results, not just aesthetics.' },
  { icon: 'brain', title: 'AI Is Confusing and Overhyped', text: 'We translate hype into real, deployable systems that solve actual business problems.' },
  { icon: 'badgeDollar', title: 'Paying for Fluff, Not Results', text: 'Retainers with no accountability. We tie our success directly to your outcomes.' },
  { icon: 'bridge', title: 'Siloed Expertise', text: 'AI teams that cannot design. Design teams that cannot code. We are the bridge.' },
  { icon: 'ghost', title: 'Agencies Disappear After Launch', text: 'We stay, optimize, and evolve your product long after the first deployment.' },
]

const TIMELINE = [
  { year: '2023', title: 'The Insight', text: 'The founders witnessed a broken industry: slow timelines, generic outputs, and zero AI.' },
  { year: 'Early 2024', title: 'Building Foundation', text: 'A team was assembled at the intersection of deep tech, business strategy, and design craft.' },
  { year: '2024', title: 'Oryntal Launches', text: 'The first clients saw AI-powered results in record time. The blueprint was proven.' },
  { year: '2025', title: 'Global Expansion', text: 'Oryntal began serving clients across 12+ industries worldwide with a remote-first model.' },
]

const FOUNDERS = [
  {
    initials: 'TS',
    name: 'Tushar Srivastav',
    linkedin: 'https://www.linkedin.com/in/tushar-shrivastav-710268350/',
    role: 'Founder and CEO',
    bullets: [
      "Visionary architect of Oryntal's AI-first philosophy",
      'Drives strategic partnerships and investor relations',
      { text: claims.founderExperience.tushar.text, verified: claims.founderExperience.tushar.verified },
      'Oversees flagship projects from concept to delivery',
    ],
  },
  {
    initials: 'DM',
    name: 'Dipesh Mayla',
    linkedin: 'https://www.linkedin.com/in/dipesh-mayla-85aa44325/',
    role: 'Co-Founder and CFO',
    bullets: [
      'Financial architect behind revenue and pricing strategy',
      'Expert in resource allocation and financial forecasting',
      'Ensures every client investment delivers measurable ROI',
      'Built the operational financial framework from the ground up',
    ],
  },
  {
    initials: 'PS',
    name: 'Parth Srivastav',
    linkedin: 'https://www.linkedin.com/in/parth-srivastava-bloomingsparrow/',
    role: 'CMO',
    bullets: [
      'Brand and content strategy',
      'Turns AI products into market stories',
      'Demand generation',
      'B2B tech positioning',
    ],
  },
]

const VALUES = [
  { icon: 'zap', title: 'Precision Over Speed', text: 'Fast, but never at the expense of craft. We refuse to ship work we are not proud of.' },
  { icon: 'handshake', title: 'Partnership, Not Vendor', text: 'Your KPIs are our North Star. We succeed only when you succeed.' },
  { icon: 'flask', title: 'Always at the Frontier', text: 'We work with the latest AI capabilities on day one, not when they are already mainstream.' },
  { icon: 'search', title: 'Radical Transparency', text: 'No smoke and no mirrors. Clear communication at every stage of your project.' },
  { icon: 'gem', title: 'Quality as Standard', text: 'Good enough is not in our vocabulary. Excellence is the baseline.' },
  { icon: 'globe', title: 'Global Mindset', text: 'Built for scale across markets, languages, and cultures.' },
]

export default function About() {
  usePageMeta(
    'About — Oryntal',
    'The story of Oryntal is the story of founders who saw an industry broken by mediocrity and decided to build something better.'
  )
  const navigate = useNavigate()
  const pageRef = useRevealOnMount()

  const go = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="about page-enter" ref={pageRef}>
      <section className="section section--ivory about-hero">
        <div className="container about-hero__grid">
          <div className="section-head">
            <div className="eyebrow">Our Story</div>
            <h1>
              Built to <Hl>Solve</Hl> Real Problems
            </h1>
            <p className="lead">
              The story of Oryntal is the story of founders who saw an industry broken by mediocrity and decided to
              build something better.
            </p>
            <ul className="about-hero__pills">
              {['AI-led strategy', 'Design discipline', 'Measurable outcomes'].map((pill) => (
                <li key={pill} className="about-hero__pill">
                  {pill}
                </li>
              ))}
            </ul>
          </div>
          <div className="about-hero__figure">
            <img src={logo} alt="Oryntal Logo" className="about-hero__logo" width="260" height="260" />
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container story">
          <div className="story__col">
            <div className="eyebrow">Origin</div>
            <h2>
              Where We <Hl>Came From</Hl>
            </h2>
            <p className="lead">
              We saw agencies giving clients slow timelines, generic outputs, and zero AI integration. The market was
              flooded with studios that could design but not engineer, and engineers who could not communicate.
            </p>
            <p className="lead">
              Oryntal was built as the bridge - a fusion of frontier AI engineering and world-class creative design,
              unified under one roof with a single obsession: outcomes.
            </p>
            <blockquote className="story__quote">Technology should serve human ambition, not replace it.</blockquote>

            <ol className="timeline">
              {TIMELINE.map((item) => (
                <li className="timeline__item" key={item.year}>
                  <span className="timeline__year">{item.year}</span>
                  <div>
                    <h3 className="timeline__title">{item.title}</h3>
                    <p className="timeline__text">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Problems We Exist to Fix</div>
          </div>
          <div className="grid grid--3">
            {PAIN_POINTS.map((point) => (
              <article className="card reveal" key={point.title}>
                <span className="icon-badge">
                  <Icon name={point.icon} size={20} />
                </span>
                <h3 className="card-title">{point.title}</h3>
                <p className="card-text">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">Leadership</div>
            <h2>
              Meet the <Hl>Founders</Hl>
            </h2>
          </div>
          <div className="grid grid--3">
            {FOUNDERS.map((founder) => (
              <a
                className="card founder reveal"
                href={founder.linkedin}
                target="_blank"
                rel="noreferrer"
                key={founder.name}
              >
                <div className="founder__avatar" aria-hidden="true">
                  {founder.initials}
                </div>
                <h3 className="founder__name">{founder.name}</h3>
                <div className="founder__role">{founder.role}</div>
                <ul className="founder__bullets">
                  {founder.bullets
                    .filter((b) => (typeof b === 'string' ? true : isVerified(b)))
                    .map((b) => (
                      <li key={typeof b === 'string' ? b : b.text}>
                        {typeof b === 'string' ? b : b.text}
                      </li>
                    ))}
                </ul>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">What We Stand For</div>
            <h2>
              Our Core <Hl>Values</Hl>
            </h2>
          </div>
          <div className="grid grid--3">
            {VALUES.map((value) => (
              <article className="card reveal" key={value.title}>
                <span className="icon-badge">
                  <Icon name={value.icon} size={24} />
                </span>
                <h3 className="card-title">{value.title}</h3>
                <p className="card-text">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container cta">
          <div className="eyebrow">Ready?</div>
          <h2 className="cta__title">
            Let&apos;s Build Something <Hl>Extraordinary</Hl>
          </h2>
          <button className="btn btn-primary" onClick={() => go('/contact')}>
            Start Your Project <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
