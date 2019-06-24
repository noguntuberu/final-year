import React from 'react';
import AnalysisGuage from './analysis-guage';


const AnalysisItem= props => {
    const {groupName, data} = props.analysisData;

    const extractGroupAnalysisItems = bundle => {
        let extractedBundle = [];
        for (const groupName in bundle) {
            const groupItems = bundle[groupName]; 
            for(const className in groupItems) {
                extractedBundle = [
                    ...extractedBundle,
                    <AnalysisGuage title = {className} score={groupItems[className]} key={className} />
                ]
            }
        }

        return extractedBundle;
    }
    return (
        <div className="card analysis-wrapper">
            { <h5> {groupName} Analysis</h5> }
            {groupName === 'Overall'? <AnalysisGuage title={data.title} score={data.score} key={data.title}/> : extractGroupAnalysisItems(data)}
        </div>
    )
}

export default AnalysisItem;