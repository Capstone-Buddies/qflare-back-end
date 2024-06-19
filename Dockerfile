FROM oven/bun:latest
# FROM node:lts-iron

WORKDIR /app

ENV PORT=
ENV MYSQL_DB_HOST=
ENV MYSQL_DB_USER=
ENV MYSQL_DB_PASSWORD=
ENV MYSQL_DB_NAME=
ENV JWT_SECRET=
ENV ML_API_BASE_URL=
ENV GCP_BUCKET_NAME=
ENV GCP_PROJECT_ID=
ENV GCP_KEYFILE_PATH=

COPY . .

RUN bun install
# RUN npm install && npm run build:node

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]
# CMD ["npm", "start"]

