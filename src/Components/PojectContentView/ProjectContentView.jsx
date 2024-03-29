import React from 'react';
import "./ProjectContentView.css";
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContex'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import SingleTaskView from '../SingleTaskView/SingleTaskView';


export default function ProjectContentView() {
    const {displayProjects, setCurrentProject, currentProject, test, setTest} = useContext(UserContext);
    
    const displayProject = displayProjects.filter((displayProject) => {
        return currentProject.currentProjectName === displayProject.projectName;
    });   
    
    const selectedProject = displayProject[0];
    const projectTasks = selectedProject.tasks;
    
    return (
    <div className='content_'>

        <div className='project-content-view'>
            <div className='field-D'>
                <h1>Project Name</h1>
                <h1>:</h1>
                <h2>{selectedProject.projectName}</h2> 
            </div>
            <div className='field-D'>
                <h1>Project Description</h1> 
                <h1>:</h1>
                <h2>{selectedProject.projectDescription}</h2> 
            </div>
            <div className='field-D'>
                <h1>Department Name</h1>
                <h1>:</h1>
                <h2>{selectedProject.departmentName}</h2>  
            </div>
            <div className='field-D'>
                <h1>Start Date</h1>
                <h1>:</h1>
                <h2>{selectedProject.startDate}</h2>  
            </div>
            <div className='field-D'>
                <h1>Due Date</h1> 
                <h1>:</h1>
                <h2>{selectedProject.dueDate}</h2> 
            </div>
            <div className='field-D'>
                <h1>Project State</h1>
                <h1>:</h1>
                <h2>{selectedProject.projectState}</h2>  
            </div>
        </div>

        <div className='task-content-view'>
            {projectTasks.map(projectTask => {
                return <SingleTaskView singleTask = {projectTask}/>
            })}
        </div>
        
    </div>
    
  );
}
