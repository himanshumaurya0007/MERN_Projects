// src/data.js
const questions = [
    // HTML
    {
        question: "Which tag is used for the largest heading in HTML?",
        options: ["<h1>", "<h6>", "<heading>", "<h5>"],
        answer: ["<h1>"],
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<hyperlink>"],
        answer: ["<a>"],
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["class", "style", "font", "styles"],
        answer: ["style"],
    },

    // CSS
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        answer: ["font-size"],
    },
    {
        question: "Which of the following are valid CSS position values? (Multiple answers)",
        options: ["absolute", "relative", "fixed", "sticky", "move"],
        answer: ["absolute", "relative", "fixed", "sticky"],
    },
    {
        question: "Which property is used to change background color?",
        options: ["background-color", "bgcolor", "color-background", "background"],
        answer: ["background-color"],
    },

    // JavaScript
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["//", "/*", "#", "<!--"],
        answer: ["//"],
    },
    {
        question: "What will 'typeof null' return in JavaScript?",
        options: ["object", "null", "undefined", "number"],
        answer: ["object"],
    },
    {
        question: "Which of the following are JavaScript frameworks/libraries? (Multiple answers)",
        options: ["React", "Angular", "Vue", "Django"],
        answer: ["React", "Angular", "Vue"],
    },

    // Bootstrap
    {
        question: "What is the default grid system in Bootstrap based on?",
        options: ["8 columns", "10 columns", "12 columns", "6 columns"],
        answer: ["12 columns"],
    },
    {
        question: "Which Bootstrap class is used to create a responsive image?",
        options: ["img-fluid", "img-responsive", "image-fluid", "responsive-img"],
        answer: ["img-fluid"],
    },

    // TailwindCSS
    {
        question: "Tailwind CSS is primarily what type of framework?",
        options: ["Component-based", "Utility-first", "Template-based", "Hybrid"],
        answer: ["Utility-first"],
    },
    {
        question: "Which class in Tailwind sets the text color to red?",
        options: ["text-red", "text-red-500", "font-red", "color-red"],
        answer: ["text-red-500"],
    },

    // React
    {
        question: "In React, what hook is used for managing state in functional components?",
        options: ["useEffect", "useState", "useRef", "useContext"],
        answer: ["useState"],
    },
    {
        question: "JSX stands for ______ ?",
        options: ["JavaScript XML", "Java Syntax Extension", "Java Simple XML", "JSON Style Extension"],
        answer: ["JavaScript XML"],
    },
    {
        question: "Which are React lifecycle methods? (Multiple answers)",
        options: ["componentDidMount", "componentWillUnmount", "useEffect", "getSnapshotBeforeUpdate"],
        answer: ["componentDidMount", "componentWillUnmount", "getSnapshotBeforeUpdate"],
    },

    // MongoDB
    {
        question: "MongoDB is a ______ database?",
        options: ["SQL", "NoSQL", "Graph", "Relational"],
        answer: ["NoSQL"],
    },
    {
        question: "Which command is used to show all databases in MongoDB shell?",
        options: ["SHOW DATABASES", "show dbs", "list databases", "db.show()"],
        answer: ["show dbs"],
    },

    // Node.js
    {
        question: "Node.js is built on which JavaScript engine?",
        options: ["SpiderMonkey", "V8", "Rhino", "Chakra"],
        answer: ["V8"],
    },
    {
        question: "Which of the following are Node.js modules? (Multiple answers)",
        options: ["http", "fs", "url", "express"],
        answer: ["http", "fs", "url", "express"],
    },

    // Express.js
    {
        question: "Which method is used to start a server in Express.js?",
        options: ["listen()", "start()", "run()", "connect()"],
        answer: ["listen()"],
    },
    {
        question: "Middleware in Express.js is used for?",
        options: ["Handling requests", "Handling errors", "Adding extra functionality", "Connecting databases"],
        answer: ["Handling requests", "Handling errors", "Adding extra functionality"],
    },

    // More General / Mixed
    {
        question: "Which of the following are valid HTTP methods? (Multiple answers)",
        options: ["GET", "POST", "FETCH", "DELETE"],
        answer: ["GET", "POST", "DELETE"],
    },
    {
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Application Process Integration", "Application Protocol Interface", "Advanced Programming Interface"],
        answer: ["Application Programming Interface"],
    },
    {
        question: "Which of the following is a NoSQL database?",
        options: ["MongoDB", "PostgreSQL", "MySQL", "Oracle"],
        answer: ["MongoDB"],
    },
    {
        question: "Which tag is used for inserting an image in HTML?",
        options: ["<img>", "<image>", "<picture>", "<photo>"],
        answer: ["<img>"],
    },
    {
        question: "Which is used for semantic markup in HTML5? (Multiple answers)",
        options: ["<article>", "<section>", "<div>", "<footer>"],
        answer: ["<article>", "<section>", "<footer>"],
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        options: ["let", "const", "var", "constant"],
        answer: ["const"],
    },
    {
        question: "What is the default port for a Node.js app?",
        options: ["3000", "5000", "8080", "27017"],
        answer: ["3000"],
    },
    {
        question: "Which attribute is necessary for password input fields in HTML?",
        options: ["type='password'", "password='true'", "type='text'", "input='password'"],
        answer: ["type='password'"],
    },
    {
        question: "Which is a valid state management library for React? (Multiple answers)",
        options: ["Redux", "Context API", "MobX", "Express"],
        answer: ["Redux", "Context API", "MobX"],
    },
];

export default questions;
