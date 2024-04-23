import React from 'react';
import "./CreateNewProject.css";
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContex'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { registerLicense } from '@syncfusion/ej2-base';
import Select from "react-dropdown-select"; 

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx0TXxbf1x0ZFREalxUTnJWUj0eQnxTdEFjXX1fcXZVQ2RVWEN/Ww==');

export default function CreateNewProject() {
    //This is the use contex
    const {
        setActivity, 
        project, 
        setProject, 
        setCurrentProject, 
        setNewTask, 
        setTasks, 
        user,
        users
    } = useContext(UserContext);

    //Content for datepicker
    const InitialStartDate = new Date();

    //Select filteration
    let filteredUsers = users.filter((assignUser) => {
        return assignUser.email != user.email;
    });

    //post/put to server
    const addNewProject = async (e) => {
        e.preventDefault();
        setNewTask({});
        setTasks([]);
        let { 
            projectOwner,
            projectName, 
            projectDescription, 
            departmentName, 
            startDate, 
            dueDate, 
            assignedTo, 
            projectState} = project;

            if (projectState === undefined || projectState === ""){
                projectState = "On going";
            }

            assignedTo = [...assignedTo, {email: user.email, fullName: user.fullName}];
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
                setCurrentProject({});
            }else{
                setProject({});
                toast.success("Project Created!");
                setActivity("create-new-task");
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
                <DatePickerComponent 
                    onChange={(e) => {setProject({...project, startDate: e.target.value})}}
                    value = {project.startDate}
                    placeholder='Enter Date'
                    min={InitialStartDate}>
                </DatePickerComponent>
                {/* <input 
                    type='date'
                    placeholder=''
                    autoComplete='off'
                    name = "startDate"
                    value={project.startDate}
                    onChange={(e) => {setProject({...project, startDate: e.target.value})}}
                />  */}
            </div>

            <div className='field-P'>
                <label>Due Date:</label> 
                <DatePickerComponent 
                    onChange={(e) => {setProject({...project, dueDate: e.target.value})}}
                    placeholder='Enter Date'
                    value={project.dueDate}
                    min={project.startDate}>
                </DatePickerComponent>
                {/* <input 
                    type='date'
                    placeholder=''
                    autoComplete='off'
                    name = "dueDate"
                    value={project.dueDate}
                    onChange={(e) => {setProject({...project, dueDate: e.target.value})}}
                /> */}
            </div>   

            <div className='field-P'>
                <label>Assigned To:</label> 
                <Select
                    name = "users"
                    options = {filteredUsers}
                    labelField="email"
                    valueField='email'
                    multi
                    searchable = "true"
                    onChange={(e) => {setProject({...project, assignedTo: e})}}
                >
                </Select>
                {/* <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "assignedTo"
                    value={project.assignedTo}
                    onChange={(e) => {setProject({...project, assignedTo: e.target.value})}}
                />  */}
            </div>

            <div className='field-P'>
                <label>State:</label> 
                <select onChange={(e) => {setProject({...project, projectState: e.target.value})}}>
                    <option value="On Going" selected>On Going</option>
                    <option value="Completed">Completed</option>    
                    <option value="Due">Due</option>    
                </select>           
            </div>

            <div className='field-P'>
            <label></label>
            <button type = "submit" onClick={(e) => {
                setProject({...project, projectOwner: user.email});
                setCurrentProject({
                    currentProjectOwner: user.email,
                    currentProjectName: project.projectName,
                    dueDate: project.dueDate
                });
            }}>Add the Project</button>
            </div>

        </form>
        
    </div>
    
  );
}
