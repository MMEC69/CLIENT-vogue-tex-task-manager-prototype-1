import React from 'react'
import "./SingleProjectView.css";
import { useState, useEffect } from 'react';

export default function SingleProjectView({ project }) {

    const currentDate = () => {
        const date = new Date();
        return date.toDateString();
    }

    const [projectName, setProjectName] = useState("Squashing bugs found in app!");
    const [startDate, setStartDate] = useState(currentDate);
    const [dueDate, setDueDate] = useState(currentDate);

  return (
    <div className='single-project'>
        <div className='project-name'>
          <p>{project.name}</p>
        </div>

        <div className='time'>
          <p>{project.startDate}<span> to </span>{project.dueDate}</p>
        </div>

        <div className='state'>
          <p>State {project.state}</p>
        </div>
        

    </div>
  );
}
