import React, { useState } from 'react';
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
        currentProject,
    } = useContext(UserContext);

    const [project, setProject] = useState({});
    
    //selected project from the projects
    const displayProject = displayProjects.filter((displayProject) => {
        return currentProject.currentProjectName === displayProject.projectName;
    });   
    const selectedProject = displayProject[0];
    const projectTasks = selectedProject.tasks;

    //Content for datepicker
    const InitialStartDate = new Date();

    //Select projectOwner
    const projectModifier = selectedProject.projectOwner;
    
    //post/put to server
    const modifyProject = async (e) => {
        e.preventDefault();
        console.log(project);
        //select project object

        try{
            const {data} = await axios.put(`/modifyTheProject/${selectedProject.projectName}`, {
                projectModifier,
                project
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
        <div className={Styles.form1}>
            <form onSubmit={modifyProject}>
                <Field1
                    labelName = "Project Name"
                    type = "text"
                    placeholder={selectedProject.projectName}
                    autoComplete='off'
                    name = "projectName"
                    value={project.projectName}
                    onChange={(e) => {setProject({...project, projectName: e.target.value})}}
                />
                <Field2
                    labelName = "Project Description"
                    type = "text"
                    placeholder={selectedProject.projectDescription}
                    autoComplete='off'
                    name = "projectDescription"
                    value={project.projectDescription}
                    onChange={(e) => {setProject({...project, projectDescription: e.target.value})}}         
                />
                <Field1
                    labelName = "Department Name"
                    type = "text"
                    placeholder={selectedProject.departmentName}
                    autoComplete='off'
                    name = "departmentName"
                    value={project.departmentName}
                    onChange={(e) => {setProject({...project, departmentName: e.target.value})}}
                />

                <DField1
                    labelName = "Start Date"
                    placeholder = {selectedProject.startDate}
                    value = {project.startDate}
                    min = {InitialStartDate}
                    max = {selectedProject.dueDate}
                    onChange = {(e) => {setProject({...project, startDate: e.target.value})}}
                />

                <DField1
                    labelName = "Due Date"
                    placeholder={selectedProject.dueDate}
                    value = {project.dueDate}
                    min = {project.startDate}
                    onChange={(e) => {setProject({...project, dueDate: e.target.value})}}
                />

                <MSField1
                    alert = "*Project owner/creator is already added"
                    labelName = "Assigned To"
                    name = "assignedTo"
                    options = {filteredUsers}
                    labelField = "email"
                    valueField = "email"
                    onChange = {(e) => {setProject({...project, assignedTo: e})}}
                />

                <SSField1
                    labelName = "State"
                    name = "state"
                    labelField = "name"
                    valueField = "name"
                    options = {options}
                    onChange = {(e) => {setProject({...project, projectState: e})}}
                />

                <SubmitBtn1
                    buttonName = "Create The Project"
                    type = "submit"
                    onClick = 
                    {
                        (e) => {
                            setProject({...project, projectOwner: user.email});
                            setCurrentProject({
                                currentProjectOwner: user.email,
                                currentProjectName: project.projectName,
                                dueDate: project.dueDate
                            });
                        }
                    }
                />
            </form>   
        </div>

        //========================================
    <div className='content_'>
        <div className='project-content-view'>
            <form onSubmit={modifyProject}>
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
                        options={users}
                        labelField= "email"
                        valueField="email"
                        multi
                        searchable = "true"
                        onChange={(e) => {setProject({...project, assignedTo: e})}}
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
                    <button type = "submit" onClick={(e) => {}}>Complete The Changes</button>
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
