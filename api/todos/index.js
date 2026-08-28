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

// In-memory fallback (resets on cold start)
let todos = [];
let nextId = 1;

module.exports = async function handler(req, res) {
  await runMiddleware(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json(todos);
  }

  if (req.method === 'POST') {
    const { text, done } = req.body || {};
    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }
    const todo = { id: nextId++, text, done: done || false };
    todos.push(todo);
    return res.status(201).json(todo);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
