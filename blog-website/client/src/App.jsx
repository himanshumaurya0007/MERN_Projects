import './App.css'

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import BlogCategory from './pages/BlogCategory';
import BlogTag from './pages/BlogTag';
import BlogPost from './pages/BlogPost';

import { Routes, Route, Navigate } from 'react-router';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/blog' replace />} />

        <Route path='/blog/category/:category' element={<BlogCategory />} />
        <Route path='/blog/tag/:tag' element={<BlogTag />} />
        <Route path='/blog/:slug' element={<BlogPost />} />
        <Route path='/blog' element={<Home />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
