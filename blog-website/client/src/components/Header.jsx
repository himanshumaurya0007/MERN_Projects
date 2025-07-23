import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import BlogDropdown from "./BlogDropdown";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    }
    return (
        <><header>
            <div>
                <NavLink to="/" id="logo">Blog Website</NavLink>
            </div>

            {/* Hamburger Icon */}
            <div className="hamburger" onClick={toggleMenu}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Navigation Menu */}
            <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
                <ul>
                    <li>
                        <NavLink to="/blog" onClick={() => setMenuOpen(false)}> Blog
                        </NavLink>
                    </li>

                    <BlogDropdown onLinkClick={() => setMenuOpen(false)} />
                </ul>
            </nav>
        </header>
        </>
    )
}

export default Header;