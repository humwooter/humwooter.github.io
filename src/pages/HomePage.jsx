import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Screenshots from '../components/Screenshots'
import Download from '../components/Download'
import Footer from '../components/Footer'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (didInit.current) return; // strictmode guard
    didInit.current = true;

    // which app is running
    window.__APP_ID__ = "home";

    requestAnimationFrame(() => {
      try {
        window.initializeTheme?.();

        if (window.ThemeSelector) {
          const themeSelector = new window.ThemeSelector();
          themeSelector.render?.();
        }

        window.renderAllComponents?.();
      } catch (e) {
        console.error("[HomePage] legacy init failed:", e);
      }
    });
  }, []);

  return (
    <div className="app">
      <Header isScrolled={isScrolled} />
      <main>
        <Hero />
        <Features />
        <Screenshots />
        <Download />
      </main>
      <Footer />
    </div>
  )
}

export default App
