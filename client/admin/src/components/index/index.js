import React from 'react';
import { Route } from 'react-router-dom';
import Login from './login';
import Register from './register';

const IndexComponent = () =>  (
    <div className="index-wrapper">
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
    </div>
);

export default IndexComponent;