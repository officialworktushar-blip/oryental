/*
 * Hl — the single highlight primitive.
 * Renders <mark className="hl hl--draw">. Max: 1-3 words, one per heading/paragraph,
 * up to two per section, never in buttons/nav/footer, never a whole sentence.
 */
export default function Hl({ children }) {
  return <mark className="hl hl--draw">{children}</mark>
}
