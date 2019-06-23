import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client-area.css';


const SideNavPane = props => {
    return (
        <nav className="card side-nav">
            <ul className="side-nav-ul">
                <li><NavLink to="/admin/account">Home</NavLink></li>
                <li><NavLink to="/admin/account/post/new">Add New Post</NavLink></li>
                <li><a href="str" className="button">Log Out</a></li>
            </ul>
        </nav>
    )
}

export default SideNavPane;