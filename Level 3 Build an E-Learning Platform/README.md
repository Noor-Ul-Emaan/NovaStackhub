# Pathway — E-Learning Platform

A course catalog, lesson viewer, and progress tracker, structured as a MERN
(MongoDB, Express, React*, Node) style application.

> \* The front-end here is built with vanilla HTML/CSS/JavaScript rather than
> React, so it runs instantly with zero build tools — but it's structured the
> same way a React app would be (component-like rendering functions, a single
> state object, and a clear split between UI and data). The `/server` folder
> is a real, runnable Express + MongoDB API that this front-end is designed
> to plug into.

## What's included

```
elearning-platform/
├── index.html          Front-end app shell
├── style.css            Styling
├── courses.js            Sample course/lesson data
├── app.js                Front-end logic (views, search, progress, auth UI)
└── server/               Node/Express + MongoDB API (MERN backend)
    ├── server.js
    ├── package.json
    ├── .env.example
    ├── models/
    │   ├── Course.js
    │   └── User.js
    └── routes/
        ├── courses.js
        ├── auth.js
        └── progress.js
```

## Running the front-end (works right now, no setup)

Just open `index.html` in a browser, or serve it locally:
```
python -m http.server 8000
```
Then visit `http://localhost:8000`.

**Current behavior:** course data comes from `courses.js` and progress is
stored in memory (it resets on page reload). This is intentional for a
front-end-only demo — see below for wiring it to the real backend.

### Features
- Browse and search courses, filter by category
- Open a course to see its lesson list and a lesson detail panel
- Mark lessons complete and watch the progress bar update
- "My Progress" dashboard summarizing enrolled/completed courses
- Sign-in modal (UI only — see backend section to make it real)

## Running the backend (Node + Express + MongoDB)

The `/server` folder is a working REST API. To run it, you'll need
[Node.js](https://nodejs.org) and a MongoDB instance (local install, or a
free cluster from [MongoDB Atlas](https://www.mongodb.com/atlas)).

```
cd server
npm install
cp .env.example .env      # then edit .env with your Mongo URI + JWT secret
npm run dev                # or: npm start
```

The API runs on `http://localhost:5000` by default, with:
- `GET  /api/courses` — list courses (supports `?category=` and `?search=`)
- `GET  /api/courses/:id` — a single course with lessons
- `POST /api/courses` — create a course
- `POST /api/auth/signup` / `POST /api/auth/login` — returns a JWT
- `GET  /api/progress` — a logged-in user's progress (requires `Authorization: Bearer <token>`)
- `PUT  /api/progress/:courseId` — toggle a lesson's completion (body: `{ lessonIndex }`)

## Connecting the front-end to the backend

Right now `app.js` reads from the local `COURSES` array. To make it fully
MERN (fetching real data instead of the mock array), replace the data calls
with `fetch`:

```js
// instead of: const filtered = COURSES.filter(...)
const res = await fetch(`http://localhost:5000/api/courses?category=${cat}&search=${term}`);
const courses = await res.json();
```

And send progress updates to the API instead of only updating local state:
```js
await fetch(`http://localhost:5000/api/progress/${courseId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({ lessonIndex: idx })
});
```

## Notes
- This is a learning-project scaffold, not a production platform — there's
  no rate limiting, input sanitization beyond basics, or admin roles yet.
- Passwords are hashed with bcrypt and auth uses JWTs, following common
  MERN-stack conventions.
