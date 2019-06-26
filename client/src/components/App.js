import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Index from './index/index';
import AdminArea from './user-sections/admin-area';
import MemberArea from './user-sections/member-area';

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
                    <Switch>
                        <Route path="/member" component={MemberArea} />
                        <Route path="/admin" component={AdminArea} />
                        <Route path="/" component={Index} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;