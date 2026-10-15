import Hl from '../components/Hl'
import Icon from '../components/Icon'
import usePageMeta from '../hooks/usePageMeta'
import './Styleguide.css'

const COLOURS = [
  { name: 'ink', token: '--ink' },
  { name: 'charcoal', token: '--charcoal' },
  { name: 'graphite', token: '--graphite' },
  { name: 'gold', token: '--gold' },
  { name: 'gold-bright', token: '--gold-bright' },
  { name: 'gold-deep', token: '--gold-deep' },
  { name: 'gold-tint', token: '--gold-tint' },
  { name: 'ivory', token: '--ivory' },
  { name: 'sand', token: '--sand' },
  { name: 'text-muted', token: '--text-muted' },
  { name: 'success', token: '--success' },
  { name: 'danger', token: '--danger' },
]

export default function Styleguide() {
  usePageMeta('Styleguide — Oryntal')

  return (
    <div className="styleguide">
      <section className="section section--ivory">
        <div className="container">
          <div className="eyebrow">Dev only</div>
          <h1>Styleguide</h1>
          <p className="lead">
            Design foundation preview. This route exists in development only and is intentionally excluded from the
            sitemap and navigation.
          </p>
        </div>
      </section>

      {/* Colours */}
      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Tokens</div>
            <h2>Colours</h2>
          </div>
          <ul className="sg-swatches grid grid--4">
            {COLOURS.map((c) => (
              <li className="sg-swatch" key={c.token}>
                <span className="sg-swatch__chip" style={{ background: `var(${c.token})` }} aria-hidden="true" />
                <span className="sg-swatch__name">{c.name}</span>
                <span className="sg-swatch__token">var({c.token})</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Type scale */}
      <section className="section section--ivory">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Typography</div>
            <h2>Type scale</h2>
          </div>
          <div className="sg-stack">
            <p className="text-display">Display — Cormorant Garamond</p>
            <h1>Heading 1 — Cormorant Garamond</h1>
            <h2>Heading 2 — Cormorant Garamond</h2>
            <h3>Heading 3 — Cormorant Garamond</h3>
            <h4>Heading 4 — Cormorant Garamond</h4>
            <p className="text-lead">Lead paragraph — Outfit, muted.</p>
            <p>Body copy — Outfit 400, 1rem, line-height 1.6.</p>
            <p className="text-sm">Small — Outfit 0.875rem.</p>
            <p className="text-caption">Caption — Outfit 0.875rem, muted.</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Controls</div>
            <h2>Buttons</h2>
          </div>
          <div className="btn-row">
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn btn-primary" disabled>
              Disabled
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="section section--ivory">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Surfaces</div>
            <h2>Cards</h2>
          </div>
          <div className="grid grid--3">
            <article className="card">
              <span className="icon-badge">
                <Icon name="sparkles" size={20} />
              </span>
              <h3 className="card-title">Light card</h3>
              <p className="card-text">1px sand border, 8px radius, no shadow.</p>
            </article>
            <article className="card">
              <span className="icon-badge">
                <Icon name="shield" size={20} />
              </span>
              <h3 className="card-title">Second card</h3>
              <p className="card-text">Flat surface on ivory.</p>
            </article>
            <article className="card">
              <span className="icon-badge">
                <Icon name="chart" size={20} />
              </span>
              <h3 className="card-title">Third card</h3>
              <p className="card-text">Consistent padding and border.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Chips */}
      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Labels</div>
            <h2>Chips</h2>
          </div>
          <div className="chip-set">
            <span className="chip">PyTorch</span>
            <span className="chip">TensorFlow</span>
            <span className="chip">LangChain</span>
            <span className="chip">React</span>
            <span className="chip">Node.js</span>
          </div>
        </div>
      </section>

      {/* Form fields */}
      <section className="section section--ivory">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Inputs</div>
            <h2>Form fields</h2>
          </div>
          <form className="sg-form" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label className="field__label" htmlFor="sg-name">
                Name
              </label>
              <input className="field__input" id="sg-name" type="text" placeholder="Jane Doe" />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="sg-service">
                Service
              </label>
              <select className="field__select" id="sg-service" defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                <option>AI LLM Models</option>
                <option>Chatbots &amp; Agents</option>
                <option>Website Design</option>
              </select>
              <span className="field__hint">Choose the closest match.</span>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="sg-message">
                Message
              </label>
              <textarea className="field__textarea" id="sg-message" rows={4} placeholder="Tell us about your project..." />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="sg-error">
                Error state
              </label>
              <input className="field__input" id="sg-error" type="text" aria-invalid="true" defaultValue="invalid@" />
              <span className="field__error">Please enter a valid email address.</span>
            </div>
          </form>
        </div>
      </section>

      {/* Hl on light */}
      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Highlight</div>
            <h2>
              Highlight on <Hl>light</Hl> backgrounds
            </h2>
            <p className="text-lead">
              The <Hl>Hl</Hl> primitive renders one to three words, at most one per heading or paragraph.
            </p>
          </div>
        </div>
      </section>

      {/* Hl on dark + dark primitives */}
      <section className="section section--ink">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Dark surface</div>
            <h2>
              Highlight on <Hl>dark</Hl> backgrounds
            </h2>
            <p className="text-lead">
              Same primitive, applied on an <Hl>ink</Hl> section.
            </p>
          </div>
          <div className="btn-row">
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-ghost">Ghost</button>
          </div>
          <div className="grid grid--3" style={{ marginTop: 'var(--sp-8)' }}>
            <article className="card">
              <h3 className="card-title">Dark card</h3>
              <p className="card-text">Charcoal surface with graphite border.</p>
            </article>
            <article className="card">
              <h3 className="card-title">Dark card</h3>
              <p className="card-text">No shadow, flat surface.</p>
            </article>
            <article className="card">
              <h3 className="card-title">Dark card</h3>
              <p className="card-text">Gold reserved for accents only.</p>
            </article>
          </div>
          <div className="chip-set" style={{ marginTop: 'var(--sp-8)' }}>
            <span className="chip">Chip</span>
            <span className="chip">Chip</span>
            <span className="chip">Chip</span>
          </div>
        </div>
      </section>
    </div>
  )
}
