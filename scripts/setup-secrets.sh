#!/bin/bash

################################################################################
# GitHub Secrets Setup Script
# Automates adding required secrets for Netlify deployment
################################################################################

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}GitHub Secrets Setup for Payer${NC}"
echo "================================"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
  echo -e "${RED}GitHub CLI (gh) is not installed${NC}"
  echo "Install from: https://cli.github.com"
  exit 1
fi

# Authenticate if not already
gh auth status 2>/dev/null || gh auth login

echo -e "${BLUE}Adding secrets to GitHub...${NC}"
echo ""

# 1. NETLIFY_AUTH_TOKEN
read -p "Enter your Netlify Auth Token: " netlify_token
if [ -n "$netlify_token" ]; then
  echo "$netlify_token" | gh secret set NETLIFY_AUTH_TOKEN
  echo -e "${GREEN}✓ Added NETLIFY_AUTH_TOKEN${NC}"
fi

# 2. NETLIFY_SITE_ID
read -p "Enter your Netlify Site ID: " netlify_site_id
if [ -n "$netlify_site_id" ]; then
  echo "$netlify_site_id" | gh secret set NETLIFY_SITE_ID
  echo -e "${GREEN}✓ Added NETLIFY_SITE_ID${NC}"
fi

# 3. VITE_ALADHAN_API_URL
echo "${ gh secret set VITE_ALADHAN_API_URL <<< "https://api.aladhan.com/v1"
echo -e "${GREEN}✓ Added VITE_ALADHAN_API_URL${NC}"

# 4. VITE_DEFAULT_CITY
read -p "Enter default city [Cairo]: " default_city
default_city=${default_city:-Cairo}
echo "$default_city" | gh secret set VITE_DEFAULT_CITY
echo -e "${GREEN}✓ Added VITE_DEFAULT_CITY${NC}"

# 5. VITE_DEFAULT_COUNTRY
read -p "Enter default country [Egypt]: " default_country
default_country=${default_country:-Egypt}
echo "$default_country" | gh secret set VITE_DEFAULT_COUNTRY
echo -e "${GREEN}✓ Added VITE_DEFAULT_COUNTRY${NC}"

# Optional: SLACK_WEBHOOK
read -p "Enter Slack webhook URL (optional, press Enter to skip): " slack_webhook
if [ -n "$slack_webhook" ]; then
  echo "$slack_webhook" | gh secret set SLACK_WEBHOOK
  echo -e "${GREEN}✓ Added SLACK_WEBHOOK${NC}"
fi

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✓ All secrets added successfully!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Next steps:"
echo "1. Push a commit to main branch"
echo "2. GitHub Actions will automatically deploy to Netlify"
echo "3. Visit: https://azan-prayer.netlify.app"
