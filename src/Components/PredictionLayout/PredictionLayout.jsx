import React, { useState } from 'react'
import styles1 from "../ComponentCSS/Layout.module.css";
import SampleChartImg from "../Assests/sampleChart.png";
import SingleInfoBox from './SingleInfoBox';
import analysisImage from "../Assests/Prediction/WorkTraffic/projectWorkTrafficAnalysis.PNG";
import predictionImage from "../Assests/Prediction/WorkTraffic/projectWorkTrafficPredictionP1(Testing , Training).PNG"
import otherImage from "../Assests/Prediction/WorkTraffic/projectWorkTrafficAnalysisByMonth.PNG";

export default function PredictionLayout(props) {
    const {
        button1,
        button2,
        button3,
        summary
    } = props;
    const [viewImage, setViewImage] = useState(SampleChartImg);
    const imageChanger = (e, resultImage) => {
        e.preventDefault();
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
                <h4>{summary}</h4>
            </div>
        </div>
        <div className={styles1.predictionInfoLayout}>
            <div className={styles1.singleInfoLayout}>
                <SingleInfoBox
                    topic = "Topic 1"
                    description = "Sample Description"
                />
                <SingleInfoBox
                    topic = "Topic 1"
                    description = "Sample Description"
                />
                <SingleInfoBox
                    topic = "Topic 1"
                    description = "Sample Description"
                />
                <SingleInfoBox
                    topic = "Topic 1"
                    description = "Sample Description"
                />
            </div>
        </div>
    </div>
  )
}
