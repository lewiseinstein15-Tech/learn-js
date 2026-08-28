var express = require('express');
var cors = require('cors');
var fs = require('fs');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 5000;
var DATA_FILE = path.join(__dirname, 'data.json');

// Security headers
app.use(function(req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Load existing data or start empty
function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all todos
app.get('/api/todos', function(req, res) {
  res.json(loadData());
});

// POST a new todo
app.post('/api/todos', function(req, res) {
  var todos = loadData();
  var text = (req.body.text || '').toString().trim().slice(0, 200);
  if (!text) return res.status(400).json({ error: 'text is required' });
  var todo = {
    id: Date.now(),
    text: text,
    done: false
  };
  todos.push(todo);
  saveData(todos);
  res.status(201).json(todo);
});

// PUT update a todo
app.put('/api/todos/:id', function(req, res) {
  var todos = loadData();
  var id = parseInt(req.params.id);
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      if (req.body.text !== undefined) todos[i].text = req.body.text.toString().trim().slice(0, 200);
      if (req.body.done !== undefined) todos[i].done = !!req.body.done;
      saveData(todos);
      return res.json(todos[i]);
    }
  }
  res.status(404).json({ error: 'Not found' });
});

// DELETE a todo
app.delete('/api/todos/:id', function(req, res) {
  var todos = loadData();
  var id = parseInt(req.params.id);
  todos = todos.filter(function(t) { return t.id !== id; });
  saveData(todos);
  res.status(204).end();
});

app.listen(PORT, function() {
  console.log('Todo API running at http://localhost:' + PORT);
});
