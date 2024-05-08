import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState(null);

    const [users, setUsers] = useState([]);

    const [activity, setActivity] = useState("dashboard");

    const [project, setProject] = useState({
        projectOwner: "",
        projectName: "",
        projectDescription: "",
        departmentName: "",
        startDate: "",
        dueDate: "",
        assignedTo: [],
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

    const [currentProject, setCurrentProject] = useState({
        currentProjectOwner: "",
        currentProjectName:"" 
    });

    const [newTask, setNewTask] = useState({
        assginer:"",
        assignedProject: "",
        newTaskName: "",
        newTaskDescription: "",
        newTaskStartDate: "",
        newTaskdueDate: "",
        newTaskAssignedTo: "",
        taskState:""
    });

    const [tasks, setTasks] = useState([]);
    const [displayProjects, setDisplayProjects] = useState([]);
    const [test, setTest] = useState({});
    

    useEffect(() => {
        if(!user){
            axios.get("/profile")
            .then(({data}) => {
                setUser(data);
            });
        }

        axios.get("/getProjects")
            .then(res => setDisplayProjects(res.data))
            .catch(err => console.log(err));

        axios.get("/getUsers")
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    });

    return(
        <UserContext.Provider value={{
            user,
            users, 
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
            setCurrentProject,
            displayProjects, 
            setDisplayProjects,
            test, 
            setTest
            }}>
            {children}
        </UserContext.Provider>
    );
}