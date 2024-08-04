import React from 'react';
import PredictionLayout from "./PredictionLayout";
import styles1 from "../ComponentCSS/Layout.module.css";
import toast from 'react-hot-toast';
import axios from 'axios';

export default function WorkTraffic() {

  const requestFile = async (e, requestFile) => {
    e.preventDefault();
    console.log("> requestAnalyzeFile initiated");
    try {
      const { data } = await axios.get(`/prediction/workTraffic/requestFile/:${requestFile}`);
      if(data.error){
        console.log(data.error);
        console.log("> requestAnalyzeFile Ended");
        toast.error(data.error);
      } else {
        console.log("> requestAnalyzeFile ended");
        toast.success("Request Done");
      }
    } catch (error) {
      console.log(error);
      console.log("> requestAnalyzeFile ended");
      toast.error("Server Error");
    }
  }
  return (
    <div className={styles1.workTraffic}>
        <PredictionLayout
            button1 = "Analyze Chart"
            button1F = {(e) => {requestFile(e, "analyzeChart")}}
            button2 = "Predicted Chart"
            button2F = {(e) => {requestFile(e, "predictedChart")}}
            button3 = "Other Chart"
            button3F = {(e) => {requestFile(e, "otherChart")}}
            summary = "Sample"
        />
    </div>
  );
}
