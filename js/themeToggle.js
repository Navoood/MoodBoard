/**
 * Theme Toggle for MoodBoard.ai
 * Handles dark/light mode functionality
 */

class ThemeToggle {
    constructor() {
        this.themeToggleBtn = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        this.htmlElement = document.documentElement;
        this.storageKey = 'moodboard-theme';
        this.darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        this.initialize();
    }

    /**
     * Initialize theme toggle
     */
    initialize() {
        // Set initial theme based on user preference or system preference
        this.setInitialTheme();

        // Add event listener to toggle button
        this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());

        // Listen for system theme changes
        this.darkModeMediaQuery.addEventListener('change', (e) => {
            if (!this.hasStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    /**
     * Set initial theme based on stored preference or system preference
     */
    setInitialTheme() {
        // Check if theme is stored in localStorage
        const storedTheme = localStorage.getItem(this.storageKey);

        if (storedTheme) {
            // Use stored theme
            this.setTheme(storedTheme);
        } else {
            // Use system preference
            const systemPrefersDark = this.darkModeMediaQuery.matches;
            this.setTheme(systemPrefersDark ? 'dark' : 'light');
        }
    }

    /**
     * Toggle between dark and light themes
     */
    toggleTheme() {
        const isDark = this.htmlElement.classList.contains('dark');
        this.setTheme(isDark ? 'light' : 'dark');
    }

    /**
     * Set theme to dark or light
     * @param {string} theme - 'dark' or 'light'
     */
    setTheme(theme) {
        if (theme === 'dark') {
            this.htmlElement.classList.add('dark');
            if (this.themeIcon) this.themeIcon.textContent = 'light_mode';
        } else {
            this.htmlElement.classList.remove('dark');
            if (this.themeIcon) this.themeIcon.textContent = 'dark_mode';
        }
        // Store theme preference
        localStorage.setItem(this.storageKey, theme);
    }

    /**
     * Check if user has a stored theme preference
     * @returns {boolean} - Whether user has a stored theme preference
     */
    hasStoredTheme() {
        return localStorage.getItem(this.storageKey) !== null;
    }
}

// Initialize theme toggle
const themeToggle = new ThemeToggle();