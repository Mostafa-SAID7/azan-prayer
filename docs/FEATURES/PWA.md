# 📱 Progressive Web App (PWA) Guide

How Payer works as an installable app.

## What is PWA?

A Progressive Web App is a web app that works like a native app:

- ✅ Installable on home screen
- ✅ Works offline
- ✅ App-like experience
- ✅ Fast and reliable
- ✅ No app store needed

## Installation

### Android

1. Open Payer in Chrome
2. Tap menu (three dots)
3. Tap "Install app"
4. Confirm installation
5. App appears on home screen

### iPhone/iPad

1. Open Payer in Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. Name the app
5. Tap "Add"

### Desktop (Windows/Mac)

1. Open Payer in Chrome
2. Click menu (three dots)
3. Click "Install app"
4. Confirm installation
5. App appears in taskbar/dock

## Features

### Offline Support

Once installed, Payer works completely offline:

- Previously fetched prayer times available
- Favorites list accessible
- Prayer tracker functional
- Dark mode still works

**Limitation:** Can't fetch new prayer times without internet.

### Installation Prompt

First-time visitors see install prompt:

```
"Install Payer on your home screen"
[Install] [Later]
```

Click "Install" to add to home screen.

### App Icon

When installed, Payer appears as:

- Dedicated app icon
- App name: "Payer"
- Can launch from home screen
- Appears in app drawer

### Full Screen

When launched from home screen:

- No browser address bar
- No browser navigation buttons
- Full screen app experience
- Immersive interface

## Service Worker

Handles offline functionality:

```javascript
// Installed automatically
// Caches API responses
// Serves cached data offline
// Updates automatically
```

**Cache Strategy:**

1. Try fetch from internet
2. If offline, serve from cache
3. Updates in background

## Manifest File

Defines app metadata:

```json
{
  "name": "Payer - Islamic Prayer Times",
  "short_name": "Payer",
  "description": "Prayer times with notifications",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "scope": "/",
  "icons": [...]
}
```

## Uninstall

### Android

1. Long press app icon
2. Select "Uninstall"
3. Confirm

### iPhone/iPad

1. Long press app icon
2. Select "Remove App"
3. Confirm

### Desktop

- Windows: Right-click → Uninstall
- Mac: Drag to Trash

## Storage

### LocalStorage

Payer stores locally (offline works):

- Prayer tracker
- Favorite cities
- Language preference
- Theme preference

**Storage Limit:** Usually 5-50MB per app

**Check Usage:**

```javascript
// Estimate storage
navigator.storage.estimate().then(estimate => {
  console.log(`Used: ${estimate.usage} bytes`);
  console.log(`Available: ${estimate.quota} bytes`);
});
```

### Cache

Service Worker caches:

- HTML/CSS/JS files
- API responses
- Images
- Other resources

## Troubleshooting PWA

### App Won't Install

**Check:**
1. Using HTTPS ✅
2. Has valid manifest ✅
3. Has service worker ✅
4. Meets install criteria ✅

**Solution:**
- Try different browser
- Clear browser cache
- Try incognito mode
- Check console errors

### Offline Mode Not Working

**Solution:**
1. Open app online first
2. Wait 5 seconds for Service Worker
3. Go offline
4. Try using app

**Debug:**
```javascript
// Check if SW installed
navigator.serviceWorker.getRegistrations()
  .then(regs => console.log(regs));
```

### Storage Full

**Solution:**
1. Clear app cache in settings
2. Remove favorite cities
3. Clear browser storage
4. Reinstall app

```javascript
// Clear cache
caches.delete('payer-v1');
```

## Best Practices

### For Users

- Install when prompted
- Allow notifications for reminders
- Grant geolocation for accurate times
- Regularly clear cache if issues

### For Developers

- Keep bundle size small
- Cache strategically
- Provide offline fallback
- Use service workers correctly

## Performance Impact

**Without PWA:**
- Needs internet always
- Slower load times
- No install option
- Requires browser

**With PWA:**
- Works offline
- Instant load (cached)
- Native-like experience
- Takes up home screen space

## Security

PWA Security:

- ✅ HTTPS enforced
- ✅ CSP headers
- ✅ Sandbox environment
- ✅ Same-origin policy
- ✅ No special permissions
- ✅ Local storage isolated

No special security concerns compared to web apps.

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ⚠️ Limited |
| Edge | ✅ Full |
| Opera | ✅ Full |

**Note:** Safari PWA support is limited compared to others.

## Comparison: Web vs App vs PWA

| Feature | Web | Native App | PWA |
|---------|-----|-----------|-----|
| Installation | No | Yes | Yes |
| Offline | No | Yes | Yes |
| Home Screen | No | Yes | Yes |
| App Store | No | Yes | No |
| Performance | Good | Excellent | Good |
| Update Effort | Easy | Hard | Easy |
| Cost | Free | App store fee | Free |
| Access to Contacts | No | Yes | Limited |

## Future Enhancements

Planned PWA improvements:

- [ ] Offline prayer calendar
- [ ] Sync across devices
- [ ] Share prayer tracking
- [ ] Push notifications backend
- [ ] App update prompts

---

[⬆ Back to Top](#-progressive-web-app-guide)
