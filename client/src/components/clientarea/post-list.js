import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {loadPosts} from '../../store/action-creators/post.ac';
import TextPostCard from './post-card-text';
import ImagePostCard from './post-card-image';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client-area.css'


const PostList = props => {
    const {userId, loadPostsForDisplay, posts, level} = props;
    useEffect(() => {
        loadPostsForDisplay(userId);
    }, [userId, loadPostsForDisplay]);

    const [userClass, setUserClass] = useState('member');
    const [postPath, setPostPath] = useState('member/post');
    useEffect(() => {
        if(level === 0 && userClass !== 'admin') {
            setUserClass('admin');
            setPostPath('admin/post/analysis');
        }
    },[userClass, level]);

    const isEmpty = object => {
        return Object.entries(object).length === 0;
    }

    const extractPosts = postList => {
        let posts = [];
        for (const postId in postList) {
            let post;
            if (postList[postId].mediaUri === null) {
                post = <TextPostCard postPath={postPath} postData = {{...postList[postId]}} key={postId}/>
            } else {
                post = <ImagePostCard postPath={postPath} postData = {{...postList[postId]}} key={postId}/>
            }
            posts = [
                ...posts,
                post
            ]
        }
        return posts;
    }
    return (
        <div className="post-list">
            {
                isEmpty(posts) ? <div className="d-flex text-center">Sorry, there are no posts at the moment.</div> : extractPosts(posts) 
            }
        </div>
    )
}

const mapStateToProps = state => ({
    userId: state.credential.userId,
    posts: {...state.posts},
    level: state.credential.level
})

const mapDispatchToProps = dispatch => ({
    loadPostsForDisplay : userId => {
        dispatch(loadPosts(userId));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(PostList);