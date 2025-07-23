# 📰 Server - MERN Blog Website

This is the backend part of a MERN (MongoDB, Express.js, React, Node.js) blog website application. It provides RESTful API endpoints for managing and retrieving blog posts, including support for categories, tags, slugs, and author information.

## 📦 Tech Stack
- Node.js

- Express.js

- MongoDB + Mongoose

- dotenv for environment variable management

- morgan for HTTP request logging

- cors for cross-origin requests

## 📁 Folder Structure
```
server/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   └── blogController.js   # Blog CRUD operations
├── middlewares/
│   └── errorHandler.js     # Custom error handler
├── models/
│   └── Blog.js             # Blog schema
├── routes/
│   └── blogRoutes.js       # Blog-related API routes
├── data/
│   └── seed.js             # Script to populate DB with demo posts
├── .env                    # Environment variables
├── app.js                  # Express app setup
├── server.js               # Entry point
└── package.json            # Project metadata and dependencies
```

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/himanshumaurya0007/MERN_Projects.git
cd blog-website
cd server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables

Create a .env file in the root with the following:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/blog-website
```

### 4. Seed the Database

Run the following command to populate your MongoDB with demo blog posts:
```
node data/seed.js
```
### 5. Start the Server
```
node server.js
```
The server should now be running on: http://localhost:5000

## 📡 API Endpoints
Base Route: `/api/blogs`
| Method | Route                 | Description                    |
| ------ | --------------------- | ------------------------------ |
| GET    | `/`                   | Get all blog posts             |
| GET    | `/category/:category` | Get blogs by category          |
| GET    | `/tag/:tag`           | Get blogs by tag               |
| GET    | `/:slug`              | Get a single blog post by slug |

## 🛠 Development Notes
- All blog posts are sorted by createdAt in descending order.

- Error responses return HTTP status codes and informative messages.

- Uses a centralized error handler middleware.

## 📃 Example Blog Document
```
{
  "title": "Getting Started with React",
  "slug": "getting-started-with-react",
  "content": "<p>React is a JavaScript library for building UIs...</p>",
  "excerpt": "Learn the basics of React.js...",
  "coverImage": "https://via.placeholder.com/800x400",
  "tags": ["react", "frontend"],
  "category": "frontend",
  "author": {
    "name": "Himanshu Maurya",
    "email": "himanshu@example.com"
  },
  "readingTime": "4 min read",
  "views": 25
}
```

## ✍️ Author
Made by Himanshu Maurya
