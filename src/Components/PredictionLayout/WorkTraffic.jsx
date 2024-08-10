import React from 'react';
import PredictionLayout from "./PredictionLayout";
import styles1 from "../ComponentCSS/Layout.module.css";
import toast from 'react-hot-toast';
import axios from 'axios';

export default function WorkTraffic() {
  const summary = {
    topic1: {topic: "Best months to take vacations", description: "January, Feburary, March, Novmeber and October are least busy"},
    topic2: {topic: "Worst months to take vacations", description: "August is the most busy month"},
    topic3: {topic: "Worst months to take vacations", description: "June, July, November and Decmeber is mildly busy"},
    topic4: {topic: "Worst months to take vacations", description: "January is the best month for vacations"},
    predictionSummary: `January is the best month to take vacations and the August is the worst month
    to take vacations Decmeber is mildly busy and taking vacations is okay for the seasonal holidays.`
  }

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
            summary = {summary}
            predictionType = "worktraffic"
        />
    </div>
  );
}
