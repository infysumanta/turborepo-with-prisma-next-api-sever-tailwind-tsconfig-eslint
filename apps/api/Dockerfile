FROM node:20-alpine as base


FROM base AS builder

RUN apk add --no-cache libc6-compat openssl
RUN apk update

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune api --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat openssl
RUN apk update
WORKDIR /app


# COPY --from=builder /app/out/json/ .
# COPY --from=builder /app/out/yarn.lock ./yarn.lock
# RUN yarn install

COPY --from=builder /app/out/full/ .
RUN yarn install
RUN yarn prisma generate


COPY turbo.json turbo.json


RUN yarn turbo build --filter=api...

FROM base AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl
RUN apk update

RUN npx prisma generate


RUN npx prisma -v

RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

CMD node apps/api/dist/index.js