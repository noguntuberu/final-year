import React, { useEffect } from 'react';
import { Route , Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from './login';
import Register from './register';

const IndexComponent = props =>  {
    const { level, history } = props;

    useEffect(() => {
        if(level) {
            let path = level === 0 ? '/admin' : '/member';
            history.push(path);
        }

    }, [level, history])

    return (
        <div className="index-wrapper">
            <div className="veil">
                <h1>ENTSYS</h1>
                <div className="form-wrapper">
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Redirect from="/" to="/login"/>
                    </Switch>
                </div>
            </div>
    </div>);
}

const mapStateToProps = state => {
    let {level} = state.credential;
    return {
        level     
    }
}

export default connect(mapStateToProps, null)(IndexComponent);