import { useNavigate } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import Icon from '../components/Icon'
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()
  usePageMeta('Page Not Found — Oryntal')

  const go = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="not-found">
      <section className="section section--ivory">
        <div className="container not-found__inner">
          <div className="eyebrow">404</div>
          <h1>Page Not Found</h1>
          <p className="lead">The page you are looking for does not exist.</p>
          <button className="btn btn-primary" onClick={() => go('/')}>
            Home <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </section>
    </div>
  )
}
