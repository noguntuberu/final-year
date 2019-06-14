import React from 'react';
import AnalysisGuage from './analysis-guage';


const AnalysisItem= ({groupName, groupItems}) => {
    return (
        <div className="card analysis-wrapper">
            <h5> {groupName} Analysis</h5>
            <AnalysisGuage title="Male" population={3600} score={41}/>
        </div>
    )
}

export default AnalysisItem;