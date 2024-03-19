import React from 'react';
import "./CreateNewProject.css";
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContex'; 
import axios from 'axios';
import toast from 'react-hot-toast';


export default function CreateNewProject() {
    const {activity, setActivity, project, setProject, user} = useContext(UserContext);
    
    const addNewProject = async (e) => {
        e.preventDefault();
        const { 
            projectOwner,
            projectName, 
            projectDescription, 
            departmentName, 
            startDate, 
            dueDate, 
            assignedTo, 
            projectState} = project;
        try {
            const {data} = await axios.post("/createNewProject", {
                projectOwner,
                projectName, 
                projectDescription, 
                departmentName, 
                startDate, 
                dueDate, 
                assignedTo, 
                projectState
            });

            if(data.error){
                toast.error(data.error);
            }else{
                setProject({});
                toast.success("Project Created!");
                setActivity("create-new-task");;
            }
        } catch (error) {
            console.log(error);
        }
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
                <textarea 
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
                    onChange={(e) => {setProject({...project, projectState: e.target.value})}}
                /> 
            </div>

            <div className='field-P'>
            <label></label>
            <button type = "submit" onClick={(e) => setProject({...project, projectOwner: user.email})}>Add the Project</button>
            </div>

        </form>
        
    </div>
    
  );
}
