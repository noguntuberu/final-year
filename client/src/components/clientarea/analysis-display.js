import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TextPostCard from './post-card-text';
import AnalysisItem from './analysis-item.js';
import { loadPostAnalysis } from '../../store/action-creators/post-analysis.ac';

import './analysis-display.css';


const AnalysisDisplay = props => {
    const id = props.match.params.id;
    const { postAnalysis, groupAnalysis, loadAnalysis } = props;


    useEffect(() => {
        loadAnalysis(id)
    }, [id, loadAnalysis])


    const extractAnalysisItems = (id, bundle) => {
        let extractedItems = [];
        for (const groupName in bundle[id]) {
            extractedItems = [
                ...extractedItems,
                <AnalysisItem analysisData = {{
                    groupName,
                    data : bundle[id]
                }} key={groupName} />
            ]
        }

        return extractedItems;
    }
    return (
        <div>
            <TextPostCard postData={props.posts[id]}/>
            <div className="analysis-wrapper">
                <AnalysisItem analysisData = {
                    {
                        groupName: "Overall", 
                        data: {
                            title: "All users",
                            score: postAnalysis[id]
                        }
                    }
                } key = "overallStat"/>
                {extractAnalysisItems(id, groupAnalysis)}
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    posts : { ...state.posts },
    postAnalysis : { ...state.postAnalysis },
    groupAnalysis: {...state.groupAnalysis}
})

const mapDispatchToProps = dispatch => ({
    loadAnalysis : postId => dispatch(loadPostAnalysis(postId))
})
export default connect(mapStateToProps, mapDispatchToProps)(AnalysisDisplay);