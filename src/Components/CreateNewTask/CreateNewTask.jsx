import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../Context/UserContex';
import SingleTaskView from '../SingleTaskView/SingleTaskView';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Field1, Field2, DField1, MSField1, SubmitBtn1 } from '../UtilizeComponents/fC';
import {projectStateForCP} from "../../Functions/ProjectStateFunctions";
import Styles1 from "../ComponentCSS/Layout.module.css";
import {taskName1, taskDescription1} from "../../MetaData/FormValidationPatterns";

export default function CreateNewTask() {
    const {
        user,
        newTask, 
        setNewTask, 
        tasks, 
        setTasks, 
        setActivity, 
        currentProject, 
        setCurrentProject} = useContext(UserContext);

    const {
        oldTasks } = currentProject;

    const InitialStartDate = new Date();
    const endDate = currentProject.dueDate;

    useEffect(() => {
        setTasks(oldTasks);
    }, []);

    // setTasks(oldTasks);
    
    const addNewTask = async (e) => {
        e.preventDefault();

        //state code
        newTask.taskState = projectStateForCP(newTask.newTaskStartDate);

        setTasks ([newTask, ...tasks]);
        setNewTask ({
            assigner:user,
            assignedProject: currentProject.currentProjectName,
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
        try{
            const {data} = await axios.put("/createNewTask", {
                currentProject, tasks, user
            });
            if(data.error){
                toast.error(data.error);
                console.log(data.error)
            }else{
                setCurrentProject({});
                toast.success("Project Completed!");
                setActivity("dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    }
   
    return (
        <div className={Styles1.createNewTask}>
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
                    onChange={(e) => {setNewTask({...newTask, newTaskName: e.target.value})}}            
                    pattern = {taskName1}
                />
                <Field2
                    labelName = "Task Description"
                    type = "text"
                    placeholder=''
                    autoComplete='off'
                    name = "newTaskDescription"
                    value={newTask.newTaskDescription}
                    onChange={(e) => {setNewTask({...newTask, newTaskDescription: e.target.value})}}
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
                    onClick = {(e) => {
                        setNewTask({
                            ...newTask,
                            assigner:user,
                            assignedProject: currentProject.currentProjectName
                        });
                    }}
                />
                <SubmitBtn1
                    buttonName = "Finish"
                    onClick={completeProject}
                />
            </form>

            <div className={Styles1.taskView1}>
                {tasks?.map(projectTask => {
                        return <SingleTaskView singleTask = {projectTask}/>
                })}
            </div>
        </div>
    
    );
}
