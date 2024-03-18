import React from 'react';
import "./CreateNewProject.css";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContex'; 


export default function CreateNewPage() {
    const {activity, setActivity, project, setProject} = useContext(UserContext);

    const addNewProject = (e) => {
        e.preventDefault();
        setActivity("create-new-task");
    }

    return (
    <div className='create-new-project'>
        <form onSubmit={addNewProject}>
            <div className='field-P'>
                <label>Project Name:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "projectName"
                    value={project.projectName}
                    onChange={(e) => {setProject({...project, projectName: e.target.value})}}
                /> 
            </div>

            <div className='field-P'>
                <label>Project Description:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "projectDescription"
                    value={project.projectDescription}
                    onChange={(e) => {setProject({...project, projectDescription: e.target.value})}}
                /> 
            </div>

            <div className='field-P'>
                <label>Department Name:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "departmentName"
                    value={project.departmentName}
                    onChange={(e) => {setProject({...project, departmentName: e.target.value})}}
                /> 
            </div>

            <div className='field-P'>
                <label>Start Date:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "startDate"
                    value={project.startDate}
                    onChange={(e) => {setProject({...project, startDate: e.target.value})}}
                /> 
            </div>

            <div className='field-P'>
                <label>Due Date:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "dueDate"
                    value={project.dueDate}
                    onChange={(e) => {setProject({...project, dueDate: e.target.value})}}
                />
            </div>   

            <div className='field-P'>
                <label>Assigned To:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "assignedTo"
                    value={project.assignedTo}
                    onChange={(e) => {setProject({...project, assignedTo: e.target.value})}}
                /> 
            </div>

            <div className='field-P'>
                <label>State:</label>             
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "state"
                    value={project.state}
                    onChange={(e) => {setProject({...project, state: e.target.value})}}
                /> 
            </div>

            <button type = "submit">Add the Project</button>
        </form>
        
    </div>
    
  );
}
