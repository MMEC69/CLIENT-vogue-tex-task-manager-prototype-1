import React from 'react';
import styles from "../ComponentCSS/AboutUs.module.css";
import {
  vogueTexDetails,
  softwareDetails,
  developerDetails
} from "../../MetaData/AboutPageDetails";

export default function AboutUs() {

    return (
        <div className={styles.aboutUsContainer}>
          <section className={styles.aboutVogeTex}>
            <h2 className = {styles.topic1}>{vogueTexDetails.topic1}</h2>
            <p className = {styles.description1}>
              {vogueTexDetails.description1}
            </p>
            <p className = {styles.description1}>
              {vogueTexDetails.description2}
            </p>
            <p className = {styles.description1}>
              {vogueTexDetails.description3}
            </p>
          </section>
    
          <section className={styles.missionVision}>
            <h2 className = {styles.topic1}>{vogueTexDetails.topic2}</h2>
            <div className={styles.Mission}>
              <h3 className = {styles.topic2} >{vogueTexDetails.topic3}</h3>
              <p className = {styles.description1}>
                {vogueTexDetails.description4}
              </p>
            </div>
            <div className={styles.vision}>
              <h3 className = {styles.topic2}>{vogueTexDetails.topic4}</h3>
              <p className = {styles.description1}>
                {vogueTexDetails.description5}
              </p>
            </div>
          </section>

          <section className={styles.software}>
            <h2 className = {styles.topic1}>{softwareDetails.topic1}</h2>
            <p className = {styles.description1}>
              {softwareDetails.description1}
            </p>
          </section>
    
          <section className={styles.aboutDevelopers}>
            <h2 className = {styles.topic1}>{developerDetails.topic1}</h2>
            <p className = {styles.description1}>
              {developerDetails.description1}
            </p>
          </section>
        </div>
      );
}
