// Component definitions
const components = {
    header: () => `
        <header class="header">
            <nav class="nav">
                <div class="logo">Logs</div>
                <div class="nav-links">
                    <a href="#features">Features</a>
                    <a href="#screenshots">Screenshots</a>
                    <a href="#download">Download</a>
                </div>
            </nav>
        </header>
    `,

    hero: () => `
        <section class="hero">
            <div class="hero-content">
                <h1>Logs</h1>
                <p class="subtitle">A brief, compelling description of your app that highlights its main value proposition.</p>
                <a href="#download" class="cta-button">Download on the App Store</a>
            </div>
            <div class="hero-image">
                <img src="images/main-screenshot.png" alt="App Screenshot">
            </div>
        </section>
    `,

    features: () => `
        <section id="features" class="features">
            <h2>Key Features</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <h3>Feature 1</h3>
                    <p>Description of your first key feature.</p>
                </div>
                <div class="feature-card">
                    <h3>Feature 2</h3>
                    <p>Description of your second key feature.</p>
                </div>
                <div class="feature-card">
                    <h3>Feature 3</h3>
                    <p>Description of your third key feature.</p>
                </div>
            </div>
        </section>
    `,

    screenshots: () => `
        <section id="screenshots" class="screenshots">
            <h2>Screenshots</h2>
            <div class="screenshot-gallery">
                <div class="screenshot">
                    <img src="images/screenshot1.png" alt="App Screenshot 1">
                </div>
                <div class="screenshot">
                    <img src="images/screenshot2.png" alt="App Screenshot 2">
                </div>
                <div class="screenshot">
                    <img src="images/screenshot3.png" alt="App Screenshot 3">
                </div>
            </div>
        </section>
    `,

    download: () => `
        <section id="download" class="download">
            <h2>Download Now</h2>
            <p>Available on the App Store</p>
            <a href="#" class="app-store-button">
                <img src="images/app-store-badge.png" alt="Download on the App Store">
            </a>
        </section>
    `,

    footer: () => `
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact</a>
                </div>
                <p>&copy; ${new Date().getFullYear()} Logs. All rights reserved.</p>
            </div>
        </footer>
    `
};

// Function to render a component
function renderComponent(componentName, targetElement) {
    const component = components[componentName];
    if (component && targetElement) {
        targetElement.innerHTML = component();
    }
}

// Function to render all components
function renderAllComponents() {
    // Render each component in its designated container
    Object.keys(components).forEach(componentName => {
        const container = document.getElementById(`${componentName}-container`);
        if (container) {
            renderComponent(componentName, container);
        }
    });
}

// Initialize components when the DOM is loaded
document.addEventListener('DOMContentLoaded', renderAllComponents); 