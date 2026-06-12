#!/bin/bash

################################################################################
# Deployment Script for Payer - Prayer Times PWA
# Supports: Netlify, Docker, Local
################################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
  echo -e "${BLUE}ℹ ${1}${NC}"
}

log_success() {
  echo -e "${GREEN}✓ ${1}${NC}"
}

log_warning() {
  echo -e "${YELLOW}⚠ ${1}${NC}"
}

log_error() {
  echo -e "${RED}✗ ${1}${NC}"
}

# Check prerequisites
check_deps() {
  local deps=("node" "npm" "git")
  
  for cmd in "${deps[@]}"; do
    if ! command -v "$cmd" &> /dev/null; then
      log_error "$cmd is not installed"
      exit 1
    fi
  done
  
  log_success "All dependencies found"
}

# Show menu
show_menu() {
  echo -e "${BLUE}================================${NC}"
  echo -e "${BLUE}Payer - Deployment Menu${NC}"
  echo -e "${BLUE}================================${NC}"
  echo "1) Build locally"
  echo "2) Deploy to Netlify"
  echo "3) Deploy with Docker"
  echo "4) Docker Compose"
  echo "5) Exit"
  echo -e "${BLUE}================================${NC}"
}

# Build locally
build_local() {
  log_info "Building application locally..."
  
  if [ ! -d "node_modules" ]; then
    log_info "Installing dependencies..."
    npm ci
  fi
  
  log_info "Running build..."
  npm run build
  
  if [ -d "dist" ]; then
    log_success "Build completed successfully"
    log_info "Output directory: ./dist"
    du -sh dist/
  else
    log_error "Build failed - dist directory not created"
    exit 1
  fi
}

# Deploy to Netlify
deploy_netlify() {
  log_info "Deploying to Netlify..."
  
  if ! command -v netlify &> /dev/null; then
    log_info "Installing Netlify CLI..."
    npm install -g netlify-cli
  fi
  
  if [ ! -d "dist" ]; then
    log_info "Build not found, building first..."
    build_local
  fi
  
  log_info "Authenticating with Netlify..."
  netlify login
  
  log_info "Deploying..."
  netlify deploy --prod --dir=dist --site="$NETLIFY_SITE_ID"
  
  log_success "Deployment to Netlify completed"
  log_info "Visit: https://azan-prayer.netlify.app"
}

# Docker build and run
deploy_docker() {
  log_info "Building Docker image..."
  
  if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed"
    echo "Install from: https://docs.docker.com/get-docker/"
    exit 1
  fi
  
  local image_name="payer:latest"
  
  log_info "Building image: $image_name"
  docker build -t "$image_name" .
  
  log_success "Docker image built successfully"
  
  log_info "Starting container..."
  docker run -d \
    --name payer-app \
    -p 3000:3000 \
    -e VITE_ALADHAN_API_URL="https://api.aladhan.com/v1" \
    "$image_name"
  
  log_success "Container running"
  log_info "Access app at: http://localhost:3000"
  echo ""
  echo "Container commands:"
  echo "  View logs:   docker logs payer-app"
  echo "  Stop:        docker stop payer-app"
  echo "  Remove:      docker rm payer-app"
}

# Docker Compose
deploy_compose() {
  log_info "Using Docker Compose..."
  
  if ! command -v docker-compose &> /dev/null; then
    log_error "Docker Compose is not installed"
    exit 1
  fi
  
  if [ ! -f "docker-compose.yml" ]; then
    log_error "docker-compose.yml not found"
    exit 1
  fi
  
  log_info "Starting services..."
  docker-compose up -d
  
  log_success "Services started"
  log_info "Access app at: http://localhost:3000"
  echo ""
  echo "Compose commands:"
  echo "  View logs:   docker-compose logs -f"
  echo "  Stop:        docker-compose down"
  echo "  Rebuild:     docker-compose build --no-cache"
}

# Main script
main() {
  check_deps
  
  while true; do
    show_menu
    read -p "Choose an option [1-5]: " choice
    
    case $choice in
      1)
        build_local
        ;;
      2)
        deploy_netlify
        ;;
      3)
        deploy_docker
        ;;
      4)
        deploy_compose
        ;;
      5)
        log_info "Exiting..."
        exit 0
        ;;
      *)
        log_error "Invalid option"
        ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
  done
}

# Run main
main "$@"
