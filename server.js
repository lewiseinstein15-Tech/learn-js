var express = require('express');
var cors = require('cors');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

// Security headers
app.use(function(req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';");
  next();
});

app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit request body size

// Serve the static site from the project root
app.use(express.static(path.join(__dirname)));

app.listen(PORT, '0.0.0.0', function() {
  console.log('CS Hub running at http://localhost:' + PORT);
});
