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
    console.log("> logOut initiated");
    setUser();
    localStorage.removeItem("loggedUser");
    navigate("/login");
    console.log("> logOut ended");
  }

  const dashboardActivity = () => {
    console.log("> dashboardActivity initiated");
    getProjects(setDisplayProjects);
    setActivity("project-dashbaord-content-view");
    console.log("> dashboardActivity ended");
  }

  const createNewProjectActivity = () => {
    console.log("> createNewProjectActivity initiated");
    getProjects(setDisplayProjects);
    setActivity("create-new-project");
    console.log("> createNewProjectActivity ended");
  }

  const chartsActivity = () => {
    console.log("> chartsActivity initiated");
    getProjects(setDisplayProjects);
    setActivity("charts");
    console.log("> chartsActivity ended");
  }

  const projectList = () => {
    console.log("> projectList initiated");
    getProjects(setDisplayProjects);
    setActivity("project-list");
    console.log("> projectList ended");
  }

  const userList = () => {
    console.log("> userList initiated");
    getProjects(setDisplayProjects);
    setActivity("user-list");
    console.log("> userList ended");
  }

  const workTraffic = () => {
    console.log("> workTraffic initiated");
    getProjects(setDisplayProjects);
    setActivity("work-traffic");
    console.log("> workTraffic ended");
  }

  const productivity = () => {
    console.log("> productivity initiated");
    getProjects(setDisplayProjects);
    setActivity("productivity");
    console.log("> productivity ended");
  }

  const chat = () => {
    console.log("> chat initiated");
    getProjects(setDisplayProjects);
    setActivity("search-results");
    console.log("> chat ended");
  }

  const searchResult = () => {
    console.log("> searchResult initiated");
    getProjects(setDisplayProjects);
    setActivity("search-results");
    console.log("> searchResult ended");
  }

  return (
    <div className={styles1.leftMenu}>
      <SubmitBtn3 
        buttonName = "Dashboard"
        onClick={dashboardActivity}
      />
      <SubmitBtn3 
        buttonName = "Project List"
        onClick={projectList}
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
        buttonName = "Users"
        onClick = {userList}
      />
      <SubmitBtn3 
        buttonName = "Work Traffic"
        onClick = {workTraffic}
      />
      <SubmitBtn3 
        buttonName = "Productivity"
        onClick = {productivity}
      />
      <SubmitBtn3 
        buttonName = "Work Space"
      />
      <SubmitBtn3 
        buttonName = "Chat"
        onClick = {chat}
      />
      <SubmitBtn3 
        buttonName = "Search"
        onClick = {searchResult}
      />
      <SubmitBtn3 
        buttonName = "LogOut"
        onClick={logOut}
      />
    </div>
  )
}
