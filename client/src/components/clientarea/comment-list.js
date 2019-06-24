import React from 'react';
import CommentItem from './comment-item';
import CommentForm from './comment-form';


const CommentList = props => {
    return (
        <div className="card comment-list">
            <h3> Comments </h3>
            <div>
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </div>
            <CommentForm />
        </div>
    )
}

export default CommentList;