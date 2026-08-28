var express = require('express');
var cors = require('cors');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Serve the static site from the project root
app.use(express.static(path.join(__dirname)));

app.listen(PORT, '0.0.0.0', function() {
  console.log('CS Hub running at http://localhost:' + PORT);
});
