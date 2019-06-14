import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Index from './index/index';
import ClientArea from './clientarea/client-area';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render = () => {
        return (
            <BrowserRouter>
                <div className="page-wrapper">
                    <Route exact path="/" component={Index} />
                    <Route path="/register" component={Index} />
                    <Route path="/account" component={ClientArea} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;