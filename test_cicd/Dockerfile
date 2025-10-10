# --- build stage
FROM node:20-alpine AS builder
WORKDIR /app

# pnpm via corepack
RUN corepack enable && corepack prepare pnpm@10.18.1 --activate

# deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# source
COPY . .
RUN pnpm build

# --- runtime (nginx) untuk serve Vite static
FROM nginx:1.27-alpine AS runner
WORKDIR /usr/share/nginx/html

# hapus default conf dan pasang SPA conf
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy hasil build
COPY --from=builder /app/dist ./

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
