# -----------------------------
# STAGE 1: Build the application
# -----------------------------
    FROM node:23-alpine AS builder

    # Create and switch to the /app directory
    WORKDIR /app
    
    # Copy dependency definitions
    COPY package.json package-lock.json ./
    # If using yarn, copy yarn.lock instead:
    # COPY package.json yarn.lock ./
    RUN npm ci
    
    # Copy all source files
    COPY . .
    
    # Build your Next.js app
    RUN npm run build
    
    # -----------------------------
    # STAGE 2: Production container
    # -----------------------------
    FROM node:23-alpine AS runner
    
    # Set working directory
    WORKDIR /app
    
    # Set production environment variable
    ENV NODE_ENV=production
    
    # Copy only the necessary files from the builder stage
    COPY --from=builder /app/package.json .
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    
    # Expose the application port
    EXPOSE 3000
    
    # Run "npm start" by default
    CMD ["npm", "start"]
    