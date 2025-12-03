FROM node:20

RUN npm install -g pnpm

RUN npm install -g wrangler 

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN wrangler types

EXPOSE 8787

CMD ["pnpm", "dev"]