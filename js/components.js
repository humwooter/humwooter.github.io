// // components.js

// // -----------------------------
// // global app routing + assets
// // -----------------------------
// // -----------------------------
// // global app routing + assets
// // -----------------------------

// // 1) try explicit app id (preferred)
// const EXPLICIT_APP_ID =
//   (window.__APP_ID__ || document.documentElement.dataset.appId || "").toString().trim();

// // 2) fallback: infer app base from current URL (/logs/privacy.html -> "/logs")
// const inferAppBaseFromPath = () => {
//   const parts = window.location.pathname.split("/").filter(Boolean); // ["logs","privacy.html"]
//   if (parts.length === 0) return ""; // site root
//   // if we're already in an app folder, treat first segment as the app base
//   // (works for /logs/* and /ostinuto/*)
//   return `/${parts[0]}`;
// };

// const APP_BASE = EXPLICIT_APP_ID ? `/${EXPLICIT_APP_ID}` : inferAppBaseFromPath();

// // html pages
// const pagePath = (filename) => `${APP_BASE}/${filename}`;

// // assets (png/svg/jpg/etc)
// const assetPath = (relativePath) => `${APP_BASE}/${relativePath.replace(/^\/+/, "")}`;

// // current page helpers
// const currentFile = () => window.location.pathname.split("/").pop() || "index.html";
// const isHomePage = () => {
//   const p = window.location.pathname.replace(/\/+$/, "");
//   return p === APP_BASE || p === `${APP_BASE}/index.html`;
// };

// // -----------------------------
// // Component definitions
// // -----------------------------
// const components = {
//   header: () => `
//     <header class="header">
//       <nav class="nav">
//         <div class="nav-left">
//           <div class="logo">
//             <img src="${assetPath("images/logo_black.PNG")}" alt="" width="120" height="120">
//           </div>

//           <div class="dropdown desktop-only">
//             <a href="#" class="dropdown-trigger">Themes</a>
//             <div class="dropdown-content">
//               <a href="#" data-theme="cloud">Cloud</a>
//               <a href="#" data-theme="chrome">Chrome</a>
//               <a href="#" data-theme="mocha">Mocha</a>
//               <a href="#" data-theme="mag">Mag</a>
//               <a href="#" data-theme="wheatgrass">Wheatgrass</a>
//               <a href="#" data-theme="scarab">Scarab</a>
//             </div>
//           </div>
//         </div>

//         <div class="nav-links desktop-only">
//           <div class="dropdown">
//             <a href="#features" class="dropdown-trigger">Features</a>
//             <div class="dropdown-content">
//               <a href="#features" data-feature="minimal-cognitive">Minimal Cognitive Load</a>
//               <a href="#features" data-feature="easy-creation">Easy Creation</a>
//               <a href="#features" data-feature="stamps">Intuitive Stamps</a>
//               <a href="#features" data-feature="customization">Extensive Customization</a>
//               <a href="#features" data-feature="search-organization">Smart Search & Organization</a>
//               <a href="#features" data-feature="privacy">Complete Privacy</a>
//               <a href="#features" data-feature="calendar-schedule">Calendar & Schedule View</a>
//               <a href="#features" data-feature="insights">Insights</a>
//             </div>
//           </div>

//           <div class="dropdown">
//             <a href="#" class="dropdown-trigger">About</a>
//             <div class="dropdown-content">
//               <a href="${pagePath("contact.html")}">Contact</a>
//               <a href="${pagePath("privacy.html")}">Privacy Policy</a>
//             </div>
//           </div>

//           <a href="#download">Download</a>
//         </div>

//         <button class="mobile-menu-button">
//           <span></span>
//           <span></span>
//           <span></span>
//         </button>
//       </nav>

//       <div class="mobile-nav">
//         <div class="mobile-nav-content">

//           <div class="mobile-nav-section">
//             <div class="mobile-nav-header">Themes</div>
//             <div class="mobile-nav-items">
//               <a href="#" data-theme="cloud">Cloud</a>
//               <a href="#" data-theme="chrome">Chrome</a>
//               <a href="#" data-theme="mocha">Mocha</a>
//               <a href="#" data-theme="mag">Mag</a>
//               <a href="#" data-theme="wheatgrass">Wheatgrass</a>
//               <a href="#" data-theme="scarab">Scarab</a>
//             </div>
//           </div>

//           <div class="mobile-nav-section">
//             <div class="mobile-nav-header">Features</div>
//             <div class="mobile-nav-items">
//               <a href="#features" data-feature="minimal-cognitive">Minimal Cognitive Load</a>
//               <a href="#features" data-feature="easy-creation">Easy Creation</a>
//               <a href="#features" data-feature="stamps">Intuitive Stamps</a>
//               <a href="#features" data-feature="customization">Extensive Customization</a>
//               <a href="#features" data-feature="search-organization">Smart Search & Organization</a>
//               <a href="#features" data-feature="privacy">Complete Privacy</a>
//               <a href="#features" data-feature="calendar-schedule">Calendar & Schedule View</a>
//               <a href="#features" data-feature="insights">Insights</a>
//             </div>
//           </div>

//           <div class="mobile-nav-section">
//             <div class="mobile-nav-header">About</div>
//             <div class="mobile-nav-items">
//               <a href="${pagePath("contact.html")}">Contact</a>
//               <a href="${pagePath("privacy.html")}">Privacy Policy</a>
//             </div>
//           </div>

//           <div class="mobile-nav-section">
//             <a href="#download">Download</a>
//           </div>

//         </div>
//       </div>
//     </header>
//   `,

//   hero: () => `
//     <section class="hero">
//       <div class="hero-content">
//         <h1>Logs</h1>
//         <p class="subtitle">Logs is a fully customizable and private digital pocketbook designed for minimal cognitive load. Its core experience centers around an intuitive daily view, showing only today's entries by default to keep you focused.</p>
//       </div>

//       <div class="hero-image">
//         <div class="app-icon-carousel">
//           <div class="app-icon-card" data-theme="cloud" style="transform: rotate(0deg); z-index: 3;">
//             <img src="${assetPath("images/app icons/app_icon-1.png")}" alt="" class="app-icon">
//           </div>
//           <div class="app-icon-card" data-theme="chrome" style="transform: rotate(-30deg); z-index: 2;">
//             <img src="${assetPath("images/app icons/app_icon-2.png")}" alt="" class="app-icon">
//           </div>
//           <div class="app-icon-card" data-theme="mocha" style="transform: rotate(-60deg); z-index: 1;">
//             <img src="${assetPath("images/app icons/app_icon-3.png")}" alt="" class="app-icon">
//           </div>
//         </div>
//       </div>
//     </section>
//   `,

//   features: () => `
//     <section id="features" class="features">
//       <h2>Key Features</h2>

//       <div id="minimal-cognitive" class="feature-row">
//         <div class="feature-card">
//           <h3>Minimal Cognitive Load</h3>
//           <p class="feature-subtitle">Focus on what matters today</p>
//           <p>Default daily view opens directly to today's entries, minimizing clutter. Pin important entries to keep them in the main view across days. Clean, timestamped entries encourage effortless logging.</p>
//         </div>
//         <div class="feature-screenshots">
//           <img src="${assetPath("images/screenshots/minimal-cognitive/1.png")}" alt="">
//           <img src="${assetPath("images/screenshots/minimal-cognitive/2.png")}" alt="">
//           <img src="${assetPath("images/screenshots/minimal-cognitive/3.png")}" alt="">
//         </div>
//       </div>

//       <div id="easy-creation" class="feature-row">
//         <div class="feature-card">
//           <h3>Easy Creation</h3>
//           <p class="feature-subtitle">Write with confidence</p>
//           <p>Create entries effortlessly with an intuitive writing interface. Quick actions let you add tags, attach to a folder, add a title, or attach media in a single tap.</p>
//         </div>
//         <div class="feature-screenshots">
//           <img src="${assetPath("images/screenshots/easy-creation/1.png")}" alt="">
//           <img src="${assetPath("images/screenshots/easy-creation/2.png")}" alt="">
//           <img src="${assetPath("images/screenshots/easy-creation/3.png")}" alt="">
//           <img src="${assetPath("images/screenshots/easy-creation/4.png")}" alt="">
//           <img src="${assetPath("images/screenshots/easy-creation/5.png")}" alt="">
//         </div>
//       </div>

//       <div id="stamps" class="feature-row">
//         <div class="feature-card">
//           <h3>Intuitive Stamps</h3>
//           <p class="feature-subtitle">One-tap visual organization</p>
//           <p>One-tap visual annotation with customizable icons and colors. Access stamps by swiping left on any entry. Each entry can have one stamp for clear visual cues. Fully personalize your stamp library with custom names, icons, colors, and folders.</p>
//         </div>
//         <div class="feature-screenshots">
//           <img src="${assetPath("images/screenshots/stamps/1.png")}" alt="">
//           <img src="${assetPath("images/screenshots/stamps/2.png")}" alt="">
//           <img src="${assetPath("images/screenshots/stamps/3.png")}" alt="">
//         </div>
//       </div>

//       <div id="customization" class="feature-row">
//         <div class="feature-card">
//           <h3>Extensive Customization</h3>
//           <p class="feature-subtitle">Make it your own</p>
//           <p>Choose from a variety of beautiful themes or create your own. Customize fonts, colors, and spacing to match your style. Adjust the interface to your preferences with flexible layout options.</p>
//         </div>
//         <div class="feature-screenshots">
//           <img src="${assetPath("images/screenshots/customization/1.png")}" alt="">
//           <img src="${assetPath("images/screenshots/customization/2.png")}" alt="">
//           <img src="${assetPath("images/screenshots/customization/3.png")}" alt="">
//           <img src="${assetPath("images/screenshots/customization/4.png")}" alt="">
//           <img src="${assetPath("images/screenshots/customization/5.png")}" alt="">
//         </div>
//       </div>

//       <div id="search-organization" class="feature-row">
//         <div class="feature-card">
//           <h3>Smart Search & Organization</h3>
//           <p class="feature-subtitle">Find anything instantly</p>
//           <p>Powerful search capabilities help you find entries quickly. Organize entries with custom tags and folders. Filter and sort your entries by date, stamps, or custom criteria.</p>
//         </div>
//         <div class="feature-screenshots">
//           <img src="${assetPath("images/screenshots/search-organization/1.png")}" alt="">
//           <img src="${assetPath("images/screenshots/search-organization/2.png")}" alt="">
//           <img src="${assetPath("images/screenshots/search-organization/3.png")}" alt="">
//           <img src="${assetPath("images/screenshots/search-organization/4.png")}" alt="">
//           <img src="${assetPath("images/screenshots/search-organization/5.png")}" alt="">
//           <img src="${assetPath("images/screenshots/search-organization/6.png")}" alt="">
//           <img src="${assetPath("images/screenshots/search-organization/7.png")}" alt="">
//         </div>
//       </div>

//       <div id="privacy" class="feature-row">
//         <div class="feature-card">
//           <h3>Complete Privacy</h3>
//           <p class="feature-subtitle">Your data stays on your device</p>
//           <p>All entries are stored solely on your device with zero data collection. Protect access with Face ID, Touch ID, or a passcode. Export entries as JSON for safekeeping and restore only when you choose.</p>
//         </div>
//         <div class="feature-screenshots">
//           <img src="${assetPath("images/screenshots/privacy/1.png")}" alt="">
//           <img src="${assetPath("images/screenshots/privacy/2.png")}" alt="">
//           <img src="${assetPath("images/screenshots/privacy/3.png")}" alt="">
//           <img src="${assetPath("images/screenshots/privacy/4.png")}" alt="">
//           <img src="${assetPath("images/screenshots/privacy/5.png")}" alt="">
//         </div>
//       </div>

//       <div id="calendar-schedule" class="feature-row">
//         <div class="feature-card">
//           <h3>Calendar & Schedule View</h3>
//           <p class="feature-subtitle">Organize your entries visually</p>
//           <p>Access your entries through an intuitive calendar interface. Choose between list view for a chronological overview of selected days, or switch to schedule view for a graphical representation where each day is a column and entries are plotted by time. Tap any entry to reveal its contents, making it easy to find and review past entries.</p>
//         </div>
//         <div class="feature-screenshots">
//           <img src="${assetPath("images/screenshots/calendar-schedule/1.png")}" alt="">
//           <img src="${assetPath("images/screenshots/calendar-schedule/2.png")}" alt="">
//           <img src="${assetPath("images/screenshots/calendar-schedule/3.png")}" alt="">
//           <img src="${assetPath("images/screenshots/calendar-schedule/4.png")}" alt="">
//           <img src="${assetPath("images/screenshots/calendar-schedule/5.png")}" alt="">
//         </div>
//       </div>

//       <div id="insights" class="feature-row">
//         <div class="feature-card">
//           <h3>Insights</h3>
//           <p class="feature-subtitle">Track your progress and patterns</p>
//           <p>Monitor your writing habits with detailed insights. View your current streak and longest streak to stay motivated. Analyze your entry activity through an interactive graph that shows your writing patterns over time. Perfect for building and maintaining consistent journaling habits.</p>
//         </div>
//         <div class="feature-screenshots">
//           <img src="${assetPath("images/screenshots/insights/1.png")}" alt="">
//           <img src="${assetPath("images/screenshots/insights/2.png")}" alt="">
//           <img src="${assetPath("images/screenshots/insights/3.png")}" alt="">
//         </div>
//       </div>
//     </section>
//   `,

//   contact: () => `
//     <section id="contact" class="contact">
//       <h2>Contact</h2>
//       <div class="contact-content">
//         <h3>Get in Touch</h3>
//         <p>Email <a href="mailto:humwooter+support@gmail.com">humwooter+support@gmail.com</a> for further questions.</p>
//       </div>
//     </section>
//   `,

//   download: () => `
//     <section id="download" class="download">
//       <a href="https://apps.apple.com/us/app/iogs/id6480384141" class="download-button" target="_blank" rel="noopener noreferrer">Download Now</a>
//       <p>Available on the App Store</p>
//     </section>
//   `,

//   privacy: () => `
//     <section id="privacy" class="privacy">
//       <h2>Privacy Policy</h2>
//       <div class="privacy-content">
//         <h3>Your Privacy Matters</h3>
//         <p>Logs is designed with privacy at its core. No data is ever collected, transmitted, or stored on servers.</p>

//         <h4>Local Storage</h4>
//         <p>All entries are stored locally on your device only.</p>

//         <h4>No Data Collection</h4>
//         <p>No usage tracking, analytics, or personal information is gathered. Your journal entries remain completely private.</p>

//         <h4>Authentication</h4>
//         <p>Protect your data with Face ID, Touch ID, or a passcode.</p>

//         <h4>Data Control</h4>
//         <p>Export entries as JSON files for safekeeping. You have full control over your data.</p>

//         <h4>No Third-Party Access</h4>
//         <p>Data is never shared with third parties.</p>

//         <p class="last-updated">Last updated: ${new Date().toLocaleDateString()}</p>
//       </div>
//     </section>
//   `,

//   footer: () => `
//     <footer class="footer">
//       <div class="footer-content">
//         <div class="footer-links">
//           <a href="${pagePath("privacy.html")}">Privacy Policy</a>
//           <a href="${pagePath("contact.html")}">Contact</a>
//         </div>
//         <p>&copy; ${new Date().getFullYear()} Logs. All rights reserved.</p>
//       </div>
//     </footer>
//   `,
// };

// // -----------------------------
// // rendering
// // -----------------------------
// function renderComponent(componentName, targetElement) {
//   const component = components[componentName];
//   if (component && targetElement) targetElement.innerHTML = component();
// }

// function setupSectionAnimations() {
//   const featureRows = document.querySelectorAll(".feature-row");
//   const screenshots = document.querySelectorAll(".feature-screenshots");

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (!entry.isIntersecting) return;

//         if (entry.target.classList.contains("feature-row")) {
//           entry.target.classList.add("fade-in");
//         } else if (entry.target.classList.contains("feature-screenshots")) {
//           const imgs = entry.target.querySelectorAll("img");
//           const hasFanning = imgs.length > 3;

//           imgs.forEach((img, index) => {
//             setTimeout(() => {
//               if (hasFanning) {
//                 img.style.opacity = "1";
//                 let rotation = 0;

//                 if (imgs.length === 5) {
//                   if (index === 0) rotation = -30;
//                   else if (index === 1) rotation = -15;
//                   else if (index === 2) rotation = 0;
//                   else if (index === 3) rotation = 15;
//                   else if (index === 4) rotation = 30;
//                 } else if (imgs.length === 7) {
//                   if (index === 0) rotation = -45;
//                   else if (index === 1) rotation = -25;
//                   else if (index === 2) rotation = -15;
//                   else if (index === 3) rotation = 0;
//                   else if (index === 4) rotation = 15;
//                   else if (index === 5) rotation = 30;
//                   else if (index === 6) rotation = 45;
//                 }

//                 img.style.transform = `rotate(${rotation}deg)`;
//               } else {
//                 img.classList.add("fade-in");
//               }
//             }, index * 200);
//           });
//         }

//         observer.unobserve(entry.target);
//       });
//     },
//     { threshold: 0.1, rootMargin: "0px" }
//   );

//   featureRows.forEach((row) => observer.observe(row));
//   screenshots.forEach((container) => observer.observe(container));
// }

// function setupLogoClick() {
//   const logo = document.querySelector(".logo");
//   if (!logo) return;

//   logo.addEventListener("click", (e) => {
//     e.preventDefault();

//     if (isHomePage()) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }

//     window.location.href = pagePath("index.html");
//   });
// }

// function setupHeaderTransformation() {
//   const header = document.querySelector(".header");
//   if (!header) return;

//   const subtitle = document.querySelector(".subtitle");
//   const setTransformed = (on) => header.classList.toggle("transformed", on);

//   const updateFromScroll = () => setTransformed(window.scrollY > 0);
//   updateFromScroll();
//   window.addEventListener("scroll", updateFromScroll, { passive: true });

//   if (subtitle) {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const visible = entries[0]?.isIntersecting ?? false;
//         setTransformed(!(visible && window.scrollY === 0));
//       },
//       { threshold: 0.1 }
//     );
//     observer.observe(subtitle);
//   }
// }

// function scrollToFeature(feature) {
//   const el = document.getElementById(feature);
//   if (!el) return;

//   const headerHeight = document.querySelector(".header")?.offsetHeight ?? 0;
//   const elementPosition = el.getBoundingClientRect().top;
//   const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

//   window.scrollTo({ top: offsetPosition, behavior: "smooth" });
//   el.classList.add("highlight");
//   setTimeout(() => el.classList.remove("highlight"), 2000);
// }

// function handleFeatureScrollHash() {
//   if (!window.location.hash.startsWith("#features?scroll=")) return;
//   const feature = window.location.hash.split("=")[1];
//   setTimeout(() => scrollToFeature(feature), 300);
// }

// function renderAllComponents() {
//   Object.keys(components).forEach((name) => {
//     const container = document.getElementById(`${name}-container`);
//     if (container) renderComponent(name, container);
//   });

//   setupSectionAnimations();
//   setupLogoClick();
//   setupHeaderTransformation();
//   handleFeatureScrollHash();
// }

// // -----------------------------
// // init
// // -----------------------------
// document.addEventListener("DOMContentLoaded", renderAllComponents);

// document.addEventListener("DOMContentLoaded", () => {
//   // app icon carousel
//   const appIcons = document.querySelectorAll(".app-icon-card");
//   const carousel = document.querySelector(".app-icon-carousel");

//   function updateCardPositions() {
//     if (!carousel) return;
//     const cards = Array.from(carousel.children);
//     cards.forEach((card, index) => {
//       if (index === 0) {
//         card.style.transform = "rotate(0deg)";
//         card.style.zIndex = "3";
//       } else if (index === 1) {
//         card.style.transform = "rotate(-30deg)";
//         card.style.zIndex = "2";
//       } else {
//         card.style.transform = "rotate(-60deg)";
//         card.style.zIndex = "1";
//       }
//     });
//   }

//   appIcons.forEach((icon) => {
//     icon.addEventListener("click", () => {
//       const theme = icon.dataset.theme;
//       icon.remove();
//       carousel?.insertBefore(icon, carousel.firstChild);
//       updateCardPositions();
//       if (typeof applyTheme === "function" && theme) applyTheme(theme);
//     });
//   });

//   const savedTheme = localStorage.getItem("selectedTheme") || "cloud";
//   const activeIcon = document.querySelector(`.app-icon-card[data-theme="${savedTheme}"]`);
//   if (activeIcon && carousel) {
//     activeIcon.remove();
//     carousel.insertBefore(activeIcon, carousel.firstChild);
//     updateCardPositions();
//   }

//   // mobile nav behavior
//   const mobileMenuButton = document.querySelector(".mobile-menu-button");
//   const mobileNav = document.querySelector(".mobile-nav");
//   const mobileNavHeaders = document.querySelectorAll(".mobile-nav-header");

//   function ensureMenuState() {
//     const isActive = mobileNav?.classList.contains("active");
//     if (isActive) {
//       mobileMenuButton?.classList.add("active");
//       document.body.style.overflow = "hidden";
//     } else {
//       mobileMenuButton?.classList.remove("active");
//       document.body.style.overflow = "";
//     }
//   }

//   mobileMenuButton?.addEventListener("click", (e) => {
//     e.stopPropagation();
//     mobileNav?.classList.toggle("active");
//     ensureMenuState();
//   });

//   mobileNavHeaders.forEach((header) => {
//     header.addEventListener("click", () => {
//       const items = header.nextElementSibling;
//       items?.classList.toggle("active");
//     });
//   });

//   // mobile theme links
//   document.querySelectorAll(".mobile-nav [data-theme]").forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       const theme = link.dataset.theme;
//       if (typeof applyTheme === "function" && theme) applyTheme(theme);
//       if (theme) localStorage.setItem("selectedTheme", theme);
//       mobileNav?.classList.remove("active");
//       ensureMenuState();
//     });
//   });

//   // mobile feature links
//   document.querySelectorAll(".mobile-nav [data-feature]").forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       const feature = link.dataset.feature;

//       if (!isHomePage()) {
//         window.location.href = `${pagePath("index.html")}#features?scroll=${feature}`;
//       } else {
//         if (feature) scrollToFeature(feature);
//       }

//       mobileNav?.classList.remove("active");
//       ensureMenuState();
//     });
//   });

//   // close mobile nav on any click
//   document.querySelectorAll(".mobile-nav a").forEach((link) => {
//     link.addEventListener("click", () => {
//       mobileNav?.classList.remove("active");
//       ensureMenuState();
//     });
//   });

//   // desktop theme links
//   document.querySelectorAll(".desktop-only .dropdown-content a[data-theme]").forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       const theme = link.dataset.theme;
//       if (typeof applyTheme === "function" && theme) applyTheme(theme);
//       if (theme) localStorage.setItem("selectedTheme", theme);
//     });
//   });

//   // desktop feature links
//   document.querySelectorAll(".desktop-only .dropdown-content a[data-feature]").forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       const feature = link.dataset.feature;

//       if (!isHomePage()) {
//         window.location.href = `${pagePath("index.html")}#features?scroll=${feature}`;
//       } else {
//         if (feature) scrollToFeature(feature);
//       }
//     });
//   });

//   document.addEventListener("click", (e) => {
//     if (!mobileNav || !mobileMenuButton) return;
//     if (mobileNav.classList.contains("active") && !mobileNav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
//       mobileNav.classList.remove("active");
//       ensureMenuState();
//     }
//   });

//   ensureMenuState();

//   window.addEventListener("resize", () => {
//     if (window.innerWidth > 900) {
//       mobileNav?.classList.remove("active");
//       ensureMenuState();
//     }
//   });

//   // download links (works on all pages)
//   document.querySelectorAll('a[href="#download"]').forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();

//       if (!isHomePage()) {
//         window.location.href = `${pagePath("index.html")}#download`;
//       } else {
//         const download = document.getElementById("download");
//         download?.scrollIntoView({ behavior: "smooth" });
//       }
//     });
//   });
// });


// -----------------------------
// app base + paths
// -----------------------------

// build tag for cache-busting / sanity checks
console.log("[components] build:", "2026-01-20 details-root+navflags+portfoliooverride+downloadhash-v6");

const EXPLICIT_APP_ID = (window.__APP_ID__ || document.documentElement.dataset.appId || "")
  .toString()
  .trim();

const safeStr = (v, fallback = "") => (typeof v === "string" && v.trim() ? v.trim() : fallback);
const normalize = (s) => (typeof s === "string" ? s.trim() : "");

function computeAppBase() {
  const appId = normalize(EXPLICIT_APP_ID);
  const parts = window.location.pathname.split("/").filter(Boolean);

  if (appId) {
    const idx = parts.findIndex((p) => p.toLowerCase() === appId.toLowerCase());
    if (idx >= 0) return `/${parts.slice(0, idx + 1).join("/")}`;
    return `/${appId}`;
  }

  if (parts.length === 0) return "";
  return `/${parts[0]}`;
}

// must be mutable so the real app base can be discovered from details.json location
let APP_BASE = computeAppBase();

const pagePath = (filename) => `${APP_BASE}/${String(filename || "").replace(/^\/+/, "")}`;
const assetPath = (relativePath) => `${APP_BASE}/${String(relativePath || "").replace(/^\/+/, "")}`;

function resolveAsset(src) {
  const s = safeStr(src, "");
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/")) return s;
  return assetPath(s);
}

const isHomePage = () => {
  const p = window.location.pathname.replace(/\/+$/, "");
  return p === APP_BASE || p === `${APP_BASE}/index.html`;
};

function isHomeApp() {
  return safeStr(EXPLICIT_APP_ID, "").toLowerCase() === "home";
}

let SITE = null;

// tolerate boolean flags stored as true/false or "true"/"false"
const asBool = (v, fallback = false) => {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (s === "true") return true;
    if (s === "false") return false;
  }
  return fallback;
};

// nav flags (each is independently controllable)
function shouldShowAbout() {
  return asBool(SITE?.nav?.showAbout, false);
}

function shouldShowContact() {
  return asBool(SITE?.nav?.showContact, false);
}

function shouldShowPortfolio() {
  return asBool(SITE?.nav?.showPortfolio, false);
}

function shouldShowDownload() {
  return asBool(SITE?.nav?.showDownload, false);
}

function getPortfolioHref() {
  return safeStr(SITE?.nav?.portfolioHref, "/home/");
}

// portfolio replaces download when portfolio is the only nav action enabled
function shouldUsePortfolioAsPrimaryAction() {
  const about = shouldShowAbout();
  const contact = shouldShowContact();
  const portfolio = shouldShowPortfolio();
  const download = shouldShowDownload();

  // portfolio wins only when it is the only enabled action and about is disabled
  return portfolio && !about && !contact && !download;
}

// progressively try parent directories to find the app-level details.json
function getDetailsCandidates() {
  const origin = window.location.origin;
  const path = window.location.pathname;

  // current directory, without the filename
  const parts = path.split("/").filter(Boolean);
  if (parts.length && parts[parts.length - 1].includes(".")) parts.pop();

  const bases = [];
  for (let i = parts.length; i >= 0; i--) {
    const basePath = "/" + parts.slice(0, i).join("/");
    const normalized = basePath === "/" ? "" : basePath;
    bases.push(`${origin}${normalized}/details.json`);
  }

  // also try the computed app base path explicitly (covers cases where url nesting is weird)
  const computed = `${origin}${APP_BASE}/details.json`;
  if (!bases.includes(computed)) bases.unshift(computed);

  // de-dupe while preserving order
  return Array.from(new Set(bases));
}

async function loadDetails() {
  const bust = `v=${Date.now()}`;
  const candidates = getDetailsCandidates().map((u) => `${u}?${bust}`);

  let lastErr = null;

  for (const url of candidates) {
    try {
      console.log("[details] try:", url);
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) throw new Error(`failed to load ${url} (${res.status})`);
      const json = await res.json();

      // lock app base to the directory that actually contains details.json
      const baseDir = new URL("./", url);
      APP_BASE = baseDir.pathname.replace(/\/+$/, "");

      console.log("[details] loaded from:", url);
      console.log("[details] resolved app base:", APP_BASE);
      return json;
    } catch (e) {
      lastErr = e;
      console.warn("[details] failed:", url, e);
    }
  }

  throw lastErr || new Error("failed to load details.json");
}

function getAppName() {
  return safeStr(SITE?.appName, safeStr(SITE?.hero?.title, "App"));
}

function getSupportEmail() {
  return safeStr(SITE?.supportEmail, safeStr(SITE?.links?.supportEmail, "humwooter+support@gmail.com"));
}

function getAppStoreUrl() {
  return safeStr(SITE?.appStoreUrl, safeStr(SITE?.links?.appStore, "#"));
}

function getLogoPath() {
  return assetPath("images/logo_black.PNG");
}

function getHeroSubtitle() {
  return safeStr(SITE?.hero?.subtitle, "");
}

function getHeroTitle() {
  return safeStr(SITE?.hero?.title, getAppName());
}

function getFooterName() {
  return safeStr(SITE?.footerName, safeStr(SITE?.footer?.copyright, getAppName()));
}

function getDefaultTheme() {
  const saved = safeStr(localStorage.getItem("selectedTheme"), "");
  if (saved) return saved;

  const siteThemes = Array.isArray(SITE?.themes) ? SITE.themes : [];
  const firstTheme = safeStr(siteThemes?.[0]?.id, "");
  if (firstTheme) return firstTheme;

  const heroIcons = Array.isArray(SITE?.hero?.icons) ? SITE.hero.icons : [];
  const firstIconTheme = safeStr(heroIcons?.[0]?.theme, "");
  if (firstIconTheme) return firstIconTheme;

  return "cloud";
}

function getStoreLabel() {
  const appId = safeStr(EXPLICIT_APP_ID, "").toLowerCase();
  if (appId === "ostinuto") return "TestFlight";
  return "the App Store";
}

function renderAppsLinks() {
  const apps = Array.isArray(SITE?.nav?.apps) ? SITE.nav.apps : [];
  if (!apps.length) return "";

  return apps
    .map((a) => {
      const label = safeStr(a?.label);
      const href = safeStr(a?.href);
      if (!label || !href) return "";
      return `<a href="${href}" data-nav="page">${label}</a>`;
    })
    .join("");
}

function renderResumeLink() {
  const label = safeStr(SITE?.nav?.resume?.label, "");
  const href = safeStr(SITE?.nav?.resume?.href, "");
  if (!label || !href) return "";
  return `<a href="${href}" data-nav="page">${label}</a>`;
}

function renderThemeLinks() {
  const themes = Array.isArray(SITE?.themes) ? SITE.themes : [];
  if (!themes.length) return "";

  return themes
    .map((t) => {
      const id = safeStr(t?.id);
      const label = safeStr(t?.label, id);
      if (!id) return "";
      return `<a href="#" data-theme="${id}">${label}</a>`;
    })
    .join("");
}

function renderFeatureLinks() {
  const features = Array.isArray(SITE?.features) ? SITE.features : [];
  if (!features.length) return "";

  return features
    .map((f) => {
      const id = safeStr(f?.id);
      const label = safeStr(f?.label, id);
      if (!id) return "";
      return `<a href="#features" data-feature="${id}">${label}</a>`;
    })
    .join("");
}


function renderButtons() {
  const buttons = Array.isArray(SITE?.buttons) ? SITE.buttons : [];
  if (!buttons.length) return "";

  const items = buttons
    .map((b) => {
      const label = safeStr(b?.label, "");
      const href = safeStr(b?.href, "");
      const src = safeStr(b?.src, "");
      if (!href || !src) return "";

      const newTab = asBool(b?.newTab, true);
      const targetAttr = newTab ? ` target="_blank" rel="noopener noreferrer"` : "";

      return `
        <a class="button-link" href="${href}"${targetAttr} aria-label="${label}">
          <img src="${resolveAsset(src)}" alt="${label}">
          ${label ? `<span>${label}</span>` : ""}
        </a>
      `;
    })
    .join("");

  if (!items) return "";
  return `<section id="buttons" class="buttons-row">${items}</section>`;
}


function getHeroIconsList() {
  const icons = Array.isArray(SITE?.hero?.icons) ? SITE.hero.icons : [];
  const cleaned = icons
    .map((it) => ({
      src: safeStr(it?.src, ""),
      theme: safeStr(it?.theme, ""),
    }))
    .filter((it) => !!it.src);

  if (cleaned.length) return cleaned;

  return [
    { src: "images/app icons/app_icon-1.png", theme: "cloud" },
    { src: "images/app icons/app_icon-2.png", theme: "chrome" },
    { src: "images/app icons/app_icon-3.png", theme: "mocha" },
  ];
}

function renderHeroIcons() {
  if (isHomeApp()) return "";

  const icons = getHeroIconsList();
  if (!icons.length) return "";

  const cards = icons
    .map((it, index) => {
      const rotation = -30 * index;
      const z = icons.length - index;
      const themeAttr = it.theme ? `data-theme="${it.theme}"` : "";
      return `
        <div class="app-icon-card" ${themeAttr} style="transform: rotate(${rotation}deg); z-index: ${z};">
          <img src="${resolveAsset(it.src)}" alt="" class="app-icon">
        </div>
      `;
    })
    .join("");

  return `<div class="app-icon-carousel">${cards}</div>`;
}

function getHomeAppsCarouselList() {
  const items = Array.isArray(SITE?.hero?.appsCarousel) ? SITE.hero.appsCarousel : [];
  return items
    .map((it) => ({
      src: safeStr(it?.src, ""),
      href: safeStr(it?.href, ""),
      label: safeStr(it?.label, ""),
      theme: safeStr(it?.theme, ""),
    }))
    .filter((it) => !!it.src && !!it.href);
}

function renderHomeAppsCarousel() {
  if (!isHomeApp()) return "";

  const items = getHomeAppsCarouselList();
  if (!items.length) return "";

  const cards = items
    .map((it, index) => {
      const rotation = -30 * index;
      const z = items.length - index;
      const hrefAttr = `data-href="${it.href}"`;
      const themeAttr = it.theme ? `data-theme="${it.theme}"` : "";
      const labelAttr = it.label ? `aria-label="${it.label}"` : `aria-label="Open app"`;

      return `
        <div class="app-icon-card" ${hrefAttr} ${themeAttr}
             style="transform: rotate(${rotation}deg); z-index: ${z};"
             role="link" tabindex="0" ${labelAttr}>
          <img src="${resolveAsset(it.src)}" alt="" class="app-icon">
        </div>
      `;
    })
    .join("");

  return `<div class="app-icon-carousel home-apps-carousel">${cards}</div>`;
}

function renderFeatureRows() {
  if (isHomeApp()) return "";

  const features = Array.isArray(SITE?.features) ? SITE.features : [];
  if (!features.length) return "";

  const screenshotsFor = (featureId, screens) => {
    const n = Math.max(0, Number(screens || 0));
    if (!featureId || !n) return "";

    const imgs = [];
    for (let i = 1; i <= n; i++) {
      imgs.push(`<img src="${resolveAsset(`images/screenshots/${featureId}/${i}.png`)}" alt="">`);
    }
    return imgs.join("");
  };

  return features
    .map((f) => {
      const id = safeStr(f?.id);
      if (!id) return "";

      const label = safeStr(f?.label, id);
      const subtitle = safeStr(f?.subtitle, "");
      const text = safeStr(f?.text, "");
      const screens = Number(f?.screens || 0);

      return `
        <div id="${id}" class="feature-row">
          <div class="feature-card">
            <h3>${label}</h3>
            ${subtitle ? `<p class="feature-subtitle">${subtitle}</p>` : ""}
            ${text ? `<p>${text}</p>` : ""}
          </div>
          ${screens > 0 ? `<div class="feature-screenshots">${screenshotsFor(id, screens)}</div>` : ""}
        </div>
      `;
    })
    .join("");
}

const components = {
  header: () => {
    const home = isHomeApp();

    // About/Download/Portfolio are for non-home apps
    const showAbout = !home && shouldShowAbout();
    const showDownload = !home && shouldShowDownload();
    const showPortfolio = !home && shouldShowPortfolio();

    // portfolio primary action replaces download when portfolio is the only enabled action
    const usePortfolioPrimary = !home && shouldUsePortfolioAsPrimaryAction();

    const themes = renderThemeLinks();
    const features = home ? "" : renderFeatureLinks();

    const apps = home ? renderAppsLinks() : "";
    const resume = home ? renderResumeLink() : "";

    const themesDropdown = themes
      ? `
        <div class="dropdown desktop-only">
          <a href="#" class="dropdown-trigger">Themes</a>
          <div class="dropdown-content">${themes}</div>
        </div>
      `
      : "";

    const appsDropdownRight = apps
      ? `
        <div class="dropdown desktop-only">
          <a href="#" class="dropdown-trigger">My Apps</a>
          <div class="dropdown-content">${apps}</div>
        </div>
      `
      : "";

    const featuresDropdown = features
      ? `
        <div class="dropdown">
          <a href="#features" class="dropdown-trigger">Features</a>
          <div class="dropdown-content">${features}</div>
        </div>
      `
      : "";

    const mobileApps = apps
      ? `
        <div class="mobile-nav-section">
          <div class="mobile-nav-header">My Apps</div>
          <div class="mobile-nav-items">${apps}</div>
        </div>
      `
      : "";

    const mobileThemes = themes
      ? `
        <div class="mobile-nav-section">
          <div class="mobile-nav-header">Themes</div>
          <div class="mobile-nav-items">${themes}</div>
        </div>
      `
      : "";

    const mobileFeatures = features
      ? `
        <div class="mobile-nav-section">
          <div class="mobile-nav-header">Features</div>
          <div class="mobile-nav-items">${features}</div>
        </div>
      `
      : "";

    const resumeDesktop = resume
      ? `<a href="${safeStr(SITE?.nav?.resume?.href)}">${safeStr(SITE?.nav?.resume?.label)}</a>`
      : "";

    const resumeMobile = resume
      ? `
        <div class="mobile-nav-section">
          <a href="${safeStr(SITE?.nav?.resume?.href)}">${safeStr(SITE?.nav?.resume?.label)}</a>
        </div>
      `
      : "";

    const aboutLinksDesktop = (() => {
      if (!showAbout) return "";

      const items = [];

      if (shouldShowContact()) items.push(`<a href="${pagePath("contact.html")}">Contact</a>`);
      items.push(`<a href="${pagePath("privacy.html")}">Privacy Policy</a>`);
      if (showPortfolio) items.push(`<a href="${getPortfolioHref()}">Other works</a>`);

      const content = items.join("");
      if (!content) return "";

      return `
        <div class="dropdown">
          <a href="#" class="dropdown-trigger">About</a>
          <div class="dropdown-content">${content}</div>
        </div>
      `;
    })();

    const aboutLinksMobile = (() => {
      if (!showAbout) return "";

      const items = [];

      if (shouldShowContact()) items.push(`<a href="${pagePath("contact.html")}">Contact</a>`);
      if (showPortfolio) items.push(`<a href="${getPortfolioHref()}">Other works</a>`);
      items.push(`<a href="${pagePath("privacy.html")}">Privacy Policy</a>`);

      const content = items.join("");
      if (!content) return "";

      return `
        <div class="mobile-nav-section">
          <div class="mobile-nav-header">About</div>
          <div class="mobile-nav-items">${content}</div>
        </div>
      `;
    })();

    // download must always target index.html#download so it works from any page
    const downloadHref = `${pagePath("index.html")}#download`;

    // primary action slot (download or portfolio)
    const primaryDesktop = (() => {
      if (usePortfolioPrimary) return `<a href="${getPortfolioHref()}" data-nav="page">Portfolio</a>`;
      if (showDownload) return `<a href="${downloadHref}" data-nav-download="1">Download</a>`;
      return "";
    })();

    const primaryMobile = (() => {
      if (usePortfolioPrimary) {
        return `<div class="mobile-nav-section"><a href="${getPortfolioHref()}" data-nav="page">Portfolio</a></div>`;
      }
      if (showDownload) {
        return `<div class="mobile-nav-section"><a href="${downloadHref}" data-nav-download="1">Download</a></div>`;
      }
      return "";
    })();

    return `
      <header class="header">
        <nav class="nav">
          <div class="nav-left">
            <div class="logo">
              <img src="${getLogoPath()}" alt="" width="120" height="120">
            </div>
            ${themesDropdown}
          </div>

          <div class="nav-links desktop-only">
            ${home ? appsDropdownRight : featuresDropdown}
            ${aboutLinksDesktop}
            ${primaryDesktop}
            ${home ? resumeDesktop : ""}
          </div>

          <button class="mobile-menu-button">
            <span></span><span></span><span></span>
          </button>
        </nav>

        <div class="mobile-nav">
          <div class="mobile-nav-content">
            ${mobileApps}
            ${mobileThemes}
            ${mobileFeatures}
            ${aboutLinksMobile}
            ${home ? resumeMobile : ""}
            ${primaryMobile}
          </div>
        </div>
      </header>
    `;
  },

  hero: () => {
    if (isHomeApp()) return "";
    return `
      <section class="hero">
        <div class="hero-content">
          <h1>${getHeroTitle()}</h1>
          <p class="subtitle">${getHeroSubtitle()}</p>
        </div>

        <div class="hero-image">
          ${renderHeroIcons()}
        </div>
      </section>
    `;
  },

  buttons: () => {
    return renderButtons();
  },

  features: () => {
    if (isHomeApp()) return "";
    const rows = renderFeatureRows();
    if (!rows) return "";

    const title = safeStr(SITE?.featuresTitle, "Key Features");

    return `
      <section id="features" class="features">
        <h2>${title}</h2>
        ${rows}
      </section>
    `;
  },

  contact: () => `
    <section id="contact" class="contact">
      <h2>Contact</h2>
      <div class="contact-content">
        <h3>Get in Touch</h3>
        <p>Email <a href="mailto:${getSupportEmail()}">${getSupportEmail()}</a> for further questions.</p>
      </div>
    </section>
  `,

  // hide entire download section unless explicitly enabled
  download: () => {
    if (isHomeApp()) return "";
    if (!shouldShowDownload()) return "";

    const storeLabel = getStoreLabel();

    return `
      <section id="download" class="download">
        <a href="${getAppStoreUrl()}" class="download-button" target="_blank" rel="noopener noreferrer">
          Download Now
        </a>
        <p>Available on ${storeLabel}</p>
      </section>
    `;
  },

  privacy: () => "",

  footer: () => `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <a href="${pagePath("privacy.html")}">Privacy Policy</a>
          <a href="${pagePath("contact.html")}">Contact</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} ${getFooterName()}. All rights reserved.</p>
      </div>
    </footer>
  `,
};

function setupSectionAnimations() {
  const featureRows = document.querySelectorAll(".feature-row");
  const screenshots = document.querySelectorAll(".feature-screenshots");
  if (!featureRows.length && !screenshots.length) return;

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

  const isMobile = window.matchMedia("(2000px)").matches;
  if (isMobile) {
    header.classList.remove("transformed");
    return;
  }

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

// ensure clicking Download works from any page; also smooth-scroll when already on index
function setupDownloadNav() {
  const downloadHref = `${pagePath("index.html")}#download`;

  // normalize any legacy links to the absolute index#download target
  document.querySelectorAll('a[href="#download"]').forEach((a) => {
    a.setAttribute("href", downloadHref);
    a.setAttribute("data-nav-download", "1");
  });

  document.querySelectorAll('a[data-nav-download="1"]').forEach((link) => {
    // hard-set to the correct target in case templates/caching left an old href
    link.setAttribute("href", downloadHref);

    link.addEventListener("click", (e) => {
      // only intercept when already on index to smooth scroll
      if (!isHomePage()) return;

      e.preventDefault();
      const el = document.getElementById("download");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.location.hash = "#download";
    });
  });
}

// if page loads with #download, scroll after render (handles direct navigation from other pages)
function handleDownloadOnLoad() {
  if (!window.location.hash || window.location.hash.toLowerCase() !== "#download") return;

  // only attempt scroll on index; on other pages, redirect to index#download
  if (!isHomePage()) {
    window.location.href = `${pagePath("index.html")}#download`;
    return;
  }

  setTimeout(() => {
    const download = document.getElementById("download");
    download?.scrollIntoView({ behavior: "smooth" });
  }, 150);
}

function renderAllComponents() {
  Object.keys(components).forEach((name) => {
    const container = document.getElementById(`${name}-container`);
    if (!container) return;

    const html = components[name]();
    container.innerHTML = html || "";
  });

  setupSectionAnimations();
  setupLogoClick();
  setupHeaderTransformation();
  handleFeatureScrollHash();
  setupDownloadNav();
  handleDownloadOnLoad();

  if (isHomeApp()) {
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      let heroImage = heroSection.querySelector(".hero-image");
      if (!heroImage) {
        heroImage = document.createElement("div");
        heroImage.className = "hero-image";
        heroSection.appendChild(heroImage);
      }
      heroImage.innerHTML = renderHomeAppsCarousel() || "";
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    SITE = await loadDetails();
  } catch (e) {
    console.error(e);
    console.warn("[details] details.json failed to load; using empty config");
    SITE = {};
  }

  console.log("[details] nav flags:", SITE?.nav || null);

  renderAllComponents();

  if (typeof initializeTheme === "function") initializeTheme();

  const home = isHomeApp();

  if (!home) {
    const carousel = document.querySelector(".app-icon-carousel");
    const appIcons = document.querySelectorAll(".app-icon-carousel .app-icon-card");

    function updateCardPositions() {
      if (!carousel) return;
      const cards = Array.from(carousel.children).filter((n) => n.classList?.contains("app-icon-card"));
      const count = cards.length;

      cards.forEach((card, index) => {
        card.style.transform = `rotate(${-30 * index}deg)`;
        card.style.zIndex = String(count - index);
      });
    }

    appIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        if (!carousel) return;

        const theme = safeStr(icon.dataset.theme, "");

        icon.remove();
        carousel.insertBefore(icon, carousel.firstChild);
        updateCardPositions();

        if (theme) localStorage.setItem("selectedTheme", theme);
        if (typeof applyTheme === "function" && theme) applyTheme(theme);
      });
    });

    updateCardPositions();

    const initialTheme = getDefaultTheme();
    const activeIcon = initialTheme ? document.querySelector(`.app-icon-card[data-theme="${initialTheme}"]`) : null;
    if (activeIcon && carousel) {
      activeIcon.remove();
      carousel.insertBefore(activeIcon, carousel.firstChild);
      updateCardPositions();
    }
  }

  if (home) {
    const carousel = document.querySelector(".home-apps-carousel");
    const cards = document.querySelectorAll(".home-apps-carousel .app-icon-card");

    function updateCardPositions() {
      if (!carousel) return;
      const list = Array.from(carousel.children).filter((n) => n.classList?.contains("app-icon-card"));
      const count = list.length;

      list.forEach((card, index) => {
        card.style.transform = `rotate(${-30 * index}deg)`;
        card.style.zIndex = String(count - index);
      });
    }

    function navigateTo(card) {
      const href = safeStr(card?.dataset?.href, "");
      const theme = safeStr(card?.dataset?.theme, "");
      if (theme) localStorage.setItem("selectedTheme", theme);
      if (!href) return;
      window.location.href = href;
    }

    cards.forEach((card) => {
      card.addEventListener("click", () => navigateTo(card));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigateTo(card);
        }
      });
    });

    updateCardPositions();
  }

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

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav?.classList.remove("active");
      ensureMenuState();
    });
  });

  document.addEventListener("click", (e) => {
    if (!mobileNav || !mobileMenuButton) return;
    if (
      mobileNav.classList.contains("active") &&
      !mobileNav.contains(e.target) &&
      !mobileMenuButton.contains(e.target)
    ) {
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

  document.querySelectorAll(".mobile-nav [data-theme]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const theme = safeStr(link.dataset.theme, "");
      if (typeof applyTheme === "function" && theme) applyTheme(theme);
      if (theme) localStorage.setItem("selectedTheme", theme);
    });
  });

  document.querySelectorAll(".desktop-only .dropdown-content a[data-theme]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const theme = safeStr(link.dataset.theme, "");
      if (typeof applyTheme === "function" && theme) applyTheme(theme);
      if (theme) localStorage.setItem("selectedTheme", theme);
    });
  });

  if (!home) {
    document.querySelectorAll(".mobile-nav [data-feature]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const feature = safeStr(link.dataset.feature, "");

        if (!isHomePage()) {
          window.location.href = `${pagePath("index.html")}#features?scroll=${feature}`;
        } else {
          if (feature) scrollToFeature(feature);
        }

        mobileNav?.classList.remove("active");
        ensureMenuState();
      });
    });

    document.querySelectorAll(".desktop-only .dropdown-content a[data-feature]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const feature = safeStr(link.dataset.feature, "");

        if (!isHomePage()) {
          window.location.href = `${pagePath("index.html")}#features?scroll=${feature}`;
        } else {
          if (feature) scrollToFeature(feature);
        }
      });
    });
  }
}); 