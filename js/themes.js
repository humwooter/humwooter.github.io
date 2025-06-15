const themes = {
    cloud: {
        name: "Cloud",
        accentColor: "rgb(255, 248, 148)", // Selection color
        textColor: "rgb(255, 255, 255)", // White text
        topColor: "rgb(100, 114, 255)", // 0.3914300203323364, 0.4465039372444153, 1.000000238418579
        bottomColor: "rgb(0, 4, 114)", // 0.00023245636839419603, 0.014830045402050018, 0.446861207485199
        entryBackgroundColor: "rgba(255, 255, 120, 0.083)", // 1.0000089406967163, 0.9999930262565613, 0.4695098400115967, 0.08297565579414368
        reminderColor: "rgb(55, 190, 251)", // 0.21516916155815125, 0.7442479729652405, 0.9846494793891907
        fontName: "Timeburner",
        fontSize: "13.5px",
        lineSpacing: "1.5" // Changed from 0px to 1.5
    },
    chrome: {
        name: "Chrome",
        accentColor: "rgb(146, 255, 255)", // Selection color
        textColor: "rgb(255, 255, 255)", // White text
        topColor: "rgb(0, 0, 0)", // 0, 0, 0
        bottomColor: "rgb(0, 65, 144)", // -0.10885760933160782, 0.25529563426971436, 0.563895583152771
        entryBackgroundColor: "rgba(255, 77, 255, 0.229)", // 1.0831798315048218, 0.3028375506401062, 1.0300824642181396, 0.2291666030883789
        reminderColor: "rgb(70, 255, 150)", // 0.2749909460544586, 1.014039397239685, 0.5884220004081726
        fontName: "BrassMono-Regular",
        fontSize: "15.5px",
        lineSpacing: "1.5" // Changed from 3px to 1.5
    },
    mocha: {
        name: "Mocha",
        accentColor: "rgb(255, 255, 255)", // Selection color
        textColor: "rgb(255, 255, 255)", // White text
        topColor: "rgb(106, 84, 80)", // 0.41389602422714233, 0.33013349771499634, 0.3144141435623169
        bottomColor: "rgb(20, 15, 17)", // 0.07758093625307083, 0.05792427808046341, 0.06616977602243423
        entryBackgroundColor: "rgba(0, 0, 0, 0.305)", // 0.0, 0.0, 0.0, 0.3047210300429184
        reminderColor: "rgb(255, 93, 144)", // 1.0802855491638184, 0.3632991313934326, 0.5633771419525146
        fontName: "Catbrother",
        fontSize: "13.5px",
        lineSpacing: "1.5" // Changed from 2px to 1.5
    }
};

// Function to apply a theme
function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    // Apply gradient background
    document.body.style.background = `linear-gradient(to bottom, ${theme.topColor}, ${theme.bottomColor})`;
    
    // Apply theme variables
    // document.documentElement.style.setProperty('--accent-color', theme.accentColor);
    document.documentElement.style.setProperty('--text-color', theme.textColor);
    // document.documentElement.style.setProperty('--entry-background', theme.entryBackgroundColor);
    // document.documentElement.style.setProperty('--pin-color', theme.pinColor);
    // document.documentElement.style.setProperty('--reminder-color', theme.reminderColor);
    document.documentElement.style.setProperty('--font-family', theme.fontName);
    document.documentElement.style.setProperty('--font-size', theme.fontSize);
    // document.documentElement.style.setProperty('--line-spacing', theme.lineSpacing);
    
    // Apply font and text color
    document.body.style.fontFamily = theme.fontName;
    document.body.style.fontSize = theme.fontSize;
    // document.body.style.lineHeight = theme.lineSpacing;
    document.body.style.color = theme.textColor;
    
    // Store the selected theme
    localStorage.setItem('selectedTheme', themeName);
}

// Function to initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'cloud';
    applyTheme(savedTheme);
}

// Initialize theme when the page loads
document.addEventListener('DOMContentLoaded', initializeTheme); 