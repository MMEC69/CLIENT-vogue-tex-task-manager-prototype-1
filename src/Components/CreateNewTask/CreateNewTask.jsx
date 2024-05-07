import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContex';
import "./CreateNewTask.css";
import SingleTaskView from '../SingleTaskView/SingleTaskView';
import axios from 'axios';
import toast from 'react-hot-toast';
import { registerLicense } from '@syncfusion/ej2-base';
import { Field1, Field2, DField1, MSField1, SSField1, SubmitBtn1 } from '../UtilizeComponents/fC';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx0TXxbf1x0ZFREalxUTnJWUj0eQnxTdEFjXX1fcXZVQ2RVWEN/Ww==');

export default function CreateNewTask() {
    const {
        users,
        user,
        displayProjects, 
        newTask, 
        setNewTask, 
        tasks, 
        setTasks, 
        setActivity, 
        currentProject, 
        setCurrentProject} = useContext(UserContext);

    //options for state
    const options = [
        {name: "on going"},
        {name: "due"},
        {name: "completed"}
    ];

    const InitialStartDate = new Date();
    const endDate = currentProject.dueDate;
    
    const addNewTask = async (e) => {
        e.preventDefault();

        newTask.taskState = newTask.taskState[0].name;
        setTasks ([newTask, ...tasks]);
        setNewTask ({
            assginer:currentProject.currentProjectOwner,
            assignedProject: currentProject.currentProjectName,
            newTaskName: "",
            newTaskDescription: "",
            newTaskStartDate: "",
            newTaskdueDate: "",
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
            console.log("Error:" +error);
        }
    }
   
    return (
        <div className='create-new-task'>
            <form onSubmit={addNewTask}>
                <Field1
                    labelName = "Project Name"
                    type = "text"
                    placeholder=''
                    autoComplete='off'
                    name = "assginedProject"
                    value={currentProject.currentProjectName}
                    onBlur={(e) => {
                        setNewTask({
                            ...currentProject, 
                            currentProjectName: e.target.value, 
                            currentProjectOwner: currentProject.currentProjectOwner});
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
                />
                <Field2
                    labelName = "Task Description"
                    type = "text"
                    placeholder=''
                    autoComplete='off'
                    name = "newTaskDescription"
                    value={newTask.newTaskDescription}
                    onChange={(e) => {setNewTask({...newTask, newTaskDescription: e.target.value})}}
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
                    value = {newTask.newTaskdueDate}
                    min = {newTask.newTaskStartDate}
                    max = {endDate}
                    onChange={(e) => {setNewTask({...newTask, newTaskdueDate: e.target.value})}}
                />

                <MSField1
                    labelName = "Assigned To"
                    name = "assignedTo"
                    options = {users}
                    labelField = "email"
                    valueField = "email"
                    onChange={(e) => {setNewTask({...newTask, newTaskAssignedTo: e})}}
                />

                <SSField1
                    labelName = "State"
                    name = "state"
                    labelField = "name"
                    valueField = "name"
                    options = {options}
                    onChange = {(e) => {setNewTask({...newTask, taskState: e})}}
                />

                <SubmitBtn1
                    buttonName = "Add Task"
                    type = "submit"
                    onClick={(e) => setNewTask({...newTask, assginer:currentProject.currentProjectOwner, assignedProject: currentProject.currentProjectName})}
                />
                <SubmitBtn1
                    buttonName = "Finish"
                    onClick={completeProject}
                />
            </form>

    <div className='task-view'>
        {tasks.map(projectTask => {
                return <SingleTaskView singleTask = {projectTask}/>
        })}
    </div>
</div>
    
    );
}
