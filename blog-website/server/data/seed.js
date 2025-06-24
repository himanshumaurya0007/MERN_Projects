const mongoose = require("mongoose");
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Blog = require('../models/Blog');

dotenv.config();
connectDB();

const demoBlogPosts = [
    {
        title: 'Getting Started with React',
        slug: 'getting-started-with-react',
        content: '<p>React is a JavaScript library for building user interfaces...</p>',
        excerpt: 'Learn the basics of React.js to build dynamic web apps.',
        coverImage: 'https://via.placeholder.com/800x400',
        tags: ['react', 'frontend'],
        category: 'frontend',
        author: {
            name: 'Himanshu Maurya',
            email: 'himanshu@example.com',
        },
        readingTime: '4 min read',
        views: 25,
    },
    {
        title: 'Node.js Express API Tutorial',
        slug: 'nodejs-express-api-tutorial',
        content: '<p>This guide explains how to build RESTful APIs with Express...</p>',
        excerpt: 'Step-by-step tutorial for building APIs with Node.js and Express.',
        coverImage: 'https://via.placeholder.com/800x400',
        tags: ['nodejs', 'backend', 'api'],
        category: 'backend',
        readingTime: '6 min read',
        views: 42,
    },
    {
        title: "Getting Started with MERN Stack",
        slug: "getting-started-with-mern-stack",
        content: "<p>This article walks you through the basics of the MERN stack, which consists of MongoDB, Express, React, and Node.js.</p>",
        excerpt: "An introduction to the MERN stack and its components.",
        coverImage: "https://example.com/images/mern-stack.jpg",
        tags: ["mern", "node", "react", "mongodb"],
        category: "web-development",
        author: {
            name: "John Doe",
            email: "johndoe@example.com",
        },
        readingTime: "5 min read",
        views: 500,
    },
    {
        title: "Building Your First React App",
        slug: "building-your-first-react-app",
        content: "<p>Learn how to create a simple React app from scratch using functional components, JSX, and React hooks.</p>",
        excerpt: "A step-by-step tutorial to create your first React app.",
        coverImage: "https://example.com/images/react-app.jpg",
        tags: ["react", "javascript", "web-development"],
        category: "frontend",
        author: {
            name: "Jane Smith",
            email: "janesmith@example.com",
        },
        readingTime: "10 min read",
        views: 1200,
    },
    {
        title: "Introduction to Node.js for Beginners",
        slug: "introduction-to-nodejs-for-beginners",
        content: "<p>Understand the basics of Node.js, a JavaScript runtime used for building scalable network applications.</p>",
        excerpt: "A beginner-friendly guide to understanding Node.js.",
        coverImage: "https://example.com/images/nodejs.jpg",
        tags: ["node", "javascript", "backend"],
        category: "backend",
        author: {
            name: "David Lee",
            email: "davidlee@example.com",
        },
        readingTime: "7 min read",
        views: 800,
    },
    {
        title: "The Basics of MongoDB",
        slug: "the-basics-of-mongodb",
        content: "<p>This guide introduces MongoDB, a NoSQL database used for handling large volumes of data efficiently.</p>",
        excerpt: "An introduction to MongoDB, covering its basic concepts and architecture.",
        coverImage: "https://example.com/images/mongodb.jpg",
        tags: ["mongodb", "database", "nosql"],
        category: "backend",
        author: {
            name: "Sarah Connor",
            email: "sarahconnor@example.com",
        },
        readingTime: "8 min read",
        views: 650,
    },
    {
        title: "How to Set Up Express.js with Node.js",
        slug: "how-to-setup-expressjs-with-nodejs",
        content: "<p>This article explains how to set up Express.js, a Node.js framework, and create your first backend API.</p>",
        excerpt: "Learn how to create a simple backend API with Express.js and Node.js.",
        coverImage: "https://example.com/images/expressjs.jpg",
        tags: ["express", "nodejs", "backend", "api"],
        category: "backend",
        author: {
            name: "Michael Scott",
            email: "michaelscott@example.com",
        },
        readingTime: "6 min read",
        views: 340,
    },
    {
        title: "Mastering JavaScript ES6 Features",
        slug: "mastering-javascript-es6-features",
        content: "<p>This tutorial dives deep into the new features of JavaScript introduced in ES6, including arrow functions, promises, and async/await.</p>",
        excerpt: "Explore the modern features of JavaScript with ES6.",
        coverImage: "https://example.com/images/es6-features.jpg",
        tags: ["javascript", "es6", "programming"],
        category: "frontend",
        author: {
            name: "Emily Davis",
            email: "emilydavis@example.com",
        },
        readingTime: "12 min read",
        views: 900,
    },
    {
        title: "What is Full Stack Web Development?",
        slug: "what-is-full-stack-web-development",
        content: "<p>This post explains what full-stack web development is, covering both frontend and backend technologies.</p>",
        excerpt: "A comprehensive overview of full-stack web development.",
        coverImage: "https://example.com/images/fullstack.jpg",
        tags: ["full-stack", "web development", "career"],
        category: "web-development",
        author: {
            name: "Jason Bourne",
            email: "jasonbourne@example.com",
        },
        readingTime: "5 min read",
        views: 400,
    }
];

const seedToDB = async () => {
    try {
        await Blog.deleteMany();
        await Blog.insertMany(demoBlogPosts);
        console.log('Demo blog posts seeded successfully!');
        process.exit();
    } catch(err) {
        console.log("Seeding failed: ", err.message);
        process.exit(1);
    }
};

seedToDB();