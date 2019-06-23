import React from 'react';
import {NavLink} from 'react-router-dom';

const Register = props => {

    return (
        <form name="register">
            <input name="username" type="text" placeholder="Username/Email Address"/>
            <input name="password" type="password" placeholder="Password"/>
            <input name="submit" type="button" value="Login"/>
            <div className="">
                <NavLink to="/admin">Log In</NavLink>
            </div>
        </form>
    )
}

export default Register;