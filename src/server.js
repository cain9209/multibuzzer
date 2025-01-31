import path from 'path';
import serve from 'koa-static';
import Koa from 'koa';
import { Server } from 'boardgame.io/server';
import { Buzzer } from './lib/store.js';
import fs from 'fs';

const app = new Koa();
const server = Server({
  games: [Buzzer],
  generateCredentials: () => uuidv4(),
});

const PORT = process.env.PORT || 4001;

// Serve static files from the 'build' folder (frontend assets)
const FRONTEND_PATH = path.join(__dirname, '../client/build');
console.log(`Serving static files from: ${FRONTEND_PATH}`);
app.use(serve(FRONTEND_PATH));

// Serve the index.html for routes handled by React (single-page app routing)
const indexPath = path.join(FRONTEND_PATH, 'index.html');
app.use(async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(indexPath);
  }
});

// Attach your game server (Boardgame.io)
server.app = app;

// CORS configuration to allow frontend to access API
const DEPLOYED_URL = 'http://localhost:4001';
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', DEPLOYED_URL);
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (ctx.method === 'OPTIONS') {
    ctx.status = 204;
    return;
  }

  await next();
});

// Logging middleware for tracking requests
app.use(async (ctx, next) => {
  console.log(`Incoming request: ${ctx.method} ${ctx.url}`);
  await next();
});

// Error-handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message };
    console.error('Server Error:', err);
  }
});

// Run the game server
server.run(
  {
    port: PORT,
  },
  () => {
    console.log(`Server running on http://localhost:${PORT}`);
  }
);
