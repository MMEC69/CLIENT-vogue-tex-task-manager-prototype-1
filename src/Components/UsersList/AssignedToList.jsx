import React from 'react';
import styles from "../ComponentCSS/Layout.module.css";

export default function AssignedToList(props) {
    const {
        assginedEmails
    } = props;
  return (
    <div className={styles.assignedtoList}>
        <span>Assigned To</span>
        <ul>
            {   
                assginedEmails?.map((assginedEmails) => {
                    return (
                        <li>{assginedEmails}</li>
                    );
                })
            }
        </ul>
    </div>
  )
}
