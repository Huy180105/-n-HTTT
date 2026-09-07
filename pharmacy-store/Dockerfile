# Build stage
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source files
COPY . .

# Build-time environment variables
ARG VITE_BACKEND_API_URL
ARG VITE_LLM_API_URL

ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL
ENV VITE_LLM_API_URL=$VITE_LLM_API_URL

# Build the application
RUN bun run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
