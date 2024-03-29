import React from 'react'
import "./SingleTaskView.css";
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
    tastState
  } = singleTask;

  return (
    <div className='single-task'>
      <div className='task-name'>
          <p>{newTaskName}</p>
        </div>

        <div className='task-time'>
          <p>{newTaskStartDate} to {newTaskdueDate}</p>
        </div>

        <div className='task-state'>
          <p>{tastState}</p>
        </div>
      
    </div>
  )
}
