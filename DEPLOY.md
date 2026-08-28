# 🚀 Deploying the Todo Backend to Vercel

## Prerequisites

1. A Vercel account (free tier works)
2. Vercel CLI installed: `npm i -g vercel`
3. Git repository pushed to GitHub

## Quick Deploy (Recommended)

### Option 1: Via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects the project — no config changes needed
4. Click **Deploy**

That's it! Your API will be live at `https://your-project.vercel.app/api/todos`.

### Option 2: Via CLI

```bash
# Install Vercel CLI (if not already)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (first time — sets up the project)
vercel

# Deploy to production
vercel --prod
```

## How It Works

The API runs as **Vercel Serverless Functions**:

- `api/todos/index.js` — handles `GET /api/todos` and `POST /api/todos`
- `api/todos/[id].js` — handles `PUT /api/todos/:id` and `DELETE /api/todos/:id`

### ⚠️ Important: Storage Limitation

Vercel serverless functions are **stateless** — data does NOT persist between requests.
Each function instance has its own memory, and data resets on cold starts.

**For a student project**, this means:
- Todos will persist during a session (same server instance)
- Todos will disappear after ~30 minutes of inactivity
- Multiple users see different data

## Adding Persistent Storage (Optional)

For data that persists, add a database:

### Option A: Vercel KV (Easiest)

1. In your Vercel dashboard, go to **Storage** → **Create Database** → **KV**
2. Link it to your project
3. Vercel auto-injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` env vars
4. Update `api/todos/index.js` to use `@vercel/kv`:

```js
const { kv } = require('@vercel/kv');

// GET
const todos = await kv.get('todos') || [];
res.json(todos);

// POST
await kv.set('todos', [...todos, newTodo]);
```

### Option B: Upstash Redis (Free Tier)

1. Sign up at [upstash.com](https://upstash.com)
2. Create a Redis database
3. Add env vars in Vercel: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
4. Use `@upstash/redis` in your API routes

### Option C: PlanetScale / Turso (SQLite)

For SQL-based storage, both offer free tiers and work well with Vercel.

## Testing Locally

The original Express server still works locally:

```bash
cd mini-projects/todo
node server.js
# API at http://localhost:5000
```

The frontend auto-detects:
- **Localhost** → uses `http://localhost:5000`
- **Deployed** → uses the same origin (Vercel handles API routing)

## Environment Variables

No env vars needed for basic deployment. If you add Vercel KV:
- `KV_REST_API_URL` — auto-injected
- `KV_REST_API_TOKEN` — auto-injected

## Custom Domain (Optional)

1. In Vercel dashboard → **Settings** → **Domains**
2. Add your domain
3. Update DNS records as instructed

---

Built by students, for students. 🚀
