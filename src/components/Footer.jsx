import { useNavigate } from 'react-router-dom'
import logo from '../assets/oryntal-logo.png'
import Icon from './Icon'
import './Footer.css'

const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/108076048/admin/dashboard/',
  instagram: 'https://www.instagram.com/oryntal_01?utm_source=qr&igsh=MW15c3VqN2VoazhzNQ==',
  twitter: 'https://x.com/Sri_Tushar_01',
}

export default function Footer() {
  const navigate = useNavigate()

  const go = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-col footer-brand-col">
            <div className="footer-brand">
              <img src={logo} alt="Oryntal" className="footer-logo logo-3d" />
              <span className="footer-brand-name">ORY<span className="footer-brand-n">N</span>TAL</span>
            </div>
            <p className="footer-tagline">
              An AI &amp; Web Agency engineering intelligence that scales.
              We build the future &mdash; one system at a time.
            </p>
          </div>

          {/* Pages */}
          <div className="footer-col">
            <div className="footer-col-title">Pages</div>
            <ul className="footer-links">
              <li><button onClick={() => go('/')}>Home</button></li>
              <li><button onClick={() => go('/about')}>About Us</button></li>
              <li><button onClick={() => go('/services')}>Services</button></li>
              <li><button onClick={() => go('/contact')}>Contact</button></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li><button onClick={() => go('/services')}>AI LLM Models</button></li>
              <li><button onClick={() => go('/services')}>NLP Pipelines</button></li>
              <li><button onClick={() => go('/services')}>Neural Architectures</button></li>
              <li><button onClick={() => go('/services')}>Chatbots &amp; Agents</button></li>
              <li><button onClick={() => go('/services')}>Website Design</button></li>
              <li><button onClick={() => go('/services')}>App Design</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <ul className="footer-links">
              <li><a href="mailto:oryntal.agency@gmail.com">oryntal.agency@gmail.com</a></li>
              <li><a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer">X (Twitter)</a></li>
              <li><a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; 2025 Oryntal. All rights reserved. Crafted with Intelligence.
          </span>
          <div className="social-icons">
            <a className="social-icon" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" title="LinkedIn"><Icon name="linkedin" size={16} /></a>
            <a className="social-icon" href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" title="X"><Icon name="x" size={16} /></a>
            <a className="social-icon" href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" title="Instagram"><Icon name="instagram" size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
