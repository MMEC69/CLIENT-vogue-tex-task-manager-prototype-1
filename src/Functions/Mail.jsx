import axios from "axios";
import {initialDeco, processDeco} from "../MetaData/TextDecoration";
import {CNPMailSubject} from "../MetaData/MailSubject";
import { dateFormat1 } from "./Conversion";

export const sendMailNewProject = async (project, attachments, users) => {
    console.log("> sendMailNewProject initiated");
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
    const receivers = assignedTo.map((receiver) => {
        const reciversObjs = users.filter((user) => {
            return user._id = receiver.id
        });
        return {
            email: reciversObjs[0].email
        }
    });
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