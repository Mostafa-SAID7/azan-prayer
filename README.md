# ⏰ Payer - Islamic Prayer Times PWA

> A modern, responsive Prayer Times Progressive Web App with Quranic support, notifications, and offline capability.

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan?logo=tailwindcss)](https://tailwindcss.com)
[![PWA](https://img.shields.io/badge/PWA-Ready-brightgreen)](https://web.dev/progressive-web-apps/)

[Live Demo](https://payer.vercel.app) • [Documentation](./docs) • [Contributing](./CONTRIBUTING.md)

</div>

---

## ✨ Features

- 🕌 **Prayer Times** - Accurate prayer times based on location (city or geolocation)
- 🔔 **Smart Notifications** - Get reminders for upcoming prayers
- 📖 **Quranic Content** - Integrated Quranic reader
- 📅 **Monthly Calendar** - View prayer times in Hijri calendar
- 🌙 **Dark Mode** - Easy on the eyes with system preference detection
- 🗣️ **Multi-Language** - Arabic and English support
- 🌐 **RTL Support** - Full Arabic right-to-left layout
- 📱 **PWA** - Install as an app, works offline
- 🎯 **Prayer Tracker** - Track completed prayers daily
- ⚡ **Fast** - Built with Vite for instant dev experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/payer.git
cd payer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build locally
npm run preview
```

## 📚 Documentation

Visit our complete [documentation](./docs) for detailed guides:

- **[Architecture](./docs/ARCHITECTURE.md)** - System design and patterns
- **[Setup Guide](./docs/SETUP.md)** - Development environment setup
- **[API Reference](./docs/API.md)** - External APIs and endpoints
- **[Deployment](./docs/DEPLOYMENT.md)** - Deploy to Vercel, GitHub Pages, etc.
- **[Contributing](./CONTRIBUTING.md)** - Contributor guidelines

## 🎯 Core Concepts

### Prayer Times API

Uses [Aladhan API](https://aladhan.com/prayer-times-api) for accurate prayer time calculations:

```
GET /v1/timingsByCity?city={city}&country={country}&method={method}
GET /v1/calendarByCity/{year}/{month}?city={city}&country={country}
```

### State Management

- **MainContaint.jsx** - Central smart component managing prayer data and countdown
- **Hooks** - Feature-specific logic (`usePrayerTracker`, `useNotifications`, `useFavorites`)
- **Context** - Global language/theme state via `LanguageContext`

### Dark Mode

Implemented via Tailwind's class strategy:

```javascript
// Toggle dark mode
document.documentElement.classList.add("dark");
document.documentElement.classList.remove("dark");
```

## 📦 Built With

| Tool | Purpose |
|------|---------|
| **React 18** | UI library |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first styling |
| **Radix UI** | Accessible component primitives |
| **shadcn/ui** | Pre-built components |
| **Moment.js** | Time manipulation |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |

## 🌍 Environment Variables

Create a `.env.local` file in the project root:

```env
# Optional: Override default API endpoint
VITE_ALADHAN_API_URL=https://api.aladhan.com/v1

# Optional: Default city
VITE_DEFAULT_CITY=Cairo
VITE_DEFAULT_COUNTRY=Egypt
```

See [.env.example](./.env.example) for all available options.

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Deploy directly from GitHub
vercel link
vercel deploy
```

Or use [Vercel Dashboard](https://vercel.com/dashboard) to import this repository.

[Full Deployment Guide →](./docs/DEPLOYMENT.md)

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start dev server with HMR
npm run build    # Create production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint checks
```

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── Prayer.jsx      # Prayer card component
│   ├── MonthlyView.jsx # Calendar modal
│   └── ...
├── contexts/           # React Context providers
│   └── LanguageContext.jsx
├── hooks/              # Custom React hooks
│   ├── usePrayerTracker.js
│   ├── useNotifications.js
│   └── useFavorites.js
├── lib/                # Utilities and helpers
│   └── utils.js
└── App.jsx             # Main app component

public/                # Static assets
docs/                  # Documentation
```

## 🔒 Privacy & Security

- No data is stored on external servers (except prayer time API calls)
- Prayer tracker stored locally in browser
- Favorites stored locally in browser
- Full offline capability with PWA

[Security Policy →](./SECURITY.md)

## 🤝 Contributing

We welcome contributions! Whether it's bug reports, feature requests, or code contributions:

1. Read our [Contributing Guidelines](./CONTRIBUTING.md)
2. Fork the repository
3. Create a feature branch (`git checkout -b feature/amazing-feature`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📋 Code of Conduct

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) to understand community standards.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api) for accurate prayer times
- [Radix UI](https://radix-ui.com) for accessible components
- [shadcn/ui](https://shadcn-ui.com) for component library
- Islamic community for inspiration and feedback

## 📞 Support

- 📖 Read the [Documentation](./docs)
- 🐛 [Report a Bug](https://github.com/yourusername/payer/issues)
- 💡 [Request a Feature](https://github.com/yourusername/payer/issues)
- 💬 [Discussions](https://github.com/yourusername/payer/discussions)

---

<div align="center">

Made with ❤️ for the Muslim community

[⬆ Back to Top](#-payer---islamic-prayer-times-pwa)

</div>
