import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState(null);

    const [users, setUsers] = useState([]);

    const [activity, setActivity] = useState("project-dashbaord-content-view");

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
    
    const [searchResult, setSearchResult] = useState(null);

    useEffect(() => {
        axios.get("/projects")
            .then(res => setDisplayProjects(res.data))
            .catch(err => console.log(err));

        axios.get("/users")
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));

        const data = window.localStorage.getItem("loggedUser")
        setUser(JSON.parse(data));
    }, []);

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
            setTest,
            searchResult,
            setSearchResult
            }}>
            {children}
        </UserContext.Provider>
    );
}