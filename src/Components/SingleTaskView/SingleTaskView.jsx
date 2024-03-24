import React from 'react'
import "./SingleTaskView.css";
import { useState, useEffect } from 'react';

export default function SingleTaskView() {

    const currentDate = () => {
        const date = new Date();
        return date.toDateString();
    }

    const [projectName, setProjectName] = useState("Squashing bugs found in app!");
    const [startDate, setStartDate] = useState(currentDate);
    const [dueDate, setDueDate] = useState(currentDate);

  return (
    <div className='single-task'>
      <div className='task-name'>
          <p>{projectName}</p>
        </div>

        <div className='task-time'>
          <p>{startDate} to {dueDate}</p>
        </div>

        <div className='task-state'>
          <p>State due</p>
        </div>
      
    </div>
  )
}
