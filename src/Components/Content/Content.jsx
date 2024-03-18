import React from 'react';
import "./Content.css";
import SingleProjectView from '../SingleProjectView/SingleProjectView';
import { projects } from "../../TestData/Projects";
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContex';
import CreateNewProject from '../CreateNewProject/CreateNewProject';
import CreateNewTask from '../CreateNewTask/CreateNewTask';

export default function Content() {
  const { activity } = useContext(UserContext);
  return (
    // projects?.length > 0 ?
    <div className='content'>
        {activity === "dashboard" &&
          projects.map((project => (
            <SingleProjectView project= {project}/>
          ))) 
        }
 
        {activity === "create-new-project" &&
          <CreateNewProject/>
        }

        {activity === "create-new-task" &&
          <CreateNewTask/>
        }
    </div>
    
  );
}
