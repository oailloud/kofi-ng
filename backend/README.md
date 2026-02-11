
This directory contains a lightweight TypeScript REST API for the Kofi project.

## Features

- **GET `/coffees`**: returns a static list of coffees from `src/data/coffees.json`.

## Project structure

- **`package.json`**: backend dependencies and scripts
- **`tsconfig.json`**: TypeScript configuration for the backend
- **`src/server.ts`**: Express server entrypoint
- **`src/data/coffees.json`**: static dummy coffee data

## Running the backend

From the `src/backend` directory:

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run in development mode**

   ```bash
   npm run dev
   ```

   This starts the server (by default on port `3000`).

3. **Build and run**

   ```bash
   npm run build
   npm start
   ```

## Testing the endpoint

Once the server is running, you can fetch the coffees with:

```bash
curl http://localhost:3000/coffees
```
