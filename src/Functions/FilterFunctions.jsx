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
    return filteredUsers;
}
// ===============================================================
export const userFilter3 = (users, currentUserId) => {
    const filteredUsers = users?.filter((user) => {
        return currentUserId !== user._id;
    });
    return filteredUsers;
}
// ===============================================================
export const userFilter4 = (offlineUsers, users) => {
    let filteredUsers = [];
    for (let i = 0; i < offlineUsers.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if(offlineUsers[i] === users[j]._id){
                filteredUsers.push(users[j]);
                break;
            }else{
                continue;
            }
        }
        continue;
    }
    return filteredUsers;
}
// ===============================================================
export const userFilter5 = (users, currentUserId, oldChatUsers) => {
    const filteredUsers = users?.filter((user) => {
        return currentUserId !== user._id;
    });

    //receiver from conversations are always the second one according to DB
    //Hence oldChatUsers[i].memebrs[1],
    let newConversationsToBeMade = [];
    for (let i = 0; i < filteredUsers.length; i++) {
        let count = 0;
        for (let j = 0; j < oldChatUsers.length; j++) {
            const pastReceiver = oldChatUsers[j].members[1];
            if (filteredUsers[i]._id === pastReceiver) {
                break;
            }
            count+=1;
        }
        if(count === oldChatUsers.length){
            newConversationsToBeMade.push(filteredUsers[i]);
        }
    }
    return newConversationsToBeMade;
}
// ===============================================================
export const userFilter6 = (users, assigner) => {
    const taskAssigner = users.filter((user) => {
        return ( user._id === assigner);
    });

    return taskAssigner[0].email;
}