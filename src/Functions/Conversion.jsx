import moment from 'moment';
import {userRoles} from "../MetaData/MetaData";

export const dateExtractor = (date) => {
    const ConvertedDate = new Date(date);
    
    //for obj
    let year = ConvertedDate.getFullYear().toString();
    let month = ConvertedDate.getMonth().toString();
    let day = ConvertedDate.getDay().toString();

    if(month.length<2){
        month = `0${month}`;
    }
    if(day.length<2){
        day = `0${day}`
    }

    const convertedDateObj = {
        year: year,
        month: month,
        day: day
    }

    return convertedDateObj;
}

export const dateFormat1 = (date) =>{
    let fDate = moment(date).format('YYYY-MM-DD');
    return (fDate);
}
// ===================================================
export const userRoleDividerCP = (projectOwner, assignedUsers) =>{
    let role = filterSuperAdmin(userRoles);
    console.log(role);
    projectOwner.type = role;

    role = filterUser(userRoles);
    const roledAssignedUsers = assignedUsers.map((assignedUser) => {
        assignedUser.type = role;
        return assignedUser;
    });
    return [projectOwner, ...roledAssignedUsers];
}

export const projectOwnerFilter = (projectOwner, users) => {
    let filteredUsers = users.filter((assignUser) => {
        return assignUser.email !== projectOwner.email;
    });
    return filteredUsers
}
// ======================================================
export const filterSuperAdmin = (userRoles) => {
    const superAdmin = userRoles.filter((userRole) => {
        const {role} = userRole;
        return role === "Super Admin";
    });
    return superAdmin[0].role;
}

export const filterUser = (userRoles) => {
    const user = userRoles.filter((userRole) => {
        const {role} = userRole;
        return role === "User";
    });
    return user[0].role;
}