# -----------------------------
# STAGE 1: Build the application
# -----------------------------
  FROM node:23-alpine AS builder
  WORKDIR /app
  
  # Copy package files and install dependencies
  COPY package*.json ./
  # If you’re using yarn, replace the above with:
  # COPY package.json yarn.lock ./
  RUN npm ci
  
  # Copy all source files and build the Next.js app
  COPY . .
  RUN npm run build
  
  # -----------------------------
  # STAGE 2: Production container
  # -----------------------------
  FROM node:23-alpine AS runner
  WORKDIR /app
  ENV NODE_ENV=production
  
  # Copy built artifacts and necessary files from the builder stage
  COPY --from=builder /app/package*.json ./
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/.next ./.next
  COPY --from=builder /app/public ./public
  
  # Expose the application port and set the default command
  EXPOSE 3000
  CMD ["npm", "start"]
  