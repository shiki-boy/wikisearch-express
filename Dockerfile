# Common build stage
FROM node:18-alpine as base

COPY . ./app

WORKDIR /app

RUN npm install -g pnpm

RUN pnpm i

# EXPOSE 3000

# Development build stage
FROM base as development-build

ENV NODE_ENV development

CMD ["pnpm", "dev"]

# Production build stage
FROM base as production-build

ENV NODE_ENV production

CMD ["pnpm", "start"]
