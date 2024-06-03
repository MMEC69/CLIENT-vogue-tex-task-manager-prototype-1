import axios from "axios";
import {initialDeco, processDeco} from "../MetaData/TextDecoration";
import {CNPMailSubject} from "../MetaData/MailSubject";
import { dateFormat1 } from "./Conversion";

export const sendMailNewProject = async (project, attachments) => {
    console.log(`${initialDeco}Sending Mail Intialization${initialDeco}`);
    let {
        projectOwner,
        projectName,
        projectDescription,
        departmentName,
        startDate, 
        dueDate,
        assignedTo,
        projectState } = project;
    console.log(`project object recived ${processDeco}`);
    console.log(project)
    console.log(`Project to be recived${processDeco}`);
    console.log(assignedTo);

    startDate = dateFormat1(startDate);
    dueDate = dateFormat1(dueDate);
    console.log(`Formatted dates${processDeco}`);
    console.log(`Start Date : ${startDate}${processDeco}`);
    console.log(`End Date : ${dueDate}${processDeco}`);
    console.log(`${processDeco}`);
    
    const subject = `${CNPMailSubject} - ${projectName}`;
    console.log(`project Subject - ${subject}${processDeco}`);

    try {
        const {data} = await axios.post("/sendMailNewProject", {
            reciver : assignedTo,
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
            return (data.error);
        }else{
            console.log(data);
            console.log(`Mail has been sent ${processDeco}`);
            console.log(`${initialDeco}End${initialDeco}`);
            return (`Mail has been sent ${processDeco}`);
        }
    } catch (error) {
        console.log(error);
        return(error);
    }
    
}