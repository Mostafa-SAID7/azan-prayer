# 🏗️ Architecture Guide

Understanding the system design, patterns, and data flow.

## Overview

Payer is a React + Vite Progressive Web App that fetches prayer times from an API and displays them with notifications, tracking, and multi-language support.

```
┌─────────────────────────────────────────┐
│         Browser / PWA Client            │
├─────────────────────────────────────────┤
│      React 18 + Vite + Tailwind CSS    │
├─────────────────────────────────────────┤
│     Components | Hooks | Contexts      │
├─────────────────────────────────────────┤
│     LocalStorage (Tracker, Favorites)  │
└─────────────────────────────────────────┘
            ↓              ↓
    Aladhan API        Web APIs
    (Prayer Times)  (Notifications, GPS)
```

## State Management

### Smart Component Pattern

**MainContaint.jsx** is the single source of truth:

```jsx
// Central smart component managing:
- Prayer API data fetching
- 1-second countdown timer
- Active/next prayer state
- Feature toggles
```

**Flow:**
```
App.jsx
  ├── MainContaint.jsx (Smart)
  │   ├── Prayer.jsx (Dumb)
  │   ├── MonthlyView.jsx (Smart)
  │   ├── QuranReader.jsx (Smart)
  │   └── Others (Dumb)
```

### Hooks Architecture

Feature-specific logic isolated in custom hooks:

```javascript
// usePrayerTracker - Daily tracker
const tracker = usePrayerTracker();
// Stores: localStorage[prayerTracker_YYYY-MM-DD]

// useNotifications - Prayer alerts
const notify = useNotifications();
// Checks every 30s for matching prayer time

// useFavorites - Saved cities
const favs = useFavorites();
// Stores: up to 5 city IDs in localStorage
```

### Context API

Global state accessible throughout app:

```javascript
// LanguageContext provides:
{
  lang: 'en' | 'ar',
  switchLang: () => void,
  t: (key) => string,        // Translation
  isRtl: boolean              // Right-to-left
}
```

## Data Flow

### Prayer Times Fetching

```
User enters city
    ↓
API request to Aladhan
    ↓
Parse response
    ↓
Extract prayer times
    ↓
Store in state
    ↓
Render Prayer cards
    ↓
Start countdown timer
```

### Prayer Countdown

```javascript
// Every 1 second:
const now = moment();
const nextPrayer = COUNTDOWN_PRAYERS.find(p => 
  moment(p.time).isAfter(now)
);
// Update active/next indicators
```

### Notification Trigger

```javascript
// Every 30 seconds:
if (
  currentTime.format('HH:mm') === prayerTime &&
  notificationsEnabled
) {
  playAdhanBeep();
  showNotification();
}
```

## Component Hierarchy

### Smart Components (Handle Logic)

| Component | Responsibility |
|-----------|-----------------|
| **MainContaint** | Fetch prayers, manage state, countdown |
| **MonthlyView** | Fetch calendar data, show modal |
| **QuranReader** | Fetch Quran content, pagination |
| **Prayer** | Display prayer card with actions |

### Dumb Components (Presentational)

| Component | Purpose |
|-----------|---------|
| **Top_Head** | Header with title and icons |
| **Prayer** | Single prayer card display |
| **Footer** | App footer |
| **Scroll_btn** | Back-to-top button |
| **SplashScreen** | Loading screen |
| **NotFound** | 404 page |

### UI Components (shadcn/ui)

Located in `src/components/ui/`:

```
badge.jsx          - Badge labels
button.jsx         - Buttons
card.jsx           - Card containers
dialog.jsx         - Modals
dropdown-menu.jsx  - Dropdown menus
input.jsx          - Text inputs
label.jsx          - Form labels
progress.jsx       - Progress bars
scroll-area.jsx    - Scrollable areas
select.jsx         - Select dropdowns
separator.jsx      - Dividers
switch.jsx         - Toggle switches
tabs.jsx           - Tab navigation
tooltip.jsx        - Tooltips
```

## API Integration

### Aladhan API

**Endpoints Used:**

```bash
# Get prayer times by city
GET /v1/timingsByCity?city=Cairo&country=Egypt&method=5
Response: { timings: { Fajr, Sunrise, Dhuhr, ... } }

# Get prayer calendar
GET /v1/calendarByCity/{year}/{month}?city=Cairo
Response: [{ date, timings, hijri }, ...]

# Alternative: Geolocation
GET /v1/timings/{date}?latitude=30.04&longitude=31.23
Response: { timings: {...} }
```

### Request Pattern

```javascript
const fetchPrayerTimes = async (city, country) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/timingsByCity`,
      { params: { city, country, method: 5 } }
    );
    return data.data.timings;
  } catch (error) {
    console.error('Failed to fetch:', error);
    return null;
  }
};
```

## Styling Architecture

### Tailwind CSS Setup

**Key Files:**
- `tailwind.config.js` - Theme configuration
- `postcss.config.js` - PostCSS pipeline
- `src/index.css` - Global styles and CSS variables

**Dark Mode:**

```css
/* tailwind.config.js */
{
  darkMode: ["class"]
}

/* Toggle: */
document.documentElement.classList.toggle("dark");

/* Usage: */
<div className="text-gray-900 dark:text-gray-100">
```

### Component Styling Pattern

```jsx
// Use Tailwind utilities
<div className="flex items-center justify-between p-4 rounded-lg 
                 bg-white dark:bg-slate-800
                 border border-gray-200 dark:border-slate-700">
  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
    Prayer Time
  </span>
</div>

// Use className merging for conditionals
import { cn } from '@/lib/utils';

<div className={cn(
  "base-classes",
  isActive && "text-green-600",
  isNext && "scale-105"
)}>
```

## Performance Optimization

### Code Splitting

```javascript
// Route-based code splitting
const QuranReader = lazy(() => import('./QuranReader'));
const MonthlyView = lazy(() => import('./MonthlyView'));

<Suspense fallback={<Loading />}>
  <QuranReader />
</Suspense>
```

### Memoization

```javascript
// Memoize expensive components
export const Prayer = memo(({ time, name }) => {
  return <div>Prayer Time</div>;
});

// useCallback for stable references
const handleClick = useCallback(() => {
  setActive(!active);
}, [active]);
```

### Caching

```javascript
// API response caching
const [cache, setCache] = useState({});

const fetchWithCache = async (city) => {
  if (cache[city]) return cache[city];
  
  const data = await fetchPrayerTimes(city);
  setCache(prev => ({ ...prev, [city]: data }));
  return data;
};
```

## PWA Implementation

### Service Worker

Managed by `vite-plugin-pwa`:

```javascript
// vite.config.js
{
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Payer - Prayer Times',
        theme_color: '#000000'
      }
    })
  ]
}
```

### Offline Support

```javascript
// Using Workbox
import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');
  wb.register();
}
```

## Internationalization (i18n)

### Language Context

```javascript
// Switch language
switchLang('ar'); // Set to Arabic
switchLang('en'); // Set to English

// Get translation
const translated = t('prayer.fajr'); // Returns translated string

// RTL detection
if (isRtl) {
  // Apply RTL layout
}
```

### Translation Keys

```javascript
// src/i18n/translations.js
export const en = {
  'prayer.fajr': 'Fajr',
  'prayer.dhuhr': 'Dhuhr',
  // ...
};

export const ar = {
  'prayer.fajr': 'الفجر',
  'prayer.dhuhr': 'الظهر',
  // ...
};
```

## Testing Strategy

### Component Testing

```javascript
// Test prayer card renders
describe('Prayer Component', () => {
  it('displays prayer time', () => {
    render(<Prayer time="05:30" name="Fajr" />);
    expect(screen.getByText('Fajr')).toBeInTheDocument();
  });
});
```

### Hook Testing

```javascript
// Test custom hook
describe('usePrayerTracker', () => {
  it('tracks completed prayers', () => {
    const { result } = renderHook(() => usePrayerTracker());
    expect(result.current.isDone('fajr')).toBe(false);
  });
});
```

## Error Handling

### API Error Handling

```javascript
const fetchPrayers = async (city) => {
  try {
    return await axios.get(`/timings?city=${city}`);
  } catch (error) {
    if (error.response?.status === 404) {
      setError('City not found');
    } else {
      setError('Network error');
    }
  }
};
```

### User-Friendly Errors

```jsx
// Show error message without technical details
<ErrorBoundary fallback={<ErrorScreen />}>
  <PrayerTimes />
</ErrorBoundary>
```

## Security Considerations

1. **No API Keys Exposed** - All keys in environment variables
2. **Input Validation** - Sanitize city/country inputs
3. **HTTPS Only** - All API calls use HTTPS
4. **CSP Headers** - Content Security Policy enforced
5. **Local Storage** - No sensitive data stored

See [SECURITY.md](../SECURITY.md) for details.

---

**Diagram:** [View on Excalidraw](https://excalidraw.com)

[⬆ Back to Top](#-architecture-guide)
