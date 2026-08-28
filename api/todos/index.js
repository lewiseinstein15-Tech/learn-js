const cors = require('cors');

const corsMiddleware = cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

function runMiddleware(req, res) {
  return new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

// Try to use Vercel KV for persistent storage
let kv = null;
try {
  kv = require('@vercel/kv').kv;
} catch (e) {
  // KV not available — will fall back to in-memory
}

module.exports = async function handler(req, res) {
  await runMiddleware(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const todos = kv ? (await kv.get('todos')) || [] : (globalThis.__todos || []);
      return res.status(200).json(todos);
    } catch (e) {
      return res.status(200).json(globalThis.__todos || []);
    }
  }

  if (req.method === 'POST') {
    const { text, done } = req.body || {};
    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }
    const todo = { id: Date.now(), text, done: done || false };

    try {
      if (kv) {
        const todos = (await kv.get('todos')) || [];
        todos.push(todo);
        await kv.set('todos', todos);
      } else {
        if (!globalThis.__todos) globalThis.__todos = [];
        globalThis.__todos.push(todo);
      }
    } catch (e) {
      if (!globalThis.__todos) globalThis.__todos = [];
      globalThis.__todos.push(todo);
    }

    return res.status(201).json(todo);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
