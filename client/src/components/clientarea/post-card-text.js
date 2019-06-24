/** */
import React from 'react';
import {NavLink} from 'react-router-dom';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Comment from '@material-ui/icons/Comment';
import Visibility from '@material-ui/icons/Visibility';


import 'bootstrap/dist/css/bootstrap.min.css';

const TextPostCard = ({postData}) => {
    
    const {_id, title, body, viewCount, likeCount, dislikeCount, commentCount} = postData;
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title"><NavLink to={`/admin/account/post/analysis/${_id}`}>{title}</NavLink></h3>
                <p className="card-text">
                    {body.substring(0, 200) + '...'}
                </p>
                <div className="card-actions d-flex justify-content-start">
                    <div className="post-action-group">
                       <div ><Visibility /> </div>
                       <div className="stat-count">{viewCount}</div>
                    </div>
                    <div className="post-action-group">
                       <div><ThumbUp /></div> 
                       <div className="stat-count">{likeCount}</div>
                    </div>
                    <div className="post-action-group">
                       <div><ThumbDown /> </div>
                       <div className="stat-count">{dislikeCount}</div>
                    </div>
                    <div className="post-action-group">
                       <div><Comment /></div>
                       <div className="stat-count">{commentCount}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextPostCard;