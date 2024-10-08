import React from 'react';
import styles1 from "../ComponentCSS/Layout.module.css";
import SingleProjectView from '../SingleProjectView/SingleProjectView';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContex';
import CreateNewProject from '../CreateNewProject/CreateNewProject';
import CreateNewTask from '../CreateNewTask/CreateNewTask';
import ProjectContentView from '../PojectContentView/ProjectContentView';
import ProjectModify from '../ProjectModify/ProjectModify';
import {Charts} from "../Charts/Charts";
import {ProjectDashboardContent} from "../ProjectDashboardContent/ProjectDashboardContent";
import UserList from '../UsersList/UserList';
import WorkTraffic from '../PredictionLayout/WorkTraffic';
import EmployeeProductivity from '../PredictionLayout/EmployeeProductivity';
import Chat from '../Chat/Chat';
import ProjectSearchResult from '../ProjectSearchResult/ProjectSearchResult';
import Profile from '../Profile/Profile';
import AboutUs from '../AboutUs/AboutUs';
export default function Content() {
  const { activity, displayProjects} = useContext(UserContext);
  
  return (
    <div className={styles1.content}>
        {activity === "project-list" &&
          displayProjects?.map((displayProject => {
            return <SingleProjectView project= {displayProject}/>
          }))
        }

        {activity === "create-new-project" &&
          <CreateNewProject/>
        }
 
        {activity === "project-dashbaord-content-view" &&
          <ProjectDashboardContent/>
        }

        {activity === "create-new-task" &&
          <CreateNewTask/>
        }

        {activity === "project-content-view" &&
          <ProjectContentView/>
        }

        {activity === "project-modify" &&
          <ProjectModify/>
        } 

        {activity === "charts" &&
          <Charts projects = {displayProjects}/>
        } 

        {activity === "user-list" &&
          <UserList/>
        } 

        {activity === "work-traffic" &&
          <WorkTraffic/>
        } 

        {activity === "productivity" &&
          <EmployeeProductivity/>
        } 

        {activity === "chat" &&
          <Chat/>
        } 

        {activity === "search-results" &&
          <ProjectSearchResult/>
        }

        {activity === "profile" &&
          <Profile/>
        }
        {activity === "about-us" &&
          <AboutUs/>
        }
    </div>
    
  );
}
