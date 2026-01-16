# Quick Start Guide - DBrift Frontend

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
cd Frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will automatically open in your browser at **http://localhost:5173**

### 3. Build for Production
```bash
npm run build
npm run preview
```

## 📖 Demo Walkthrough

### Landing Page
- **Get Started** button → Navigate to Dashboard
- **Live Demo** button → Visual placeholder
- Explore the supported databases grid with hover effects
- Notice the animated background with subtle gradient blobs

### Dashboard
- Click **Create Database** to start provisioning
- Select database type (PostgreSQL, MySQL, MongoDB, etc.)
- Choose region and plan
- Watch the provisioning animation (2 seconds)

### After Provisioning
- View auto-generated connection credentials
- **Password** field shows masked text by default
- Click eye icon to reveal password once
- Copy any field to clipboard with the copy button
- Click **Done** to return to dashboard

### Database Management
- View your created databases in the list
- Click a row to open the detail drawer
- See connection details
- Delete databases with the trash icon

## 🎨 Customization

### Colors
Edit CSS variables in `src/styles/global.css`:
```css
:root {
  --accent: #6366f1;        /* Change primary color */
  --bg-primary: #0f172a;    /* Change background */
  --success: #10b981;       /* Change success color */
  /* ... more variables */
}
```

### Database Options
Edit the databases array in `src/components/DatabaseGrid.jsx`:
```javascript
const databases = [
  {
    name: 'PostgreSQL',
    category: 'SQL',
    description: 'Your custom description',
    icon: Database,
    color: '#336791',
  },
  // Add more databases...
];
```

### Animation Timing
Adjust animation durations in component files (search for `transition={{ duration: ...}}`):
- Default: 150-250ms
- Faster: 100ms
- Slower: 300-400ms

## 🛠️ Project Structure

```
Frontend/
├── src/
│   ├── components/           # UI Components
│   │   ├── AnimatedBackground.jsx
│   │   ├── DatabaseGrid.jsx
│   │   ├── TopNav.jsx
│   │   ├── CreateDatabasePanel.jsx
│   │   ├── CredentialsPanel.jsx
│   │   ├── DatabasesList.jsx
│   │   └── DatabaseDetailDrawer.jsx
│   ├── pages/               # Page-level components
│   │   ├── LandingPage.jsx
│   │   └── DashboardPage.jsx
│   ├── styles/              # CSS files
│   │   ├── global.css
│   │   ├── landing.css
│   │   ├── dashboard.css
│   │   └── ... (more styles)
│   ├── App.jsx              # Root component
│   └── main.jsx             # Entry point
├── index.html               # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## 📚 Key Features

| Feature | Location | Notes |
|---------|----------|-------|
| Landing Page | `pages/LandingPage.jsx` | Hero + Features + DB Grid |
| Database Creation | `components/CreateDatabasePanel.jsx` | Form + Provisioning |
| Credentials | `components/CredentialsPanel.jsx` | Password reveal, copy |
| Database List | `components/DatabasesList.jsx` | Table view, status badges |
| Detail Drawer | `components/DatabaseDetailDrawer.jsx` | Side panel with actions |
| Animations | `framer-motion` package | Smooth transitions |
| Icons | `lucide-react` package | Beautiful icon library |

## 🎯 Common Tasks

### Add a New Database Type
1. Open `src/components/DatabaseGrid.jsx`
2. Add to the `databases` array
3. Import icon from `lucide-react`

### Change the App Theme
1. Edit CSS variables in `src/styles/global.css`
2. Update `--accent`, `--bg-*`, and status colors
3. All components auto-update

### Modify Provisioning Time
1. Open `src/pages/DashboardPage.jsx`
2. Find: `setTimeout(resolve, 2000)`
3. Change `2000` to your desired milliseconds

### Add Toast Notifications
1. Create `src/components/Toast.jsx`
2. Add state in `DashboardPage.jsx`
3. Show/hide on database operations

## 🐛 Troubleshooting

### Port Already in Use
```bash
# If port 5173 is taken, specify a different one
npm run dev -- --port 5174
```

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
```

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check CSS imports in `global.css`

## 💡 Tips & Tricks

1. **Developer Mode**: Use React DevTools to inspect components
2. **Animation Debug**: Remove transitions temporarily in CSS for testing
3. **Responsive Testing**: Use browser DevTools device toolbar
4. **Performance**: Check Network tab for bundle size

## 📦 Dependencies

- **React 18**: UI framework
- **Framer Motion**: Animations
- **Lucide React**: Icons
- **Vite**: Build tool

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages
```bash
npm run build
# Push `dist/` folder to gh-pages branch
```

### Deploy as Docker Container
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📝 Notes

- This is a **frontend-only demo** with no backend
- All data is simulated with React state
- Credentials are generated randomly
- Database operations don't persist (refresh resets)
- Perfect for showcasing DBaaS concept or prototyping

## 🤝 Contributing

Feel free to extend this demo! Ideas:
- Add more database types
- Implement dark/light mode toggle
- Add toast notifications
- Create more animations
- Add real API integration

## 📞 Support

For issues or questions:
1. Check the README.md
2. Review component comments
3. Check browser console for errors
4. Verify all dependencies are installed

---

Happy coding! 🎉
