import React from 'react'
import "./SingleTaskView.css";
import { dateFormat1 } from "../../Functions/Conversion";
import { useState, useEffect } from 'react';

export default function SingleTaskView({singleTask}) {

  const {
    assginer, 
    assignedProject,
    newTaskName,
    newTaskDescription,
    newTaskStartDate,
    newTaskdueDate,
    newTaskAssignedTo,
    taskState
  } = singleTask;

  return (
    <div className='single-task'>
      <div className='task-name'>
          <p>{newTaskName}</p>
        </div>

        <div className='task-time'>
          <p>{dateFormat1(newTaskStartDate)} to {dateFormat1(newTaskdueDate)}</p>
        </div>

        <div className='task-state'>
          <p>{taskState}</p>
        </div>
      
    </div>
  )
}
