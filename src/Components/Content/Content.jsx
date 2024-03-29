import React, { useEffect } from 'react';
import "./Content.css";
import SingleProjectView from '../SingleProjectView/SingleProjectView';
import { projects } from "../../TestData/Projects";
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContex';
import CreateNewProject from '../CreateNewProject/CreateNewProject';
import CreateNewTask from '../CreateNewTask/CreateNewTask';
import ProjectContentView from '../PojectContentView/ProjectContentView';

export default function Content() {
  const { activity, setActivity, displayProjects} = useContext(UserContext);

  useEffect(() => {
    setActivity("dashboard")
  }, []);
  return (
    // projects?.length > 0 ?
    <div className='content'>
        {activity === "dashboard" &&
          displayProjects.map((displayProject => {
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
    </div>
    
  );
}
