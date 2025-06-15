import '../styles/Download.css'

const Download = () => {
  return (
    <section id="download" className="download">
      <h2>Download Now</h2>
      <p>Available on the App Store</p>
      <a 
        href="https://apps.apple.com/your-app-link" 
        className="app-store-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img 
          src="/images/app-store-badge.svg" 
          alt="Download on the App Store"
        />
      </a>
    </section>
  )
}

export default Download 