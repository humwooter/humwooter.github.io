import { useState } from 'react'
import '../styles/Screenshots.css'

const screenshots = [
  { src: '/images/screenshot1.png', alt: 'App Screenshot 1' },
  { src: '/images/screenshot2.png', alt: 'App Screenshot 2' },
  { src: '/images/screenshot3.png', alt: 'App Screenshot 3' }
]

const Screenshots = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section id="screenshots" className="screenshots">
      <h2>Screenshots</h2>
      <div className="screenshot-gallery">
        {screenshots.map((screenshot, index) => (
          <div 
            key={index} 
            className="screenshot-container"
            onClick={() => setSelectedImage(screenshot)}
          >
            <img 
              src={screenshot.src} 
              alt={screenshot.alt}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content">
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <button 
              className="close-button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Screenshots 