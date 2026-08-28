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

  const { id } = req.query;
  const todoId = parseInt(id, 10);

  if (req.method === 'PUT') {
    const { text, done } = req.body || {};

    try {
      if (kv) {
        const todos = (await kv.get('todos')) || [];
        const idx = todos.findIndex((t) => t.id === todoId);
        if (idx === -1) return res.status(404).json({ error: 'Not found' });
        if (text !== undefined) todos[idx].text = text.toString().trim().slice(0, 200);
        if (done !== undefined) todos[idx].done = !!done;
        await kv.set('todos', todos);
        return res.status(200).json(todos[idx]);
      } else {
        if (!globalThis.__todos) globalThis.__todos = [];
        const idx = globalThis.__todos.findIndex((t) => t.id === todoId);
        if (idx === -1) return res.status(404).json({ error: 'Not found' });
        if (text !== undefined) globalThis.__todos[idx].text = text.toString().trim().slice(0, 200);
        if (done !== undefined) globalThis.__todos[idx].done = !!done;
        return res.status(200).json(globalThis.__todos[idx]);
      }
    } catch (e) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      if (kv) {
        const todos = (await kv.get('todos')) || [];
        const filtered = todos.filter((t) => t.id !== todoId);
        await kv.set('todos', filtered);
        return res.status(204).end();
      } else {
        if (!globalThis.__todos) globalThis.__todos = [];
        globalThis.__todos = globalThis.__todos.filter((t) => t.id !== todoId);
        return res.status(204).end();
      }
    } catch (e) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
