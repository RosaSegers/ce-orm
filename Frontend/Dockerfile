# Stage 1 — build
FROM node:18-alpine AS build
WORKDIR /app

ENV NODE_ENV=production
# Install dependencies first (leverages caching)
COPY package*.json ./
RUN npm ci --production=false

# Copy source and build
COPY . .
RUN npm run build

# Stage 2 — run
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy only runtime artifacts
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
# Next.js production start
CMD ["npm", "start"]
