import React from 'react';
import { UserContext } from '../../Context/UserContex';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitBtn3 } from "../UtilizeComponents/fC";
import { getProjects } from '../../Functions/ServerCommunication';
import styles1 from "../ComponentCSS/Layout.module.css";

export const LeftMenu = () => {
  const {
    setUser, 
    setActivity,
    setDisplayProjects
  } = useContext(UserContext);

  const navigate = useNavigate();
  
  const logOut = () => { 
    setUser();
    localStorage.clear();
    navigate("/login");
  }

  const dashboardActivity = () => {
    const projects = getProjects(setDisplayProjects);
    setActivity("dashboard");
  }

  const createNewProjectActivity = () => {
    setActivity("create-new-project");
  }

  const chartsActivity = () => {
    setActivity("charts");
  }
  

  return (
    <div className={styles1.leftMenu}>
      <SubmitBtn3 
        buttonName = "Dashboard"
        onClick={dashboardActivity}
      />
      <SubmitBtn3 
        buttonName = "New Project"
        onClick={createNewProjectActivity}
      />
      <SubmitBtn3 
        buttonName = "Charts"
        onClick = {chartsActivity}
      />
      <SubmitBtn3 
        buttonName = "TimeLine"
      />
      <SubmitBtn3 
        buttonName = "LogOut"
        onClick={logOut}
      />
    </div>
  )
}
