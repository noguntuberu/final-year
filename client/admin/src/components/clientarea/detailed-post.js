import React from 'react';
import TextPostCard from './post-card-text';
import ImagePostCard from './post-card-image';
import CommentList from './comment-list';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client-area.css';



const DetailedPost = props => {
    const id = props.match.params.id;
    const img = require('../../assets/images/coffee.jpg');
    return (
        <div>
            {
                img ? <ImagePostCard image={img} /> : <TextPostCard />
            }
            <CommentList />
        </div>
    )
}

export default DetailedPost;