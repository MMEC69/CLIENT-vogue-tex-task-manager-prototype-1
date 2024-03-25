import React from 'react'
import "./SingleProjectView.css";

export default function SingleProjectView({project}) {

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
        

    </div>
  );
}
