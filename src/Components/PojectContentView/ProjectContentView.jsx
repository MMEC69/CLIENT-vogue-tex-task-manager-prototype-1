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
                <p>Project Name</p>
                <p>:</p>
                <p>{selectedProject.projectName}</p> 
            </div>
            <div className='field-D'>
                <p>Project Description</p> 
                <p>:</p>
                <p>{selectedProject.projectDescription}</p> 
            </div>
            <div className='field-D'>
                <p>Department Name</p>
                <p>:</p>
                <p>{selectedProject.departmentName}</p>  
            </div>
            <div className='field-D'>
                <p>Start Date</p>
                <p>:</p>
                <p>{selectedProject.startDate}</p>  
            </div>
            <div className='field-D'>
                <p>Due Date</p> 
                <p>:</p>
                <p>{selectedProject.dueDate}</p> 
            </div>
            <div className='field-D'>
                <p>Project State</p>
                <p>:</p>
                <p>{selectedProject.projectState}</p>  
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
