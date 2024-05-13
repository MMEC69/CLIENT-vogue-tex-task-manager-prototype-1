import {options} from "../MetaData/MetaData";

export function projectStateForCP(startDate) {
    const today = new Date();
    if(startDate > today){
        return "inactive";
    }
    else{
        return "active";
    }

}
