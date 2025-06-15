class ThemeSelector {
    constructor() {
        this.container = document.getElementById('theme-selector');
        this.cards = [];
        this.selectedTheme = null;
    }

    createCard(theme) {
        const card = document.createElement('div');
        card.className = 'theme-card';
        card.style.background = `linear-gradient(to bottom, ${theme.topColor}, ${theme.bottomColor})`;
        
        const icon = document.createElement('img');
        icon.src = `images/${theme.icon}`;
        icon.alt = `${theme.name} icon`;
        
        const name = document.createElement('h3');
        name.textContent = theme.name;
        name.style.color = theme.accentColor;
        
        card.appendChild(icon);
        card.appendChild(name);
        
        card.addEventListener('click', () => this.selectTheme(theme));
        
        return card;
    }

    selectTheme(theme) {
        // Remove selected class from all cards
        this.cards.forEach(card => card.classList.remove('selected'));
        
        // Add selected class to clicked card
        const selectedCard = this.cards.find(card => 
            card.querySelector('h3').textContent === theme.name
        );
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.style.transform = 'scale(1.1) translateY(-10px)';
        }
        
        // Apply the theme
        applyTheme(Object.keys(themes).find(key => themes[key] === theme));
    }

    render() {
        // Clear existing content
        this.container.innerHTML = '';
        this.cards = [];
        
        // Create and add cards for each theme
        Object.values(themes).forEach(theme => {
            const card = this.createCard(theme);
            this.container.appendChild(card);
            this.cards.push(card);
        });
        
        // Select the current theme
        const currentTheme = localStorage.getItem('selectedTheme') || 'theme1';
        this.selectTheme(themes[currentTheme]);
    }
}

// Initialize theme selector when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const themeSelector = new ThemeSelector();
    themeSelector.render();
}); 