# Achariya Debdutta Website - Vanilla HTML/CSS/JS Version

This is a vanilla HTML, CSS, and JavaScript version of the Achariya Debdutta astrology website, converted from the original React application.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Single Page Application**: Smooth navigation between pages without page reloads
- **Interactive Elements**: 
  - Animated hero section with gradient text
  - Product catalog with shopping cart functionality
  - Contact and appointment forms
  - Service details and information
  - Blog and horoscope sections
- **Modern Styling**: Uses Tailwind CSS for responsive design and custom CSS for animations
- **Local Storage**: Cart data persists between sessions

## File Structure

```
frontend/
├── index.html          # Main HTML file with all page content
├── styles.css          # Custom CSS with animations and responsive design
├── script.js           # Main JavaScript functionality
├── products.js         # Crystal products data
├── README-Vanilla.md   # This file
└── src/
    └── images/         # All website images (logos, products, banners, etc.)
```

## How to Run

1. **Simple Method**: 
   - Open `index.html` directly in any modern web browser
   - No server required for basic functionality

2. **With Local Server** (Recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
   Then open `http://localhost:8000` in your browser

## Key Differences from React Version

### Removed Dependencies
- No React, React Router, or other npm packages
- No build process required
- No Node.js backend needed for frontend

### Simplified Features
- **Navigation**: Pure JavaScript page switching instead of React Router
- **State Management**: Uses localStorage and vanilla JS instead of React Context
- **Forms**: Simple form handling with basic validation
- **Animations**: CSS animations instead of React animation libraries

### Maintained Features
- All visual design and layout
- Shopping cart functionality
- Product catalog
- Contact and appointment forms
- Responsive mobile design
- Service information pages

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

### Adding New Products
Edit the `crystalProducts` array in `products.js`:

```javascript
{
    id: 21,
    name: "New Crystal",
    price: 299,
    image: "src/images/products/new-crystal.png",
    description: "Description of the new crystal",
    category: "Category",
    benefits: ["Benefit 1", "Benefit 2"]
}
```

### Modifying Styles
- Edit `styles.css` for custom styling
- The website uses Tailwind CSS classes loaded from CDN
- Custom animations and effects are in the CSS file

### Adding New Pages
1. Add a new page div in `index.html`:
```html
<div id="new-page" class="page hidden">
    <!-- Page content -->
</div>
```

2. Add navigation link:
```html
<a href="#" onclick="showPage('new')" class="nav-link">New Page</a>
```

3. Add page logic in `script.js` if needed

## Performance Optimizations

- Images are lazy-loaded where possible
- CSS and JS are minified for production
- Uses CDN for external libraries (Tailwind, Font Awesome)
- Local storage for cart persistence

## Deployment

### Static Hosting (Recommended)
- Upload all files to any static hosting service:
  - Netlify
  - Vercel
  - GitHub Pages
  - AWS S3 + CloudFront
  - Any web hosting provider

### Configuration
- No special server configuration needed
- Ensure all image paths are correct
- Update contact information and links as needed

## Limitations

Compared to the original React version:
- No server-side rendering
- No advanced routing features
- Simplified state management
- Basic form validation
- No real payment integration (demo only)

## Future Enhancements

Possible improvements:
- Add real payment gateway integration
- Implement user authentication
- Add blog CMS integration
- Enhanced SEO optimization
- Progressive Web App features
- Advanced form validation

## Support

For questions or issues with this vanilla version:
1. Check browser console for JavaScript errors
2. Ensure all image paths are correct
3. Verify internet connection for CDN resources
4. Test in different browsers

## License

Same as original project license.