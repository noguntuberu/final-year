import React from 'react';
import {NavLink} from 'react-router-dom';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Comment from '@material-ui/icons/Comment';
import Visibility from '@material-ui/icons/Visibility';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client-area.css';


const ImagePostCard = props => {
    const {_id, title, mediaUri, body, viewCount, likeCount, dislikeCount, commentCount} = props.postData;
    
    return (
        <div className="card">
            <img src={mediaUri} className="card-img-top" alt="" />
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

export default ImagePostCard;