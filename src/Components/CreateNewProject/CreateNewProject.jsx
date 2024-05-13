import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContex'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import Styles from "../ComponentCSS/Form.module.css";
import { Field1, Field2, DField1, MSField1, SSField1, SubmitBtn1 } from '../UtilizeComponents/fC';
import {userRoleDividerCP, projectOwnerFilter} from "../../Functions/Conversion";
import {projectStateForCP} from "../../Functions/ProjectStateFunctions";
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
    let filteredUsers = projectOwnerFilter(user, users);

    //post/put to server--------------------------------------------------Function
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

        try {
            assignedTo = userRoleDividerCP (projectOwner, assignedTo);
            console.log("1");
            console.log(assignedTo);
        } catch (error) {
            console.log("Users assign problem\nError code: "+error);
        }
        
        //state code
        projectState = projectStateForCP(startDate);

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
            toast.error(error);
            console.log(error);
        }
    }

    return (
        <div className={Styles.form1}>
            <form onSubmit={addNewProject}>
                <Field1
                    labelName = "Project Name"
                    type = "text"
                    placeholder=''
                    autoComplete='off'
                    name = "projectName"
                    value={project.projectName}
                    onChange={(e) => {setProject({...project, projectName: e.target.value})}}
                />       
                <Field2
                    labelName = "Project Description"
                    type = "text"
                    placeholder=''
                    autoComplete='off'
                    name = "projectDescription"
                    value={project.projectDescription}
                    onChange={(e) => {setProject({...project, projectDescription: e.target.value})}}         
                />
                <Field1
                    labelName = "Department Name"
                    type = "text"
                    placeholder=''
                    autoComplete='off'
                    name = "departmentName"
                    value={project.departmentName}
                    onChange={(e) => {setProject({...project, departmentName: e.target.value})}}
                />

                <DField1
                    labelName = "Start Date"
                    value = {project.startDate}
                    min = {InitialStartDate}
                    max = {project.dueDate}
                    onChange = {(e) => {setProject({...project, startDate: e.target.value})}}
                />

                <DField1
                    labelName = "Due Date"
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

                <SubmitBtn1
                    buttonName = "Create The Project"
                    type = "submit"
                    onClick = 
                    {
                        (e) => {
                            setProject({...project, projectOwner: user});
                            setCurrentProject({
                                currentProjectOwner: user,
                                currentProjectName: project.projectName,
                                dueDate: project.dueDate
                            });
                        }
                    }
                />
            </form>
            
        </div>
  );
}
