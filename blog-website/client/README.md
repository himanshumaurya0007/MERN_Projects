# 📘 Client - MERN Blog Website

This is the **frontend** of the MERN Blog Website project, built using **React**, **Vite**, and **React Router**. It connects to a backend API to fetch and display blog data, supports categories and tags, and offers a dynamic blog browsing experience.


## 📁 Folder Structure
```
client/
├── public/
├── src/
│ ├── components/ # Reusable UI components like Header, Footer, BlogCard
│ ├── pages/ # Page views for Home, BlogPost, Tag, Category
│ ├── services/ # Axios instance for API requests
│ ├── App.jsx # Main app component with route definitions
│ ├── main.jsx # Entry point using ReactDOM
│ └── index.css # Global CSS
├── package.json # Project metadata and dependencies
└── vite.config.js # Vite configuration
```

## 🚀 Features

- 📰 Displays all blogs with title and excerpt

- 🔍 Filter blogs by:

  - Category (Frontend, Backend, Web, App)

  - Tag (dynamic)

- 📄 Full blog post view via slug-based routing

- 🔗 Dynamic React Router navigation

- ⚡ SEO enhancement with `react-helmet-async`

- 📱 Responsive header and dropdown menu using `react-icons`

## 🧩 Tech Stack

- **Frontend**: React 19, Vite

- **Routing**: React Router v7

- **API Client**: Axios

- **Styling**: CSS (modular per-component)

- **Icons**: React Icons

- **SEO**: React Helmet Async

## 🔧 Getting Started

### Prerequisites

- Node.js >= 18

- Backend server (see `../server`)

### Install Dependencies

```bash
cd client
npm install
```

## Run the App (Development)
```bash
npm run dev
```
Open your browser at http://localhost:5173/blog

Ensure the backend server is running at http://localhost:5000.

## 📦 API Connection

The Axios instance (services/api.js) is preconfigured:
```bash
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});
```
All components/pages use this instance for fetching:

- /blogs – fetch all blogs

- /blogs/:slug – fetch single blog

- /blogs/tag/:tag

- /blogs/category/:category

## 🌐 Routes Overview

| Path                       | Component      | Description        |
| -------------------------- | -------------- | ------------------ |
| `/blog`                    | `Home`         | Shows all blogs    |
| `/blog/:slug`              | `BlogPost`     | Full blog content  |
| `/blog/category/:category` | `BlogCategory` | Filter by category |
| `/blog/tag/:tag`           | `BlogTag`      | Filter by tag      |


## ✍️ Author
Made by Himanshu Maurya
