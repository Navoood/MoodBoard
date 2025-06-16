/**
 * API Service for MoodBoard.ai
 * Handles communication with the Unsplash API
 */

class UnsplashApiService {
    constructor() {
        // Replace with your actual Unsplash API key
        this.apiKey = '61MWaC35SPeEDJjHTPff2_m2JodBR-qqYQLtXrRSSsc';
        this.baseUrl = 'https://api.unsplash.com';
        this.perPage = 9; // Number of images to fetch (3x3 grid)
    }

    /**
     * Fetch images based on a mood
     * @param {string} mood - The mood to search for
     * @returns {Promise<Array>} - Array of image objects
     */
    async fetchImagesForMood(mood) {
        if (!mood || mood.trim() === '') {
            throw new Error('Please enter a mood');
        }

        const processedMood = this.processMoodInput(mood);

        try {
            const endpoint = 'https://api.unsplash.com/search/photos';
            const url = new URL(endpoint);

            url.searchParams.append('query', processedMood);
            url.searchParams.append('per_page', this.perPage);
            url.searchParams.append('client_id', this.apiKey);

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch images');
            const data = await response.json();
            if (!data.results || data.results.length === 0) throw new Error('No images found for this mood');
            return this.formatImageData(data.results, mood);
        } catch (error) {
            console.error('Error fetching images from Unsplash:', error);
            throw error;
        }
    }

    /**
     * Process the mood input
     * @param {string} mood - The raw mood input
     * @returns {string} - Processed mood
     */
    processMoodInput(mood) {
        // Trim whitespace and convert to lowercase
        let processedMood = mood.trim().toLowerCase();

        // Add additional processing if needed
        // For example, you could add synonyms or related terms

        return processedMood;
    }

    /**
     * Format the image data for our application
     * @param {Array} images - Array of image objects from Unsplash
     * @param {string} mood - The original mood
     * @returns {Array} - Formatted image data
     */
    formatImageData(images, mood) {
        return images.map(image => ({
            id: image.id,
            url: image.urls.regular,
            smallUrl: image.urls.small,
            alt: image.alt_description || `Image representing ${mood}`,
            photographer: image.user.name,
            photographerUrl: image.user.links.html,
            downloadUrl: image.links.download
        }));
    }
}

// Export a singleton instance
const apiService = new UnsplashApiService();