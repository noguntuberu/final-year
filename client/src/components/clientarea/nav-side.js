import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client-area.css';


const SideNavPane = props => {
    const {user} = props;
    const logOut = () => {
        localStorage.clear();
        props.history.push('/');
    }
    return (
        <nav className="card side-nav">
            <ul className="side-nav-ul">
                <li><NavLink to={`/${user}`}>Home</NavLink></li>
                {user === "admin"?
                    (
                        <div> 
                        <li><NavLink to={`/${user}/post/new`}>Add New Post</NavLink></li>
                        <li><NavLink to={`/${user}/post/new-user`}>Add Employee</NavLink></li>
                        </div>
                    ):
                    null
                }
                <li onClick={logOut}><a className="button" >Log Out</a></li>
            </ul>
        </nav>
    )
}

export default withRouter(SideNavPane);