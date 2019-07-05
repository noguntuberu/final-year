import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import Index from './index';
import AdminArea from '../user-sections/admin-area';
import MemberArea from '../user-sections/member-area';

const Authorizer= props => {
    const {isLoggedIn, level, history} = props;

    useEffect(() => {
        //
        let path = level === 0 ? '/admin' : '/member';
        
        if (isLoggedIn) {
            history.push(path);
        }
    }, [isLoggedIn, level, history]);

    return (
        <Switch>
            <Route path="/member" component={MemberArea} />
            <Route path="/admin" component={AdminArea} />
            <Route path="/" component={Index} />
        </Switch>
    )
}

const mapStateToProps = state => {
    let {isLoggedIn, level} = state.credential;
    return {
        isLoggedIn,
        level     
    }
}

export default connect(mapStateToProps, null)(Authorizer);