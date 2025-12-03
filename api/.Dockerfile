FROM node:20

RUN npm install -g pnpm

RUN npm install -g wrangler 

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN wrangler types

EXPOSE 3000

CMD ["pnpm", "dev"]