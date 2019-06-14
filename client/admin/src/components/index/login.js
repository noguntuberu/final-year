import React from 'react';
import {NavLink} from 'react-router-dom';

const Login = props => {

    return (
        <form name="login">
            <input name="username" type="text" placeholder="Username/Email Address"/>
            <input name="password" type="password" placeholder="Password"/>
            <input name="submit" type="button" value="Login"/>
            <div className="">
                <NavLink to="/register">Create Account</NavLink>
            </div>
        </form>
    )
}

export default Login;