import React from 'react';
import TextPostCard from './post-card-text';
import ImagePostCard from './post-card-image';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client-area.css'


const PostList = props => {
    return (
        <div className="post-list">
            <TextPostCard />
            <ImagePostCard 
                image = {require("../../assets/images/coffee.jpg")}
            />
        </div>
    )
}

export default PostList;