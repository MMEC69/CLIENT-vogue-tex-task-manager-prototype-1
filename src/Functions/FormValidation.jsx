import { 
    fullNamePattern1ErrMsg, 
    invalidPattern,
    emailPatternErrMsg,
    passwordPatternErrMsg,
    confirmPasswordErrMsg } from "../MetaData/FormValidationPatterns"

    export const formErrMsgHandler = (name) => {
    if(name ==="fullName"){
        return fullNamePattern1ErrMsg;
    }else if(name ==="email"){
        return emailPatternErrMsg;
    }else if(name ==="password"){
        return passwordPatternErrMsg;
    }else if(name ==="confirmPassword"){
        return confirmPasswordErrMsg;
    }
    else{
        return invalidPattern;
    }
} 