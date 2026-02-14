FROM node:18-slim

WORKDIR /src

# ✅ Install OpenSSL + required libs for Prisma
RUN apt-get update -y \
  && apt-get install -y openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x docker-entrypoint.sh

EXPOSE 4000

CMD ["sh", "./docker-entrypoint.sh"]
