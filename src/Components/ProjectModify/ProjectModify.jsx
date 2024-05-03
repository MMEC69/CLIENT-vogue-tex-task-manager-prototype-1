import React, { useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContex'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import SingleTaskView from '../SingleTaskView/SingleTaskView';
import { Field1, Field2, DField1, MSField1, SSField1, SubmitBtn1 } from '../UtilizeComponents/fC';
import Styles from "../ComponentCSS/Form.module.css";

export default function ProjectModify() {
    const {
        user,
        users, 
        currentProject,
    } = useContext(UserContext);

    const [project, setProject] = useState({});

    const selectedProject = currentProject.project;
    const {tasks} = selectedProject;

    //Select filteration
    let filteredUsers = users.filter((assignUser) => {
        return assignUser.email != user.email;
    });

    //options for state
    const options = [
        {name: "on going"},
        {name: "due"},
        {name: "completed"}
    ];
    
    //Content for datepicker
    const InitialStartDate = new Date();

    //Select projectOwner
    const projectModifier = user.email;
    
    //post/put to server
    const modifyProject = async (e) => {
        e.preventDefault();
        
        //select project object
        project.projectState = project.projectState[0].name;

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
                    onChange = {(e) => setProject({...project, projectState: e})}
                />

                <SubmitBtn1
                    buttonName = "Complete The Changes"
                    type = "submit"
                    onClick = {
                        (e) => {}  
                    }
                />
            </form>

            <div className='task-content-view'>
                {tasks.map(task => {
                    return <SingleTaskView singleTask = {task}/>
                })}
            </div>   
        </div>
  );
}
