import React from 'react'
import "./Navbar.css" 
import logo from "../Assests/logo-vogue.jpg";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { IoIosHelpCircle } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='logo_'>
            <img src={logo} alt="Vogue Tex Logo"/>
        </div>

        <div className='search-bar'>
            <FaSearch id="search-icon" />
            <input placeholder='Search...'/>
        </div>

        <div className='navigation'>
            <ul>
                <li>
                    <div className='notification'>
                    <IoIosNotifications />
                    </div>
                </li>

                <li>
                    <div className='help'>
                    <IoIosHelpCircle />
                    </div>
                </li>
                    
                <li>
                    <div className='settings'>
                    <CiSettings /> 
                    </div>
                </li>
                    
                <li>
                    <div className='profile'>
                    <Link to = "/profile"><CgProfile /></Link>
                    </div>
                </li>
            </ul>
        </div>

        
    </div>
  )
}
