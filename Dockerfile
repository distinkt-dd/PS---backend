FROM node:20-alpine

WORKDIR /app

# Устанавливаем системные зависимости для сборки
RUN apk add --no-cache python3 make g++ openssl openssl-dev

# Копируем файлы зависимостей
COPY package*.json ./
COPY prisma ./prisma/

# Устанавливаем зависимости для продакшена
RUN npm ci --only=production

# Генерируем Prisma клиент
RUN npx prisma generate

# Копируем исходный код
COPY . .

# Устанавливаем dev зависимости для сборки
RUN npm ci --only=development

# Собираем TypeScript
RUN npm run build

# Удаляем dev зависимости и системные зависимости сборки
RUN npm prune --production
RUN apk del python3 make g++

# Открываем порт
EXPOSE 3000

# Команда запуска
CMD ["node", "dist/server.js"]