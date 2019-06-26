import React from 'react';
import { Route , Switch, Redirect} from 'react-router-dom';
import Login from './login';
import Register from './register';

const IndexComponent = () =>  (
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
    </div>
);

export default IndexComponent;