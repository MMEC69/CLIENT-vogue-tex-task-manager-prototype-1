import React, { useContext } from 'react'
import styles from "../ComponentCSS/Layout.module.css";
import SingleUser from "./SingleUser";
import { UserContext } from '../../Context/UserContex';

export default function UserList() {
    const {users, project} = useContext(UserContext);
    const {
        fullName,
        email
    } = users;
    const {
        projectName,
        assignedTo
    } = project;
    
  return (
    <div className={styles.content}>
        {
            users?.map((singleUser) => {
                return <SingleUser userDetails = {singleUser}/>
            })
        }
    </div>
  )
}
