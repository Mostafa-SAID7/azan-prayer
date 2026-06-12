#!/bin/bash

# Netlify Build Script
set -e

echo "🔧 Node version:"
node --version

echo "🔧 npm version:"
npm --version

echo "🧹 Clearing npm cache..."
npm cache clean --force

echo "📦 Installing dependencies..."
npm ci --verbose

echo "🏗️  Building application..."
npm run build

echo "✅ Build completed successfully!"
