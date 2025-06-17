// Component definitions
const components = {
    header: () => `
        <header class="header">
            <nav class="nav">
                <div class="nav-left">
                    <div class="logo">
                        <img src="images/logo_black.PNG" alt="" width="120" height="120">
                    </div>
                    <div class="dropdown desktop-only">
                        <a href="#" class="dropdown-trigger">Themes</a>
                        <div class="dropdown-content">
                            <a href="#" data-theme="cloud">Cloud</a>
                            <a href="#" data-theme="chrome">Chrome</a>
                            <a href="#" data-theme="mocha">Mocha</a>
                            <a href="#" data-theme="mag">Mag</a>
                            <a href="#" data-theme="wheatgrass">Wheatgrass</a>
                            <a href="#" data-theme="scarab">Scarab</a>
                        </div>
                    </div>
                </div>
                <div class="nav-links desktop-only">
                    <div class="dropdown">
                        <a href="#features" class="dropdown-trigger">Features</a>
                        <div class="dropdown-content">
                            <a href="#features" data-feature="minimal-cognitive">Minimal Cognitive Load</a>
                            <a href="#features" data-feature="easy-creation">Easy Creation</a>
                            <a href="#features" data-feature="stamps">Intuitive Stamps</a>
                            <a href="#features" data-feature="customization">Extensive Customization</a>
                            <a href="#features" data-feature="search-organization">Smart Search & Organization</a>
                            <a href="#features" data-feature="privacy">Complete Privacy</a>
                            <a href="#features" data-feature="calendar-schedule">Calendar & Schedule View</a>
                            <a href="#features" data-feature="insights">Insights</a>
                        </div>
                    </div>
                    <a href="#contact">Contact</a>
                    <a href="#download">Download</a>
                </div>
                <button class="mobile-menu-button">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
            <div class="mobile-nav">
                <div class="mobile-nav-content">
                    <div class="mobile-nav-section">
                        <div class="mobile-nav-header">Themes</div>
                        <div class="mobile-nav-items">
                            <a href="#" data-theme="cloud">Cloud</a>
                            <a href="#" data-theme="chrome">Chrome</a>
                            <a href="#" data-theme="mocha">Mocha</a>
                            <a href="#" data-theme="mag">Mag</a>
                            <a href="#" data-theme="wheatgrass">Wheatgrass</a>
                            <a href="#" data-theme="scarab">Scarab</a>
                        </div>
                    </div>
                    <div class="mobile-nav-section">
                        <div class="mobile-nav-header">Features</div>
                        <div class="mobile-nav-items">
                            <a href="#features" data-feature="minimal-cognitive">Minimal Cognitive Load</a>
                            <a href="#features" data-feature="easy-creation">Easy Creation</a>
                            <a href="#features" data-feature="stamps">Intuitive Stamps</a>
                            <a href="#features" data-feature="customization">Extensive Customization</a>
                            <a href="#features" data-feature="search-organization">Smart Search & Organization</a>
                            <a href="#features" data-feature="privacy">Complete Privacy</a>
                            <a href="#features" data-feature="calendar-schedule">Calendar & Schedule View</a>
                            <a href="#features" data-feature="insights">Insights</a>
                        </div>
                    </div>
                    <div class="mobile-nav-section">
                        <a href="#contact">Contact</a>
                        <a href="#download">Download</a>
                    </div>
                </div>
            </div>
        </header>
    `,

    hero: () => `
        <section class="hero">
            <div class="hero-content">
                <h1>Logs</h1>
                <p class="subtitle">Logs is a fully customizable and private digital pocketbook designed for minimal cognitive load. Its core experience centers around an intuitive daily view, showing only today's entries by default to keep you focused. </p>
            </div>
            <div class="hero-image">
                <div class="app-icon-carousel">
                    <div class="app-icon-card" data-theme="cloud" style="transform: rotate(0deg); z-index: 3;">
                        <img src="images/app icons/app_icon-1.png" alt="" class="app-icon">
                    </div>
                    <div class="app-icon-card" data-theme="chrome" style="transform: rotate(-30deg); z-index: 2;">
                        <img src="images/app icons/app_icon-2.png" alt="" class="app-icon">
                    </div>
                    <div class="app-icon-card" data-theme="mocha" style="transform: rotate(-60deg); z-index: 1;">
                        <img src="images/app icons/app_icon-3.png" alt="" class="app-icon">
                    </div>
                </div>
            </div>
        </section>
    `,

    features: () => `
        <section id="features" class="features">
            <h2>Key Features</h2>
            
            <div id="minimal-cognitive" class="feature-row">
                <div class="feature-card">
                    <h3>Minimal Cognitive Load</h3>
                    <p class="feature-subtitle">Focus on what matters today</p>
                    <p>Default daily view opens directly to today's entries, minimizing clutter. Pin important entries to keep them in the main view across days. Clean, timestamped entries encourage effortless logging.</p>
                </div>
                <div class="feature-screenshots">
                    <img src="images/screenshots/minimal-cognitive/1.png" alt="">
                    <img src="images/screenshots/minimal-cognitive/2.png" alt="">
                    <img src="images/screenshots/minimal-cognitive/3.png" alt="">
                </div>
            </div>

            <div id="easy-creation" class="feature-row">
                <div class="feature-card">
                    <h3>Easy Creation</h3>
                    <p class="feature-subtitle">Write with confidence</p>
                    <p>Create entries effortlessly with an intuitive writing interface. Quick actions let you add tags, attach to a folder, add a title, or attach media in a single tap.</p>
                </div>
                <div class="feature-screenshots">
                    <img src="images/screenshots/easy-creation/1.png" alt="">
                    <img src="images/screenshots/easy-creation/2.png" alt="">
                    <img src="images/screenshots/easy-creation/3.png" alt="">
                    <img src="images/screenshots/easy-creation/4.png" alt="">
                    <img src="images/screenshots/easy-creation/5.png" alt="">
                </div>
            </div>

            <div id="stamps" class="feature-row">
                <div class="feature-card">
                    <h3>Intuitive Stamps</h3>
                    <p class="feature-subtitle">One-tap visual organization</p>
                    <p>One-tap visual annotation with customizable icons and colors. Access stamps by swiping left on any entry. Each entry can have one stamp for clear visual cues. Fully personalize your stamp library with custom names, icons, colors, and folders.</p>
                </div>
                <div class="feature-screenshots">
                    <img src="images/screenshots/stamps/1.png" alt="">
                    <img src="images/screenshots/stamps/2.png" alt="">
                    <img src="images/screenshots/stamps/3.png" alt="">
                </div>
            </div>

            <div id="customization" class="feature-row">
                <div class="feature-card">
                    <h3>Extensive Customization</h3>
                    <p class="feature-subtitle">Make it your own</p>
                    <p>Choose from a variety of beautiful themes or create your own. Customize fonts, colors, and spacing to match your style. Adjust the interface to your preferences with flexible layout options.</p>
                </div>
                <div class="feature-screenshots">
                    <img src="images/screenshots/customization/1.png" alt="">
                    <img src="images/screenshots/customization/2.png" alt="">
                    <img src="images/screenshots/customization/3.png" alt="">
                    <img src="images/screenshots/customization/4.png" alt="">
                    <img src="images/screenshots/customization/5.png" alt="">
                </div>
            </div>

            <div id="search-organization" class="feature-row">
                <div class="feature-card">
                    <h3>Smart Search & Organization</h3>
                    <p class="feature-subtitle">Find anything instantly</p>
                    <p>Powerful search capabilities help you find entries quickly. Organize entries with custom tags and folders. Filter and sort your entries by date, stamps, or custom criteria.</p>
                </div>
                <div class="feature-screenshots">
                    <img src="images/screenshots/search-organization/1.png" alt="">
                    <img src="images/screenshots/search-organization/2.png" alt="">
                    <img src="images/screenshots/search-organization/3.png" alt="">
                    <img src="images/screenshots/search-organization/4.png" alt="">
                    <img src="images/screenshots/search-organization/5.png" alt="">
                    <img src="images/screenshots/search-organization/6.png" alt="">
                    <img src="images/screenshots/search-organization/7.png" alt="">
                </div>
            </div>

            <div id="privacy" class="feature-row">
                <div class="feature-card">
                    <h3>Complete Privacy</h3>
                    <p class="feature-subtitle">Your data stays on your device</p>
                    <p>All entries are stored solely on your device with zero data collection. Protect access with Face ID, Touch ID, or a passcode. Export entries as JSON for safekeeping and restore only when you choose.</p>
                </div>
                <div class="feature-screenshots">
                    <img src="images/screenshots/privacy/1.png" alt="">
                    <img src="images/screenshots/privacy/2.png" alt="">
                    <img src="images/screenshots/privacy/3.png" alt="">
                    <img src="images/screenshots/privacy/4.png" alt="">
                    <img src="images/screenshots/privacy/5.png" alt="">
                </div>
            </div>

            <div id="calendar-schedule" class="feature-row">
                <div class="feature-card">
                    <h3>Calendar & Schedule View</h3>
                    <p class="feature-subtitle">Organize your entries visually</p>
                    <p>Access your entries through an intuitive calendar interface. Choose between list view for a chronological overview of selected days, or switch to schedule view for a graphical representation where each day is a column and entries are plotted by time. Tap any entry to reveal its contents, making it easy to find and review past entries.</p>
                </div>
                <div class="feature-screenshots">
                    <img src="images/screenshots/calendar-schedule/1.png" alt="">
                    <img src="images/screenshots/calendar-schedule/2.png" alt="">
                    <img src="images/screenshots/calendar-schedule/3.png" alt="">
                    <img src="images/screenshots/calendar-schedule/4.png" alt="">
                    <img src="images/screenshots/calendar-schedule/5.png" alt="">
                </div>
            </div>

            <div id="insights" class="feature-row">
                <div class="feature-card">
                    <h3>Insights</h3>
                    <p class="feature-subtitle">Track your progress and patterns</p>
                    <p>Monitor your writing habits with detailed insights. View your current streak and longest streak to stay motivated. Analyze your entry activity through an interactive graph that shows your writing patterns over time. Perfect for building and maintaining consistent journaling habits.</p>
                </div>
                <div class="feature-screenshots">
                    <img src="images/screenshots/insights/1.png" alt="">
                    <img src="images/screenshots/insights/2.png" alt="">
                    <img src="images/screenshots/insights/3.png" alt="">
                </div>
            </div>
        </section>
    `,

    contact: () => `
        <section id="contact" class="contact">
            <h2>Contact Us</h2>
            <div class="contact-form">
                <form id="contactForm" action="mailto:your-email@example.com" method="post" enctype="text/plain">
                    <div class="form-group">
                        <input type="text" id="name" name="name" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" placeholder="Your Message" required></textarea>
                    </div>
                    <button type="submit" class="submit-button">Send Message</button>
                </form>
            </div>
        </section>
    `,

    download: () => `
        <section id="download" class="download">
            <a href="#" class="download-button">Download Now</a>
            <p>Available on the App Store</p>
        </section>
    `,

    footer: () => `
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#contact">Contact</a>
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

// Function to handle section animations
function setupSectionAnimations() {
    const featureRows = document.querySelectorAll('.feature-row');
    const screenshots = document.querySelectorAll('.feature-screenshots');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('feature-row')) {
                    entry.target.classList.add('fade-in');
                } else if (entry.target.classList.contains('feature-screenshots')) {
                    const screenshots = entry.target.querySelectorAll('img');
                    const hasFanning = screenshots.length > 3;
                    
                    screenshots.forEach((screenshot, index) => {
                        setTimeout(() => {
                            if (hasFanning) {
                                screenshot.style.opacity = '1';
                                // Calculate rotation based on position
                                let rotation = 0;

                                if (screenshots.length == 5) {
                                    if (index === 0) rotation = -30;
                                    else if (index === 1) rotation = -15;
                                    else if (index === 2) rotation = 0;
                                    else if (index === 3) rotation = 15;
                                    else if (index === 4) rotation = 30;
                                } else if (screenshots.length == 7) {
                                    if (index === 0) rotation = -45;
                                    else if (index === 1) rotation = -25;
                                    else if (index === 2) rotation = -15;
                                    else if (index === 3) rotation = 0;
                                    else if (index === 4) rotation = 15;
                                    else if (index === 5) rotation = 30;
                                    else if (index === 6) rotation = 45;
                                }
                                screenshot.style.transform = `rotate(${rotation}deg)`;
                            } else {
                                screenshot.classList.add('fade-in');
                            }
                        }, index * 200);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    featureRows.forEach(row => {
        observer.observe(row);
    });

    screenshots.forEach(container => {
        observer.observe(container);
    });
}

function setupLogoClick() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function setupHeaderTransformation() {
    const header = document.querySelector('.header');
    const subtitle = document.querySelector('.subtitle');
    
    if (!header || !subtitle) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                header.classList.add('transformed');
            } else {
                header.classList.remove('transformed');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the subtitle is out of view
    });

    observer.observe(subtitle);
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
    
    // Setup animations after components are rendered
    setupSectionAnimations();

    // Setup feature dropdown functionality
    const featureLinks = document.querySelectorAll('.dropdown-content a[data-feature]');
    featureLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const feature = link.dataset.feature;
            const featureElement = document.getElementById(feature);
            
            if (featureElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = featureElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                featureElement.classList.add('highlight');
                setTimeout(() => {
                    featureElement.classList.remove('highlight');
                }, 2000);
            }
        });
    });

    // Setup theme dropdown functionality
    const themeLinks = document.querySelectorAll('.dropdown-content a[data-theme]');
    themeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const theme = link.dataset.theme;
            applyTheme(theme);
            localStorage.setItem('selectedTheme', theme);
        });
    });

    setupLogoClick();
    setupHeaderTransformation();
}

// Initialize components when the DOM is loaded
document.addEventListener('DOMContentLoaded', renderAllComponents);

// Add this at the end of the file, before the last closing brace
document.addEventListener('DOMContentLoaded', () => {
    // Initialize app icon carousel
    const appIcons = document.querySelectorAll('.app-icon-card');
    const carousel = document.querySelector('.app-icon-carousel');
    
    function updateCardPositions() {
        const cards = Array.from(carousel.children);
        cards.forEach((card, index) => {
            if (index === 0) {
                card.style.transform = 'rotate(0deg)';
                card.style.zIndex = '3';
            } else if (index === 1) {
                card.style.transform = 'rotate(-30deg)';
                card.style.zIndex = '2';
            } else {
                card.style.transform = 'rotate(-60deg)';
                card.style.zIndex = '1';
            }
        });
    }

    appIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const theme = icon.dataset.theme;
            
            // Remove the clicked card and add it to the front
            icon.remove();
            carousel.insertBefore(icon, carousel.firstChild);
            
            // Update all card positions
            updateCardPositions();
            
            // Apply the theme
            applyTheme(theme);
        });
    });
    
    // Set initial active state
    const savedTheme = localStorage.getItem('selectedTheme') || 'cloud';
    const activeIcon = document.querySelector(`.app-icon-card[data-theme="${savedTheme}"]`);
    if (activeIcon) {
        activeIcon.remove();
        carousel.insertBefore(activeIcon, carousel.firstChild);
        updateCardPositions();
    }

    // Add mobile navigation functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavHeaders = document.querySelectorAll('.mobile-nav-header');

    // Toggle mobile menu
    mobileMenuButton?.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Toggle mobile nav sections
    mobileNavHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const items = header.nextElementSibling;
            items.classList.toggle('active');
        });
    });

    // Mobile theme links
    const mobileThemeLinks = document.querySelectorAll('.mobile-nav [data-theme]');
    mobileThemeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const theme = link.dataset.theme;
            applyTheme(theme);
            localStorage.setItem('selectedTheme', theme);
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Mobile feature links
    const mobileFeatureLinks = document.querySelectorAll('.mobile-nav [data-feature]');
    mobileFeatureLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const feature = link.dataset.feature;
            const featureElement = document.getElementById(feature);
            if (featureElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = featureElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                featureElement.classList.add('highlight');
                setTimeout(() => {
                    featureElement.classList.remove('highlight');
                }, 2000);
            }
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !mobileMenuButton.contains(e.target)) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}); 