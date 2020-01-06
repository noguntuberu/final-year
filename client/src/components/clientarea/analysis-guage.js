import React from 'react';
import './analysis-guage.css';


const AnalysisGuage = ({title, score}) => {
    const lowScore = score <= 5 ? score + '%': '';
    const highScore = score > 5? score + '%': '';

    const innerGuageStyle = {
        borderRadius: "5px",
        padding: "2.5px 5px 0 5px",
        width: score <= 0 ? '101%' : (100 - score) + '%',

        backgroundColor: "white",
        color: "black",
        fontWeight: "bold"
    }
    return (
        <div className="analysis-guage">
            <div className="guage-info">
                <b>{title}:</b>
            </div>
            <div className="guage-wrapper">
                <div className="d-flex justify-content-between">
                    <div>Disagree</div>    
                    <div>Agree</div>    
                </div> 
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