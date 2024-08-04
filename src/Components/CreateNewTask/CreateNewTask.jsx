import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../Context/UserContex';
import SingleTaskView from '../SingleTaskView/SingleTaskView';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Field1, Field2, DField1, MSField1, SubmitBtn1 } from '../UtilizeComponents/fC';
import {projectStateForCP} from "../../Functions/ProjectStateFunctions";
import Styles1 from "../ComponentCSS/Layout.module.css";
import styles from "../ComponentCSS/Form.module.css";
import {taskName1, taskDescription1} from "../../MetaData/FormValidationPatterns";
import { useState } from 'react';

export default function CreateNewTask() {
    const {
        user,
        newTask, 
        setNewTask, 
        tasks, 
        setTasks, 
        setActivity, 
        currentProject, 
        setCurrentProject
    } = useContext(UserContext);

    const {
        oldTasks 
    } = currentProject;

    const InitialStartDate = new Date();
    const endDate = currentProject.dueDate;

    const [displayTasks, setDisplayTasks] = useState(oldTasks)
    
    const addNewTask = async (e) => {
        e.preventDefault();
        let {
            assignedTo
        } = newTask;
        assignedTo = await assignedTo?.map((singleAssign) => {
            return {
                id: singleAssign.id,
                role: singleAssign.role
            }
        });
        setTasks ([newTask, ...tasks]);
        setDisplayTasks([newTask, ...displayTasks])
        setNewTask ({
            assigner:user.id,
            newTaskName: "",
            newTaskDescription: "",
            newTaskStartDate: "",
            newTaskDueDate: "",
            newTaskAssignedTo: "",
            taskState:""
        });
    }

    const completeProject = async (e) => {
        e.preventDefault();
        const {
            id 
        } = user;
        const {
            currentProjectName 
        } = currentProject;
        try{
            const {data} = await axios.put("/createNewTask", {
                id, currentProjectName, tasks
            });
            if(data.error){
                toast.error(data.error);
                console.log(data.error)
            }else{
                setCurrentProject({});
                setTasks ([]);
                toast.success("Project Completed");
                setActivity("project-dashbaord-content-view");
            }
        } catch (error) {
            console.log(error);
        }
    }
   
    return (
        <div className={styles.form1}>
            <form onSubmit={addNewTask}>
                <Field1
                    labelName = "Project Name"
                    type = "text"
                    placeholder=''
                    autoComplete='off'
                    name = "assignedProject"
                    value={currentProject.currentProjectName}
                    onBlur={(e) => {
                        setNewTask({
                            ...currentProject, 
                            currentProjectName: e.target.value, 
                            });
                        }
                    }                
                />
                <Field1
                    labelName = "Task Name"
                    type = "text"
                    placeholder=''
                    autoComplete='off'
                    name = "newTaskName"
                    value={newTask.newTaskName}
                    onChange={(e) => {setNewTask({...newTask, newTaskName: (e.target.value).trim()})}}            
                    pattern = {taskName1}
                />
                <Field2
                    labelName = "Task Description"
                    type = "text"
                    placeholder=''
                    autoComplete='off'
                    name = "newTaskDescription"
                    value={newTask.newTaskDescription}
                    onChange={(e) => {setNewTask({...newTask, newTaskDescription: (e.target.value).trim()})}}
                    pattern = {taskDescription1}
                />
                <DField1
                    labelName = "Start Date"
                    value = {newTask.newTaskStartDate}
                    min = {InitialStartDate}
                    max = {endDate}
                    onChange={(e) => {setNewTask({...newTask, newTaskStartDate: e.target.value})}}
                />

                <DField1
                    labelName = "Due Date"
                    value = {newTask.newTaskDueDate}
                    min = {newTask.newTaskStartDate}
                    max = {endDate}
                    onChange={(e) => {setNewTask({...newTask, newTaskDueDate: e.target.value})}}
                />

                <MSField1
                    labelName = "Assigned To"
                    name = "assignedTo"
                    options = {currentProject.assignedTo}
                    labelField = "email"
                    valueField = "email"
                    onChange={(e) => {setNewTask({...newTask, newTaskAssignedTo: e})}}
                />
                <SubmitBtn1
                    buttonName = "Add Task"
                    type = "submit"
                    onClick = {() => {
                        const taskState = projectStateForCP(newTask.newTaskStartDate);
                        setNewTask({
                            ...newTask,
                            assigner:user.id,
                            taskState: taskState
                        });
                    }}
                />
                <SubmitBtn1
                    buttonName = "Finish"
                    onClick={completeProject}
                />
            </form>

            <div className={Styles1.taskView1}>
                {displayTasks?.map(projectTask => {
                        return <SingleTaskView 
                                    singleTask = {projectTask} 
                                    projectName={currentProject.currentProjectName}
                                    projectID = {currentProject.projectID}
                                    />
                })}
            </div>
        </div>
    
    );
}
