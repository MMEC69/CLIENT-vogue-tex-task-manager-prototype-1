import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    const [activity, setActivity] = useState("dashboard");
    const [project, setProject] = useState({
        projectOwner: "",
        projectName: "",
        projectDescription: "",
        departmentName: "",
        startDate: "",
        dueDate: "",
        assignedTo: "",
        projectState: "",
        tasks:[],
        comments:[]
    });

    const [newComment, setNewComment] = useState({
        commentor: "",
        commentedDate: "",
        commentedTime: "",
        message: ""
    });

    const [newTask, setNewTask] = useState({
        newTaskName: "",
        newTaskDescription: "",
        newTaskStartDate: "",
        newTaskdueDate: "",
        newTaskAssignedTo: "",
        state:""
    });

    const [tasks, setTasks] = useState([]);

    const [currentProject, setCurrentProject] = useState({
        currentProjectOwner: "",
        currentProjectName:"" 
    });

    useEffect(() => {
        if(!user){
            axios.get("/profile")
            .then(({data}) => {
                setUser(data);
            });
        }
    }, []);

    return(
        <UserContext.Provider value={{
            user, 
            setUser, 
            activity, 
            setActivity,
            project,
            setProject,
            newComment, 
            setNewComment,
            newTask, 
            setNewTask,
            tasks,
            setTasks,
            currentProject, 
            setCurrentProject
            }}>
            {children}
        </UserContext.Provider>
    );
}