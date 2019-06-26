import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CommentItem from './comment-item';
import CommentForm from './comment-form';

import { loadComments } from '../../store/action-creators/comment.ac';


const CommentList = props => {
    const {comments, postId, loadPostComments } = props;
    const [commentList, setCommentList] = useState(comments[postId]);

    useEffect(() => {
        loadPostComments(postId)
    }, [postId, loadPostComments])

    const loadCommentList = list => {
        
    }
    return (
        <div className="card comment-list">
            <h3> Comments </h3>
            <div>
                <CommentItem />
            </div>
            <CommentForm />
        </div>
    )
}

const mapStateToProps = state => ({
    comments: state.comments
})

const mapDispatchToProps = dispatch => ({
    loadPostComments: postId => dispatch(loadComments(postId))
})
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);