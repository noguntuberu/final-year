import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {addDraft} from '../../store/action-creators/draft.ac';
import {uploadPost } from '../../store/action-creators/post.ac';
import {updateProcessStatus} from '../../store/action-creators/process.ac';


const NewPost = props => {
    let [postTitle, setPostTitle] = useState('');
    let [postBody, setPostBody] = useState('');
    let [postAudience, setPostAudience] = useState('all');
    let [postImage, setPostImage] = useState();
    let [postImageName, setPostImageName] = useState('');
    let [formMessage, setFormMessage] = useState('');
    let [alertClass, setAlertClass] = useState('d-none');

    const {success, payload, updateUploadStatus} = props;
    useEffect(() => {
        if (payload !== formMessage) {

            if(success && alertClass === 'd-none') {
                setAlertClass('alert alert-success');
            } else {
                setAlertClass('alert alert-danger');
            }

            setFormMessage(payload);
            setTimeout(() => {
                setAlertClass('d-none');
                updateUploadStatus({
                    process: 'postUpload',
                    body: {
                        success: false,
                        payload: ''
                    }
                });
            }, 2000);
        }
    }, [alertClass, success, payload, formMessage, setFormMessage, updateUploadStatus]);

    const onChange = (type, value) => {
        switch(type) {
            case 'title':
                setPostTitle(value);
                break;
            case 'body':
                setPostBody(value);
                break;
            case 'audience':
                setPostAudience(value);
                break;
            case 'image':
                setPostImage(value);
                setPostImageName(value !== undefined && value.name ? value.name : 'Choose file...');
                break;
            default:
                break
        }

        props.saveDraft(postTitle, postBody, postImage, postAudience);
    }

    const onSubmit = (e) => {
        // prevent default action
        e.preventDefault();
        
        if (postTitle.length >= 6 && postBody.length >= 10) {
            props.uploadPost(postTitle, postBody, postImage, postAudience);
        } else {
            updateUploadStatus({
                process: 'postUpload',
                body: {
                    success: false,
                    payload: "Post Title and body can't be empty"
                }
            })
        }
    }

    return (
        <div className="card form-card">
            <form name="new_post" onSubmit = {e => onSubmit(e)}>
                <div className={alertClass} role="alert">
                    {formMessage}
                </div>
                <div className="form-group">
                    <label htmlFor="new-post-title">Title:</label>
                    <input type="text" name="title" className="form-control" id="new-post-title" aria-describedby="newPostTitleHelp" placeholder="Post Title" onInput = {e => onChange('title', e.target.value)}/>
                    <small id="newPostTitleHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group">
                    <label htmlFor="post-body">Body:</label>
                    <textarea name="body" className="form-control new-post-body" id="new-post-body" aria-describedby="newPostBodyHelp" placeholder="What would you like to say?" onInput = {e => onChange('body', e.target.value)}></textarea>
                    <small id="newPostBodyHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile" onChange={e => onChange('image', e.target.files[0])}/>
                        <label className="custom-file-label" htmlFor="customFile">{postImageName}</label>
                    </div>
                </div>
                <div className="form-group d-flex justify-content-end">
                    <select name="audience" className="audience" onChange = {e => onChange('audience', e.target.value)}>
                        <option defaultValue>Select audience</option>
                        <option value="all">All users</option>
                        <option value="emp">Only employees</option>
                        <option value="cust">Only customers</option>
                    </select>
                    <input type="submit" name="submit" value="Save" className="right new-post-btn"/>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    ...state.processes.postUpload
})

const mapDispatchToProps = dispatch => ({
    saveDraft: (title, body, image, audience) => dispatch(addDraft(title, body, image, audience)),
    uploadPost: (title, body, image, audience) => dispatch(uploadPost(title, body, image, audience)),
    updateUploadStatus: data => dispatch(updateProcessStatus(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);