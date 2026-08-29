const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

// Everything the site needs (excluding node_modules, git, and build output).
const entries = [
  "index.html",
  "robots.txt",
  "sitemap.xml",
  "assets",
  "games",
  "math",
  "mini-projects",
  "physics",
  "api",
  "scripts",
  "utilities",
];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const entry of entries) {
  const src = path.join(root, entry);
  if (!fs.existsSync(src)) {
    console.warn(`Skipping missing entry: ${entry}`);
    continue;
  }
  fs.cpSync(src, path.join(dist, entry), { recursive: true });
}

console.log("Built static site into dist/");
