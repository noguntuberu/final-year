import React from 'react';
import { connect } from 'react-redux';
import TextPostCard from './post-card-text';
import ImagePostCard from './post-card-image';
import CommentList from './comment-list';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client-area.css';



const DetailedPost = props => {
    const id = props.match.params.id;
    return (
        <div>
            {
                props.posts[id].mediaUri ? <ImagePostCard postData = {props.posts[id]} /> : <TextPostCard postData = {props.posts[id]} />
            }
            <CommentList postId={id}/>
        </div>
    )
}

const mapStateToProps = state => ({
    posts: {...state.posts}
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DetailedPost);