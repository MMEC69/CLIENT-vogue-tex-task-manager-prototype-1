import React from 'react';
import "./ProjectModify.css";
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContex'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import SingleTaskView from '../SingleTaskView/SingleTaskView';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { registerLicense } from '@syncfusion/ej2-base';
import Select from "react-dropdown-select"; 

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx0TXxbf1x0ZFREalxUTnJWUj0eQnxTdEFjXX1fcXZVQ2RVWEN/Ww==');


export default function ProjectModify() {
    //This is the use contex
    const {
        users,
        displayProjects, 
        setCurrentProject, 
        currentProject, 
        test, 
        setTest,
        project,
        setProject} = useContext(UserContext);
    
    //selected project from the projects
    const displayProject = displayProjects.filter((displayProject) => {
        return currentProject.currentProjectName === displayProject.projectName;
    });   
    const selectedProject = displayProject[0];
    const projectTasks = selectedProject.tasks;

    //Content for datepicker
    const InitialStartDate = new Date();

    //Select filteration
    let filteredUsers = users.filter((assignUser) => {
        return assignUser.email != selectedProject.projectOwner;
    });

    //post/put to server
    const modifyProject = async (e) => {
        e.preventDefault();
        let{
            projectOwner,
            projectName,
            projectDescription,
            departmentName,
            startDate,
            dueDate,
            assignedTo,
            projectState
        } = project;
        
        let{
            tasks,
            comments
        } = selectedProject

        if (projectOwner === undefined || projectOwner === ""){
            projectOwner = selectedProject.projectOwner;
        }
        if (projectState === undefined || projectState === ""){
            projectState = selectedProject.projectState;
        }
        if (projectName === undefined || projectName === ""){
            projectName = selectedProject.projectName;
        }
        if (projectDescription === undefined || projectDescription === ""){
            projectName = selectedProject.projectDescription;
        }
        if (departmentName === undefined || departmentName === ""){
            projectName = selectedProject.departmentName;
        }
        if (startDate === undefined || startDate === ""){
            startDate = selectedProject.departmentName;
        }
        if (dueDate === undefined || dueDate === ""){
            dueDate = selectedProject.departmentName;
        }
        if (assignedTo === undefined || assignedTo === ""){
            assignedTo = selectedProject.departmentName;
        }

        let projectOwnerObj = selectedProject.assignedTo.filter((ass) => {
            return ass.email = selectedProject.projectOwner;
        });
        
        assignedTo = [...assignedTo, {
            email: projectOwnerObj[0].email, 
            fullName: projectOwnerObj[0].fullName
        }];

        try{
            const {data} = await axios.put(`/modifyTheProject/${selectedProject[0].projectName}`, {
                projectOwner,
                projectName,
                projectDescription,
                departmentName,
                startDate,
                dueDate,
                assignedTo,
                projectState,
                tasks,
                comments
            });

            if(data.error){
                toast.error(data.error);
            }else{
                setProject({});
                toast.success("Project Modified");
            }
        }catch(error){
            console.log(error);
            toast.error(error);
        }     
    }

    return (
    <div className='content_'>
        <div className='project-content-view'>
            <form action={modifyProject}>
                <div className='field-D'>
                    <label>Project Name</label> 
                    <p>:</p>
                    <input 
                        type='text'
                        placeholder={selectedProject.projectName}
                        autoComplete='off'
                        name = "projectName"
                        value={project.projectName}
                        onChange={(e) => {setProject({...project, projectName: e.target.value})}}
                    /> 
                </div>
                <div className='field-D'>
                    <label>Project Description:</label> 
                    <p>:</p>
                    <textarea 
                        type='text'
                        placeholder={selectedProject.projectDescription}
                        autoComplete='off'
                        name = "projectDescription"
                        value={project.projectDescription}
                        onChange={(e) => {setProject({...project, projectDescription: e.target.value})}}
                    /> 
                </div>
                <div className='field-D'>
                    <label>Department Name:</label>
                    <p>:</p>
                    <input 
                        type='text'
                        placeholder={selectedProject.departmentName}
                        autoComplete='off'
                        name = "departmentName"
                        value={project.departmentName}
                        onChange={(e) => {setProject({...project, departmentName: e.target.value})}}
                    /> 
                </div>
                <div className='field-D'>
                    <label>Start Date:</label>
                    <p>:</p>
                    <DatePickerComponent
                        placeholder = {selectedProject.startDate}
                        value={project.startDate}
                        min={InitialStartDate}
                        max={selectedProject.dueDate}
                        onChange={(e) => {setProject({...project, startDate: e.target.value})}}
                        >
                    </DatePickerComponent>
                    {/* <input 
                        type='date'
                        placeholder={selectedProject.startDate}
                        autoComplete='off'
                        name = "startDate"
                        value={project.startDate}
                        onChange={(e) => {setProject({...project, startDate: e.target.value})}}
                    />  */}
                </div>
                <div className='field-D'>
                    <label>Due Date:</label>  
                    <p>:</p>
                    <DatePickerComponent
                        placeholder={selectedProject.dueDate}
                        value={project.dueDate}
                        min={project.startDate}
                        onChange={(e) => {setProject({...project, dueDate: e.target.value})}}
                    >
                    </DatePickerComponent>
                    {/* <input 
                        type='date'
                        placeholder={selectedProject.dueDate}
                        autoComplete='off'
                        name = "dueDate"
                        value={project.dueDate}
                        onChange={(e) => {setProject({...project, dueDate: e.target.value})}}
                    /> */}
                </div>
                <div className='field-D'>
                    <label>Assigned To:</label> 
                    <p>:</p>
                    <Select
                        name = "users"
                        options={filteredUsers}
                        labelField= "email"
                        valueField="email"
                        multi
                        searchable = "true"
                    >
                    </Select>
                    {/* <input 
                        type='text'
                        placeholder={selectedProject.assignedTo}
                        autoComplete='off'
                        name = "assignedTo"
                        value={project.assignedTo}
                        onChange={(e) => {setProject({...project, assignedTo: e.target.value})}}
                    /> */}
                </div>
                <div className='field-D'>
                    <label>State:</label>
                    <p>:</p>
                    <select onChange={(e) => {setProject({...project, projectState: e.target.value})}}>
                        <option value="On Going">On Going</option>
                        <option value="Completed">Completed</option>    
                        <option value="Due">Due</option>    
                    </select>
                </div>
                
                <div className='field-D'>
                    <button type = "submit">Complete The Changes</button>
                </div>
            </form>   
        </div>

        <div className='task-content-view'>
            {projectTasks.map(projectTask => {
                return <SingleTaskView singleTask = {projectTask}/>
            })}
        </div>
        
    </div>
    
  );
}
