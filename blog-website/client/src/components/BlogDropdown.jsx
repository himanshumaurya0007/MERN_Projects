import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./BlogDropdown.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function BlogDropdown({ onLinkClick }) {
    const [isBlogOpen, setIsBlogOpen] = useState(false);

    const toggleIsBlogOpen = () => {
        setIsBlogOpen(prev => !prev);
    };

    const handleLinkClick =
        () => {
            setIsBlogOpen(false);
            handleLinkClick();
        };

    return (
        <>
            {/* Blog Dropdown */}
            <li className="dropdown">
                <span className="dropdown-toggle" onClick={toggleIsBlogOpen}>
                    Categories {isBlogOpen ? <FaChevronDown /> : <FaChevronUp />}</span>

                {isBlogOpen && (
                    <ul className="dropdown-menu">
                        <li>
                            <NavLink to="/blog/category/frontend" onClick={handleLinkClick}>
                                Frontend</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog/category/backend" onClick={handleLinkClick}>
                                Backend</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog/category/web-development" onClick={handleLinkClick}>
                                Web Development</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog/category/app-development" onClick={handleLinkClick}>
                                App Development</NavLink>
                        </li>
                    </ul>
                )}
            </li>
        </>
    );
}

export default BlogDropdown;