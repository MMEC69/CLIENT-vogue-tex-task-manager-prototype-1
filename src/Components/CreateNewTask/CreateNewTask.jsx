import React, { useEffect } from 'react';
import "./CreateNewTask.css";
import SingleTaskView from '../SingleTaskView/SingleTaskView';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContex';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function CreateNewTask() {
    const {user, newTask, setNewTask, tasks, setTasks, setActivity, currentProject, setCurrentProject} = useContext(UserContext);

    useEffect(() => {
        setCurrentProject({...currentProject, currentProjectOwner: user.email});
        setNewTask ({assginer:currentProject.currentProjectOwner, assignedProject: currentProject.currentProjectName});
    }, []);
    
    const addNewTask = async (e) => {
        e.preventDefault();
        setTasks ([newTask, ...tasks]);
        setNewTask ({assginer:currentProject.currentProjectOwner, assignedProject: currentProject.currentProjectName});
    }

    const completeProject = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put("/createNewTask", {
                currentProject, tasks
            });
            if(data.error){
                toast.error(data.error);
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
            <div className='field-P'>
                <label>Project Name:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "assginedProject"
                    value={currentProject.currentProjectName}
                    onChange={(e) => {
                        setNewTask({...currentProject, currentProjectName: e.target.value})}}
                />  
            </div>
            <div className='field-P'>
                <label>Task Name:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "newTaskName"
                    value={newTask.newTaskName}
                    onChange={(e) => {setNewTask({...newTask, newTaskName: e.target.value})}}
                /> 
            </div>

            <div className='field-P'>
                <label>Task Description:</label> 
                <textarea 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "newTaskDescription"
                    value={newTask.newTaskDescription}
                    onChange={(e) => {setNewTask({...newTask, newTaskDescription: e.target.value})}}
                /> 
            </div>

            <div className='field-P'>
                <label>Start Date:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "startDate"
                    value={newTask.newTaskStartDate}
                    onChange={(e) => {setNewTask({...newTask, newTaskStartDate: e.target.value})}}
                /> 
            </div>

            <div className='field-P'>
                <label>Due Date:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "dueDate"
                    value={newTask.newTaskdueDate}
                    onChange={(e) => {setNewTask({...newTask, newTaskdueDate: e.target.value})}}
                /> 
            </div>

            <div className='field-P'>
                <label>Assigned To:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "assignedTo"
                    value={newTask.newTaskAssignedTo}
                    onChange={(e) => {setNewTask({...newTask, newTaskAssignedTo: e.target.value})}}
                /> 
            </div>


            <div className='field-P'>
                <label>State:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "state"
                    value={newTask.state}
                    onChange={(e) => {setNewTask({...newTask, taskState: e.target.value})}}
                /> 
            </div>

            <div className='field-P'>
                <label></label>
                <button type = "submit">Add Task</button><br/>
                <button onClick={completeProject} id='complete-project'>Complete Project</button>
            </div>
            
            </form>

        

    <div className='task-view'>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
        <SingleTaskView/>
    </div>
</div>
    
    );
}
