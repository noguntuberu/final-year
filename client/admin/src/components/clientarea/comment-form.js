import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentForm = () => {

    return (
        <div className="form-card comment-form">
            <form name="new_comment">
                <div className="form-group">
                    <textarea name="body" className="form-control" placeholder="Enter your comment"></textarea>
                </div>
                <div className="form-group d-flex justify-content-end">
                    <input type="button" name="submit" value="Send" className="new-comment-btn"/>
                </div>
            </form>
        </div>
    )
}

export default CommentForm;