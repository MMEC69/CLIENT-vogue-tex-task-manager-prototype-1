import React from 'react'
import styles1 from "../ComponentCSS/Layout.module.css";
import SampleChartImg from "../Assests/sampleChart.png";
import SingleInfoBox from './SingleInfoBox';

export default function PredictionLayout(props) {
    const {
        button1,
        button2,
        button3,
        summary
    } = props;
  return (
    <div className={styles1.predictionLayout}>
        <div className={styles1.predictionButtonLayout}>
            <button>
                {button1}
            </button>
            <button>
                {button2}
            </button>
            <button>
                {button3}
            </button>
        </div>
        <div className={styles1.predictionElementsLayout}>
            <div className={styles1.predictionChart}>
                <img src={SampleChartImg} alt="Sample Chart Image" />
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
