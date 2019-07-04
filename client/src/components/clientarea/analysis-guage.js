import React from 'react';
import './analysis-guage.css';


const AnalysisGuage = ({title, score}) => {
    const lowScore = score <= 5 ? score + '%': '';
    const highScore = score > 5? score + '%': '';

    const innerGuageStyle = {
        borderRadius: "5px",
        padding: "2.5px 5px 0 5px",
        width: score <= 0? '101%' : (100 - score) + '%',

        backgroundColor: score <= 0 ? "red" : "white",
        color: score <= 0 ? "white" : "black",
        fontWeight: "bold"
    }
    return (
        <div className="analysis-guage">
            <div className="guage-info">
                {title}:
            </div>
            <div className="guage-wrapper">
                <div className="d-flex justify-content-end guage-outer-bar">
                    {highScore}
                    <div className="guage-inner-bar h-flex" style={innerGuageStyle}>
                        {lowScore}
                    </div>
                </div>
            </div>
        </div>
    )
};  

export default AnalysisGuage;