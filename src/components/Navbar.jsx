import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/oryntal-logo.png'
import './Navbar.css'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
]

const PORTFOLIO_URL = 'https://oryntal-portfolio-showcase.vercel.app/'

const FOCUSABLE = 'a[href], button:not([disabled])'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const burgerRef = useRef(null)
  const navigate = useNavigate()

  const closeMenu = () => {
    setMenuOpen(false)
    burgerRef.current?.focus()
  }

  const handleNav = (path) => {
    setMenuOpen(false)
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* Focus trap + ESC + scroll lock while the mobile menu is open */
  useEffect(() => {
    if (!menuOpen) return

    const container = menuRef.current
    const getFocusable = () =>
      container ? Array.from(container.querySelectorAll(FOCUSABLE)) : []

    getFocusable()[0]?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu()
        return
      }
      if (e.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  return (
    <header className="navbar">
      <nav className="navbar__inner container" aria-label="Primary">
        <button className="navbar__brand" onClick={() => handleNav('/')} aria-label="Oryntal home">
          <img src={logo} alt="" className="navbar__logo" width="32" height="32" />
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
          ref={burgerRef}
          className={`navbar__burger${menuOpen ? ' is-open' : ''}`}
          onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="navbar-mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {menuOpen && (
        <div
          id="navbar-mobile-menu"
          className="navbar__mobile"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          {NAV_ITEMS.map((item) => (
            <button key={item.to} className="navbar__mobile-link" onClick={() => handleNav(item.to)}>
              {item.label}
            </button>
          ))}
          <a
            className="navbar__mobile-link"
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Portfolio
          </a>
          <button className="btn btn-primary navbar__mobile-cta" onClick={() => handleNav('/contact')}>
            Contact Us
          </button>
        </div>
      )}
    </header>
  )
}
