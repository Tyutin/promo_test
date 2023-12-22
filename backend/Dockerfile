FROM node:18.19.0
RUN mkdir /app

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build:prod

CMD ["yarn", "start:prod"]