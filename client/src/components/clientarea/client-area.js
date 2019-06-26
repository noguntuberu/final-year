import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';


const ClientArea = props => {
    const {isLoggedIn, level} = props;
    return isLoggedIn ? (
        <div>
            {level === 0 ? <Redirect to="/admin" /> : <Redirect to="/member" />}
        </div>
    ) : <Redirect to="/" />
}

const mapStateToProps = state => ({
    ...state.credential
})

export default connect(mapStateToProps, null)(ClientArea);