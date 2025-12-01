# Stage 1 — Build the Next.js app
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2 — Run the production server
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Copy only what’s needed for runtime
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
