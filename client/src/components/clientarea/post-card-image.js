import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Comment from '@material-ui/icons/Comment';
import Visibility from '@material-ui/icons/Visibility';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client-area.css';

import { updateUserAction } from '../../store/action-creators/user-action.ac';


const ImagePostCard = props => {
    const {userId, postPath, postData, actionStat, dispatchAction} = props;
    const {postId, title, mediaUri, body, viewCount, likeCount, dislikeCount, commentCount} = postData;
    const postUri = `/${postPath}/${postId}`;

    const getPostActionStat = () => {
        if (actionStat[postId] === undefined) {
            return {
                userId, postId, like: false, dislike: false
            }
        }

        return actionStat[postId];
    }

    const likePost = () => {
        console.log('like')
        const action = getPostActionStat();
        const {like, dislike} = action;
        if (like === false) {
            if (dislike) {
                dispatchAction({
                    ...action,
                    like: 1,
                    dislike: -1
                })
            } else {
                dispatchAction({
                    ...action,
                    like: 1, 
                    dislike: 0
                })
            }
        } else {
            dispatchAction({
                ...action,
                like: -1,
                dislike: 0
            })
        }
    }

    const dislikePost = () => {
        console.log('dislike');
        const action = getPostActionStat();
        const {like, dislike} = action;
        if (dislike === false) {
            if (like) {
                dispatchAction({
                    userId,
                    postId,
                    like: -1,
                    dislike: 1
                })
            } else {
                dispatchAction({
                    userId, 
                    postId, 
                    like: 0, 
                    dislike: 1
                })
            }
        } else {
            dispatchAction({
                ...action,
                like: 0,
                dislike: -1
            })
        }
    }

    return (
        <div className="card">
            <img src={'/uploads/'+mediaUri} className="card-img-top" alt="" />
            <div className="card-body">
                <h3 className="card-title"><NavLink to={postUri}>{title}</NavLink></h3>
                <p className="card-text">
                    {body.substring(0, 200) + '...'}
                </p>
                <div className="card-actions d-flex justify-content-start">
                    <div className="post-action-group">
                       <div ><Visibility /> </div>
                       <div className="stat-count">{viewCount}</div>
                    </div>
                    <div className="post-action-group">
                       <div onClick={likePost} ><ThumbUp /></div> 
                       <div className="stat-count">{likeCount}</div>
                    </div>
                    <div className="post-action-group">
                       <div><ThumbDown onClick={dislikePost}/> </div>
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


const mapStateToProps = state => ({
    userId: state.credential.userId,
    actionStat: state.userAction
})

const mapDispatchToProps = dispatch => ({
    dispatchAction : data => dispatch(updateUserAction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ImagePostCard);