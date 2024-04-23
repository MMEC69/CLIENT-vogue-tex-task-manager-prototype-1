import React, { useContext } from 'react'
import "./SingleProjectView.css";
import { UserContext } from '../../Context/UserContex';

export default function SingleProjectView({project}) {
  const {setActivity, setCurrentProject} = useContext(UserContext);

  const viewProject = async (e) => {
    setCurrentProject({
      currentProjectOwner:project.projectOwner,
      currentProjectName: project.projectName
    });
    setActivity("project-content-view");
  }

  const projectModify = async (e) => {
    setCurrentProject({
      currentProjectOwner:project.projectOwner,
      currentProjectName: project.projectName
    });
    setActivity("project-modify");
  }

  return (
    <div className='single-project'>
        <div className='project-name'>
          <p>{project.projectName}</p>
        </div>

        <div className='time'>
          <p>{project.startDate}<span> to </span>{project.dueDate}</p>
        </div>

        <div className='state'>
          <p>State {project.projectState}</p>
        </div>
        
        <div className='modify'>
          <button onClick={projectModify}>Modify</button>
        </div>

        <div className='modify'>
          <button onClick={viewProject}>View</button>
        </div>

    </div>
  );
}
