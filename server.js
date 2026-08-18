const express = require("express");
const path = require("path");

const app = express();
const HOST = "0.0.0.0";
const PORT = process.env.PORT || 8080;

// Serve the static site (landing page + math/physics/games/mini-projects folders).
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`CS Hub running at http://${HOST}:${PORT}`);
});
