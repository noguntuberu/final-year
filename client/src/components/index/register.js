import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../../store/action-creators/guest.ac';
import { updateProcessStatus } from '../../store/action-creators/process.ac';

const Register = props => {
    const {register, updateRegStatus} = props;
    const {payload} = props.registrationStatus;

    const
        [formMessage, setFormMessage] = useState(''), 
        [firstName, setFirstname] = useState(''),
        [lastName, setLastname] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [cPassword, setCPassword] = useState(''),
        [gender, setGender] = useState('');

    //
    useEffect(() => {
        if(payload !== formMessage) {
            setFormMessage(payload);
            setTimeout(() => {
                updateRegStatus({
                    process: 'registration',
                    body: {
                        success: false,
                        payload: ""
                    }
                })
            }, 2000);
        }
    }, [formMessage, payload, updateRegStatus])

    const checkEmpty = values => {
        for(let i = 0; i < values.length; i++ ){
            const value = values[i]
            if (value.length <= 1) {
                return false;
            }
        }
        return true;
    }

    const submitForm = () => {
        if(checkEmpty([firstName, lastName, email, password, cPassword, gender])) {
            if (password === cPassword) {
                register({firstName, lastName, email, password, cPassword, gender, level: 2});
            } else {
                updateRegStatus({
                    process: 'registration',
                    body: {
                        success: false,
                        payload: "Passwords do not match"
                    }
                })
            }
        } else {
            updateRegStatus({
                process: 'registration',
                body: {
                    success: false,
                    payload: "Please fill all fields" 
                }
            })
        }
    }
    return (
        <form name="register">
            <div className="alert">
                {formMessage}
            </div>
            <div className="form-row">
                <div className="col">
                    <input name="firstname" type="text" placeholder="Firstname" onInput={e => setFirstname(e.target.value)}/>
                </div>
                <div className="col">
                    <input name="lastname" type="text" placeholder="Lastname" onInput={e => setLastname(e.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <input name="email" type="text" placeholder="Email Address" onInput={e => setEmail(e.target.value)}/>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <input name="password" type="password" placeholder="Password" onInput = {e => setPassword(e.target.value)}/>
                </div>
                <div className="col">
                    <input name="cpassword" type="password" placeholder="Confirm Password" onInput = {e => setCPassword(e.target.value)}/>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <select name="gender" onChange={e => setGender(e.target.value)}>
                        <option value="neutral">Not now</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
            <input name="submit" type="button" value="Register" className="reg-btn" onClick={submitForm}/>
            <div style={{textAlign: "center"}}>
                Already a Member? <NavLink to="/" style = {{fontWeight: "bold"}}>Log In</NavLink>
            </div>
        </form>
    )
}

const mapStateToProps = state => ({
    registrationStatus: {...state.processes.registration}
})

const mapDispatchToProps = dispatch => ({
    register : data => dispatch(registerUser(data)),
    updateRegStatus: data => dispatch(updateProcessStatus(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(Register);