import React from 'react'
import styles1 from "../ComponentCSS/Layout.module.css";

export default function SingleInfoBox(props) {
    const {
        topic,
        description
    } = props;
  return (
    <div className={styles1.singleInfoBox}>
        <h4>{topic}</h4>
        <h5>{description}</h5>
    </div>
  );
}
