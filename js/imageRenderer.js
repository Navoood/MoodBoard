/**
 * Image Renderer for MoodBoard.ai
 * Handles rendering images in the grid
 */

class ImageRenderer {
    constructor() {
        this.imageGrid = document.getElementById('image-grid');
        this.loadingIndicator = document.getElementById('loading');
        this.errorMessage = document.getElementById('error-message');
    }

    /**
     * Show loading indicator
     */
    showLoading() {
        this.hideError();
        this.imageGrid.style.opacity = '0';
        this.loadingIndicator.classList.remove('hidden');
        this.loadingIndicator.classList.add('flex');
    }

    /**
     * Hide loading indicator
     */
    hideLoading() {
        this.loadingIndicator.classList.add('hidden');
        this.loadingIndicator.classList.remove('flex');
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.hideLoading();
        this.errorMessage.querySelector('p').textContent = message || 'An error occurred. Please try again.';
        this.errorMessage.classList.remove('hidden');
    }

    /**
     * Hide error message
     */
    hideError() {
        this.errorMessage.classList.add('hidden');
    }

    /**
     * Render images in the grid
     * @param {Array} images - Array of image objects
     * @param {string} mood - The mood that was searched for
     */
    renderImages(images, mood) {
        this.hideLoading();
        this.hideError();

        // Clear existing images
        this.imageGrid.innerHTML = '';

        // Create image elements
        images.forEach(image => {
            const card = this.createImageCard(image, mood);
            this.imageGrid.appendChild(card);
        });

        // Show the grid with a fade-in effect
        setTimeout(() => {
            this.imageGrid.style.opacity = '1';
        }, 100);
    }

    /**
     * Create an image card element
     * @param {Object} image - Image object
     * @param {string} mood - The mood that was searched for
     * @returns {HTMLElement} - Image card element
     */
    createImageCard(image, mood) {
        const card = document.createElement('div');
        card.className = 'relative overflow-hidden rounded-xl shadow-md bg-gray-200 dark:bg-gray-800 group transition transform duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-down';

        const img = document.createElement('img');
        img.src = image.smallUrl || image.url;
        img.alt = image.alt;
        img.className = 'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105';

        const overlay = document.createElement('div');
        overlay.className = 'absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity';
        overlay.innerHTML = `Photo by <a href="${image.photographerUrl}" target="_blank" rel="noopener" class="underline">${image.photographer}</a>`;

        card.appendChild(img);
        card.appendChild(overlay);

        return card;
    }
}

// Export a singleton instance
const imageRenderer = new ImageRenderer();