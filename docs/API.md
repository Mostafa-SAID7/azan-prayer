# 📡 API Reference

External APIs and endpoints used in Payer.

## Aladhan Prayer Times API

Primary API for fetching Islamic prayer times.

### Base URL

```
https://api.aladhan.com/v1
```

### Endpoints

#### Prayer Times by City

Get prayer times for any city.

**Request:**

```http
GET /timingsByCity
?city=Cairo
&country=Egypt
&method=5
&adjustment=0
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `city` | string | ✅ | City name |
| `country` | string | ✅ | Country name |
| `method` | number | ❌ | Calculation method (1-15, default: 5) |
| `adjustment` | number | ❌ | Adjustment minutes (default: 0) |

**Calculation Methods:**

```
1  - Umm Al-Qura
2  - Islamic Society of North America
3  - Muslim World League
4  - Umm Al-Qura University
5  - Egyptian General Authority (DEFAULT)
6  - Institute of Geophysics
7  - Shia Ithna Ashari
8  - Kuwait
9  - Qatar
10 - Tunisia
11 - Turkey
12 - Afghanistan
13 - Bahrain
14 - Jafari
15 - Karachi
```

**Response:**

```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "timings": {
      "Fajr": "05:30",
      "Sunrise": "07:00",
      "Dhuhr": "12:30",
      "Asr": "16:00",
      "Sunset": "18:00",
      "Maghrib": "18:00",
      "Isha": "19:30",
      "Imsak": "05:15",
      "Midnight": "00:15"
    },
    "date": {
      "readable": "15 Jan 2024",
      "timestamp": 1705276800,
      "gregorian": {
        "date": "15/01/2024",
        "format": "DD/MM/YYYY"
      },
      "hijri": {
        "date": "06/07/1445",
        "format": "DD/MM/YYYY"
      }
    },
    "meta": {
      "latitude": 30.0444,
      "longitude": 31.2357,
      "timezone": "Africa/Cairo",
      "method": { "id": 5, "name": "Egyptian General Authority" }
    }
  }
}
```

**Example Usage:**

```javascript
const axios = require('axios');

const getPrayerTimes = async (city, country) => {
  try {
    const { data } = await axios.get(
      'https://api.aladhan.com/v1/timingsByCity',
      {
        params: {
          city: city,
          country: country,
          method: 5
        }
      }
    );
    
    return data.data.timings;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

getPrayerTimes('Cairo', 'Egypt')
  .then(timings => console.log(timings));
```

#### Prayer Times by Coordinates

Get prayer times using geolocation.

**Request:**

```http
GET /timings/{date}
?latitude=30.0444
&longitude=31.2357
&method=5
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | string | ✅ | Date in DD-MM-YYYY format |
| `latitude` | number | ✅ | Latitude coordinate |
| `longitude` | number | ✅ | Longitude coordinate |
| `method` | number | ❌ | Calculation method |

**Response:** Same structure as City endpoint

**Example:**

```javascript
const date = moment().format('DD-MM-YYYY');
const { data } = await axios.get(
  `https://api.aladhan.com/v1/timings/${date}`,
  {
    params: {
      latitude: 30.0444,
      longitude: 31.2357,
      method: 5
    }
  }
);
```

#### Calendar by City

Get prayer times for entire month/year.

**Request:**

```http
GET /calendarByCity/{year}/{month}
?city=Cairo
&country=Egypt
&method=5
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `year` | number | ✅ | Year (e.g., 2024) |
| `month` | number | ✅ | Month (1-12) |
| `city` | string | ✅ | City name |
| `country` | string | ✅ | Country name |
| `method` | number | ❌ | Calculation method |

**Response:**

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "timings": {...},
      "date": {
        "readable": "01 Jan 2024",
        "hijri": {...}
      }
    },
    {...more days...}
  ]
}
```

**Example:**

```javascript
const year = 2024;
const month = 1;
const { data } = await axios.get(
  `https://api.aladhan.com/v1/calendarByCity/${year}/${month}`,
  {
    params: {
      city: 'Cairo',
      country: 'Egypt',
      method: 5
    }
  }
);
```

### Error Handling

**Status Codes:**

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Prayer times fetched |
| 400 | Bad Request | Invalid parameters |
| 404 | Not Found | City doesn't exist |
| 500 | Server Error | API down |

**Error Response:**

```json
{
  "code": 404,
  "status": "INVALID_QUERY",
  "data": null
}
```

**Handle Errors:**

```javascript
try {
  const { data } = await axios.get(
    'https://api.aladhan.com/v1/timingsByCity',
    { params: { city, country, method: 5 } }
  );
} catch (error) {
  if (error.response?.status === 404) {
    console.log('City not found');
  } else if (error.response?.status === 400) {
    console.log('Invalid parameters');
  } else {
    console.log('Network error:', error.message);
  }
}
```

### Rate Limiting

- **No official rate limit** but be respectful
- Cache results to reduce requests
- Implement 3-5 second delays between requests

## Browser APIs

### Geolocation API

Get user's coordinates for prayer times.

**Request Permission:**

```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
  },
  (error) => console.error(error)
);
```

**Response:**

```javascript
{
  coords: {
    latitude: 30.0444,
    longitude: 31.2357,
    altitude: 100,
    accuracy: 100,
    altitudeAccuracy: null,
    heading: 0,
    speed: 0
  },
  timestamp: 1705276800000
}
```

### Notifications API

Send prayer time alerts.

**Request Permission:**

```javascript
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    new Notification('Prayer Time', {
      body: 'Fajr prayer starts in 5 minutes',
      icon: '/icon.png',
      badge: '/badge.png'
    });
  }
});
```

### Storage API

Store prayer tracker and favorites locally.

**LocalStorage:**

```javascript
// Store tracker
localStorage.setItem(
  'prayerTracker_2024-01-15',
  JSON.stringify({ fajr: true, dhuhr: false })
);

// Retrieve tracker
const today = moment().format('YYYY-MM-DD');
const tracker = JSON.parse(
  localStorage.getItem(`prayerTracker_${today}`)
);

// Store favorites
localStorage.setItem('prayerFavorites', JSON.stringify([
  { name: 'Cairo', city: 'Cairo', country: 'Egypt' },
  { name: 'Medina', city: 'Medina', country: 'Saudi Arabia' }
]));
```

## Internal API Pattern

Pattern used throughout Payer:

```javascript
// hooks/usePrayerTimes.js
export const usePrayerTimes = () => {
  const [timings, setTimings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = async (city, country) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.get(
        `${API_URL}/timingsByCity`,
        { params: { city, country, method: 5 } }
      );
      setTimings(data.data.timings);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { timings, loading, error, fetch };
};
```

## Rate Limiting & Caching

### Implement Caching

```javascript
const cache = {};

const getPrayerTimesWithCache = async (city, country) => {
  const key = `${city}_${country}`;
  
  if (cache[key]) {
    return cache[key];
  }
  
  const times = await getPrayerTimes(city, country);
  cache[key] = times;
  
  // Clear cache after 24 hours
  setTimeout(() => {
    delete cache[key];
  }, 24 * 60 * 60 * 1000);
  
  return times;
};
```

## CORS & Security

All Aladhan API calls:

- ✅ Support CORS (no proxy needed)
- ✅ Use HTTPS
- ✅ No authentication required
- ✅ Public data (no private info)

## Testing API Calls

### cURL Examples

```bash
# Get prayer times for Cairo
curl -X GET "https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5"

# Get by coordinates
curl -X GET "https://api.aladhan.com/v1/timings/15-01-2024?latitude=30.0444&longitude=31.2357"

# Get calendar
curl -X GET "https://api.aladhan.com/v1/calendarByCity/2024/1?city=Cairo&country=Egypt"
```

### Postman Collection

Import to Postman:

```json
{
  "info": { "name": "Payer APIs" },
  "item": [
    {
      "name": "Prayer Times by City",
      "request": {
        "method": "GET",
        "url": {
          "raw": "https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5",
          "protocol": "https",
          "host": ["api", "aladhan", "com"],
          "path": ["v1", "timingsByCity"],
          "query": [
            { "key": "city", "value": "Cairo" },
            { "key": "country", "value": "Egypt" },
            { "key": "method", "value": "5" }
          ]
        }
      }
    }
  ]
}
```

---

See [Aladhan Documentation](https://aladhan.com/prayer-times-api) for more details.

[⬆ Back to Top](#-api-reference)
