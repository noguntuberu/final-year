import React from 'react';


const CommentItem = props => {
    const {_id, userName, body} = props.commentData;

    return (
        <div className="comment-item">
            <div className="comment-item-img">
                
            </div>
            <div className="comment-item-body">
                <h5> {userName} </h5>
                <p>{body}</p>
            </div>
        </div>
    )
}

export default CommentItem;