class ThemeSelector {
    constructor() {
        this.container = document.getElementById('theme-selector');
        this.cards = [];
        this.selectedTheme = null;
    }

    createCard(themeKey, theme) {
        const card = document.createElement('div');
        card.className = 'theme-card';
        card.dataset.theme = themeKey;
        card.style.background = `linear-gradient(to bottom, ${theme.topColor}, ${theme.bottomColor})`;
        
        // Create theme preview
        const preview = document.createElement('div');
        preview.className = 'theme-preview';
        preview.style.background = theme.entryBackgroundColor;
        preview.style.backdropFilter = 'blur(10px)';
        
        // Add theme name
        const name = document.createElement('h3');
        name.textContent = theme.name;
        name.style.color = theme.textColor;
        
        preview.appendChild(name);
        card.appendChild(preview);
        
        card.addEventListener('click', () => this.selectTheme(themeKey));
        
        return card;
    }

    selectTheme(themeKey) {
        const themes = window.themes || {};
        if (!themes[themeKey]) return;
      
        this.cards.forEach((card) => {
          card.classList.remove("selected");
          card.style.transform = "";
        });
      
        const selectedCard = this.cards.find((card) => card.dataset.theme === themeKey);
        if (selectedCard) {
          selectedCard.classList.add("selected");
          selectedCard.style.transform = "scale(1.1) translateY(-10px)";
        }
      
        window.applyTheme?.(themeKey);
      }
      
      render() {
        this.container = document.getElementById("theme-selector");
        if (!this.container) return;
      
        this.container.innerHTML = "";
        this.cards = [];
      
        const themes = window.themes || {};
      
        const allowedKeysRaw = window.getThemesForCurrentApp?.() || [];
        const allowedKeys = allowedKeysRaw.filter((k) => !!themes[k]);
      
        // if none are defined, fall back to logs set (prevents "empty selector" confusion)
        const finalKeys =
          allowedKeys.length > 0
            ? allowedKeys
            : (window.APP_THEME_SETS?.logs || []).filter((k) => !!themes[k]);
      
        finalKeys.forEach((themeKey) => {
          const card = this.createCard(themeKey, themes[themeKey]);
          this.container.appendChild(card);
          this.cards.push(card);
        });
      
        const storageKey = window.getThemeStorageKeyForCurrentApp?.() || "selectedTheme";
        const fallback =
          window.getDefaultThemeForCurrentApp?.() ||
          finalKeys[0] ||
          "cloud";
      
        const saved = localStorage.getItem(storageKey);
        const currentTheme = saved && finalKeys.includes(saved) ? saved : fallback;
      
        this.selectTheme(currentTheme);
      }
}

// Initialize theme selector when the DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     const themeSelector = new ThemeSelector();
//     themeSelector.render();
// }); 
// document.addEventListener("DOMContentLoaded", () => {
//     if (!document.getElementById("theme-selector")) return;
//     const themeSelector = new ThemeSelector();
//     themeSelector.render();
//   });

window.ThemeSelector = ThemeSelector;