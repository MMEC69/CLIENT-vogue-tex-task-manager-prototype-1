import React from 'react';
import PredictionLayout from "./PredictionLayout";
import styles1 from "../ComponentCSS/Layout.module.css";

export default function WorkTraffic() {
  return (
    <div className={styles1.workTraffic}>
        <PredictionLayout
            button1 = "Analyze Chart"
            button2 = "Predicted Chart"
            button3 = "Other Chart"
            summary = "Sample"
        />
    </div>
  );
}
