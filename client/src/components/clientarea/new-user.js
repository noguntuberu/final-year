import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { registerUser } from '../../store/action-creators/guest.ac';
import { clearProcessStatus, updateProcessStatus } from '../../store/action-creators/process.ac';
import Toast from '../clientarea/toast';

const Register = props => {
    const {register, clearRegistrationStatus, updateRegStatus} = props;
    const { registrationStatus } = props;

    const
        [type, setType] = useState(),
        [message, setMessage] = useState(''), 
        [firstName, setFirstname] = useState(''),
        [lastName, setLastname] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [cPassword, setCPassword] = useState(''),
        [gender, setGender] = useState('');

    //
    useEffect(() => {
        if(registrationStatus.payload !== undefined) {
            if(!registrationStatus.success) {
                setType(2);
            } else {
                setType(1);
            }

            if (message !== registrationStatus.payload) {
                setMessage(registrationStatus.payload);
            }

            clearRegistrationStatus();
        }
    }, [message, registrationStatus, clearRegistrationStatus])

    useEffect(() => {
        setTimeout(() => {
            setType(0);
        }, 2000)
    }, [registrationStatus])

    const checkEmpty = values => {
        for(let i = 0; i < values.length; i++ ){
            const value = values[i]
            if (value.length < 1) {
                return false;
            }
        }
        return true;
    }

    const submitForm = () => {
        if(checkEmpty([firstName, lastName, email, password, cPassword, gender])) {
            if (password === cPassword) {
                register({firstName, lastName, email, password, cPassword, gender, level: 1});
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
        <div className="card form-card">
            <form name="register">
                <Toast data={{type, message}} />
                <div className="form-group form-row ">
                    <div className="col">
                        <input className="form-control" name="firstname" type="text" placeholder="Firstname" onInput={e => setFirstname(e.target.value)}/>
                    </div>
                    <div className="col">
                        <input className="form-control" name="lastname" type="text" placeholder="Lastname" onInput={e => setLastname(e.target.value)} />
                    </div>
                </div>
                <div className="form-group form-row">
                    <div className="col">
                        <input className="form-control" name="email" type="text" placeholder="Email Address" onInput={e => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group form-row">
                    <div className="col">
                        <input className="form-control" name="password" type="password" placeholder="Password" onInput = {e => setPassword(e.target.value)}/>
                    </div>
                    <div className="col">
                        <input className="form-control" name="cpassword" type="password" placeholder="Confirm Password" onInput = {e => setCPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group form-row">
                    <div className="col">
                        <select className="form-control" name="gender" onChange={e => setGender(e.target.value)}>
                            <option >Select Gender</option>
                            <option value="N">Not Now</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>
                </div>
                <input name="submit" type="button" value="Register" className="reg-btn" onClick={submitForm}/>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    registrationStatus: {...state.processes.registration}
})

const mapDispatchToProps = dispatch => ({
    register : data => dispatch(registerUser(data)),
    updateRegStatus: data => dispatch(updateProcessStatus(data)),
    clearRegistrationStatus: () => dispatch(clearProcessStatus('registration'))
})


export default connect(mapStateToProps, mapDispatchToProps)(Register);