FROM node:20-alpine

WORKDIR /app
RUN apk add --no-cache python3 make g++ openssl openssl-dev

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

ENV DATABASE_URL="postgresql://postgres:NGsjPvwhWwAWoRhCqNbLPhLJsEJxluYb@postgres.railway.internal:5432/railway"
RUN npx prisma generate
RUN npx prisma db push
COPY . .
RUN npm run build
RUN npm prune --production
RUN apk del python3 make g++

EXPOSE 3000

CMD ["node", "dist/server.js"]