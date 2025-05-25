import './App.css';

import Header from './components/Header';

import Home from './pages/Home';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';

import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </>
  )
}

export default App;
