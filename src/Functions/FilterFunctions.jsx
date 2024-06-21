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

