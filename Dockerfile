###############################################
# Multi-stage Docker build for Prayer Times App
###############################################

# Stage 1: Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Install dependencies with optimizations
COPY package*.json ./
RUN npm ci --only=production && \
    npm ci --only=development

# Copy source code
COPY . .

# Build application
RUN npm run build && \
    npm prune --production

# Stage 2: Runtime stage (lightweight)
FROM node:18-alpine

WORKDIR /app

# Install serve to run the app
RUN npm install -g serve

# Copy built artifacts from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set ownership
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 3000

# Start application
CMD ["serve", "-s", "dist", "-l", "3000", "--no-clipboard", "--single"]
