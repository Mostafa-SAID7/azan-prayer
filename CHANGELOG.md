# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup with React + Vite
- Prayer times fetching from Aladhan API
- Daily prayer tracker functionality
- Push notifications for prayer times
- Quranic content reader
- Monthly prayer calendar view
- Dark mode support
- Multi-language support (Arabic, English)
- RTL layout support
- PWA capabilities
- Favorite cities/locations feature
- Responsive design for all screen sizes

### Changed
- Migrated from Material-UI to Tailwind CSS + shadcn/ui for improved performance
- Replaced Emotion styling with utility-first CSS approach
- Updated to React 18.3.1

### Fixed
- Fixed RTL digit alignment in prayer times
- Fixed responsive layout issues on small screens
- Fixed dark mode toggle persistence

### Security
- No external tracking or analytics
- All user data stored locally in browser
- HTTPS enforced in production
- Content Security Policy implemented

## Version History

### [0.1.0] - 2024-01-15

**Initial Release**

- ✨ Prayer times display by city
- 📱 Mobile-responsive interface
- 🌙 Dark mode toggle
- 🗣️ Language switcher (AR/EN)
- 📅 Monthly prayer calendar
- 🔔 Prayer time notifications
- ✅ Daily prayer tracker
- 📚 Quran reader integration
- ⭐ Favorite locations management
- 🔄 PWA offline support

---

## Migration History

### MUI → Tailwind CSS (v0.1.0)

**Rationale:**
- Reduce bundle size
- Improve RTL support
- Enable better dark mode control
- Increase styling flexibility

**Changes:**
- Removed: `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`
- Added: `tailwindcss`, `@radix-ui/*`, `shadcn/ui` components
- Dark mode: Switched to class strategy via Tailwind
- Theme: Custom CSS variables in `:root` and `.dark`

**Breaking Changes:**
- `useColorMode()` hook replaced MUI's `useTheme()`
- All components redesigned with Tailwind classes
- Icon library changed from Material Icons to Lucide React
- Must pin `lucide-react@0.441.0` (v1.x has build issues)

---

## Upgrade Guide

### From v0.0.0 → v0.1.0

1. **Update dependencies:**
   ```bash
   npm install
   ```

2. **Update component imports:**
   ```javascript
   // Old
   import { useTheme } from '@mui/material/styles';
   
   // New
   import { useColorMode } from '@/theme';
   ```

3. **Update styling:**
   ```jsx
   // Old
   <div style={{ color: theme.palette.primary.main }}>

   // New
   <div className="text-primary">
   ```

4. **Clear cache:**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

---

## Future Roadmap

### Planned Features

- [ ] User accounts and cloud sync
- [ ] Prayer schedule customization
- [ ] Additional prayer calculation methods
- [ ] Nearby mosque finder
- [ ] Community features
- [ ] Advanced prayer statistics
- [ ] Integration with calendar apps
- [ ] Voice notifications
- [ ] Multiple timezone support
- [ ] Social sharing

### Performance Improvements

- [ ] Code splitting optimization
- [ ] Image optimization with WebP
- [ ] Service worker caching strategy
- [ ] Lazy loading for non-critical routes

### Accessibility

- [ ] Enhanced keyboard navigation
- [ ] Screen reader optimization
- [ ] WCAG 2.1 AA compliance audit
- [ ] High contrast mode

---

## Support

For questions about the changelog, please:

- 📖 Check the [Documentation](./docs)
- 🐛 [Report Issues](https://github.com/yourusername/payer/issues)
- 💬 [Start a Discussion](https://github.com/yourusername/payer/discussions)

---

**Last Updated:** January 15, 2024
