import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUsers, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/logo.png";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gradient-to-tr mb-1 from-slate-900 via-green-900 to-emerald-900 backdrop-blur-md rounded-md border-b border-green-500/10 shadow-md px-4 py-1 sm:px-8 flex justify-between items-center">

            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <div className=" px-1.5 rounded-full shadow-sm">
                    <Link to="/">
                        <img src={logo} className="w-9 h-9 sm:w-14 sm:h-14" alt="Logo" />
                    </Link>
                </div>
                <div className="text-white leading-tight">
                    {/* <h1 className="font-bold text-base sm:text-lg">KIHEAT</h1>
                    <p className="text-xs text-green-200">Excellence Hub</p> */}
                </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-3 sm:gap-4 text-white font-medium text-sm sm:text-base">
                <NavLink
                    to="/"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all border border-white/10"
                >
                    <FontAwesomeIcon icon={faHouse} />
                    <span className="hidden sm:block">Home</span>
                </NavLink>

                {/* <NavLink
                    to="/about"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all border border-white/10"
                >
                    <FontAwesomeIcon icon={faUsers} />
                    <span className="hidden sm:block">About Us</span>
                </NavLink> */}

                <NavLink
                    to="/search"
                    className="bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-xl shadow-sm transition-all"
                    aria-label="Search"
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
