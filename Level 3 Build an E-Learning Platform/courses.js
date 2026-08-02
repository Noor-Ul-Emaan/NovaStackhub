// courses.js
// Sample course catalog data. In a real MERN app, this would come from
// a MongoDB collection served through an Express API (see /server in the README).

const COURSES = [
  {
    id: "js-fundamentals",
    title: "JavaScript Fundamentals",
    category: "Programming",
    instructor: "Aisha Raza",
    level: "Beginner",
    desc: "A hands-on introduction to variables, functions, arrays, and DOM manipulation.",
    lessons: [
      { title: "Why JavaScript?", duration: "6 min", desc: "What JavaScript is used for and how it runs in the browser." },
      { title: "Variables & Data Types", duration: "12 min", desc: "let, const, strings, numbers, booleans, and arrays." },
      { title: "Functions", duration: "15 min", desc: "Declaring, calling, and returning values from functions." },
      { title: "Working with the DOM", duration: "18 min", desc: "Selecting elements and responding to user events." },
      { title: "Mini Project: To-do List", duration: "25 min", desc: "Put it all together in a small interactive project." }
    ]
  },
  {
    id: "css-layouts",
    title: "Modern CSS Layouts",
    category: "Design",
    instructor: "Daniel Cho",
    level: "Beginner",
    desc: "Master Flexbox and CSS Grid to build responsive layouts without frameworks.",
    lessons: [
      { title: "The Box Model", duration: "8 min", desc: "Padding, border, margin, and how sizing really works." },
      { title: "Flexbox Basics", duration: "16 min", desc: "Aligning and distributing items along a single axis." },
      { title: "CSS Grid Basics", duration: "18 min", desc: "Building two-dimensional layouts with rows and columns." },
      { title: "Responsive Design", duration: "14 min", desc: "Media queries and mobile-first design principles." }
    ]
  },
  {
    id: "react-basics",
    title: "React for Beginners",
    category: "Programming",
    instructor: "Priya Nair",
    level: "Intermediate",
    desc: "Build interactive UIs with components, props, and state in React.",
    lessons: [
      { title: "Components & JSX", duration: "14 min", desc: "How React components describe UI." },
      { title: "Props", duration: "10 min", desc: "Passing data from parent to child components." },
      { title: "State & useState", duration: "16 min", desc: "Managing changing data inside a component." },
      { title: "Handling Events", duration: "11 min", desc: "Responding to clicks, input, and forms." },
      { title: "Project: Task Board", duration: "30 min", desc: "Build a small multi-component app." }
    ]
  },
  {
    id: "node-express-api",
    title: "Building APIs with Node & Express",
    category: "Backend",
    instructor: "Omar Siddiqui",
    level: "Intermediate",
    desc: "Create RESTful APIs with Node.js, Express, and MongoDB — the backend half of the MERN stack.",
    lessons: [
      { title: "Setting up Express", duration: "10 min", desc: "Creating your first server and routes." },
      { title: "Connecting to MongoDB", duration: "17 min", desc: "Using Mongoose to define schemas and models." },
      { title: "CRUD Routes", duration: "22 min", desc: "Create, read, update, and delete endpoints." },
      { title: "Authentication Basics", duration: "20 min", desc: "Hashing passwords and issuing JWTs." }
    ]
  },
  {
    id: "ux-fundamentals",
    title: "UX Design Fundamentals",
    category: "Design",
    instructor: "Layla Haddad",
    level: "Beginner",
    desc: "Learn the core principles behind interfaces people actually enjoy using.",
    lessons: [
      { title: "What is UX?", duration: "9 min", desc: "The difference between UX, UI, and product design." },
      { title: "User Research 101", duration: "13 min", desc: "Interviews, surveys, and understanding real needs." },
      { title: "Wireframing", duration: "15 min", desc: "Sketching layouts before writing any code." },
      { title: "Usability Heuristics", duration: "12 min", desc: "Nielsen's 10 principles for evaluating designs." }
    ]
  },
  {
    id: "git-github",
    title: "Git & GitHub Essentials",
    category: "Tools",
    instructor: "Marcus Webb",
    level: "Beginner",
    desc: "Version control fundamentals every developer needs — commits, branches, and pull requests.",
    lessons: [
      { title: "Why Version Control?", duration: "7 min", desc: "The problems Git solves for developers." },
      { title: "Commits & History", duration: "11 min", desc: "Staging changes and writing good commit messages." },
      { title: "Branching", duration: "13 min", desc: "Working on features without breaking main." },
      { title: "Pull Requests", duration: "10 min", desc: "Proposing and reviewing changes on GitHub." }
    ]
  }
];
