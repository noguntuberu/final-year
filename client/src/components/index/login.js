import React, { useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import './index.css';
import { connect } from 'react-redux';
import { updateProcessStatus } from '../../store/action-creators/process.ac';


const Login = props => {
    const [formMsg, setFormMsg] = useState(),
          [email, setEmail] = useState(""),
          [password, setPassword] = useState("");

    /** */
    const {login, isLoggedIn, level, history, updateLoginStatus} = props;
    const {payload} = props;

    useEffect(() => {
        //
        let path = level === 0 ? '/admin' : '/member';
        if (isLoggedIn) {
            history.push(path);
        }
    }, [isLoggedIn, history, level]);

    useEffect(() => {
        if(payload !== formMsg) {
            setFormMsg(payload);
            setTimeout(() => {
                updateLoginStatus({
                    process: 'login',
                    body: {
                        success: false,
                        payload: ""
                    }
                })
            }, 2000);
        }
    }, [payload, formMsg, setFormMsg, updateLoginStatus])

    const onSubmit = (event) => {
        event.preventDefault();

        if (email.length < 1 || password.length < 1) {
            updateLoginStatus({
                process: 'login',
                body: {
                    success: false,
                    payload: "Please, fill all fields"
                }
            })
        } else {
            login(email, password); 
        }

    }

    return (
        <form name="login" onSubmit={onSubmit}>
            <div className="form-message">{formMsg}</div>
            <input name="email" type="email" placeholder="Email address" onInput = {e => setEmail(e.target.value)}/>
            <input name="password" type="password" placeholder="Password" onInput = {e => setPassword(e.target.value)}/>
            <input name="submit" type="submit" value="Login" className="login-btn"/>
            <div style={{textAlign: "center"}}>
                Not a Member? <NavLink to='/register' style = {{fontWeight: "bold"}}> Sign Up </NavLink>
            </div>
        </form>
    )
}

const mapStateToProps = state => {
    let {isLoggedIn, level} = state.credential;
    return {
        isLoggedIn,
        level,
        ...state.processes.login      
    }
}

const matchDispatchToProps = dispatch => ({
    login: (email, password) => dispatch({type: 'LOGIN', payload: {email, password}}),
    updateLoginStatus: data => dispatch(updateProcessStatus(data))
})

export default connect(mapStateToProps, matchDispatchToProps)(Login);