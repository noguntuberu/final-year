import React, { useState }from 'react';
import { connect } from 'react-redux';
import { updateProcessStatus } from '../../store/action-creators/process.ac';
import { uploadComment } from '../../store/action-creators/comment.ac';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentForm = props => {
    const {userId, postId, commentStatus, sendComment} = props;

    //form state
    const [commentBody, setCommentBody] = useState('');

    //
    const submitComment = () => {
        if (commentBody.length < 1) {

        } else {
            setCommentBody('');
            sendComment({userId, postId, body: commentBody});
        }
    }
    return (
        <div className="form-card comment-form">
            <form name="new_comment">
                <div className="form-group">
                    <textarea onInput={e => setCommentBody(e.target.value)} name="body" className="form-control" placeholder="Enter your comment"></textarea>
                </div>
                <div className="form-group d-flex justify-content-end">
                    <input type="button" value="Send" className="new-comment-btn" onClick={submitComment}/>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    userId : state.credential.userId,
    commentStatus: {...state.processes.comment}
})

const mapDispatchToProps = dispatch => ({
    updateCommentProcess: data => dispatch(updateProcessStatus(data)),
    sendComment: data => dispatch(uploadComment(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);