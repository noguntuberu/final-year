import React from 'react';
import './analysis-guage.css';


const AnalysisGuage = ({title, population, score}) => {
    const innerGuageStyle = {
        width: score + "%"
    }
    return (
        <div className="analysis-guage">
            <div className="guage-info">
                {title} ({population}):
            </div>
            <div className="guage-wrapper">
                <div className="d-flex justify-content-end guage-outer-bar">
                    <div className="guage-inner-bar" style={innerGuageStyle}>

                    </div>
                </div>
            </div>
        </div>
    )
};  

export default AnalysisGuage;