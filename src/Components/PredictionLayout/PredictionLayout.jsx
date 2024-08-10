import React, { useState } from 'react'
import styles1 from "../ComponentCSS/Layout.module.css";
import SampleChartImg from "../Assests/sampleChart.png";
import SingleInfoBox from './SingleInfoBox';
import analysisImage from "../Assests/Prediction/WorkTraffic/projectWorkTrafficAnalysis.PNG";
import predictionImage from "../Assests/Prediction/WorkTraffic/projectWorkTrafficPredictionP1(Testing , Training).PNG"
import otherImage from "../Assests/Prediction/WorkTraffic/projectWorkTrafficAnalysisByMonth.PNG";
import analysisImageP from "../Assests/Prediction/EmployeeProductivity/projectProductivityAnalysis.PNG";
import predictionImageP from "../Assests/Prediction/EmployeeProductivity/projectProductivityTrafficPredictionP1(Testing , Training).PNG"
import otherImageP from "../Assests/Prediction/EmployeeProductivity/projectProductivityAnalysisByMonth.PNG";


export default function PredictionLayout(props) {
    const {
        button1,
        button2,
        button3,
        summary,
        predictionType
    } = props;
    console.log(summary)
    const [viewImage, setViewImage] = useState(SampleChartImg);
    const imageChanger = (e, resultImage) => {
        e.preventDefault();
        switch (predictionType) {
            case "worktraffic":
                switch (resultImage) {
                    case "analysisImage":
                        setViewImage(analysisImage);
                        break;
                    case "predictionImage":
                        setViewImage(predictionImage);
                        break;
                    case "otherImage":
                        setViewImage(otherImage);
                        break;
                    default:
                        break;
                }
                break;
            case "productivity":
                switch (resultImage) {
                    case "analysisImage":
                        setViewImage(analysisImageP);
                        break;
                    case "predictionImage":
                        setViewImage(predictionImageP);
                        break;
                    case "otherImage":
                        setViewImage(otherImageP);
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        
    }
  return (
    <div className={styles1.predictionLayout}>
        <div className={styles1.predictionButtonLayout}>
            <button onClick={(e)=> {imageChanger(e, "analysisImage")}}>
                {button1}
            </button>
            <button onClick={(e)=> {imageChanger(e, "predictionImage")}}>
                {button2}
            </button>
            <button onClick={(e)=> {imageChanger(e, "otherImage")}}>
                {button3}
            </button>
        </div>
        <div className={styles1.predictionElementsLayout}>
            <div className={styles1.predictionChart}>
                <img src={viewImage} alt="Sample Chart Image" />
            </div>
            <div className={styles1.predictionSummary}>
                <h3>Prediction Summary</h3>
                <h4>{summary.predictionSummary}</h4>
            </div>
        </div>
        <div className={styles1.predictionInfoLayout}>
            <div className={styles1.singleInfoLayout}>
                <SingleInfoBox
                    topic = {summary.topic1.topic}
                    description = {summary.topic1.description}
                />
                <SingleInfoBox
                    topic = {summary.topic2.topic}
                    description = {summary.topic2.description}
                />
                <SingleInfoBox
                    topic = {summary.topic3.topic}
                    description = {summary.topic1.description}
                />
                <SingleInfoBox
                    topic = {summary.topic4.topic}
                    description = {summary.topic4.description}
                />
            </div>
        </div>
    </div>
  )
}
