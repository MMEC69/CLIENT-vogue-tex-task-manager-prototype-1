import React from 'react';
import "./LeftMenu.css";
import { UserContext } from '../../Context/UserContex';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

export const LeftMenu = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['token']);
  const {setUser, activity, setActivity} = useContext(UserContext);
  const navigate = useNavigate();
  
  const logOut = () => { 
    setUser(null);
    removeCookie("token");
    localStorage.clear();
    navigate("/login");
  }

  const dashboardActivity = () => {
    setActivity("dashboard");
  }

  const createNewProjectActivity = () => {
    setActivity("create-new-project");
  }

  return (
    <div className='left-menu'>
      <button onClick={createNewProjectActivity}>Create New Project</button>
      <button onClick={dashboardActivity}>Dashboard</button>
      <button>TimeLine</button>
      <button onClick={logOut}>LogOut</button>
    </div>
  )
}
