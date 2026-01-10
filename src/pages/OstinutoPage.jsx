import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

function parseTargetFromHash() {
  const h = window.location.hash || "";
  if (!h) return "";

  // legacy: "#features?scroll=minimal-cognitive"
  if (h.startsWith("#features?scroll=")) {
    return decodeURIComponent(h.split("=").slice(1).join("="));
  }

  return decodeURIComponent(h.replace(/^#/, ""));
}

function getHeaderOffsetPx() {
  const root = document.documentElement;
  const styles = getComputedStyle(root);

  const headerH = parseFloat(styles.getPropertyValue("--header-h")) || 0;
  const headerGap = parseFloat(styles.getPropertyValue("--header-gap")) || 0;

  // if vars aren't set yet, fall back to measuring
  if (headerH > 0) return headerH + headerGap;

  const header = document.querySelector(".header");
  const measured = header ? header.getBoundingClientRect().height : 0;
  return Math.ceil(measured + headerGap);
}

function scrollToIdWithOffset(id) {
  const el = document.getElementById(id);
  if (!el) return false;

  const offset = getHeaderOffsetPx();
  const y = window.scrollY + el.getBoundingClientRect().top - offset;

  window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
  return true;
}

function scrollToHashWithRetry() {
  const id = parseTargetFromHash();
  if (!id) return;

  let tries = 0;
  const maxTries = 80;

  const tick = () => {
    if (scrollToIdWithOffset(id)) {
      // run again after layout settles (fonts / header transforms)
      requestAnimationFrame(() => scrollToIdWithOffset(id));
      requestAnimationFrame(() => scrollToIdWithOffset(id));

      if (document.fonts?.ready) {
        document.fonts.ready
          .then(() => scrollToIdWithOffset(id))
          .catch(() => {});
      }
      return;
    }

    tries += 1;
    if (tries < maxTries) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function syncHeaderHeightVar() {
  const header = document.querySelector(".header");
  if (!header) return;

  const h = Math.ceil(header.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--header-h", `${h}px`);
}

export default function OstinutoPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.__APP_ID__ = "ostinuto";

    // IMPORTANT: helps assetHref() if you use it
    // (vite: "/" in dev, "/repo/" on github pages)
    try {
      // eslint-disable-next-line no-undef
      window.__SITE_BASE__ = import.meta.env.BASE_URL || "/";
    } catch {
      window.__SITE_BASE__ = "/";
    }

    try {
      window.initializeTheme?.();

      // build legacy DOM (fills the *-container nodes)
      window.renderAllComponents?.();

      // set correct header height for scroll-padding/offset math
      syncHeaderHeightVar();
      requestAnimationFrame(syncHeaderHeightVar);

      // theme selector AFTER containers exist
      if (window.ThemeSelector) {
        const themeSelector = new window.ThemeSelector();
        themeSelector.render?.();
      }

      // honor initial hash
      scrollToHashWithRetry();
    } catch (e) {
      console.error("[OstinutoPage] init failed:", e);
    }

    const onHashChange = () => scrollToHashWithRetry();
    window.addEventListener("hashchange", onHashChange);

    // Also handle hash changes when route changes (React Router navigation)
    // This ensures scrolling works when navigating from privacy.html back to /ostinuto/#feature
    const hash = location.hash;
    let hashTimeoutId = null;
    if (hash) {
      // Small delay to ensure DOM is ready
      hashTimeoutId = setTimeout(() => {
        scrollToHashWithRetry();
      }, 100);
    }

    const onResize = () => {
      syncHeaderHeightVar();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (hashTimeoutId) clearTimeout(hashTimeoutId);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("resize", onResize);
    };
  }, [location.hash]);

  return (
    <>
      <Header isScrolled={isScrolled} />

      <main>
        <div id="hero">
          <div id="hero-container" />
        </div>

        <div>
          <div id="features-container" />
        </div>

        <div id="download">
          <div id="download-container" />
        </div>
      </main>

      <div id="footer-container" />
    </>
  );
}