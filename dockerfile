FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY dist/ ./dist/

EXPOSE 3000

CMD ["node", "dist/server.js"]