# ─── Stage 1: Build the React app 
FROM node:18-alpine AS builder
WORKDIR /app

# 1. Copy only package manifests, install deps
COPY package*.json ./
RUN npm ci

# 2. Copy source & run the build
COPY . .
RUN npm run build

# ─── Stage 2: Serve it with Nginx
# 3. Copy built static files from builder stage
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# 4. Expose port 80 & run Nginx in foreground
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]