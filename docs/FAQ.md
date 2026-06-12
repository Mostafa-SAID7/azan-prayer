# ❓ Frequently Asked Questions

Common questions about Payer.

## General

### What is Payer?

Payer is an Islamic Prayer Times Progressive Web App. It shows accurate prayer times based on location, sends notifications, tracks completed prayers, and includes Quranic content. It works offline and can be installed on any device.

### Is it free?

Yes! Payer is completely free and open-source under the MIT license.

### Do I need to create an account?

No account needed. All data is stored locally in your browser.

### Is my data safe?

Yes. All your data (prayer tracker, favorites, settings) is stored only in your browser. Nothing is sent to external servers except prayer time API requests.

### Can I use it offline?

Yes! Once downloaded, the PWA works completely offline with previously cached prayer times.

## Features

### How do I get notifications?

1. Click settings
2. Enable notifications
3. Grant permission when prompted
4. You'll get alerts 5 minutes before each prayer

### Does it work on my phone?

Yes! Payer works on:
- iOS (Safari 15.1+)
- Android (Chrome, Firefox, etc.)
- Desktop browsers

### Can I install it as an app?

Yes! Payer is a PWA:

**Android:**
- Open in Chrome
- Menu (three dots) → Install app

**iPhone:**
- Open in Safari
- Share → Add to Home Screen

**Desktop:**
- Chrome: Menu → Install app

### How do I change the prayer calculation method?

In settings, select your preferred calculation method (Egyptian, Saudi, etc.). Different methods calculate times slightly differently.

### Can I use my GPS location?

Yes! Grant permission and Payer will automatically detect your location for accurate prayer times.

### How do I change the language?

Click the language button (AR/EN) to switch between Arabic and English. The entire app will translate and RTL layout will apply for Arabic.

## Troubleshooting

### Prayer times are wrong

**Possible causes:**
- Wrong city selected
- Wrong calculation method
- Time zone mismatch
- Browser cache outdated

**Solutions:**
1. Double-check city name
2. Try different calculation method
3. Verify time zone in browser settings
4. Clear browser cache and reload
5. Check Aladhan API directly for your city

### Notifications not working

**Possible causes:**
- Browser doesn't support notifications
- Permission denied
- Notifications disabled in app

**Solutions:**
1. Enable notifications in app settings
2. Check browser settings allow notifications
3. Allow Payer notifications in OS settings
4. Try another browser

### App won't install

**Possible causes:**
- Using HTTP (not HTTPS)
- Browser doesn't support PWA
- Not on main domain

**Solutions:**
1. Use HTTPS URL only
2. Try different browser
3. Clear browser cache
4. Try incognito mode

### Offline mode not working

**Possible causes:**
- Service Worker not installed
- Cache not populated
- Browser doesn't support PWA

**Solutions:**
1. Open app online first to cache
2. Wait 5 seconds for Service Worker to install
3. Check browser console for errors
4. Try incognito → normal mode

### Wrong timezone

**Solution:**
Set correct timezone in:

1. **Browser:** Time settings
2. **Phone:** Settings → Date & Time
3. **App:** Select correct city (includes timezone)

## Development

### How can I contribute?

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### How do I set up development?

See [Setup Guide](./SETUP.md)

### What tech stack is used?

- React 18
- Vite 5
- Tailwind CSS 3
- Radix UI
- Axios
- Moment.js

### Can I fork and modify?

Yes! Payer is open-source (MIT license). Fork, modify, and deploy freely. Just credit the original.

### How do I submit a bug report?

1. Go to [GitHub Issues](https://github.com/yourusername/payer/issues)
2. Click "New Issue"
3. Select "Bug Report"
4. Fill in details
5. Submit

### How do I request a feature?

1. Go to [GitHub Issues](https://github.com/yourusername/payer/issues)
2. Click "New Issue"
3. Select "Feature Request"
4. Describe your idea
5. Submit

## Deployment

### How do I deploy Payer?

See [Deployment Guide](./DEPLOYMENT.md) for step-by-step instructions.

**Quick answer:** Push to GitHub → Vercel automatically deploys.

### Can I deploy to my own server?

Yes! Build and deploy the `dist/` folder to any hosting:

```bash
npm run build
# Upload dist/ to hosting
```

### Does Vercel deployment cost money?

No! Vercel is free for open-source and hobby projects.

## Performance

### Why is it slow?

**Possible causes:**
- Slow internet connection
- Large bundle size
- Too many re-renders
- Old device

**Solutions:**
1. Check internet speed
2. Open DevTools → Performance tab
3. Check Network tab for slow requests
4. Try different browser

### How can I improve performance?

For developers:

1. Use memoization for components
2. Implement code splitting
3. Optimize images
4. Cache API responses
5. Use lazy loading

See [Architecture](./ARCHITECTURE.md) for details.

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Latest version |
| Firefox | ✅ Full | Latest version |
| Safari | ✅ Full | 15.1+ required |
| Edge | ✅ Full | Chromium-based |
| Opera | ✅ Full | Chromium-based |
| IE | ❌ No | Too old |

## API

### What API does Payer use?

[Aladhan Prayer Times API](https://aladhan.com/prayer-times-api)

### Is the API reliable?

Yes! Aladhan API:
- Used by 1000s of apps
- 99.9% uptime
- Free and public

### Can I use the API directly?

Yes! See [API Reference](./API.md)

## Privacy & Security

### Is Payer secure?

Yes! All data:
- Stored locally in browser
- Never sent to external servers (except API calls)
- Encrypted in transit (HTTPS)
- No tracking or analytics

### Do you collect data?

No. We don't collect any personal data. Check [SECURITY.md](../SECURITY.md) for full details.

### What about cookies?

Payer doesn't use cookies. It uses localStorage for local storage (different and more private).

## Account & Data

### Can I sync across devices?

Not currently. All data is local to each device. We're working on optional cloud sync.

### How do I back up my data?

Your favorites and settings are in browser localStorage. Export from browser settings.

### Can I delete my data?

Yes! Just clear browser cache/storage in browser settings. All Payer data will be deleted.

## Other

### When was Payer released?

Payer launched in January 2024.

### Who created Payer?

Payer is created by Muslim developers for the Muslim community.

### Can I use Payer commercially?

Yes! MIT license allows commercial use. Just give credit.

### Is there a mobile app on app store?

Not yet. Payer is a PWA that works like an app. Install via browser.

### How often is it updated?

Regular updates with new features and fixes. Check [CHANGELOG](../CHANGELOG.md).

### Where can I get support?

- 📖 [Documentation](./README.md)
- 🐛 [GitHub Issues](https://github.com/yourusername/payer/issues)
- 💬 [Discussions](https://github.com/yourusername/payer/discussions)

---

**Didn't find your answer?** [Open an issue](https://github.com/yourusername/payer/issues) or [start a discussion](https://github.com/yourusername/payer/discussions).

[⬆ Back to Top](#-frequently-asked-questions)
