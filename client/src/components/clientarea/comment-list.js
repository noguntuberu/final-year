import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CommentItem from './comment-item';
import CommentForm from './comment-form';

import { loadComments } from '../../store/action-creators/comment.ac';


const CommentList = props => {
    const {comments, postId, loadPostComments } = props;

    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        loadPostComments(postId)
    }, [postId, loadPostComments]);

    useEffect(() => {
        setCommentList(loadCommentList(comments[postId]))
    }, [postId, comments, setCommentList]);

    const loadCommentList = list => {
        let loadedComments = [];
        for (const commentId in list) {
            loadedComments = [
                ...loadedComments,
                <CommentItem commentData={list[commentId]} key={commentId} />
            ]
        }
        return loadedComments;
    }
    return (
        <div className="card comment-list">
            <h3> Comments</h3>
            <div>
                {commentList}
            </div>
            <CommentForm postId={postId}/>
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