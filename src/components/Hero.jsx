import '../styles/Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Your App Name</h1>
        <p className="subtitle">A beautiful, elegant solution for your needs</p>
        <button 
          className="cta-button"
          onClick={() => document.getElementById('download').scrollIntoView({ behavior: 'smooth' })}
        >
          Download on the App Store
        </button>
      </div>
      <div className="hero-image">
        <img src="/images/hero-screenshot.png" alt="App Screenshot" />
      </div>
    </section>
  )
}

export default Hero 