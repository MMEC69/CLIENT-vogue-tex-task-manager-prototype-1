import { useState } from "react";
import {devServerURL} from "../../MetaData/MetaData";
import { AttachmentPopup } from "../AttachmentList/AttachmentPopup";
import styles from "../ComponentCSS/ComponentCSS.module.css";

export const AttachmentWindow = (props) => {
    const {
        attachments
    } = props;

    const [trigger1, setTrigger1] = useState(false);
    // ===========================================================
    //need adjustment to download all the files
    //Suggestion sned the project name -> use mongo to find attachment paths -> make a zip -> save it -> send it -> delete it from server
    const downloadAttachments = async (e) => {
        e.preventDefault();
        await Promise.all (attachments?.map((attachment) => {
            const url = `${devServerURL}/downloadAttachments/${attachment.filename}`;
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute('download', attachment.originalname);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log(`File downloaded ${attachment.filename}`);
        }));
    } 
    // ===========================================================
    const downloadAttachment = async (e, attachment) => {
        e.preventDefault();
        console.log(`> downloadAttachment initiated`);
        try {
            const url = `${devServerURL}/downloadAttachments/${attachment.filename}`;
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute('download', attachment.originalname);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log(`File downloaded ${attachment.filename}`);
            console.log(`> downloadAttachment ended`);
        } catch (error) {
            console.log(error);
            console.log(`> downloadAttachment ended`);
        }
    } 
    // ===========================================================
    return(
        <div>
            <button 
                className = {styles.attachmentButton}
                onClick={(e) => {
                    e.preventDefault();
                    setTrigger1(true);
            }}>
                Attachments
            </button>
            <AttachmentPopup
                trigger = {trigger1}
                setTrigger = {setTrigger1}
                downloadAttachment = {downloadAttachment}
                attachments = {attachments}
            />
        </div>
    );
} 