# MoodBoard.ai

> Turn your emotions into art with a single click.

MoodBoard.ai is a simple web application that generates beautiful mood boards based on your emotional input. Enter how you're feeling, and the app will create a 3x3 grid of images that match your mood.

## 🌐 Live Demo  
👉 [https://mood-board-omega.vercel.app](https://mood-board-omega.vercel.app)

## Features

- **Mood Input**: Enter any emotion or feeling to generate a mood board
- **Preset Moods**: Quick access buttons for common emotions
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Shareable**: Share your mood board with others via URL

## Tech Stack

- **Frontend**: HTML, Tailwind CSS, Vanilla JavaScript
- **API**: Unsplash API for high-quality, emotion-based images
- **Deployment**: Vercel (Zero-config, free)

## Getting Started

### Prerequisites

- An Unsplash API key (get one at [https://unsplash.com/developers](https://unsplash.com/developers))

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/moodboard-ai.git
   cd moodboard-ai
   ```

2. Open `js/api.js` and replace `YOUR_UNSPLASH_API_KEY` with your actual Unsplash API key:
   ```javascript
   this.apiKey = 'YOUR_UNSPLASH_API_KEY';
   ```

3. Open `index.html` in your browser or use a local server:
   ```
   npx serve
   ```

## Usage

1. Enter a mood or emotion in the input field (e.g., "joyful", "melancholy", "energetic")
2. Click "Generate" or press Enter
3. View your personalized mood board
4. Toggle between dark and light mode using the sun/moon icon

## Deployment

The project is designed to be easily deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Images provided by [Unsplash](https://unsplash.com)
- UI styled with [Tailwind CSS](https://tailwindcss.com)
