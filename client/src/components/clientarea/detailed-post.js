import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TextPostCard from './post-card-text';
import ImagePostCard from './post-card-image';
import CommentList from './comment-list';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client-area.css';

import { incrementPostView } from '../../store/action-creators/post.ac';



const DetailedPost = props => {
    const id = props.match.params.id;
    const { incrementView } = props;
    const postPath = 'member/post';

    useEffect(() => {
        incrementView(id)
    }, [id, incrementView])

    return (
        <div>
            {
                props.posts[id].mediaUri ?  <ImagePostCard postPath= {postPath} postData = {props.posts[id]} /> : 
                                            <TextPostCard postPath={postPath} postData = {props.posts[id]} />
            }
            <CommentList postId={id}/>
        </div>
    )
}

const mapStateToProps = state => ({
    posts: {...state.posts}
})

const mapDispatchToProps = dispatch => ({
    incrementView : postId => dispatch(incrementPostView(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailedPost);