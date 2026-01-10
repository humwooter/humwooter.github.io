// components.js

// -----------------------------
// global app routing + assets
// -----------------------------
// -----------------------------
// global app routing + assets
// -----------------------------

// 1) try explicit app id (preferred)
const EXPLICIT_APP_ID =
  (window.__APP_ID__ || document.documentElement.dataset.appId || "").toString().trim();

// 2) fallback: infer app base from current URL (/logs/privacy.html -> "/logs")
const inferAppBaseFromPath = () => {
  const parts = window.location.pathname.split("/").filter(Boolean); // ["logs","privacy.html"]
  if (parts.length === 0) return ""; // site root
  // if we're already in an app folder, treat first segment as the app base
  // (works for /logs/* and /ostinuto/*)
  return `/${parts[0]}`;
};

const APP_BASE = EXPLICIT_APP_ID ? `/${EXPLICIT_APP_ID}` : inferAppBaseFromPath();

// html pages
const pagePath = (filename) => `${APP_BASE}/${filename}`;

// assets (png/svg/jpg/etc)
const assetPath = (relativePath) => `${APP_BASE}/${relativePath.replace(/^\/+/, "")}`;

// current page helpers
const currentFile = () => window.location.pathname.split("/").pop() || "index.html";
const isHomePage = () => {
  const p = window.location.pathname.replace(/\/+$/, "");
  return p === APP_BASE || p === `${APP_BASE}/index.html`;
};

// -----------------------------
// Component definitions
// -----------------------------
const components = {
  header: () => `
    <header class="header">
      <nav class="nav">
        <div class="nav-left">
          <div class="logo">
            <img src="${assetPath("images/logo_black.PNG")}" alt="" width="120" height="120">
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

          <div class="dropdown">
            <a href="#" class="dropdown-trigger">About</a>
            <div class="dropdown-content">
              <a href="${pagePath("contact.html")}">Contact</a>
              <a href="${pagePath("privacy.html")}">Privacy Policy</a>
            </div>
          </div>

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
            <div class="mobile-nav-header">About</div>
            <div class="mobile-nav-items">
              <a href="${pagePath("contact.html")}">Contact</a>
              <a href="${pagePath("privacy.html")}">Privacy Policy</a>
            </div>
          </div>

          <div class="mobile-nav-section">
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
        <p class="subtitle">Logs is a fully customizable and private digital pocketbook designed for minimal cognitive load. Its core experience centers around an intuitive daily view, showing only today's entries by default to keep you focused.</p>
      </div>

      <div class="hero-image">
        <div class="app-icon-carousel">
          <div class="app-icon-card" data-theme="cloud" style="transform: rotate(0deg); z-index: 3;">
            <img src="${assetPath("images/app icons/app_icon-1.png")}" alt="" class="app-icon">
          </div>
          <div class="app-icon-card" data-theme="chrome" style="transform: rotate(-30deg); z-index: 2;">
            <img src="${assetPath("images/app icons/app_icon-2.png")}" alt="" class="app-icon">
          </div>
          <div class="app-icon-card" data-theme="mocha" style="transform: rotate(-60deg); z-index: 1;">
            <img src="${assetPath("images/app icons/app_icon-3.png")}" alt="" class="app-icon">
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
          <img src="${assetPath("images/screenshots/minimal-cognitive/1.png")}" alt="">
          <img src="${assetPath("images/screenshots/minimal-cognitive/2.png")}" alt="">
          <img src="${assetPath("images/screenshots/minimal-cognitive/3.png")}" alt="">
        </div>
      </div>

      <div id="easy-creation" class="feature-row">
        <div class="feature-card">
          <h3>Easy Creation</h3>
          <p class="feature-subtitle">Write with confidence</p>
          <p>Create entries effortlessly with an intuitive writing interface. Quick actions let you add tags, attach to a folder, add a title, or attach media in a single tap.</p>
        </div>
        <div class="feature-screenshots">
          <img src="${assetPath("images/screenshots/easy-creation/1.png")}" alt="">
          <img src="${assetPath("images/screenshots/easy-creation/2.png")}" alt="">
          <img src="${assetPath("images/screenshots/easy-creation/3.png")}" alt="">
          <img src="${assetPath("images/screenshots/easy-creation/4.png")}" alt="">
          <img src="${assetPath("images/screenshots/easy-creation/5.png")}" alt="">
        </div>
      </div>

      <div id="stamps" class="feature-row">
        <div class="feature-card">
          <h3>Intuitive Stamps</h3>
          <p class="feature-subtitle">One-tap visual organization</p>
          <p>One-tap visual annotation with customizable icons and colors. Access stamps by swiping left on any entry. Each entry can have one stamp for clear visual cues. Fully personalize your stamp library with custom names, icons, colors, and folders.</p>
        </div>
        <div class="feature-screenshots">
          <img src="${assetPath("images/screenshots/stamps/1.png")}" alt="">
          <img src="${assetPath("images/screenshots/stamps/2.png")}" alt="">
          <img src="${assetPath("images/screenshots/stamps/3.png")}" alt="">
        </div>
      </div>

      <div id="customization" class="feature-row">
        <div class="feature-card">
          <h3>Extensive Customization</h3>
          <p class="feature-subtitle">Make it your own</p>
          <p>Choose from a variety of beautiful themes or create your own. Customize fonts, colors, and spacing to match your style. Adjust the interface to your preferences with flexible layout options.</p>
        </div>
        <div class="feature-screenshots">
          <img src="${assetPath("images/screenshots/customization/1.png")}" alt="">
          <img src="${assetPath("images/screenshots/customization/2.png")}" alt="">
          <img src="${assetPath("images/screenshots/customization/3.png")}" alt="">
          <img src="${assetPath("images/screenshots/customization/4.png")}" alt="">
          <img src="${assetPath("images/screenshots/customization/5.png")}" alt="">
        </div>
      </div>

      <div id="search-organization" class="feature-row">
        <div class="feature-card">
          <h3>Smart Search & Organization</h3>
          <p class="feature-subtitle">Find anything instantly</p>
          <p>Powerful search capabilities help you find entries quickly. Organize entries with custom tags and folders. Filter and sort your entries by date, stamps, or custom criteria.</p>
        </div>
        <div class="feature-screenshots">
          <img src="${assetPath("images/screenshots/search-organization/1.png")}" alt="">
          <img src="${assetPath("images/screenshots/search-organization/2.png")}" alt="">
          <img src="${assetPath("images/screenshots/search-organization/3.png")}" alt="">
          <img src="${assetPath("images/screenshots/search-organization/4.png")}" alt="">
          <img src="${assetPath("images/screenshots/search-organization/5.png")}" alt="">
          <img src="${assetPath("images/screenshots/search-organization/6.png")}" alt="">
          <img src="${assetPath("images/screenshots/search-organization/7.png")}" alt="">
        </div>
      </div>

      <div id="privacy" class="feature-row">
        <div class="feature-card">
          <h3>Complete Privacy</h3>
          <p class="feature-subtitle">Your data stays on your device</p>
          <p>All entries are stored solely on your device with zero data collection. Protect access with Face ID, Touch ID, or a passcode. Export entries as JSON for safekeeping and restore only when you choose.</p>
        </div>
        <div class="feature-screenshots">
          <img src="${assetPath("images/screenshots/privacy/1.png")}" alt="">
          <img src="${assetPath("images/screenshots/privacy/2.png")}" alt="">
          <img src="${assetPath("images/screenshots/privacy/3.png")}" alt="">
          <img src="${assetPath("images/screenshots/privacy/4.png")}" alt="">
          <img src="${assetPath("images/screenshots/privacy/5.png")}" alt="">
        </div>
      </div>

      <div id="calendar-schedule" class="feature-row">
        <div class="feature-card">
          <h3>Calendar & Schedule View</h3>
          <p class="feature-subtitle">Organize your entries visually</p>
          <p>Access your entries through an intuitive calendar interface. Choose between list view for a chronological overview of selected days, or switch to schedule view for a graphical representation where each day is a column and entries are plotted by time. Tap any entry to reveal its contents, making it easy to find and review past entries.</p>
        </div>
        <div class="feature-screenshots">
          <img src="${assetPath("images/screenshots/calendar-schedule/1.png")}" alt="">
          <img src="${assetPath("images/screenshots/calendar-schedule/2.png")}" alt="">
          <img src="${assetPath("images/screenshots/calendar-schedule/3.png")}" alt="">
          <img src="${assetPath("images/screenshots/calendar-schedule/4.png")}" alt="">
          <img src="${assetPath("images/screenshots/calendar-schedule/5.png")}" alt="">
        </div>
      </div>

      <div id="insights" class="feature-row">
        <div class="feature-card">
          <h3>Insights</h3>
          <p class="feature-subtitle">Track your progress and patterns</p>
          <p>Monitor your writing habits with detailed insights. View your current streak and longest streak to stay motivated. Analyze your entry activity through an interactive graph that shows your writing patterns over time. Perfect for building and maintaining consistent journaling habits.</p>
        </div>
        <div class="feature-screenshots">
          <img src="${assetPath("images/screenshots/insights/1.png")}" alt="">
          <img src="${assetPath("images/screenshots/insights/2.png")}" alt="">
          <img src="${assetPath("images/screenshots/insights/3.png")}" alt="">
        </div>
      </div>
    </section>
  `,

  contact: () => `
    <section id="contact" class="contact">
      <h2>Contact</h2>
      <div class="contact-content">
        <h3>Get in Touch</h3>
        <p>Email <a href="mailto:humwooter+support@gmail.com">humwooter+support@gmail.com</a> for further questions.</p>
      </div>
    </section>
  `,

  download: () => `
    <section id="download" class="download">
      <a href="https://apps.apple.com/us/app/iogs/id6480384141" class="download-button" target="_blank" rel="noopener noreferrer">Download Now</a>
      <p>Available on the App Store</p>
    </section>
  `,

  privacy: () => `
    <section id="privacy" class="privacy">
      <h2>Privacy Policy</h2>
      <div class="privacy-content">
        <h3>Your Privacy Matters</h3>
        <p>Logs is designed with privacy at its core. No data is ever collected, transmitted, or stored on servers.</p>

        <h4>Local Storage</h4>
        <p>All entries are stored locally on your device only.</p>

        <h4>No Data Collection</h4>
        <p>No usage tracking, analytics, or personal information is gathered. Your journal entries remain completely private.</p>

        <h4>Authentication</h4>
        <p>Protect your data with Face ID, Touch ID, or a passcode.</p>

        <h4>Data Control</h4>
        <p>Export entries as JSON files for safekeeping. You have full control over your data.</p>

        <h4>No Third-Party Access</h4>
        <p>Data is never shared with third parties.</p>

        <p class="last-updated">Last updated: ${new Date().toLocaleDateString()}</p>
      </div>
    </section>
  `,

  footer: () => `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <a href="${pagePath("privacy.html")}">Privacy Policy</a>
          <a href="${pagePath("contact.html")}">Contact</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} Logs. All rights reserved.</p>
      </div>
    </footer>
  `,
};

// -----------------------------
// rendering
// -----------------------------
function renderComponent(componentName, targetElement) {
  const component = components[componentName];
  if (component && targetElement) targetElement.innerHTML = component();
}

function setupSectionAnimations() {
  const featureRows = document.querySelectorAll(".feature-row");
  const screenshots = document.querySelectorAll(".feature-screenshots");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (entry.target.classList.contains("feature-row")) {
          entry.target.classList.add("fade-in");
        } else if (entry.target.classList.contains("feature-screenshots")) {
          const imgs = entry.target.querySelectorAll("img");
          const hasFanning = imgs.length > 3;

          imgs.forEach((img, index) => {
            setTimeout(() => {
              if (hasFanning) {
                img.style.opacity = "1";
                let rotation = 0;

                if (imgs.length === 5) {
                  if (index === 0) rotation = -30;
                  else if (index === 1) rotation = -15;
                  else if (index === 2) rotation = 0;
                  else if (index === 3) rotation = 15;
                  else if (index === 4) rotation = 30;
                } else if (imgs.length === 7) {
                  if (index === 0) rotation = -45;
                  else if (index === 1) rotation = -25;
                  else if (index === 2) rotation = -15;
                  else if (index === 3) rotation = 0;
                  else if (index === 4) rotation = 15;
                  else if (index === 5) rotation = 30;
                  else if (index === 6) rotation = 45;
                }

                img.style.transform = `rotate(${rotation}deg)`;
              } else {
                img.classList.add("fade-in");
              }
            }, index * 200);
          });
        }

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px" }
  );

  featureRows.forEach((row) => observer.observe(row));
  screenshots.forEach((container) => observer.observe(container));
}

function setupLogoClick() {
  const logo = document.querySelector(".logo");
  if (!logo) return;

  logo.addEventListener("click", (e) => {
    e.preventDefault();

    if (isHomePage()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.href = pagePath("index.html");
  });
}

function setupHeaderTransformation() {
  const header = document.querySelector(".header");
  if (!header) return;

  const subtitle = document.querySelector(".subtitle");
  const setTransformed = (on) => header.classList.toggle("transformed", on);

  const updateFromScroll = () => setTransformed(window.scrollY > 0);
  updateFromScroll();
  window.addEventListener("scroll", updateFromScroll, { passive: true });

  if (subtitle) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        setTransformed(!(visible && window.scrollY === 0));
      },
      { threshold: 0.1 }
    );
    observer.observe(subtitle);
  }
}

function scrollToFeature(feature) {
  const el = document.getElementById(feature);
  if (!el) return;

  const headerHeight = document.querySelector(".header")?.offsetHeight ?? 0;
  const elementPosition = el.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  el.classList.add("highlight");
  setTimeout(() => el.classList.remove("highlight"), 2000);
}

function handleFeatureScrollHash() {
  if (!window.location.hash.startsWith("#features?scroll=")) return;
  const feature = window.location.hash.split("=")[1];
  setTimeout(() => scrollToFeature(feature), 300);
}

function renderAllComponents() {
  Object.keys(components).forEach((name) => {
    const container = document.getElementById(`${name}-container`);
    if (container) renderComponent(name, container);
  });

  setupSectionAnimations();
  setupLogoClick();
  setupHeaderTransformation();
  handleFeatureScrollHash();
}

// -----------------------------
// init
// -----------------------------
document.addEventListener("DOMContentLoaded", renderAllComponents);

document.addEventListener("DOMContentLoaded", () => {
  // app icon carousel
  const appIcons = document.querySelectorAll(".app-icon-card");
  const carousel = document.querySelector(".app-icon-carousel");

  function updateCardPositions() {
    if (!carousel) return;
    const cards = Array.from(carousel.children);
    cards.forEach((card, index) => {
      if (index === 0) {
        card.style.transform = "rotate(0deg)";
        card.style.zIndex = "3";
      } else if (index === 1) {
        card.style.transform = "rotate(-30deg)";
        card.style.zIndex = "2";
      } else {
        card.style.transform = "rotate(-60deg)";
        card.style.zIndex = "1";
      }
    });
  }

  appIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const theme = icon.dataset.theme;
      icon.remove();
      carousel?.insertBefore(icon, carousel.firstChild);
      updateCardPositions();
      if (typeof applyTheme === "function" && theme) applyTheme(theme);
    });
  });

  const savedTheme = localStorage.getItem("selectedTheme") || "cloud";
  const activeIcon = document.querySelector(`.app-icon-card[data-theme="${savedTheme}"]`);
  if (activeIcon && carousel) {
    activeIcon.remove();
    carousel.insertBefore(activeIcon, carousel.firstChild);
    updateCardPositions();
  }

  // mobile nav behavior
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavHeaders = document.querySelectorAll(".mobile-nav-header");

  function ensureMenuState() {
    const isActive = mobileNav?.classList.contains("active");
    if (isActive) {
      mobileMenuButton?.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      mobileMenuButton?.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  mobileMenuButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileNav?.classList.toggle("active");
    ensureMenuState();
  });

  mobileNavHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const items = header.nextElementSibling;
      items?.classList.toggle("active");
    });
  });

  // mobile theme links
  document.querySelectorAll(".mobile-nav [data-theme]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const theme = link.dataset.theme;
      if (typeof applyTheme === "function" && theme) applyTheme(theme);
      if (theme) localStorage.setItem("selectedTheme", theme);
      mobileNav?.classList.remove("active");
      ensureMenuState();
    });
  });

  // mobile feature links
  document.querySelectorAll(".mobile-nav [data-feature]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const feature = link.dataset.feature;

      if (!isHomePage()) {
        window.location.href = `${pagePath("index.html")}#features?scroll=${feature}`;
      } else {
        if (feature) scrollToFeature(feature);
      }

      mobileNav?.classList.remove("active");
      ensureMenuState();
    });
  });

  // close mobile nav on any click
  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav?.classList.remove("active");
      ensureMenuState();
    });
  });

  // desktop theme links
  document.querySelectorAll(".desktop-only .dropdown-content a[data-theme]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const theme = link.dataset.theme;
      if (typeof applyTheme === "function" && theme) applyTheme(theme);
      if (theme) localStorage.setItem("selectedTheme", theme);
    });
  });

  // desktop feature links
  document.querySelectorAll(".desktop-only .dropdown-content a[data-feature]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const feature = link.dataset.feature;

      if (!isHomePage()) {
        window.location.href = `${pagePath("index.html")}#features?scroll=${feature}`;
      } else {
        if (feature) scrollToFeature(feature);
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!mobileNav || !mobileMenuButton) return;
    if (mobileNav.classList.contains("active") && !mobileNav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
      mobileNav.classList.remove("active");
      ensureMenuState();
    }
  });

  ensureMenuState();

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      mobileNav?.classList.remove("active");
      ensureMenuState();
    }
  });

  // download links (works on all pages)
  document.querySelectorAll('a[href="#download"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      if (!isHomePage()) {
        window.location.href = `${pagePath("index.html")}#download`;
      } else {
        const download = document.getElementById("download");
        download?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});