# 👋 CS Hub — Learn JS

A group project for learning JavaScript by building things. Everything here is vanilla
HTML, CSS and JS (plus one small Node/Express backend for the todo app) — no frameworks,
no build step, no magic.

> **Status:** the site is live at https://learn-js-rho.vercel.app with all sections
> working. The todo backend is deployed on Vercel. CLI tools still live in the terminal
> and are a separate entry point.

---

## What's inside

```
learn-js/
├── index.html               # landing page (the hub)
├── assets/style.css         # one shared stylesheet for the whole site
├── math/                    # CLI calculator + distinct-permutations counter
│   ├── calculator/          #   node math/calculator/calculator.js
│   └── permutation/         #   node math/permutation/permutation.js
├── physics/                 # projectile motion simulator (browser)
├── games/                   # "guess it" — playable in the browser and in the terminal
│   └── guessgame/
├── mini-projects/
│   ├── calculator/          # browser calculator
│   └── todo/                # full-stack todo list (Express + data.json)
└── utilities/               # scratchpad / snippets
```

## Running the site

The site is static — no build step needed.

```bash
npm install        # installs express (used by the todo backend)
npm start          # serves the whole site at http://localhost:8080
```

### Todo app

The todo list connects to a Vercel-deployed API at `/api/todos`. When deployed on Vercel,
the backend is live. For local development, start the Express server:

```bash
node server.js     # backend on http://localhost:8080
```

Then open `mini-projects/todo/` in a browser. Tasks are stored server-side (Vercel KV in
production, JSON file locally).

### CLI tools

```bash
node math/calculator/calculator.js   # terminal calculator
node math/permutation/permutation.js # distinct permutations of "banana"
node games/guessgame/guessgame.js    # guess it, terminal edition
```

## Contributing (group project)

We use the standard GitHub workflow — fork, branch, PR, review.

1. **Fork** this repo and clone your fork.
2. Create a branch: `git checkout -b my-awesome-feature`
3. Make your changes. If it's a new page, add it to the right section folder and link it
   from that section's `index.html`. If it's a new section, add a card on the landing page too.
4. Keep your branch up to date with `main` before opening the PR (avoids merge conflicts).
5. Commit, push, and open a Pull Request. Someone on the team reviews it, then it gets merged.

**House rules:**

- Every page uses `assets/style.css` — don't drop a second stylesheet or inline theme.
- Keep the copy in first person; this site should read like students made it, because we did.
- Add a `status-pill` to new pages so visitors know if something is broken or unfinished.
- Comment your code the way you'd want someone to explain it to you in a group chat.

## Roadmap / known gaps

- [ ] Operator precedence in the calculator (it currently evaluates left to right)
- [x] Auto-scaling canvas in the projectile simulator
- [ ] A second game (hangman? nobody has volunteered yet)
- [x] Host the todo backend — deployed on Vercel at `/api/todos`
- [x] Web version of the CLI calculator

## Team

_(add group member names here — one line each, first PR gets their name in)_

- …

---

Built by students, for students. Explore. Learn. Innovate. 🚀
