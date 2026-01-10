import '../styles/Features.css'

const features = [
  {
    title: 'Feature 1',
    description: 'Description of your amazing feature'
  },
  {
    title: 'Feature 2',
    description: 'Description of your amazing feature'
  },
  {
    title: 'Feature 3',
    description: 'Description of your amazing feature'
  }
]

const Features = () => {
  return (
    <section id="features" className="features">
      <h2>Key Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features 