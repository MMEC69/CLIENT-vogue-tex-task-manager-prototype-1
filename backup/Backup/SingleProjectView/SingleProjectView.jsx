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
        <p><span>Project: </span> {project.name}</p>
        <p><span>Start date: </span> {project.startDate} <span>Due date: </span> {project.dueDate}</p>
        <p><span>State: </span>{project.state}</p>
    </div>
  )
}
