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

// In-memory reference (shared with index.js via global in production)
// Note: Each serverless function instance has its own memory.
// For persistent storage, use Vercel KV or a database.
if (!globalThis.__todos) {
  globalThis.__todos = [];
  globalThis.__nextId = 1;
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
    const idx = globalThis.__todos.findIndex((t) => t.id === todoId);
    if (idx === -1) {
      return res.status(404).json({ error: 'Not found' });
    }
    if (text !== undefined) globalThis.__todos[idx].text = text;
    if (done !== undefined) globalThis.__todos[idx].done = done;
    return res.status(200).json(globalThis.__todos[idx]);
  }

  if (req.method === 'DELETE') {
    const idx = globalThis.__todos.findIndex((t) => t.id === todoId);
    if (idx === -1) {
      return res.status(404).json({ error: 'Not found' });
    }
    globalThis.__todos.splice(idx, 1);
    return res.status(204).end();
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
