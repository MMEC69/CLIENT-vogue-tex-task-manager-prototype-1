import React, { useContext, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import styles1 from "../ComponentCSS/Layout.module.css";
import { CiSearch } from "react-icons/ci";
import { UserContext } from '../../Context/UserContex';
import axios from 'axios';
import { IoInformationCircleOutline } from "react-icons/io5";

export const Navbar = () => {
  const {
    user,
    activity,
    setActivity,
    searchResult,
    setSearchResult
  } = useContext(UserContext);

  const userId = user?.id;
  const [serachItem, setSearchItem] = useState(null);
// =====================================================
const handleSubmit = async(e) => {
  e.preventDefault();
  console.log("> handleSubmit initiated");
  try {
    const {data} = await axios(`/projects/${serachItem}/${userId}`);
    setSearchResult(data);
    setActivity("search-results");
  } catch (error) {
    console.log(error);
    console.log("> handleSubmit initiated");
  }
}
// =====================================================
const handleClickProfile = () => {
  console.log("> handleClickProfile initiated");
  setActivity("profile");
  console.log("> handleClickProfile initiated");
}
// =====================================================
const handleClickAboutUs = () => {
  console.log("> handleClickAboutUs initiated");
  setActivity("about-us");
  console.log("> handleClickAboutUs initiated");
}
// =====================================================
  return (
    <div className={styles1.navbar}>
        <div className={styles1.searchBar}>
          <form onSubmit={handleSubmit} className={styles1.searchBar}>
            <input 
                type="text" 
                value = {serachItem}
                onChange={(e) => setSearchItem(e.target.value)}
            />
          </form>
            <CiSearch/>
        </div>
        <div 
          className={`${styles1.navbarButtons} ${styles1.aboutUsButton}`}
          onClick={handleClickAboutUs}
        >
            <IoInformationCircleOutline />
        </div>
        <div 
          className={styles1.navbarButtons}
          onClick={handleClickProfile}
        >
            <CgProfile/>
        </div>
    </div>
  )
}
