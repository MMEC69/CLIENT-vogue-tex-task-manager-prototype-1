import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContex'; 
import SingleTaskView from '../SingleTaskView/SingleTaskView';
import { Field1, Field2} from '../UtilizeComponents/fC';
import Styles from "../ComponentCSS/Form.module.css";
import Styles1 from "../ComponentCSS/Layout.module.css";
import {AttachmentWindow} from "../UtilizeComponents/AttachemntComponents";
import { dateFormat1 } from '../../Functions/Conversion';
import { userFilter2 } from '../../Functions/FilterFunctions';
import AssignedToList from '../UsersList/AssignedToList';

export default function ProjectContentView() {
    const {currentProject, users} = useContext(UserContext);
    const {project} = currentProject;
    const {
        projectName,
        _id,
        tasks,
        assignedTo
    } = project;

    const assginedEmails = userFilter2(users, assignedTo) 
    
    return (
        <div className={Styles.form1}>
        <form>
            <Field1
                labelName = "Project Name"
                type = "text"
                autoComplete='off'
                name = "projectName"
                placeholder={project.projectName}
            />
            <Field2
                labelName = "Project Description"
                type = "text"
                autoComplete='off'
                name = "projectDescription"
                placeholder={project.projectDescription}
            />
            <Field1
                labelName = "Department Name"
                type = "text"
                autoComplete='off'
                name = "departmentName"
                placeholder={project.departmentName}
            />

            <Field1
                labelName = "Start Date"
                type = "text"
                autoComplete='off'
                name = "startDate"
                placeholder={dateFormat1(project.startDate)}
            />

            <Field1
                labelName = "Due Date"
                type = "text"
                autoComplete='off'
                name = "dueDate"
                placeholder={dateFormat1(project.dueDate)}
            />

            {/* <Field1
                labelName = "Assigned To"
                type = "text"
                autoComplete='off'
                name = "assignedTo"
                placeholder={assginedEmails}
            /> */}

            <AssignedToList
                assginedEmails = {assginedEmails}
            />

            <Field1
                labelName = "State"
                type = "text"
                autoComplete='off'
                name = "projectState"
                placeholder={project.projectState}
            />

            <AttachmentWindow
                attachments = {project.attachments}
            />
        </form>
        
        <div className={Styles1.taskView1}>
            {tasks?.map(task => {
                return <SingleTaskView 
                    singleTask = {task} 
                    projectName = {projectName} 
                    projectID = {_id}
                    />
            })}
        </div>   
    </div>
  );
}
