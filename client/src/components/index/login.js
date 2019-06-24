import React, { useState, useEffect} from 'react';
//import {NavLink} from 'react-router-dom';
import './index.css';
import { connect } from 'react-redux';
import {falsifyError} from '../../store/action-creators/error.ac';


const Login = props => {
    const [formMsg, setFormMsg] = useState(),
          [email, setEmail] = useState(""),
          [password, setPassword] = useState();
    /** */
    useEffect(() => {
        //
        if (props.isLoggedIn) {
            props.history.push('/admin/account');
        }
    });


    // 
    if (props.error && props.error !== formMsg) {
        setFormMsg(props.error);
        props.falsify();
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (email.length < 1 || password.length < 1) {
            setFormMsg("Please fill all fields");
            setTimeout(() => setFormMsg(""), 2000);
        } else {
            props.login(email, password); 
        }

    }

    return (
        <form name="login" onSubmit={onSubmit}>
            <div className="form-message">{formMsg}</div>
            <input name="email" type="email" placeholder="Email address" onInput = {e => setEmail(e.target.value)}/>
            <input name="password" type="password" placeholder="Password" onInput = {e => setPassword(e.target.value)}/>
            <input name="submit" type="submit" value="Login" className="login-btn"/>
        </form>
    )
}

const mapStateToProps = state => {
    let {isLoggedIn} = state.credential;
    let { error } = state;
    return {
        isLoggedIn,
        error: error.isNew ? error.message : ""
    }
}

const matchDispatchToProps = dispatch => ({
    login: (email, password) => dispatch({type: 'LOGIN', payload: {email, password}}),
    falsify: () => dispatch(falsifyError())
})

export default connect(mapStateToProps, matchDispatchToProps)(Login);