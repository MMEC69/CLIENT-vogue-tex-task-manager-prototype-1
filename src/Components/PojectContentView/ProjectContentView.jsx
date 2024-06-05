import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContex'; 
import SingleTaskView from '../SingleTaskView/SingleTaskView';
import { Field1, Field2} from '../UtilizeComponents/fC';
import Styles from "../ComponentCSS/Form.module.css";
import Styles1 from "../ComponentCSS/Layout.module.css";
import {AttachmentWindow} from "../UtilizeComponents/AttachemntComponents";

export default function ProjectContentView() {
    const {currentProject} = useContext(UserContext);
    const {project} = currentProject;
    const {tasks} = project;

    const assignedEmails = project.assignedTo.map((singleAssign) => {
        return singleAssign.fullName;
    });
    
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
                placeholder={project.startDate}
            />

            <Field1
                labelName = "Due Date"
                type = "text"
                autoComplete='off'
                name = "dueDate"
                placeholder={project.dueDate}
            />

            <Field1
                labelName = "Due Date"
                type = "text"
                autoComplete='off'
                name = "assignedTo"
                placeholder={assignedEmails}
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
            {tasks.map(task => {
                return <SingleTaskView singleTask = {task} project = {project}/>
            })}
        </div>   
    </div>
  );
}
