# 🛠️ Development Setup Guide

Complete setup instructions for development.

## System Requirements

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | 18.0+ | LTS recommended |
| **npm** | 9.0+ | Comes with Node.js |
| **Git** | 2.30+ | For version control |
| **RAM** | 4GB+ | For smooth development |
| **Disk** | 2GB+ | For dependencies |

## Installation Steps

### 1. Install Node.js

**Windows/Mac:**
- Download from [nodejs.org](https://nodejs.org)
- Run installer, follow prompts
- Accept default settings

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Verify Installation:**
```bash
node --version
npm --version
```

### 2. Clone Repository

```bash
# HTTPS (recommended)
git clone https://github.com/yourusername/payer.git

# or SSH (if configured)
git clone git@github.com:yourusername/payer.git

cd payer
```

### 3. Install Dependencies

```bash
npm install
```

This will:
- Download all packages from npm registry
- Create `node_modules/` folder
- Lock versions in `package-lock.json`

### 4. Environment Configuration

Create `.env.local` in project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` if needed:

```env
VITE_ALADHAN_API_URL=https://api.aladhan.com/v1
VITE_DEFAULT_CITY=Cairo
VITE_DEFAULT_COUNTRY=Egypt
```

### 5. Start Development Server

```bash
npm run dev
```

Output:
```
VITE v5.4.1  ready in 156 ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

## Available Commands

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint checks
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## Project Structure

```
payer/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Prayer.jsx      # Prayer card component
│   │   ├── MainContaint.jsx  # Smart component
│   │   └── ...
│   ├── contexts/           # React Context
│   │   └── LanguageContext.jsx
│   ├── hooks/              # Custom hooks
│   │   ├── usePrayerTracker.js
│   │   ├── useNotifications.js
│   │   └── useFavorites.js
│   ├── lib/                # Utilities
│   │   └── utils.js
│   ├── App.jsx             # Main component
│   └── index.css           # Global styles
├── public/                 # Static files
├── docs/                   # Documentation
├── package.json            # Dependencies
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind config
└── eslint.config.js        # ESLint config
```

## IDE Setup

### VS Code (Recommended)

1. Install [VS Code](https://code.visualstudio.com)
2. Install extensions:
   - **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
   - **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
   - **Prettier** (esbenp.prettier-vscode)
   - **ESLint** (dbaeumer.vscode-eslint)

3. Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### Other IDEs

- **WebStorm**: Built-in React support
- **Sublime Text**: Install plugins for React & Tailwind
- **Vim/Neovim**: Configure LSP for React

## Git Setup

### Initial Configuration

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Create Feature Branch

```bash
# Before starting development
git checkout -b feature/your-feature-name
```

### Before Committing

```bash
# Check what changed
git status

# Stage changes
git add src/

# Commit with message
git commit -m "feat: add prayer time filtering"

# Push to remote
git push origin feature/your-feature-name
```

## Testing Your Setup

### 1. Check Installation

```bash
npm list react
npm list vite
npm list tailwindcss
```

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` - app should load

### 3. Test Hot Reload

1. Open `src/App.jsx`
2. Change any text
3. Save file
4. Browser automatically updates (HMR)

### 4. Test Build

```bash
npm run build
```

Should create `dist/` folder with production build

## Common Setup Issues

### Issue: `npm install` Fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try install again
npm install
```

### Issue: Port 5173 Already in Use

**Solution:**
```bash
# Use different port
npm run dev -- --port 3000
```

### Issue: Vite Not Found After Install

**Solution:**
```bash
# Reinstall node_modules
rm -rf node_modules package-lock.json
npm install
```

### Issue: Git Errors

**Solution:**
```bash
# Configure Git first
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

See [Troubleshooting](./TROUBLESHOOTING.md) for more issues.

## Next Steps

1. ✅ Complete setup above
2. 📖 Read [Architecture](./ARCHITECTURE.md)
3. 🔍 Explore `src/` folder
4. 🧪 Make a small change to test HMR
5. 🚀 Start development!

## Getting Help

- 📖 Check [FAQ](./FAQ.md)
- 🐛 See [Troubleshooting](./TROUBLESHOOTING.md)
- 💬 [Ask in discussions](https://github.com/yourusername/payer/discussions)

---

**All set!** Start coding with `npm run dev` 🚀
