class ThemeSelector {
    constructor() {
        this.container = document.getElementById('theme-selector');
        this.cards = [];
        this.selectedTheme = null;
    }

    createCard(themeKey, theme) {
        const card = document.createElement('div');
        card.className = 'theme-card';
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
        // Remove selected class from all cards
        this.cards.forEach(card => card.classList.remove('selected'));
        
        // Add selected class to clicked card
        const selectedCard = this.cards.find(card => 
            card.querySelector('h3').textContent === themes[themeKey].name
        );
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.style.transform = 'scale(1.1) translateY(-10px)';
        }
        
        // Apply the theme
        applyTheme(themeKey);
    }

    render() {
        // Clear existing content
        this.container.innerHTML = '';
        this.cards = [];
        
        // Create and add cards for each theme
        Object.entries(themes).forEach(([themeKey, theme]) => {
            const card = this.createCard(themeKey, theme);
            this.container.appendChild(card);
            this.cards.push(card);
        });
        
        // Select the current theme
        const currentTheme = localStorage.getItem('selectedTheme') || 'cloud';
        this.selectTheme(currentTheme);
    }
}

// Initialize theme selector when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const themeSelector = new ThemeSelector();
    themeSelector.render();
}); 