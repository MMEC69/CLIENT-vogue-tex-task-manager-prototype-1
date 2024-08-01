import React from 'react'
import { CgProfile } from "react-icons/cg";
import styles1 from "../ComponentCSS/Layout.module.css";
import { CiSearch } from "react-icons/ci";

export const Navbar = () => {
  return (
    <div className={styles1.navbar}>
        <div className={styles1.searchBar}>
            <input type="text" />
            <CiSearch/>
        </div>
        <div className={styles1.navbarButtons}>
            <CgProfile/>
        </div>
    </div>
  )
}
