import { useNavigate } from 'react-router-dom'
import logo from '../assets/oryntal-logo.png'
import Icon from './Icon'
import './Footer.css'

const SOCIAL_LINKS = {
  // TODO: owner to confirm the public LinkedIn URL
  linkedin: 'https://www.linkedin.com/company/108076048/',
  instagram: 'https://www.instagram.com/oryntal_01?utm_source=qr&igsh=MW15c3VqN2VoazhzNQ==',
  twitter: 'https://x.com/Sri_Tushar_01',
}

const PAGES = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
]

const SERVICES = [
  'AI LLM Models',
  'NLP Pipelines',
  'Neural Architectures',
  'Chatbots & Agents',
  'Website Design',
  'App Design',
]

export default function Footer() {
  const navigate = useNavigate()

  const go = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand-col">
            <div className="footer__brand">
              <img src={logo} alt="Oryntal" className="footer__logo" width="32" height="32" />
              <span className="footer__brand-name">
                ORY<span className="footer__brand-n">N</span>TAL
              </span>
            </div>
            <p className="footer__tagline">
              An AI &amp; Web Agency engineering intelligence that scales. We build the future &mdash; one system at a
              time.
            </p>
          </div>

          <nav className="footer__col" aria-label="Pages">
            <h2 className="footer__col-title">Pages</h2>
            <ul className="footer__links">
              {PAGES.map((page) => (
                <li key={page.to}>
                  <button onClick={() => go(page.to)}>{page.label}</button>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Services">
            <h2 className="footer__col-title">Services</h2>
            <ul className="footer__links">
              {SERVICES.map((service) => (
                <li key={service}>
                  <button onClick={() => go('/services')}>{service}</button>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Contact">
            <h2 className="footer__col-title">Contact</h2>
            <ul className="footer__links">
              <li>
                <a href="mailto:support.oryntal@agency.org.in">support.oryntal@agency.org.in</a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://docs.google.com/document/d/1EkEThAc5OUmN0eS3WBM1HFJiZJfidXcxklNNdysTdAQ/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Refund Policy
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; {new Date().getFullYear()} Oryntal. All rights reserved. Crafted with Intelligence.
          </span>
          <div className="footer__social">
            <a className="footer__social-link" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" size={18} />
            </a>
            <a className="footer__social-link" href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="X">
              <Icon name="x" size={18} />
            </a>
            <a className="footer__social-link" href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Icon name="instagram" size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
