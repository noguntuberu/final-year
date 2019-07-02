import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client-area.css';


const SideNavPane = props => {
    const {user} = props;
    const logOut = () => {
        localStorage.clear();
        props.match.history.push('/');
    }
    return (
        <nav className="card side-nav">
            <ul className="side-nav-ul">
                <li><NavLink to={`/${user}`}>Home</NavLink></li>
                {user === "admin"? 
                    <li><NavLink to={`/${user}/post/new`}>Add New Post</NavLink></li> :
                    null
                }
                <li><a href="str" className="button" onClick={logOut}>Log Out</a></li>
            </ul>
        </nav>
    )
}

export default SideNavPane;