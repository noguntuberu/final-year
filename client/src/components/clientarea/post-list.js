import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {loadPosts} from '../../store/action-creators/post.ac';
import TextPostCard from './post-card-text';
import ImagePostCard from './post-card-image';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client-area.css'


const PostList = props => {
    const {loadPostsForDisplay, posts, level} = props;
    useEffect(() => {
        loadPostsForDisplay();
    }, [loadPostsForDisplay]);

    const [userClass, setUserClass] = useState('member');
    const [postPath, setPostPath] = useState('member/post');
    useEffect(() => {
        if(level === 0 && userClass !== 'admin') {
            setUserClass('admin');
            setPostPath('admin/post/analysis');
        }
    },[userClass, level]);

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
            {extractPosts(posts)}
        </div>
    )
}

const mapStateToProps = state => ({
    posts: {...state.posts},
    level: state.credential.level
})

const mapDispatchToProps = dispatch => ({
    loadPostsForDisplay : () => {
        dispatch(loadPosts());
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(PostList);