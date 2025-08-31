// frontend/src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import { FaListUl, FaPlusCircle, FaTasks } from 'react-icons/fa';

function Navbar() {
    return (
        <nav
            role="navigation"
            aria-label="Primary"
            className="animate-in slide-in-from-top-5 mb-6 flex w-full items-center justify-between bg-blue-600 px-6 py-3 shadow duration-500"
        >
            {' '}
            {/* 🔹 Animate navbar sliding in from top */}
            {/* Brand */}
            <div className="animate-in fade-in zoom-in-50 flex items-center gap-2 text-white delay-100 duration-700 select-none">
                {/* 🔹 Fade + zoom for brand */}
                <FaTasks className="text-2xl" aria-hidden="true" />
                <span className="text-xl font-bold tracking-wide">TaskTide</span>
            </div>
            {/* Links */}
            <div className="animate-in fade-in slide-in-from-right-5 flex gap-2 delay-200 duration-700">
                {' '}
                {/* 🔹 Staggered fade-in for links */}
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-2 rounded-lg px-3 py-2 transition focus:ring-2 focus:ring-white focus:outline-none ${
                            isActive
                                ? 'bg-white text-blue-600'
                                : 'animate-in text-white duration-200 hover:scale-105 hover:bg-blue-500'
                        }`
                    }
                >
                    {' '}
                    {/* 🔹 Hover scale effect */}
                    <FaListUl aria-hidden="true" />
                    {/* Hide label on small screens */}
                    <span className="hidden sm:inline">All Todos</span>
                </NavLink>
                <NavLink
                    to="/new"
                    className={({ isActive }) =>
                        `flex items-center gap-2 rounded-lg px-3 py-2 transition focus:ring-2 focus:ring-white focus:outline-none ${
                            isActive
                                ? 'bg-white text-blue-600'
                                : 'animate-in text-white duration-200 hover:scale-105 hover:bg-blue-500'
                        }`
                    }
                >
                    {' '}
                    {/* 🔹 Hover scale effect */}
                    <FaPlusCircle aria-hidden="true" />
                    {/* Hide label on small screens */}
                    <span className="hidden sm:inline">Create Todo</span>
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
