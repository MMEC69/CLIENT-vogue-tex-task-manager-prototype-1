import React from 'react';
import "./LeftMenu.css";
import { UserContext } from '../../Context/UserContex';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

export const LeftMenu = () => {
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const logOut = () => { 
    setUser(null);
    removeCookie("token");
    localStorage.clear();
    navigate("/login");
  }

  const [cookie, setCookie, removeCookie] = useCookies(['token']);


  return (
    <div className='left-menu'>
      <button>Create New task</button>
      <button>Dashboard</button>
      <button>TimeLine</button>
      <button onClick={logOut}>LogOut</button>
    </div>
  )
}
