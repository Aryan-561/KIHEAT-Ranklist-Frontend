import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';


const Navbar: React.FC = () => {
    return (
        <div className="bg-green-900 p-2 mb-2 px-3 sm:p-3 rounded-xl flex justify-between items-center sm:px-12  shadow-lg    ">
            
                <Logo/>
            
        <div className="flex gap-2 sm:gap-4 font-rubik text-xs sm:text-base text-white">
            <NavLink to='/' className={`hover:translate-y-[-2px] hover:text-green-100`} >Home</NavLink>
            <NavLink to='/about' className={`hover:translate-y-[-2px] hover:text-green-100`}>About</NavLink>
            <NavLink to='/search' className={`hover:translate-y-[-2px] `}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white hover:text-green-100" />
            </NavLink>
            
            
        </div>
        </div>
    );
}

export default Navbar;