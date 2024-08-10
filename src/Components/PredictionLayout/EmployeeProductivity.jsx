import React from 'react';
import styles1 from "../ComponentCSS/Layout.module.css";
import PredictionLayout from './PredictionLayout';
import toast from 'react-hot-toast';
import axios from 'axios';


export default function EmployeeProductivity() {
  const summary = {
    topic1: {topic: "Most productive months", description: "May, November, August, and September are the most productive"},
    topic2: {topic: "Least productive months", description: "January, February and March are the least productive months"},
    topic3: {topic: "Most successful month", description: "November is the most sucessful month"},
    topic4: {topic: "Most unsuccessful month", description: "January is the least sucessful month"},
    predictionSummary: `November is the most productive month and the least productive month is January, more projects
    should have assgined on january to due to increase the productivity`
  }
  const requestFile = async (e, requestFile) => {
    e.preventDefault();
    console.log("> requestAnalyzeFile initiated");
    try {
      const { data } = await axios.get(`/prediction/employeeProductivity/requestFile/:${requestFile}`);
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
    <div className={styles1.employeeProductivity}>
        <PredictionLayout
            button1 = "Analyze Chart"
            button1F = {(e) => {requestFile(e, "analyzeChart")}}
            button2 = "Predicted Chart"
            button2F = {(e) => {requestFile(e, "predictedChart")}}
            button3 = "Other Chart"
            button3F = {(e) => {requestFile(e, "otherChart")}}
            summary = {summary}
            predictionType = "productivity"
        />
    </div>
  );
}
