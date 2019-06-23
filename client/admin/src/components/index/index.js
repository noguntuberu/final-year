import React from 'react';
import { Route } from 'react-router-dom';
import Login from './login';
//import Register from './register';

const IndexComponent = () =>  (
    <div className="index-wrapper">
        <div className="veil">
            <h1>ENTSYS</h1>
            <div className="form-wrapper">
                <Route exact path="/admin/" component={Login} />
            </div>
        </div>
    </div>
);

export default IndexComponent;