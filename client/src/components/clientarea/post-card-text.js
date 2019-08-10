/** */
import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Comment from '@material-ui/icons/Comment';
import Visibility from '@material-ui/icons/Visibility';
import { activeIcon, inactiveIcon } from './post-card-style';
import { updateUserAction } from '../../store/action-creators/user-action.ac';


import 'bootstrap/dist/css/bootstrap.min.css';

const TextPostCard = props => {

    const {userId, postPath, postData, actionStat, dispatchAction} = props;
    const {postId, title, body, viewCount, likeCount, dislikeCount, commentCount} = postData;
    const postUri = `/${postPath}/${postId}`;

    const [action, setAction] = useState({userId, postId});
    const [likeIconStyle, setLikeIconStyle] = useState(inactiveIcon);
    const [dislikeIconStyle, setDislikeIconStyle] = useState(inactiveIcon);
    useEffect(() => {
        if (actionStat[postId] === undefined) {
            setAction({
                ...action, like: false, dislike: false
            })
        } else if (actionStat[postId] !== undefined && action.like === undefined){
            setAction({
                ...action, ...actionStat[postId]
            });
        }
    },[action, actionStat, postId])

    useEffect(() => {
        if (action && action.like) {
            setLikeIconStyle(activeIcon);
        } else {
            setLikeIconStyle(inactiveIcon);
        }

        if (action && action.dislike) {
            setDislikeIconStyle(activeIcon);
        } else {
            setDislikeIconStyle(inactiveIcon);
        }
        console.log('called');
    }, [action])

    const likePost = () => {
        const {like, dislike} = action;
        if (like === false) {
            if (dislike) {
                setAction({
                    ...action,
                    like: true,
                    dislike: false
                });

                dispatchAction({
                    ...action,
                    like: 1,
                    dislike: -1
                })
            } else {
                setAction({
                    ...action,
                    like: true
                });

                dispatchAction({
                    ...action,
                    like: 1, 
                    dislike: 0
                })
            }
        } else {
            setAction({
                ...action,
                like: false,
                dislike: false
            });
            dispatchAction({
                ...action,
                like: -1,
                dislike: 0
            })
        }
    }

    const dislikePost = () => {
        const {like, dislike} = action;
        if (dislike === false) {
            if (like) {
                setAction({
                    ...action,
                    like: false,
                    dislike: true
                });
                dispatchAction({
                    userId,
                    postId,
                    like: -1,
                    dislike: 1
                })
            } else {
                setAction({
                    ...action,
                    dislike: true
                });
                dispatchAction({
                    userId, 
                    postId, 
                    like: 0, 
                    dislike: 1
                })
            }
        } else {
            setAction({
                ...action,
                like: false,
                dislike: false
            });
            dispatchAction({
                ...action,
                like: 0,
                dislike: -1
            })
        }
    }
    //
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title"><NavLink to={postUri}>{title}</NavLink></h3>
                <p className="card-text">
                    {body.substring(0, 200) + '...'}
                </p>
                <div className="card-actions d-flex justify-content-start">
                    <div className="post-action-group">
                       <div style={inactiveIcon} ><Visibility /> </div>
                       <div className="stat-count">{viewCount}</div>
                    </div>
                    <div className="post-action-group">
                       <div onClick={likePost} style={likeIconStyle}><ThumbUp /></div> 
                       <div className="stat-count">{likeCount}</div>
                    </div>
                    <div className="post-action-group">
                       <div style={dislikeIconStyle} onClick={dislikePost}><ThumbDown /> </div>
                       <div className="stat-count">{dislikeCount}</div>
                    </div>
                    <div className="post-action-group">
                       <div style={inactiveIcon}><Comment /></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TextPostCard);