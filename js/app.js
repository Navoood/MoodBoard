/**
 * Main Application for MoodBoard.ai
 * Coordinates between UI, API, and rendering
 */

class MoodBoardApp {
    constructor() {
        // DOM Elements
        this.moodInput = document.getElementById('mood-input');
        this.searchButton = document.getElementById('search-button');
        this.moodPresetButtons = document.querySelectorAll('.mood-preset');

        // Initialize the application
        this.initialize();
    }

    /**
     * Initialize the application
     */
    initialize() {
        // Add event listeners
        this.searchButton.addEventListener('click', () => this.handleSearch());
        this.moodInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Add event listeners to preset mood buttons
        this.moodPresetButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.moodInput.value = button.dataset.mood;
                this.handleSearch();
            });
        });

        // Focus the input field on page load
        this.moodInput.focus();
    }

    /**
     * Handle search button click or Enter key press
     */
    async handleSearch() {
        const mood = this.moodInput.value.trim();

        if (!mood) {
            imageRenderer.showError('Please enter a mood');
            return;
        }

        try {
            // Show loading indicator
            imageRenderer.showLoading();

            // Fetch images for the mood
            const images = await apiService.fetchImagesForMood(mood);

            // Render images
            imageRenderer.renderImages(images, mood);

            // Update URL for sharing
            this.updateUrlWithMood(mood);
        } catch (error) {
            imageRenderer.showError(error.message || 'Failed to fetch images. Please try again.');
        }
    }

    /**
     * Update URL with the mood for sharing
     * @param {string} mood - The mood to add to the URL
     */
    updateUrlWithMood(mood) {
        const url = new URL(window.location);
        url.searchParams.set('mood', encodeURIComponent(mood));
        window.history.pushState({}, '', url);
    }

    /**
     * Check URL for mood parameter and load if present
     */
    async checkUrlForMood() {
        const urlParams = new URLSearchParams(window.location.search);
        const mood = urlParams.get('mood');

        if (mood) {
            this.moodInput.value = decodeURIComponent(mood);
            await this.handleSearch();
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new MoodBoardApp();

    // Check if URL contains a mood parameter
    app.checkUrlForMood();
});