FROM node:18.19.0

WORKDIR /app/backend

COPY ./backend/package.json ./backend/yarn.lock /app/backend/
RUN yarn install --frozen-lockfile

COPY ./backend /app/backend/
COPY ./.env /app/backend/

RUN yarn build:prod

CMD ["yarn", "start:prod"]