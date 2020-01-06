import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Authorizer from './index/authorizer';

const App = () => {
    return (
        <BrowserRouter>
            <div className="page-wrapper">
                    <Route path="/" component={Authorizer} />
            </div>
        </BrowserRouter>
    )
}

export default App;