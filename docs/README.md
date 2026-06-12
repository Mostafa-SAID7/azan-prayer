# 📚 Payer Documentation

Complete guides and references for the Islamic Prayer Times PWA.

## Quick Navigation

### Getting Started

- **[Setup Guide](./SETUP.md)** - Development environment setup
- **[Quick Start](./QUICKSTART.md)** - 5-minute setup guide

### Development

- **[Architecture](./ARCHITECTURE.md)** - System design and patterns
- **[API Reference](./API.md)** - External APIs and endpoints
- **[Components](./COMPONENTS.md)** - Component library reference

### Deployment & Operations

- **[Deployment](./DEPLOYMENT.md)** - Deploy to Vercel, GitHub Pages, etc.
- **[Build & Release](./BUILD.md)** - Build process and release workflow

### Features

- **[Prayer Times](./FEATURES/PRAYER_TIMES.md)** - Prayer time functionality
- **[Notifications](./FEATURES/NOTIFICATIONS.md)** - Prayer notifications
- **[PWA Guide](./FEATURES/PWA.md)** - Progressive Web App features
- **[Dark Mode](./FEATURES/DARK_MODE.md)** - Theme implementation
- **[Multi-Language](./FEATURES/I18N.md)** - Internationalization

### Reference

- **[Troubleshooting](./TROUBLESHOOTING.md)** - Common issues and solutions
- **[FAQ](./FAQ.md)** - Frequently asked questions
- **[Glossary](./GLOSSARY.md)** - Terms and definitions

## Documentation Structure

```
docs/
├── README.md                    # This file
├── SETUP.md                     # Development setup
├── QUICKSTART.md               # 5-minute guide
├── ARCHITECTURE.md             # System design
├── API.md                      # API reference
├── COMPONENTS.md               # Component docs
├── DEPLOYMENT.md               # Deployment guide
├── BUILD.md                    # Build process
├── TROUBLESHOOTING.md          # Problem solving
├── FAQ.md                      # Common questions
├── GLOSSARY.md                 # Terms
├── FEATURES/
│   ├── PRAYER_TIMES.md        # Prayer times feature
│   ├── NOTIFICATIONS.md       # Notifications
│   ├── PWA.md                 # PWA functionality
│   ├── DARK_MODE.md           # Theme switching
│   └── I18N.md                # Internationalization
└── SCREENSHOTS.md              # UI screenshots
```

## Key Concepts

### Prayer Times API

The app uses [Aladhan API](https://aladhan.com/prayer-times-api) to fetch accurate prayer times based on:

- **City & Country** - Named location lookup
- **Geolocation** - Browser GPS coordinates
- **Calculation Method** - 10+ Islamic calculation methods

### State Management

- **MainContaint.jsx** - Central smart component
- **Hooks** - Feature-specific logic
- **Context** - Global language/theme state
- **LocalStorage** - Persistent user preferences

### Styling

- **Tailwind CSS** - Utility-first framework
- **Radix UI** - Accessible primitives
- **shadcn/ui** - Pre-built components
- **Lucide Icons** - Icon library

## Before You Start

1. ✅ Ensure Node.js 18+ is installed
2. ✅ Read the [Setup Guide](./SETUP.md)
3. ✅ Clone the repository
4. ✅ Install dependencies
5. ✅ Start development server

## Common Tasks

### Start Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Run Linter

```bash
npm run lint
```

### Deploy to Vercel

See [Deployment Guide](./DEPLOYMENT.md)

## Getting Help

- 📖 Read relevant documentation page
- 🔍 Check [Troubleshooting](./TROUBLESHOOTING.md)
- ❓ Check [FAQ](./FAQ.md)
- 🐛 [Report an issue](https://github.com/yourusername/payer/issues)
- 💬 [Start a discussion](https://github.com/yourusername/payer/discussions)

## Contributing

Before contributing, please:

1. Read [CONTRIBUTING.md](../CONTRIBUTING.md)
2. Review [Code of Conduct](../CODE_OF_CONDUCT.md)
3. Check [SECURITY.md](../SECURITY.md)
4. Review relevant documentation here

## Document Conventions

- 📝 Code examples use `javascript` or `jsx` syntax highlighting
- 🔗 Links reference other documentation or GitHub
- ⚠️ Important notes are highlighted with emoji
- 💡 Tips and best practices are marked
- ❌ Common mistakes are marked with "Don't"
- ✅ Best practices are marked with "Do"

## Quick Links

| Resource | Link |
|----------|------|
| **Live App** | [payer.vercel.app](https://payer.vercel.app) |
| **GitHub** | [github.com/yourusername/payer](https://github.com/yourusername/payer) |
| **Issues** | [github.com/yourusername/payer/issues](https://github.com/yourusername/payer/issues) |
| **Discussions** | [github.com/yourusername/payer/discussions](https://github.com/yourusername/payer/discussions) |
| **Aladhan API** | [aladhan.com/prayer-times-api](https://aladhan.com/prayer-times-api) |

---

**Last Updated:** January 15, 2024

[⬆ Back to Top](#-payer-documentation)
