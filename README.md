# Running the URL Shortener Locally

This guide walks you through setting up and running both the backend (NestJS) and frontend (Next.js) of the URL Shortener project on your local machine.

## Prerequisites

- **Node.js** (LTS)  
- **npm** (comes with Node.js)  
- **Docker & Docker Compose**  
- **Git**
- **ClientAPI** (optional)  

## Backend Setup

1. **Clone the repo**  
   ```bash
   git clone git@github.com:pebueno/url-shortener.git
   cd url-shortener
    ```

2. **Create your `.env`**
At project root, create a file named `.env` with:
    ```env
    DB_HOST=localhost
    DB_PORT=5433
    DB_USER=postgres
    DB_PASS=postgres
    DB_NAME=urlshortener
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```
3. **Start Postgres**
    ```bash
    docker compose up -d
    ```
  This will launch a PostgreSQL instance on port 5433.

4. **Install & run backend**
    ```bash
    npm install
    npm run start:dev
    ```
  - The API will be available at `http://localhost:5000`.
  - Swagger docs available at `http://localhost:5000/api-docs`.

## Frontend Setup

1. **Move into client folder**
    ```bash
    cd client
    ```
2. **Create your** `.env.local`<br>
    In `client/`, create `.env.local`:
    ```env
    NEXT_PUBLIC_API_URL=`http://localhost:5000`
    ```
3. **Install & run frontend**
    ```bash
    npm install
    npm run dev
    ```
    The Next.js app will be available at `http://localhost:3000`.