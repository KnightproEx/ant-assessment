FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update -y && apt-get install -y openssl

FROM base AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm dlx prisma generate
RUN pnpm run build

FROM base AS release
WORKDIR /app
COPY --from=builder /app/.output .output/
COPY --from=builder /app/app/generated/prisma .output/server
CMD ["node", ".output/server/index.mjs"]

EXPOSE 3000
