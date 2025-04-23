# ============== Stage 1 ================
FROM node:20-alpine as base

RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy and install dependencies first to leverage Docker cache
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

# ============== Stage 2 ================
FROM base as builder

ENV NODE_ENV=production

ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_SOCKET_API_PATH
ARG NEXT_PUBLIC_DOMAIN_NAME
ARG NEXT_PUBLIC_SHOW_LOGGER

ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_SOCKET_API_PATH=$NEXT_PUBLIC_SOCKET_API_PATH
ENV NEXT_PUBLIC_DOMAIN_NAME=$NEXT_PUBLIC_DOMAIN_NAME
ENV NEXT_PUBLIC_SHOW_LOGGER=$NEXT_PUBLIC_SHOW_LOGGER

COPY next.config.js next.config.js
COPY postcss.config.js postcss.config.js
COPY tailwind.config.ts tailwind.config.ts
COPY tsconfig.json tsconfig.json
COPY public ./public
COPY src ./src

RUN pnpm run build

# ============== Stage 3 ================
FROM node:20-alpine as runner

RUN npm install -g pnpm

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3000
CMD ["pnpm", "start"]