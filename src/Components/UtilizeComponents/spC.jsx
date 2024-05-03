import React from 'react';
import styles from "../ComponentCSS/ComponentCSS.module.css";

export const BigH = (props) => {
  const {pn} = props; 
  return (
    <div className={styles.bigH}>
        <p>{pn}</p>
    </div>
  )
}

export const BigHG = (props) => {
  const {pn} = props; 
  return (
    <div className={styles.bigHG}>
        <p>{pn}</p>
    </div>
  )
}

export const MidH = (props) => {
  const {sd, dd} = props; 
  return (
    <div className={styles.midH}>
        <p>{sd} to {dd}</p>
    </div>
  )
}

export const MidHG = (props) => {
  const {s} = props; 
  return (
    <div className={styles.midHG}>
        <p>{s}</p>
    </div>
  )
}

export const LH = (props) => {
  const {s} = props; 
  return (
    <div className={styles.LH}>
        <p>{s}</p>
    </div>
  )
}

export const OB = (props) => {
  const {c, f} = props; 
  return (
    <div className={styles.OB}>
        <button onClick={f}>{c}</button>
    </div>
  )
}



