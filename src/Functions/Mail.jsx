import axios from "axios";
import {CNPMailSubject} from "../MetaData/MailSubject";
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

    for (let i = 0; i < assignedTo.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if(assignedTo[i] === users[j]){
                receivers.push(users[j].email);
            }else{
                continue
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