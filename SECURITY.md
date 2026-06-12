# Security Policy

## Reporting Security Issues

If you discover a security vulnerability, please email security@payer.dev instead of using the issue tracker. Please include:

- Type of vulnerability
- Location of the vulnerability
- Steps to reproduce it
- Potential impact
- Any suggested fixes

We take security seriously and will respond to your report within 48 hours.

## Security Best Practices

### For Users

1. **Keep Your Browser Updated** - Always use the latest version of your browser
2. **Enable HTTPS** - Always access the app over HTTPS
3. **Use Strong Passwords** - If authentication is added in the future
4. **Clear Local Storage** - Periodically clear browser data on shared devices
5. **Report Issues** - Report suspicious behavior immediately

### For Developers

1. **Input Validation** - Always validate and sanitize user input
2. **API Security** - Use HTTPS for all API calls
3. **Dependency Management** - Regularly update dependencies
4. **No Hardcoded Secrets** - Never commit API keys or tokens
5. **XSS Prevention** - Use React's built-in XSS protection
6. **CSRF Protection** - Implement CSRF tokens for form submissions

## Secure Coding Guidelines

### Input Validation

```javascript
// ❌ Don't
const city = userInput;
fetchPrayerTimes(city);

// ✅ Do
const city = sanitizeInput(userInput);
if (validateCity(city)) {
  fetchPrayerTimes(city);
}
```

### API Calls

```javascript
// ❌ Don't
fetch(`https://api.example.com/data?userId=${userId}&token=${TOKEN}`);

// ✅ Do
const params = new URLSearchParams();
params.append('userId', userId);
fetch(`https://api.example.com/data?${params}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Environment Variables

```javascript
// ✅ Always use environment variables
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
```

## Dependency Security

We regularly scan dependencies for vulnerabilities using:

- `npm audit`
- GitHub Security Alerts
- Dependabot

### Updating Dependencies Safely

```bash
# Check for vulnerabilities
npm audit

# Update with caution
npm update

# Audit again after updating
npm audit
```

## Data Privacy

### What Data We Collect

- **Location**: Only to fetch prayer times (sent to Aladhan API)
- **Prayer Tracker**: Stored locally in browser (not sent anywhere)
- **Favorites**: Stored locally in browser (not sent anywhere)
- **Language Preference**: Stored locally in browser

### What We DON'T Collect

- Personal information
- Usage analytics
- Cookies (except for necessary functionality)
- IP addresses
- Device identifiers

### Local Storage

All user data is stored exclusively in the browser's localStorage:

```javascript
// Prayer tracker data
localStorage.getItem('prayerTracker_2024-01-15')

// Favorite cities
localStorage.getItem('prayerFavorites')

// Language preference
localStorage.getItem('language')
```

## HTTPS & Encryption

- The app is served over HTTPS only
- All external API calls use HTTPS
- No data is transmitted in plain text

## Content Security Policy

The app implements CSP headers to prevent:

- Cross-site scripting (XSS)
- Clickjacking
- Data injection

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.aladhan.com;
```

## PWA Security

### Service Worker Security

- Service workers are validated before installation
- Only HTTPS is allowed in production
- Automatic updates prevent outdated code

### Cache Security

- Sensitive data is not cached
- Cache is versioned for automatic updates
- Users can clear cache in settings

## Vulnerability Disclosure

### Timeline

- **Day 0**: Vulnerability reported
- **Day 1**: Initial assessment
- **Day 7**: Fix development begins
- **Day 14**: Fix released (target)
- **Day 30**: Public disclosure

### Severity Levels

- **Critical**: Immediate action (1 day)
- **High**: Urgent attention (3 days)
- **Medium**: Standard attention (7 days)
- **Low**: Scheduled update (30 days)

## Compliance

We strive to comply with:

- OWASP Top 10
- CWE/SANS Top 25
- GDPR (if EU users)
- CCPA (if US users)

## Security Checklist

- [ ] All user input is validated
- [ ] No secrets in version control
- [ ] Dependencies are up to date
- [ ] HTTPS is enforced
- [ ] CSP headers are set
- [ ] XSS protection is enabled
- [ ] CSRF tokens are used
- [ ] Error messages don't leak sensitive info
- [ ] Access controls are checked
- [ ] Data is encrypted in transit

## Security Resources

- [OWASP Security Guidelines](https://owasp.org/)
- [CWE/SANS Top 25](https://cwe.mitre.org/top25/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [React Security Best Practices](https://react.dev/learn#security)

---

Thank you for helping keep Payer secure! 🔒
