FROM node:20-slim AS base
ARG VERSION
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV VERSION=${VERSION}
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
RUN groupadd -g 1001 webapp && \
  useradd -m -u 1001 -g webapp webapp
WORKDIR /app
COPY --from=builder --chown=webapp:webapp /app/.output .output/
COPY --from=builder --chown=webapp:webapp /app/app/generated/prisma .output/server
USER webapp
CMD ["node", ".output/server/index.mjs"]
EXPOSE 3000
