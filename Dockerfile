# syntax = docker/dockerfile:1

ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

ARG SUPABASE_URL
ARG SUPABASE_KEY
ARG NUXT_TURNSTILE_SECRET_KEY
ARG NUXT_PUBLIC_TURNSTILE_SITE_KEY
ARG NUXT_PUBLIC_MAPBOX_API_TOKEN

WORKDIR /src

# Build
FROM base as build
RUN apt-get update && apt-get install -y python3 make g++

COPY --link package.json package-lock.json ./
RUN npm install --production=false

COPY --link . .

RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT
ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_KEY=${SUPABASE_KEY}
ENV NUXT_TURNSTILE_SECRET_KEY=${NUXT_TURNSTILE_SECRET_KEY}
ENV NUXT_PUBLIC_TURNSTILE_SITE_KEY=${NUXT_PUBLIC_TURNSTILE_SITE_KEY}
ENV NUXT_PUBLIC_MAPBOX_API_TOKEN=${NUXT_PUBLIC_MAPBOX_API_TOKEN}

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]