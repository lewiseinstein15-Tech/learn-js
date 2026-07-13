# 📝 Todo List Project

A simple full-stack Todo List built with **HTML, CSS, JavaScript, and Node.js**. The frontend communicates with a local backend server to store and retrieve tasks.

---

# 🚀 Running the Project

The project consists of two parts:

* **Frontend** (`index.html`)
* **Backend** (`server.js`)

Both need to be running for the application to work correctly.

## Step 1: Start the backend

Open a terminal inside the project folder and start the Node.js server.

```bash
nodemon server.js
```

If you don't have Nodemon installed, you can use:

```bash
node server.js
```

Once started, the backend will be available at:

```text
http://localhost:5000
```

Leave this terminal running.

---

## Step 2: Start the frontend

Open **another terminal** (do not close the backend terminal).

Launch the frontend using a local web server such as VS Code Live Server.

If using Live Server, open:

```text
http://localhost:5500/mini-projects/todo/
```

or simply right-click `index.html` and choose **Open with Live Server**.

---

## ⚠️ Important

The frontend depends on the backend API.

If `server.js` is **not running**, the application will fail to load or save tasks because it cannot communicate with the API.

Always start the backend **before** opening the frontend.

---

## 📁 Project Structure

```text
todo/
│
├── data.json        # Stores todo data
├── functions.js     # Utility functions
├── home.js          # Home page logic
├── index.html       # Frontend
├── server.js        # Backend API
└── toindex.js       # Todo page logic
```

Happy coding! 🚀
