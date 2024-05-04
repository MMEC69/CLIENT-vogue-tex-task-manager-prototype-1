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
        <p><span>Task: </span> {projectName}</p>
        <p><span>Start date: </span> {startDate} <span>Due date: </span> {dueDate}</p>
        <p><span>State: </span>Due</p>
    </div>
  )
}
