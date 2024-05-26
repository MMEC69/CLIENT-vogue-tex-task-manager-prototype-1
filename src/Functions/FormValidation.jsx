import { 
    fullNamePattern1ErrMsg, 
    invalidPattern,
    emailPatternErrMsg,
    passwordPatternErrMsg,
    confirmPasswordErrMsg,
    projectName1ErrMsg,
    departmentName1ErrMsg,
    projectDescription1ErrMsg } from "../MetaData/FormValidationPatterns"

    export const formErrMsgHandler = (name) => {
    if(name ==="fullName"){
        return fullNamePattern1ErrMsg;
    }else if(name ==="email"){
        return emailPatternErrMsg;
    }else if(name ==="password"){
        return passwordPatternErrMsg;
    }else if(name ==="confirmPassword"){
        return confirmPasswordErrMsg;
    }else if(name ==="projectName"){
        return projectName1ErrMsg;
    }else if(name ==="departmentName"){
        return departmentName1ErrMsg;
    }else if(name ==="projectDescription"){
        return projectDescription1ErrMsg;
    }else{
        return invalidPattern;
    }
} 