import { useNavigate } from 'react-router-dom'
import { useRevealOnMount } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
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
      '10+ years of entrepreneurship across tech and business',
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
]

const TEAM = [
  {
    initials: 'PS',
    name: 'Parth Srivastav',
    linkedin: 'https://www.linkedin.com/in/parth-srivastava-bloomingsparrow/',
    role: 'CMO',
    bullets: ['Brand and content strategy', 'Turns AI products into market stories', 'Demand generation', 'B2B tech positioning'],
  },
  {
    initials: 'VK',
    name: 'Vinay Kumar Reddy',
    linkedin: 'https://www.linkedin.com/in/vinay-kumar-reddy-chinthala-993972287/',
    role: 'CTO',
    bullets: ['AI and ML architecture', 'Custom LLM fine-tuning', 'Production deployment', 'Full-stack AI from training to API'],
  },
  {
    initials: 'KR',
    name: 'Kuldip Rai',
    linkedin: 'https://www.linkedin.com/in/kuldeep-rai-26a983396/',
    role: 'Outreach and Sales',
    bullets: ['Global client connections', 'Consultative sales approach', 'Inbound pipeline management', 'Partnership development'],
  },
  {
    initials: 'VR',
    name: 'Vans Rana',
    role: 'COO',
    bullets: ['Operational engine and workflows', 'Project timeline execution', 'Client satisfaction oversight', 'Bridge between teams and clients'],
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
  const navigate = useNavigate()
  const pageRef = useRevealOnMount()

  const go = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="about page-enter" ref={pageRef}>
      <section className="about-hero">
        <div className="blob" style={{ width: 700, height: 700, background: 'rgba(201,168,76,0.07)', top: -200, right: -200 }} />
        <div className="blob" style={{ width: 500, height: 500, background: 'rgba(13,18,48,0.9)', bottom: -150, left: -100 }} />

        <div className="about-hero-content">
          <div className="tag"><span className="tag-dot" /> Our Story</div>
          <h1>Built to <span className="gold-text">Solve</span> Real Problems</h1>
          <p>The story of Oryntal is the story of founders who saw an industry broken by mediocrity and decided to build something better.</p>
          <div className="about-hero-pills">
            <div className="about-hero-pill">AI-led strategy</div>
            <div className="about-hero-pill">Design discipline</div>
            <div className="about-hero-pill">Measurable outcomes</div>
          </div>
        </div>

        <div className="about-hero-visual">
          <div className="orbit-ring orbit-ring-1" />
          <div className="orbit-ring orbit-ring-2" />
          <div className="orbit-ring orbit-ring-3" />
          <div className="about-hero-rays" />
          <div className="orbit-chip chip-top"><Icon name="brain" size={18} /> Strategy</div>
          <div className="orbit-chip chip-right"><Icon name="palette" size={18} /> Design</div>
          <div className="orbit-chip chip-bottom"><Icon name="rocket" size={18} /> Delivery</div>
          <div className="orbit-center">
            <img src={logo} alt="Oryntal Logo" className="orbit-logo logo-3d" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="story-grid">
            <div className="story-left reveal">
              <div className="tag"><span className="tag-dot" /> Origin</div>
              <h2 className="section-heading">Where We <span className="gold-text">Came From</span></h2>
              <div className="gold-line" />
              <p className="section-sub" style={{ marginBottom: 20 }}>
                We saw agencies giving clients slow timelines, generic outputs, and zero AI integration. The market was flooded with studios that could design but not engineer, and engineers who could not communicate.
              </p>
              <p className="section-sub" style={{ marginBottom: 20 }}>
                Oryntal was built as the bridge - a fusion of frontier AI engineering and world-class creative design, unified under one roof with a single obsession: outcomes.
              </p>
              <blockquote className="about-quote">
                Technology should serve human ambition, not replace it.
              </blockquote>

              <div className="timeline">
                {TIMELINE.map((item, i) => (
                  <div className="timeline-item reveal" key={item.year}>
                    <div className="timeline-dot" />
                    {i < TIMELINE.length - 1 && <div className="timeline-line" />}
                    <div className="timeline-content">
                      <div className="timeline-year">{item.year}</div>
                      <div className="timeline-title">{item.title}</div>
                      <p className="timeline-text">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pain-right">
              <div className="tag reveal" style={{ marginBottom: 24 }}><span className="tag-dot" /> Problems We Exist to Fix</div>
              <div className="pain-grid">
                {PAIN_POINTS.map((point) => (
                  <div className="glass pain-card reveal" key={point.title}>
                    <div className="pain-icon"><Icon name={point.icon} size={20} /></div>
                    <div>
                      <div className="pain-title">{point.title}</div>
                      <p className="pain-text">{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="tag" style={{ margin: '0 auto 16px' }}><span className="tag-dot" /> Leadership</div>
            <h2 className="section-heading">Meet the <span className="gold-text">Founders</span></h2>
          </div>
          <div className="founders-grid">
            {FOUNDERS.map((founder) => (
              <div className="glass founder-card reveal" key={founder.name}>
                <div className="founder-avatar">{founder.initials}</div>
                <a className="founder-name founder-link" href={founder.linkedin} target="_blank" rel="noreferrer">{founder.name}</a>
                <div className="founder-role">{founder.role}</div>
                <ul className="founder-bullets">
                  {founder.bullets.map((bullet) => (
                    <li key={bullet}><span className="bullet-dot" /> {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="tag" style={{ margin: '0 auto 16px' }}><span className="tag-dot" /> The Team</div>
            <h2 className="section-heading">The <span className="gold-text">Minds</span> Behind the Work</h2>
          </div>
          <div className="team-grid">
            {TEAM.map((member) => (
              <div className="neu team-card reveal" key={member.name}>
                <div className="team-avatar">{member.initials}</div>
                {member.linkedin
                  ? <a className="team-name team-link" href={member.linkedin} target="_blank" rel="noreferrer">{member.name}</a>
                  : <div className="team-name">{member.name}</div>}
                <div className="team-role">{member.role}</div>
                <ul className="team-bullets">
                  {member.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="tag" style={{ margin: '0 auto 16px' }}><span className="tag-dot" /> What We Stand For</div>
            <h2 className="section-heading">Our Core <span className="gold-text">Values</span></h2>
          </div>
          <div className="values-grid">
            {VALUES.map((value) => (
              <div className="neu value-card reveal" key={value.title}>
                <div className="value-icon"><Icon name={value.icon} size={28} /></div>
                <div className="value-title">{value.title}</div>
                <p className="value-text">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-banner" style={{ margin: '0 80px 80px' }}>
        <div className="blob" style={{ width: 500, height: 300, background: 'rgba(201,168,76,0.08)', top: -80, left: '50%', transform: 'translateX(-50%)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="tag" style={{ margin: '0 auto 20px' }}><span className="tag-dot" /> Ready?</div>
          <h2 className="cta-banner-title">Let&apos;s Build Something <span className="gold-text">Extraordinary</span></h2>
          <button className="btn-gold" onClick={() => go('/contact')}>
            Start Your Project <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
