import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/oryntal-logo.png'
import './Navbar.css'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
]

const PORTFOLIO_URL = 'https://oryntal-portfolio-showcase.vercel.app/'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (path) => {
    setMenuOpen(false)
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <nav className="navbar__inner container" aria-label="Primary">
        <button className="navbar__brand" onClick={() => handleNav('/')} aria-label="Oryntal home">
          <img src={logo} alt="Oryntal Logo" className="navbar__logo" width="32" height="32" />
          <span className="navbar__brand-text">
            ORY<span className="navbar__brand-n">N</span>TAL
          </span>
        </button>

        <ul className="navbar__links">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
              Portfolio
            </a>
          </li>
          <li>
            <NavLink to="/contact" className="btn btn-primary navbar__cta">
              Contact Us
            </NavLink>
          </li>
        </ul>

        <button
          className={`navbar__burger${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`navbar__mobile${menuOpen ? ' is-open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <button key={item.to} onClick={() => handleNav(item.to)}>
            {item.label}
          </button>
        ))}
        <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
          Portfolio
        </a>
        <button onClick={() => handleNav('/contact')} className="btn btn-primary">
          Contact Us
        </button>
      </div>
    </header>
  )
}
