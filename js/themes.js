const themes = {
    theme1: {
        name: "Ocean Breeze",
        topColor: "#1a2a6c",
        bottomColor: "#b21f1f",
        accentColor: "#fdbb2d",
        icon: "ocean-icon.png"
    },
    theme2: {
        name: "Forest Mist",
        topColor: "#134E5E",
        bottomColor: "#71B280",
        accentColor: "#E6D5AC",
        icon: "forest-icon.png"
    },
    theme3: {
        name: "Sunset Glow",
        topColor: "#FF512F",
        bottomColor: "#DD2476",
        accentColor: "#F9D423",
        icon: "sunset-icon.png"
    }
};

// Function to apply a theme
function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    // Apply gradient background
    document.body.style.background = `linear-gradient(to bottom, ${theme.topColor}, ${theme.bottomColor})`;
    
    // Apply accent color to interactive elements
    document.documentElement.style.setProperty('--accent-color', theme.accentColor);
    
    // Store the selected theme
    localStorage.setItem('selectedTheme', themeName);
}

// Function to initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'theme1';
    applyTheme(savedTheme);
}

// Initialize theme when the page loads
document.addEventListener('DOMContentLoaded', initializeTheme); 