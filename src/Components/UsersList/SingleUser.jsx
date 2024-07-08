import React from 'react';
import styles from "../ComponentCSS/UserList.module.css";

export default function SingleUser(props) { 
    const {
        userDetails
    } = props;
    const {
        fullName,
        email
    } = userDetails;
    
    return (
    <div className={styles.singleUserLayout}>
        <div className={styles.singleDetails}> 
            <h2 className={styles.singleUserName}>{fullName}</h2>
            <h3 className={styles.singleUserEmail}>{email}</h3>
        </div>
        <div className={styles.singleUserButtons}>
            <button className={styles.singleUserViewProjectBtn}>View Projects</button>
            <button className={styles.singleUserRemoveUser}>Remove User</button>
        </div>
    </div>
    );
}
