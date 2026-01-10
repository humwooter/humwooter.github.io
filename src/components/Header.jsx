import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function clampId(s) {
  return String(s || "").trim();
}

function scrollToWithHeaderOffset(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const header = document.querySelector(".header");
  const headerHeight = header?.offsetHeight ?? 0;

  const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top, behavior: "smooth" });

  el.classList.add("highlight");
  window.setTimeout(() => el.classList.remove("highlight"), 2000);
}

function getAppFolder(appId) {
  switch (appId) {
    case "logs":
      return "Logs";
    case "ostinuto":
      return "Ostinuto";
    default:
      return "Home";
  }
}

function getSiteBase() {
  // if you ever set this, set to "/repo/" (with leading slash)
  const b = String(window.__SITE_BASE__ || "/").trim();
  const withLeading = b.startsWith("/") ? b : `/${b}`;
  return withLeading.replace(/\/+$/, ""); // no trailing slash
}

// IMPORTANT: home is a directory route, not index.html
// Canonical home for logs is /logs/, for ostinuto is /ostinuto/
function getAppHomeHref(appId) {
  const base = getSiteBase(); // "" or "/repo"
  if (appId === "ostinuto") return `${base}/ostinuto/`;
  return `${base}/logs/`; // logs home - canonical path
}

function getThemeStorageKey() {
  return window.getThemeStorageKeyForCurrentApp?.() || "selectedTheme";
}

function getCurrentThemeKey() {
  const key = getThemeStorageKey();
  return (
    localStorage.getItem(key) ||
    window.getDefaultThemeForCurrentApp?.() ||
    "cloud"
  );
}

function isLightText(textColor) {
  const rgb = String(textColor || "").match(/\d+/g)?.map(Number) || [255, 255, 255];
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  return luminance > 0.5;
}

function computeLogoSrc(appFolder) {
  const themes = window.themes || {};
  const themeKey = getCurrentThemeKey();
  const theme = themes[themeKey];

  const logoColor = theme ? (isLightText(theme.textColor) ? "white" : "black") : "black";
  const base = getSiteBase(); // "" or "/repo"
  const appId = window.__APP_ID__ || "logs";
  
  // Use app-specific asset paths
  if (appId === "logs") {
    return `${base}/logs/images/logo_${logoColor}.PNG`;
  } else if (appId === "ostinuto") {
    return `${base}/ostinuto/images/logo_${logoColor}.PNG`;
  }
  
  return `${base}/images/${appFolder}/logo_${logoColor}.PNG`;
}

function normalizePathname(p) {
  // treat "/foo" and "/foo/" as same
  if (!p) return "/";
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}

export default function Header() {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [themesOpen, setThemesOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const [mobileThemesOpen, setMobileThemesOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const appId = window.__APP_ID__ || "logs";
  const appFolder = getAppFolder(appId);
  const homeHref = getAppHomeHref(appId);

  // stable + reactive logo (updates when theme changes)
  const [logoSrc, setLogoSrc] = useState(() => computeLogoSrc(appFolder));

  useEffect(() => {
    setLogoSrc(computeLogoSrc(appFolder));
  }, [appFolder]);

  useEffect(() => {
    // if you can, dispatch this from themes.js after applyTheme:
    // window.dispatchEvent(new CustomEvent("theme:changed"))
    const onThemeChanged = () => setLogoSrc(computeLogoSrc(appFolder));

    // also update if localStorage changes in another tab / or your code writes to it
    const onStorage = (e) => {
      if (!e) return;
      const key = getThemeStorageKey();
      if (e.key === key) onThemeChanged();
    };

    window.addEventListener("theme:changed", onThemeChanged);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("theme:changed", onThemeChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, [appFolder]);

  const themeItems = useMemo(() => {
    const themes = window.themes || {};
    const keys = window.getThemesForCurrentApp?.() || [];
    return keys
      .filter((k) => !!themes[k])
      .map((k) => ({ key: k, label: themes[k].name || k }));
  }, [appId]);

  const featureItems = useMemo(() => {
    // Get feature configuration from components.js
    const featureConfigs = window.featureConfigs || {};
    const features = featureConfigs[appId] || featureConfigs.logs || [];
    
    // Convert to format expected by Header component
    return features.map((feature) => ({
      key: feature.id,
      label: feature.title,
    }));
  }, [appId]);

  // are we on this app's home route? Use React Router location
  const pathname = normalizePathname(location.pathname);
  const homePath = normalizePathname(homeHref);
  // Check if we're on the app's home route
  const isHomeForApp = pathname === homePath || 
    (homePath === "/logs" && (pathname === "/logs" || pathname === "/logs/")) ||
    (homePath === "/ostinuto" && (pathname === "/ostinuto" || pathname === "/ostinuto/"));

  // header transformed toggle
  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const threshold = 8;
    const update = () => node.classList.toggle("transformed", window.scrollY > threshold);

    update();
    requestAnimationFrame(update);
    requestAnimationFrame(update);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // body scroll lock when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // click outside closes dropdowns + mobile menu
  useEffect(() => {
    const onDocClick = (e) => {
      const header = headerRef.current;
      if (!header) return;

      if (!header.contains(e.target)) {
        setThemesOpen(false);
        setFeaturesOpen(false);
        setAboutOpen(false);
        setMenuOpen(false);
        return;
      }

      const themesEl = header.querySelector('[data-dd="themes"]');
      const featuresEl = header.querySelector('[data-dd="features"]');
      const aboutEl = header.querySelector('[data-dd="about"]');

      if (themesEl && !themesEl.contains(e.target)) setThemesOpen(false);
      if (featuresEl && !featuresEl.contains(e.target)) setFeaturesOpen(false);
      if (aboutEl && !aboutEl.contains(e.target)) setAboutOpen(false);
    };

    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, []);

  const applyTheme = (themeKey) => {
    const t = clampId(themeKey);
    if (!t) return;

    window.applyTheme?.(t);

    // if you haven't updated themes.js, force-react refresh anyway
    setLogoSrc(computeLogoSrc(appFolder));
  };

  const goToSection = (id) => {
    const target = clampId(id);
    if (!target) return;

    // close menus
    setMenuOpen(false);
    setFeaturesOpen(false);
    setMobileFeaturesOpen(false);

    if (isHomeForApp) {
      // Already on home, just scroll
      scrollToWithHeaderOffset(target);
      // Update URL hash without navigation
      window.history.replaceState(null, "", `#${encodeURIComponent(target)}`);
      return;
    }

    // Not on home, navigate to home with hash
    navigate(`${homeHref}#${encodeURIComponent(target)}`, { replace: false });
  };

  const handleLogoClick = (e) => {
    if (isHomeForApp) {
      // On home, scroll to top and clear hash
      e.preventDefault();
      window.history.replaceState(null, "", homeHref);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to home
      e.preventDefault();
      navigate(homeHref);
    }
  };

  return (
<header ref={headerRef} className="header" data-react-header="true">
        <nav className="nav">
        <div className="nav-left">
          <Link className="logo" to={homeHref} onClick={handleLogoClick} aria-label="Home">
            <img src={logoSrc} alt="" width="120" height="120" />
          </Link>

          <div className="dropdown desktop-only" data-dd="themes">
            <a
              href="#"
              className="dropdown-trigger"
              onClick={(e) => {
                e.preventDefault();
                setThemesOpen((v) => !v);
              }}
            >
              Themes
            </a>

            <div className="dropdown-content" style={{ display: themesOpen ? "block" : undefined }}>
              {themeItems.map((t) => (
                <a
                  key={t.key}
                  href="#"
                  data-theme={t.key}
                  onClick={(e) => {
                    e.preventDefault();
                    applyTheme(t.key);
                    setThemesOpen(false);
                  }}
                >
                  {t.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="nav-links desktop-only">
          <div className="dropdown" data-dd="features">
            <a
              href="#"
              className="dropdown-trigger"
              onClick={(e) => {
                e.preventDefault();
                setFeaturesOpen((v) => !v);
              }}
            >
              Features
            </a>

            <div className="dropdown-content" style={{ display: featuresOpen ? "block" : undefined }}>
              {featureItems.map((f) => (
                <a
                  key={f.key}
                  href={isHomeForApp ? `#${f.key}` : `${homeHref}#${f.key}`}
                  data-feature={f.key}
                  onClick={(e) => {
                    e.preventDefault();
                    setFeaturesOpen(false);
                    goToSection(f.key);
                  }}
                >
                  {f.label}
                </a>
              ))}
            </div>
          </div>

          <div className="dropdown" data-dd="about">
            <a
              href="#"
              className="dropdown-trigger"
              onClick={(e) => {
                e.preventDefault();
                setAboutOpen((v) => !v);
              }}
            >
              About
            </a>

            <div className="dropdown-content" style={{ display: aboutOpen ? "block" : undefined }}>
              <a href={`${homeHref.replace(/\/$/, "")}/contact.html`} onClick={() => setAboutOpen(false)}>
                Contact
              </a>
              <a href={`${homeHref.replace(/\/$/, "")}/privacy.html`} onClick={() => setAboutOpen(false)}>
                Privacy Policy
              </a>
            </div>
          </div>

          <a
            href={isHomeForApp ? "#download" : `${homeHref}#download`}
            onClick={(e) => {
              e.preventDefault();
              goToSection("download");
            }}
          >
            Download
          </a>
        </div>

        <button
          className={`mobile-menu-button ${menuOpen ? "active" : ""}`}
          aria-label="Menu"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((v) => !v);
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-nav ${menuOpen ? "active" : ""}`}>
        <div className="mobile-nav-content">
          <div className="mobile-nav-section">
            <div
              className="mobile-nav-header"
              onClick={() => setMobileThemesOpen((v) => !v)}
              role="button"
              tabIndex={0}
            >
              Themes
            </div>
            <div className={`mobile-nav-items ${mobileThemesOpen ? "active" : ""}`}>
              {themeItems.map((t) => (
                <a
                  key={t.key}
                  href="#"
                  data-theme={t.key}
                  onClick={(e) => {
                    e.preventDefault();
                    applyTheme(t.key);
                    setMenuOpen(false);
                  }}
                >
                  {t.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mobile-nav-section">
            <div
              className="mobile-nav-header"
              onClick={() => setMobileFeaturesOpen((v) => !v)}
              role="button"
              tabIndex={0}
            >
              Features
            </div>
            <div className={`mobile-nav-items ${mobileFeaturesOpen ? "active" : ""}`}>
              {featureItems.map((f) => (
                <a
                  key={f.key}
                  href={isHomeForApp ? `#${f.key}` : `${homeHref}#${f.key}`}
                  data-feature={f.key}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    goToSection(f.key);
                  }}
                >
                  {f.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mobile-nav-section">
            <div
              className="mobile-nav-header"
              onClick={() => setMobileAboutOpen((v) => !v)}
              role="button"
              tabIndex={0}
            >
              About
            </div>
            <div className={`mobile-nav-items ${mobileAboutOpen ? "active" : ""}`}>
              <a href={`${homeHref.replace(/\/$/, "")}/contact.html`} onClick={() => setMenuOpen(false)}>
                Contact
              </a>
              <a href={`${homeHref.replace(/\/$/, "")}/privacy.html`} onClick={() => setMenuOpen(false)}>
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="mobile-nav-section">
            <a
              href={isHomeForApp ? "#download" : `${homeHref}#download`}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                goToSection("download");
              }}
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}