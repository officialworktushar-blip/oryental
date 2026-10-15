import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Reviews from './pages/Reviews'
import NotFound from './pages/NotFound'
import Intro from './components/Intro'

const Styleguide = import.meta.env.DEV ? lazy(() => import('./pages/Styleguide')) : null

function App() {
  return (
    <BrowserRouter>
      <Intro />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          {import.meta.env.DEV && (
            <Route
              path="/styleguide"
              element={
                <Suspense fallback={null}>
                  <Styleguide />
                </Suspense>
              }
            />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
