import React, { useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import './index.css';
import { connect } from 'react-redux';
import { clearProcessStatus, updateProcessStatus } from '../../store/action-creators/process.ac';
import Toast from '../clientarea/toast';


const Login = props => {
    const [type, setType] = useState(),
          [message, setMessage] = useState(''),
          [email, setEmail] = useState(""),
          [password, setPassword] = useState("");

    /** */
    const {login, clearLoginProcess, updateLoginStatus} = props;
    const {loginStat} = props;

    useEffect(() => {
        if (loginStat.payload !== undefined) {
            if(!loginStat.success) {
                setType(2);
            }
    
            if(message !== loginStat.payload) {
                setMessage(loginStat.payload);
            }
            clearLoginProcess();
        }
    }, [loginStat, message, clearLoginProcess]);

    useEffect(() => {
        setTimeout(() => {
            setType(0);
        }, 2000)
    }, [loginStat, updateLoginStatus])

    const onSubmit = (event) => {
        event.preventDefault();

        if (email.length < 1 || password.length < 1) {
            updateLoginStatus({
                success: false,
                payload: 'Please, fill all fields'
            })
        } else {
            login(email, password); 
        }

    }

    return (
        <form name="login" onSubmit={onSubmit}>
            <Toast data = {{type, message}}/>
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
    return {
        loginStat : {...state.processes.login}
    }
}

const matchDispatchToProps = dispatch => ({
    login: (email, password) => dispatch({type: 'LOGIN', payload: {email, password}}),
    clearLoginProcess: () => dispatch(clearProcessStatus('login')),
    updateLoginStatus: body => dispatch(updateProcessStatus({process: 'login', body}))
})

export default connect(mapStateToProps, matchDispatchToProps)(Login);