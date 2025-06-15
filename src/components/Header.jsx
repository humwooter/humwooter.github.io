import { useState } from 'react'
import '../styles/Header.css'

const Header = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <div className="logo">Your App Name</div>
        
        {/* Mobile menu button */}
        <button 
          className={`menu-button ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation links */}
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollToSection('features')}>Features</button>
          <button onClick={() => scrollToSection('screenshots')}>Screenshots</button>
          <button onClick={() => scrollToSection('download')}>Download</button>
        </div>
      </nav>
    </header>
  )
}

export default Header 