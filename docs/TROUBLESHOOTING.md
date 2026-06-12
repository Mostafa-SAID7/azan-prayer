# 🔧 Troubleshooting Guide

Solutions for common issues.

## Development Issues

### npm install fails

**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Retry install
npm install
```

### Port 5173 already in use

**Error:** `Port 5173 is in use`

**Solution:**
```bash
# Use different port
npm run dev -- --port 3000

# Or kill process using port
# Windows: netstat -ano | findstr :5173
# Mac/Linux: lsof -i :5173 | kill -9 <PID>
```

### Vite not found

**Error:** `vite: command not found`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Or use npx
npx vite
```

### Dependencies conflict

**Error:** `peer dependency conflict`

**Solution:**
```bash
# Force install with legacy peer deps
npm install --legacy-peer-deps

# Or update conflicting package
npm install @package/name@latest
```

## Build Issues

### Build fails with error

**Solution:**
1. Check error message for specific issue
2. Verify all imports are correct
3. Check for missing dependencies
4. Try clearing node_modules

```bash
npm run build 2>&1 | head -50  # See first 50 lines of error
```

### Bundle size too large

**Solution:**
1. Analyze bundle size
```bash
npm install -g webpack-bundle-analyzer
```

2. Identify large dependencies
3. Use dynamic imports for less-used features

### CSS not compiling

**Error:** `PostCSS plugin not found`

**Solution:**
```bash
# Reinstall tailwind
npm install -D tailwindcss@latest postcss@latest

# Verify postcss.config.js exists
npm run build
```

## Runtime Issues

### App won't start

**Error:** `Cannot find module` or `Unexpected token`

**Solution:**
1. Check syntax for errors
2. Verify all imports are correct
3. Check for circular dependencies
4. Clear `.vite` cache

```bash
rm -rf node_modules/.vite
npm run dev
```

### Hot reload not working

**Solution:**
1. Check file watcher limit (especially on Linux)

```bash
# Linux: increase watch limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

2. Restart dev server
3. Try different IDE

### Styling not applying

**Issue:** Tailwind classes not showing

**Solution:**
1. Verify Tailwind config includes all paths
```javascript
// tailwind.config.js
content: [
  "./index.html",
  "./src/**/*.{js,jsx}",
]
```

2. Check class is in allowed list
3. Restart dev server
4. Clear browser cache

### Dark mode not working

**Solution:**
```javascript
// Verify dark mode enabled
// tailwind.config.js
darkMode: ["class"]

// Test toggle
document.documentElement.classList.add("dark")
document.documentElement.classList.remove("dark")
```

## Browser Issues

### App not loading

**Solution:**
1. Check DevTools console for errors
2. Check Network tab - see if API calls fail
3. Try different browser
4. Clear browser cache
5. Try incognito mode

**DevTools Steps (Chrome):**
1. F12 → Console tab
2. Look for red error messages
3. Note error details
4. Check Network tab for failed requests

### Notifications not working

**Solution:**
```javascript
// Check permission status
Notification.permission  // "granted", "denied", or "default"

// Request permission
Notification.requestPermission().then(perm => {
  console.log(perm);
});
```

### Geolocation not working

**Solution:**
```javascript
// Check browser support
if (!navigator.geolocation) {
  console.log("Geolocation not supported");
}

// Check permission
navigator.permissions.query({ name: 'geolocation' })
  .then(result => console.log(result.state));
```

### PWA not installing

**Solution:**
1. Must be HTTPS
2. Must have valid manifest.json
3. Try different browser
4. Check browser settings allow installation

**Test manifest:**
```bash
# Verify manifest is valid
# Check: <link rel="manifest" href="/manifest.json">
# In DevTools → Manifest
```

### Dark mode not persisting

**Solution:**
1. Check localStorage is enabled
```javascript
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
} catch(e) {
  console.log('localStorage disabled');
}
```

2. Check browser privacy settings
3. May need to disable tracking prevention
4. Check for private browsing mode

## API Issues

### Prayer times not loading

**Error:** API call fails

**Debugging:**
```javascript
// Test API directly
fetch('https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5')
  .then(r => r.json())
  .then(d => console.log(d));
```

**Solutions:**
1. Check city name spelling
2. Verify internet connection
3. Check if API is down
4. Check CORS headers
5. Try different city

### Wrong timezone

**Solution:**
1. City is in wrong timezone
2. Device timezone wrong
3. Try manual timezone selection

**Check timezone:**
```javascript
// Get browser timezone
Intl.DateTimeFormat().resolvedOptions().timeZone
```

### API rate limiting

**Solution:**
1. Add delays between requests
```javascript
// Wait 2 seconds between requests
await new Promise(r => setTimeout(r, 2000));
```

2. Implement caching
3. Reduce API calls

## Git Issues

### Git not configured

**Error:** `Author identity unknown`

**Solution:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Can't push to GitHub

**Error:** `Permission denied`

**Solution:**
1. Generate SSH key
2. Add to GitHub
3. Or use HTTPS with PAT (Personal Access Token)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your@email.com"

# Add to ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

## Deployment Issues

### Vercel deployment fails

**Solution:**
1. Check build logs in Vercel dashboard
2. Verify environment variables set
3. Check Node version
4. Ensure npm packages install

```bash
# Test locally
npm install
npm run build
npm run preview
```

### GitHub Pages 404 errors

**Solution:**
1. Verify base URL in vite.config.js
```javascript
export default {
  base: '/payer/',  // Must match repo name
}
```

2. Check deploy workflow runs
3. Verify gh-pages branch exists

### App blank after deploy

**Solution:**
1. Check console for errors
2. Verify CSS loads
3. Check public path
4. Verify index.html in dist/

```bash
npm run build
ls -la dist/  # Check files exist
```

## Performance Issues

### App slow to load

**Solutions:**
1. Check bundle size
```bash
npm run build
# Check dist/ size
```

2. Enable compression on server
3. Use CDN
4. Optimize images
5. Implement lazy loading

### High memory usage

**Solution:**
1. Check for memory leaks
2. Profile with DevTools
3. Remove unused dependencies
4. Implement virtual scrolling for long lists

## Debugging Tips

### Enable verbose logging

```javascript
// In components
console.log('Debug:', value);

// Or use library
import debug from 'debug';
const log = debug('payer:*');
log('message');
```

### DevTools Usage

**Console Tab:**
- Execute JavaScript
- See errors/warnings
- Check variable values

**Network Tab:**
- See HTTP requests
- Check response times
- Debug API issues

**Performance Tab:**
- Record performance
- Find bottlenecks
- Optimize rendering

**Storage Tab:**
- Check localStorage
- Check cookies
- Check cache

### Common Fixes

1. **Clear browser cache:** Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
2. **Disable extensions:** Try incognito mode
3. **Check console:** F12 → Console tab
4. **Hard refresh:** Ctrl+Shift+R (Cmd+Shift+R on Mac)

## Getting Help

Still stuck?

1. 📖 Check [Documentation](./README.md)
2. ❓ Check [FAQ](./FAQ.md)
3. 🐛 [Report Issue](https://github.com/yourusername/payer/issues)
4. 💬 [Ask in Discussions](https://github.com/yourusername/payer/discussions)

Include:
- Error message (full text)
- Steps to reproduce
- Browser & OS
- Screenshots
- Relevant code

---

[⬆ Back to Top](#-troubleshooting-guide)
