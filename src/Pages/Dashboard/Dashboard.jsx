import React from 'react';
import { Navbar } from "../../Components/Navbar/Navbar";
import { LeftMenu } from '../../Components/LeftMenu/LeftMenu';
import Content from '../../Components/Content/Content';
import styles from "../../Components/ComponentCSS/Layout.module.css";

export default function Dashboard() {
  return (
    <div>
        <div className={styles.navbarLayout}>
          <Navbar/>
        </div>
        <div className={styles.leftMenuLayout}>
          <LeftMenu />
        </div>
        <div className={styles.contentLayout}>
          <Content />
        </div>
        
        
        
    </div>
  )
}
