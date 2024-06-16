import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContex'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import Styles from "../ComponentCSS/Form.module.css";
import { Field1, Field2, DField1, MSField1, SubmitBtn1 } from '../UtilizeComponents/fC';
import {userRoleDividerCP, projectOwnerFilter, prevUserRoleDividerCP} from "../../Functions/Conversion";
import {projectStateForCP} from "../../Functions/ProjectStateFunctions";
import { projectName1, departmentName1, projectDescription1 } from "../../MetaData/FormValidationPatterns";
import { sendMailNewProject } from '../../Functions/Mail';
import { uploadAttachments, updateServerAttachments } from "../../Functions/ServerCommunication";

export default function CreateNewProject() {
    const {
        setActivity, 
        project, 
        setProject, 
        setCurrentProject,
        currentProject, 
        setNewTask, 
        setTasks, 
        user,
        users
    } = useContext(UserContext);
    const [files, setFiles] = useState([]);
    const InitialStartDate = new Date();
    let filteredUsers = projectOwnerFilter(user, users);

    //post/put to server--------------------------------------------------Function
    const addNewProject = async (e) => {
        e.preventDefault();
        console.log("> addNewProject initatied");
        let { 
            projectOwner,
            projectName, 
            projectDescription, 
            departmentName, 
            startDate, 
            dueDate, 
            assignedTo, 
            projectState
        } = project;

        try {
            const prevAssigned = prevUserRoleDividerCP(user,assignedTo);
            assignedTo = userRoleDividerCP (user, assignedTo);
            setCurrentProject({...currentProject, assignedTo: prevAssigned})
        } catch (error) {
            console.log(error);
        }
        
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
                console.log(data.error);
                console.log("> addNewProject ended");
                toast.error(data.error);
                setCurrentProject({});
            }else{
                const data = await uploadAttachments(files);
                let result = await updateServerAttachments(data, projectName, user);
                result = await sendMailNewProject(project, data, users);
                setProject({});
                console.log("> addNewProject Ended");
                toast.success("Project Created");
                setActivity("create-new-task");
            }
        } catch (error) {
            console.log(error);
            console.log("> addNewProject Ended");
            toast.error(error);
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
                    pattern = {projectName1}
                />       
                <Field2
                    labelName = "Project Description"
                    type = "text"
                    placeholder=''
                    autoComplete='off'
                    name = "projectDescription"
                    value={project.projectDescription}
                    onChange={(e) => {setProject({...project, projectDescription: e.target.value})}}         
                    pattern = {projectDescription1}
                />
                <Field1
                    labelName = "Department Name"
                    type = "text"
                    placeholder=''
                    autoComplete='off'
                    name = "departmentName"
                    value={project.departmentName}
                    onChange={(e) => {setProject({...project, departmentName: e.target.value})}}
                    pattern = {departmentName1}
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

                <input type='file' multiple onChange={(e) => setFiles(e.target.files)}/>

                <SubmitBtn1
                    buttonName = "Create The Project"
                    type = "submit"
                    onClick = {() => {
                        setProject({...project, projectOwner: user.id});
                        setCurrentProject({
                            currentProjectOwner: user.id,
                            currentProjectName: project.projectName,
                            dueDate: project.dueDate,
                            oldTasks: []
                        });
                        setNewTask({});
                        setTasks([]);
                    }}
                />
            </form>
        </div>
    );
}
