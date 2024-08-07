// ===============================================================
export const userFilter = (users, assignedTo) => {
    let filteredUsers = [];
    for (let i = 0; i < assignedTo.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if(assignedTo[i] === users[j]){
                filteredUsers.push(users[j].email);
            }else{
                continue;
            }
        }
    }
    console.log(filteredUsers);
}
// ===============================================================
export const userFilter2 = (users, assignedTo) => {
    let filteredUsers = [];
    for (let i = 0; i < assignedTo.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if(assignedTo[i].id === users[j]._id){
                filteredUsers.push(users[j].email);
            }else{
                continue;
            }
        }
    }
    console.log(filteredUsers);
    return filteredUsers;
}
// ===============================================================
export const userFilter3 = (users, currentUserId) => {
    console.log(users);

    const filteredUsers = users?.filter((user) => {
        return currentUserId !== user._id;
    });
    return filteredUsers;
}
// ===============================================================

