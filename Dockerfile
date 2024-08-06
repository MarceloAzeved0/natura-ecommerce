FROM node:20-alpine as builder

# Create app directory
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn prisma:generate
# ---

RUN yarn build

FROM node:20-alpine

RUN apk --no-cache add curl

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start:prod"]