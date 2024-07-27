import React from 'react';
import styles1 from "../ComponentCSS/Layout.module.css";
import PredictionLayout from './PredictionLayout';

export default function EmployeeProductivity() {
  return (
    <div className={styles1.employeeProductivity}>
        <PredictionLayout
            button1 = "Analyze Chart"
            button2 = "Predicted Chart"
            button3 = "Other Chart"
            summary = "Sample"
        />
    </div>
  );
}
