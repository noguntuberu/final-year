import React from 'react';
import './analysis-guage.css';


const AnalysisGuage = ({title, score}) => {
    score = score <= 0 ? 101: 100 - score;
    const innerGuageStyle = {
        borderRadius: "5px",
        padding: "2.5px 5px 0 5px",
        width: score + "%",

        backgroundColor: score === 101? "red" : "white",
        color: score === 101? "white" : "black",
        fontWeight: "bold"
    }
    return (
        <div className="analysis-guage">
            <div className="guage-info">
                {title}:
            </div>
            <div className="guage-wrapper">
                <div className="d-flex justify-content-end guage-outer-bar">
                    <div className="guage-inner-bar h-flex" style={innerGuageStyle}>
                        {score === 101? 0 : Math.round(100 - score) } %
                    </div>
                </div>
            </div>
        </div>
    )
};  

export default AnalysisGuage;