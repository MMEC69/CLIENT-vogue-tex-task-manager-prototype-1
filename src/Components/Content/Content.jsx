import React from 'react';
import styles1 from "../ComponentCSS/Layout.module.css";
import SingleProjectView from '../SingleProjectView/SingleProjectView';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContex';
import CreateNewProject from '../CreateNewProject/CreateNewProject';
import CreateNewTask from '../CreateNewTask/CreateNewTask';
import ProjectContentView from '../PojectContentView/ProjectContentView';
import ProjectModify from '../ProjectModify/ProjectModify';

export default function Content() {
  const { activity, displayProjects} = useContext(UserContext);
  
  return (
    <div className={styles1.content}>
        {activity === "dashboard" &&
          displayProjects?.map((displayProject => {
            return <SingleProjectView project= {displayProject}/>
          })) 
        }
 
        {activity === "create-new-project" &&
          <CreateNewProject/>
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
    </div>
    
  );
}
