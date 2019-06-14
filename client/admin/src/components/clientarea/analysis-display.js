import React from 'react';
import TextPostCard from './post-card-text';
import AnalysisItem from './analysis-item.js';

import './analysis-display.css';


const AnalysisDisplay = props => {
    return (
        <div>
            <TextPostCard />
            <div className="analysis-wrapper">
                <AnalysisItem  groupName = "Overall"/>
                <AnalysisItem  groupName = "Gender"/>
            </div>
        </div>
    )
}

export default AnalysisDisplay;