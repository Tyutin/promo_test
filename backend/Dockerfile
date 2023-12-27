FROM node:18.19.0 as base

FROM base as builder
WORKDIR /app/backend
COPY ./backend/package.json ./backend/yarn.lock /app/backend/
RUN yarn install --frozen-lockfile
COPY ./backend /app/backend/
COPY ./shared /app/shared/
COPY ./.env /app/backend/
RUN yarn build:prod

FROM base as runner
WORKDIR /app
COPY --from=builder /app/backend/node_modules /app/node_modules
COPY --from=builder /app/backend/dist /app/dist
COPY --from=builder /app/backend/.env /app/.env

CMD ["node", "dist/backend/src/main"]