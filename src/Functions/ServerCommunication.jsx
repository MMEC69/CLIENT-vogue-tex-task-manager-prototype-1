import axios from "axios";
import toast from 'react-hot-toast';


//send attachments--------------------------------------------------Function
export const uploadAttachments = async(files) => {
    console.log("> uploadAttachments initatied");
    try {
        const formData = new FormData();
        for (let index = 0; index < files.length; index++){
            let file = files[index];
            formData.append("files", file);
        }
        try {
            const {data} = await axios.post(`/uploadProjectAttachments`, formData);
            if (data.error){
                toast.error(data.error);
            }else{
                console.log(data);
                console.log("> uploadAttachments ended");
                return data;
            }
        } catch (error) {
            console.log(error);
            console.log("> uploadAttachments ended");
            return [];
        }
    } catch (error) {
        console.log(error);
        console.log("> uploadAttachments ended");
        return [];
    }
}

//update db to server--------------------------------------------------Function
export const updateServerAttachments = async (fileInfo, projectName,user) => {
    console.log("> updateServerAttachments initatied");
    const {
        id
    } = user
    try {
        const project = {attachments: fileInfo};
        const {data} = await axios.put(`/modifyProjectByName/${projectName}`, {
            id,
            project
        });
        if(data.error){
            console.log(data.error);
            console.log("> updateServerAttachments Ended");
            return data.error;
        }else{
            console.log(data);
            console.log("> updateServerAttachments Ended");
            return data;
        }
    } catch (error) {
        console.log(error);
        console.log("> updateServerAttachments Ended");
        return error;
    }
}
// ============================================================
export const getProjects = async(setDisplayProjects) => {
    console.log("> getProjects initiated");
    const {data} = await axios.get("/projects");
    if(data.error){
        console.log("> getProjects Ended");
        return data.error;
    }else{
        console.log("> getProjects Ended");
        setDisplayProjects(data);
    }
}
// ============================================================
export const getComments = async(_id) => {
    console.log("> getComments initiated");
    const {data} = await axios.get(`/comments/${_id}`);
    if(data.error){
        console.log("> getComments Ended");
        return data.error;
    }else{
        console.log("> getComments Ended");
        return (data);
    }
}

