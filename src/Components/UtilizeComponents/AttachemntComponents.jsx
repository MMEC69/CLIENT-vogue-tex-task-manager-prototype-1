import {devServerURL} from "../../MetaData/MetaData";

export const AttachmentWindow = (props) => {
    const {
        attachments
    } = props;

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

    return(
        <div>
            <button onClick={downloadAttachments}>Attachments</button>
        </div>
    );
} 