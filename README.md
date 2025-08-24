# 🎂 Happy Birthday, Nandini! - Birthday Website

A beautiful, interactive birthday website created with vanilla HTML, CSS, and JavaScript to celebrate Nandini's special day!

## ✨ Features

- 🎉 **Hero Section** - Beautiful birthday message with animated confetti
- ⏰ **Countdown Timer** - Real-time countdown to Nandini's birthday
- 🎵 **Background Music** - Toggle birthday song on/off
- 📸 **Photo Gallery** - Clickable image gallery with modal viewer
- 💝 **Memory Wall** - Interactive wall for friends to leave birthday wishes
- 🎁 **Wish Generator** - Generate random sweet birthday messages
- 🌙 **Dark/Light Mode** - Toggle between themes
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎆 **Fireworks Animation** - Special celebration when countdown reaches zero
- 💾 **Downloadable Card** - Generate and download a birthday card
- ♿ **Accessibility** - WCAG AA compliant with keyboard navigation

## 🚀 Quick Start

1. **Download/Clone** this repository
2. **Customize** the birthday date and content (see customization section below)
3. **Replace** placeholder images and audio with actual files
4. **Open** `index.html` in a web browser to test locally
5. **Deploy** to your preferred hosting service

## 🎯 Customization

### 1. Birthday Date
Edit the `BIRTHDAY` object in `script.js` (line 5):
```javascript
const BIRTHDAY = { month: 12, day: 5 }; // Change to Nandini's actual birthday
```

### 2. Personal Information
Update these values in `script.js`:
```javascript
const OWNER_NAME = "Your Name"; // Change to your name
const FRIEND_NAME = "Nandini"; // Change if needed
```

### 3. Text Content
Edit the HTML directly in `index.html`:
- Hero subtitle
- Personal message
- Any other text content

### 4. Colors & Styling
Modify CSS variables in `styles.css` (lines 10-20):
```css
:root {
  --primary: #ff4da6;     /* Main pink color */
  --accent: #6c5ce7;      /* Purple accent */
  --bg: #fff7fc;          /* Light background */
  /* ... more variables */
}
```

### 5. Images
Replace placeholder files in `assets/img/`:
- `hero.jpg` - Main profile/celebration image (600x600px+)
- `gallery-1.jpg`, `gallery-2.jpg`, `gallery-3.jpg` - Memory photos (400x400px+)
- `favicon.png` - Site icon (32x32px+)

### 6. Audio
Replace `assets/audio/birthday-song.mp3` with your chosen song

## 📁 File Structure

```
nandini/
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── script.js           # Interactive features and animations
├── README.md           # This file
└── assets/
    ├── img/
    │   ├── hero.jpg           # Main hero image
    │   ├── gallery-1.jpg      # Gallery photo 1
    │   ├── gallery-2.jpg      # Gallery photo 2
    │   ├── gallery-3.jpg      # Gallery photo 3
    │   └── favicon.png        # Site icon
    └── audio/
        └── birthday-song.mp3  # Background music
```

## 🌐 Deployment

### GitHub Pages
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select source branch (usually `main` or `master`)
5. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Your site will be deployed instantly
4. Customize the URL in site settings

### Any Static Hosting
- Upload all files to your web server
- Ensure `index.html` is in the root directory
- The site works as a static website

## 🎨 Design Features

- **Modern UI** - Clean, rounded corners with soft shadows
- **Smooth Animations** - CSS transitions and JavaScript animations
- **Responsive Grid** - CSS Grid and Flexbox for perfect layouts
- **Color Schemes** - Light and dark mode with CSS variables
- **Typography** - System fonts for optimal performance
- **Micro-interactions** - Hover effects and focus states

## 🔧 Technical Details

- **No Dependencies** - Pure vanilla HTML, CSS, and JavaScript
- **ES6+ Features** - Modern JavaScript with fallbacks
- **CSS Variables** - Easy theming and customization
- **Local Storage** - Persists user preferences and memories
- **Canvas API** - Custom confetti and fireworks animations
- **Responsive Images** - Lazy loading and proper sizing
- **Accessibility** - ARIA labels, keyboard navigation, focus management

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎵 Audio Notes

Due to modern browser autoplay policies:
- Music will NOT play automatically
- Users must click the music button first
- Audio context is created on first interaction
- Music state is saved in localStorage

## 🎆 Animation Features

- **Confetti** - Falls from top on page load
- **Fireworks** - Triggers when countdown reaches zero
- **Smooth Transitions** - CSS transitions for all interactions
- **Reduced Motion** - Respects user's motion preferences

## 🧠 Memory Wall

- **Persistent Storage** - Uses localStorage for data persistence
- **Client Isolation** - Each browser gets a unique client ID
- **Clear Function** - Users can clear only their own messages
- **Real-time Updates** - Messages appear instantly

## 🎁 Wish Generator

- **10 Predefined Wishes** - Sweet, wholesome birthday messages
- **Random Selection** - Each click generates a new wish
- **Smooth Animation** - Scale animation when generating
- **Easy to Customize** - Edit the `BIRTHDAY_WISHES` array

## 🔍 SEO & Meta

- **Meta Tags** - Title, description, and social media tags
- **Open Graph** - Facebook and social media sharing
- **Twitter Cards** - Twitter sharing optimization
- **Favicon** - Site icon for bookmarks and tabs
- **Theme Color** - Browser theme color for mobile

## 🚀 Performance Tips

- **Lazy Loading** - Images load only when needed
- **Optimized Animations** - Uses requestAnimationFrame
- **Minimal JavaScript** - Efficient, non-blocking code
- **CSS Variables** - Fast theme switching
- **Responsive Images** - Proper sizing for all devices

## 🐛 Troubleshooting

### Images Not Loading
- Ensure image files exist in the correct paths
- Check file permissions
- Verify file names match exactly (case-sensitive)

### Audio Not Working
- Check if audio file exists
- Ensure browser supports the audio format
- Try refreshing the page and clicking music button again

### Countdown Not Working
- Verify the birthday date in `script.js`
- Check browser console for JavaScript errors
- Ensure all HTML elements have correct IDs

### Styling Issues
- Clear browser cache
- Check if CSS file is loading properly
- Verify CSS syntax in browser developer tools

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all files are in the correct locations
3. Ensure you're using a modern web browser
4. Check that all placeholder files have been replaced

## 🎉 Happy Birthday, Nandini!

This website was created with love and care to make your birthday celebration extra special. Enjoy your day! 🎂✨

---

**Created with 💖 using vanilla web technologies**
**No frameworks, no build tools, just pure HTML, CSS, and JavaScript**
