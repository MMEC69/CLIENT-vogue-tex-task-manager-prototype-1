import axios from "axios";
import {CNPMailSubject, RPMailSubject} from "../MetaData/MailSubject";
import { dateFormat1 } from "./Conversion";

export const sendMailNewProject = async (project, attachments, users) => {
    console.log("> sendMailNewProject initiated");
    const receivers = [];
    
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

    startDate = dateFormat1(startDate);
    dueDate = dateFormat1(dueDate);
    const subject = `${CNPMailSubject} - ${projectName}`;
    console.log(assignedTo);

    for (let i = 0; i < assignedTo.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if(assignedTo[i]._id === users[j]._id){
                receivers.push(users[j].email);
            }else{
                continue;
            }
        }
    }
    console.log(receivers);

    try {
        const {data} = await axios.post("/sendMailNewProject", {
            receivers : receivers,
            subject : subject,
            msgDetails : {
                projectOwner,
                projectName,
                projectDescription,
                departmentName,
                startDate,
                dueDate,
                projectState,
                assignedTo
            },
            attachments : attachments
        });
        if(data.error){
            console.log(data.error);
            console.log("> sendMailNewProject ended");
            return (data.error);
        }else{
            console.log(data);
            console.log("> sendMailNewProject ended");
        }
    } catch (error) {
        console.log(error);
        console.log("> sendMailNewProject ended");
        return(error);
    }
}

export const sendMailProjectRemoval = async (projectName, projectDeleter, assignedTo, users) => {
    console.log("> sendMailProjectRemoval initiated");
    const receivers = [];
    let projectDeleterEmail = "";
    const subject = `${RPMailSubject} - ${projectName}`;
    for (let i = 0; i < assignedTo.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if(assignedTo[i].id === users[j]._id){
                if (users[j]._id === projectDeleter) {
                    projectDeleterEmail = users[j].email;
                }
                receivers.push(users[j].email);
            }else{
                continue;
            }
        }
    }
    console.log(receivers);
    try {
        const {data} = await axios.post("/sendMailDeleteProject", {
            receivers : receivers,
            subject : subject,
            msgDetails : {
                projectName,
                projectDeleterEmail
            },
        });
        if(data.error){
            console.log(data.error);
            console.log("> sendMailProjectRemoval ended");
            return (data.error);
        }else{
            console.log(data);
            console.log("> sendMailProjectRemoval ended");
        }
    } catch (error) {
        console.log(error);
        console.log("> sendMailProjectRemoval ended");
        return(error);
    }
}