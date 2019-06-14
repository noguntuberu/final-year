import React from 'react';


const NewPost = props => {
    return (
        <div className="card form-card">
            <form name="new_post">
                <div className="form-group">
                    <label for="new-post-title">Title:</label>
                    <input type="text" name="title" className="form-control" id="new-post-title" aria-describedby="newPostTitleHelp" placeholder="Post Title"/>
                    <small id="newPostTitleHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group">
                    <label for="post-body">Body:</label>
                    <textarea name="body" className="form-control new-post-body" id="new-post-body" aria-describedby="newPostBodyHelp" placeholder="What would you like to say?"></textarea>
                    <small id="newPostBodyHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group">
                    <label for="new-post-image" id="media-upload-label"> Select Image (optional)</label>
                    <input type="file" id="new-post-image" name="image"aria-describedby="newPostImageHelp"/>
                </div>
                <div className="form-group d-flex justify-content-end">
                    <select name="audience" className="audience">
                        <option selected>Select audience</option>
                        <option value="all">All users</option>
                        <option value="emp">Only employees</option>
                        <option value="cust">Only customers</option>
                    </select>
                    <input type="button" name="submit" value="Save" className="right new-post-btn"/>
                </div>
            </form>
        </div>
    )
}

export default NewPost;