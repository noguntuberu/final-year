import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import {loadPosts} from '../../store/action-creators/post.ac';
import TextPostCard from './post-card-text';
import ImagePostCard from './post-card-image';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client-area.css'


const PostList = props => {
    const {loadPosts, posts} = props;
    useEffect(() => {
        loadPosts();
        //console.log([props.posts]);
    }, [loadPosts]);

    const extractPosts = postList => {
        let posts = [];
        for (const postId in postList) {
            let post;
            if (postList[postId].mediaUri === null) {
                post = <TextPostCard postData = {{...postList[postId]}} key={postId}/>
            } else {
                post = <ImagePostCard postData = {{...postList[postId]}} key={postId}/>
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
    posts: {...state.posts}
})

const mapDispatchToProps = dispatch => ({
    loadPosts : () => {
        dispatch(loadPosts());
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(PostList);