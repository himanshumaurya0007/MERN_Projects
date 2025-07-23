import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../App.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle menu open/close state
    const toggleMenu = () => setIsOpen(!isOpen);

    // Auto close after click
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <div className='header'>
                <h1>React Routing</h1>

                {/* Hamburger Icon */}
                <div className="hamburger" onClick={toggleMenu}>
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </div>

                {/* Navigation Links */}
                <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
                    <ul>
                        <li><NavLink to='/' onClick={closeMenu}>Home</NavLink></li>
                        <li><NavLink to='/blogs' onClick={closeMenu}>Blogs</NavLink></li>
                        <li><NavLink to='/about' onClick={closeMenu}>About</NavLink></li>
                        <li><NavLink to='/contact' onClick={closeMenu}>Contact</NavLink></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Header;