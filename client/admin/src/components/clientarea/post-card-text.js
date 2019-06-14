/** */
import React from 'react';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Comment from '@material-ui/icons/Comment';
import Visibility from '@material-ui/icons/Visibility';


import 'bootstrap/dist/css/bootstrap.min.css';

const TextPostCard = props => {

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">This is a Plain Post Card</h3>
                <p className="card-text">
                    This About component will be reused across the entire section. The location will tell
                    the app which subsection to render. For exa...
                </p>
                <div className="card-actions d-flex justify-content-start">
                    <div className="post-action-group">
                       <div ><Visibility /> </div>
                       <div className="stat-count">{"401k"}</div>
                    </div>
                    <div className="post-action-group">
                       <div><ThumbUp /></div> 
                       <div className="stat-count">{"60k"}</div>
                    </div>
                    <div className="post-action-group">
                       <div><ThumbDown /> </div>
                       <div className="stat-count">{"2k"}</div>
                    </div>
                    <div className="post-action-group">
                       <div><Comment /></div>
                       <div className="stat-count">{"200"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextPostCard;