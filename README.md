# QFlare Back-End

## Description

QFlare is a platform that allows users to enhance their logic skills with quizzes. This repository contains the back-end of the QFlare platform.

## Requirements

- [Node.js](https://nodejs.org/) >= v18.16.0 or [Bun](https://bun.sh/) >= v1.0.0
- [MySQL](https://www.mysql.com/) >= v8.0.0

## Installation

1. Clone the repository

```bash
git clone https://github.com/Capstone-Buddies/qflare-back-end.git
```

2. Install dependencies

npm:

```bash
npm install
```

yarn:

```bash
yarn install
```

bun:

```bash
bun install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=
MYSQL_DB_HOST=
MYSQL_DB_USER=
MYSQL_DB_PASSWORD=
MYSQL_DB_NAME=
```

## Usage

npm:

```bash
npm run dev:node
```

yarn:

```bash
yarn dev:node
```

bun:

```bash
bun dev:bun
```

The server will be running on `http://localhost:3000`

## Build

npm:

```bash
npm run build:node
```

yarn:

```bash
yarn build:node
```

bun:

```bash
bun build:bun
```

## API Documentation

- [API Documentation](API%20Documentation.md)
