import path from 'path';
import serve from 'koa-static';
import ratelimit from 'koa-ratelimit';
import { v4 as uuidv4 } from 'uuid';
import Koa from 'koa';

const Server = require('boardgame.io/server').Server;
const Buzzer = require('./lib/store').Buzzer;

const server = Server({
  games: [Buzzer],
  generateCredentials: () => uuidv4(),
});

const PORT = process.env.PORT || 4001;
const { app } = server;

const FRONTEND_PATH = path.join(__dirname, '../build');

// Serve static files with enhanced CORS settings
app.use(
  serve(FRONTEND_PATH, {
    setHeaders: (res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    },
  })
);

// Middleware to handle CORS for API requests
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
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
    duration: 60000,  // 1-minute window
    errorMessage: 'Too many requests, please try again later.',
    id: (ctx) => ctx.ip,
    max: 25,  // Max 25 requests per window
    whitelist: (ctx) => {
      return ctx.path.startsWith('/games') && ctx.path.includes(Buzzer.name);
    },
  })
);

// Logging middleware to track requests
app.use(async (ctx, next) => {
  console.log(`Incoming request: ${ctx.method} ${ctx.url}`);
  await next();
});

// Fallback route to serve index.html for client-side routing
server.app.use(async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    await serve(FRONTEND_PATH)(Object.assign(ctx, { path: 'index.html' }), next);
  }
});

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
