# GitHub Secrets Setup for Netlify Deployment

## Required Secrets for Netlify CI/CD

Add these secrets to your GitHub repository settings (`Settings → Secrets and variables → Actions`):

### 1. Netlify Authentication

```
NETLIFY_AUTH_TOKEN
- Get from: https://app.netlify.com/user/applications/personal
- How: Create personal access token
- Used for: Authenticating with Netlify API
```

### 2. Netlify Site ID

```
NETLIFY_SITE_ID
- Get from: Netlify Site Settings → General
- Example: a1b2c3d4-e5f6-7890-abcd-ef1234567890
- Used for: Deploying to specific site
```

### 3. Environment Variables

```
VITE_ALADHAN_API_URL
- Value: https://api.aladhan.com/v1
- Used for: Prayer times API endpoint

VITE_DEFAULT_CITY
- Value: Cairo (or your city)
- Used for: Default city when loading app

VITE_DEFAULT_COUNTRY
- Value: Egypt (or your country)
- Used for: Default country for prayer times
```

### 4. Optional: Slack Notifications

```
SLACK_WEBHOOK
- Get from: Slack workspace settings → Apps → Incoming Webhooks
- Used for: Deployment notifications
```

## Setup Steps

### Step 1: Generate Netlify Token

1. Go to https://app.netlify.com/user/applications/personal
2. Click "New access token"
3. Give it a name: "GitHub Actions"
4. Copy the token

### Step 2: Get Netlify Site ID

1. Go to your Netlify site dashboard
2. Go to Settings → General
3. Find "Site ID"
4. Copy it

### Step 3: Add to GitHub Secrets

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret:
   - `NETLIFY_AUTH_TOKEN` = your token from Step 1
   - `NETLIFY_SITE_ID` = your site ID from Step 2
   - `VITE_ALADHAN_API_URL` = https://api.aladhan.com/v1
   - `VITE_DEFAULT_CITY` = Cairo
   - `VITE_DEFAULT_COUNTRY` = Egypt

### Step 4: Test Deployment

1. Make a commit to main branch
2. Watch GitHub Actions run
3. Check Netlify for deployment status
4. Verify at https://azan-prayer.netlify.app

## Rotating Secrets

### Update Netlify Token

1. Generate new token in Netlify
2. Update `NETLIFY_AUTH_TOKEN` in GitHub
3. Optionally revoke old token

### Update Site ID

Only needed if you change sites. Same process as initial setup.

## Troubleshooting

### "Unauthorized" Error

**Cause:** Invalid or expired Netlify token
**Fix:** 
1. Generate new token in Netlify
2. Update secret in GitHub
3. Re-run workflow

### "Site not found" Error

**Cause:** Wrong site ID
**Fix:**
1. Verify site ID from Netlify settings
2. Update `NETLIFY_SITE_ID` secret
3. Re-run workflow

### Deployment not triggering

**Cause:** Workflow may be disabled
**Fix:**
1. Go to Actions tab
2. Check workflows are enabled
3. Click workflow → Enable

### Wrong environment variables

**Cause:** Secrets not set correctly
**Fix:**
1. Verify all secrets in Settings
2. Check secret names match exactly
3. Re-run workflow

## File Structure

After setup, your CI/CD workflows:

- `.github/workflows/ci.yml` - Lint, build, test on all PRs
- `.github/workflows/cd-netlify.yml` - Deploy to production on push to main
- `.github/workflows/cd-netlify-preview.yml` - Deploy preview on PR
- `.github/workflows/cd-docker.yml` - Build Docker image

## Links

- [Netlify Settings](https://app.netlify.com)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Netlify API Documentation](https://docs.netlify.com/api/get-started/)
