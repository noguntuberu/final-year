import React from 'react';


const CommentItem = ({id}) => {
    return (
        <div className="comment-item">
            <div className="comment-item-img">
                {id}
            </div>
            <div className="comment-item-body">
                <h5> Matt D. Hummels </h5>
                <p>I don't think that's a good cup of coffee!</p>
            </div>
        </div>
    )
}

export default CommentItem;