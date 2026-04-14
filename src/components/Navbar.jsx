import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/oryntal-logo.png'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (path) => {
    setMenuOpen(false)
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <button className="nav-brand" onClick={() => handleNav('/')}>
        <img src={logo} alt="Oryntal Logo" className="nav-logo logo-3d" />
        <span className="nav-brand-text">ORY<span className="nav-brand-n">N</span>TAL</span>
      </button>

      {/* Desktop links */}
      <ul className="nav-links">
        <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
        <li><NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>Services</NavLink></li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => `nav-cta ${isActive ? 'active' : ''}`}>
            Contact Us
          </NavLink>
        </li>
      </ul>

      {/* Mobile burger */}
      <button
        className={`burger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button onClick={() => handleNav('/')}>Home</button>
        <button onClick={() => handleNav('/about')}>About</button>
        <button onClick={() => handleNav('/services')}>Services</button>
        <button onClick={() => handleNav('/contact')} className="mobile-cta">Contact Us</button>
      </div>
    </nav>
  )
}
