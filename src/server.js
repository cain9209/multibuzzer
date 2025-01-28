import path from 'path';
import serve from 'koa-static';
import ratelimit from 'koa-ratelimit';
import { v4 as uuidv4 } from 'uuid';
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
const DEPLOYED_URL = 'https://localhost:4001';

// CORS settings to allow requests from the frontend
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', DEPLOYED_URL);
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (ctx.method === 'OPTIONS') {
    ctx.status = 204; // Respond to preflight requests
    return;
  }

  await next();
});

// Utility function to generate random strings
function randomString(length, chars) {
  let result = '';
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

// Rate limiter configuration
const db = new Map();
app.use(
  ratelimit({
    driver: 'memory',
    db: db,
    duration: 60000, // 1-minute window
    errorMessage: 'Too many requests, please try again later.',
    id: (ctx) => ctx.ip,
    max: 25, // Max 25 requests per window
    whitelist: (ctx) => {
      return ctx.path.startsWith('/games') && ctx.path.includes('Buzzer');
    },
  })
);

// Logging middleware to track requests
app.use(async (ctx, next) => {
  console.log(`Incoming request: ${ctx.method} ${ctx.url}`);
  await next();
});

// Serve static files (frontend path must be defined)
const FRONTEND_PATH = path.join(__dirname, '../client/build');
console.log(`Serving static files from: ${FRONTEND_PATH}`);
app.use(serve(FRONTEND_PATH));

// Fallback route to serve index.html for client-side routing
const indexPath = path.join(FRONTEND_PATH, 'index.html');
app.use(async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(indexPath);
  }
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

// Attach the Koa app to the server
server.app = app;

// Start the server with lobby configuration
server.run(
  {
    port: PORT,
    lobbyConfig: { uuid: () => randomString(6, 'ABCDEFGHJKLMNPQRSTUVWXYZ') },
  },
  () => {
    console.log(`Server running on http://localhost:${PORT}`);
  }
);
