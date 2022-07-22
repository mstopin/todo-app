FROM node:alpine AS dev
WORKDIR /app
CMD ["yarn", "dev"]

FROM node:alpine AS builder
WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./
COPY src ./src
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:alpine AS prod
WORKDIR /app
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["yarn", "start"]
