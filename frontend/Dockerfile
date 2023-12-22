FROM node:18.19.0 AS base

FROM base AS deps

WORKDIR /app/frontend
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn remove sharp
RUN yarn install --frozen-lockfile

WORKDIR /app/backend
COPY backend/package.json backend/yarn.lock ./
RUN yarn install --frozen-lockfile




FROM base AS builder
WORKDIR /app/frontend
COPY --from=deps /app/frontend/node_modules ./node_modules
WORKDIR /app/backend
COPY --from=deps /app/backend/node_modules ./node_modules

COPY frontend /app/frontend
COPY backend/dataSource /app/backend/dataSource
COPY backend/src /app/backend/src
COPY backend/package.json /app/backend/package.json
COPY backend/yarn.lock /app/backend/yarn.lock
COPY shared /app/shared

WORKDIR /app/frontend
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_OUTPUT standalone
RUN yarn build:prod

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/frontend/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]
