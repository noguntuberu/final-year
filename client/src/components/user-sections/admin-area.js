/** */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import SideNav from '../clientarea/nav-side';
import NewPost from '../clientarea/new-post';
import NewUser from '../clientarea/new-user';
import PostList from '../clientarea/post-list';
import AnalysisArea from '../clientarea/analysis-display';

const AdminArea = props => {
    const {isLoggedIn, level, name} = props;
    return isLoggedIn && level === 0 ? (
    <div>
        <header>
            <div className="d-flex justify-content-between align-items-center">
                <div className="site-name">LAUPOLL</div>
            </div>
        </header>
        <div className="outer-section-wrapper">
            <section className="left-section">
                <div className="card user-info">
                    <div className="user-image">
                        <img className="card-img-top" src={require("../../assets/images/coffee.jpg")} alt=""/>
                    </div>
                    <h5 className="card-title user-name">
                        {name}
                    </h5>
                </div>

                <SideNav user="admin"/>
            </section>
            <section className="right-section">
                <Switch>
                    <Route exact path="/admin" component={PostList} />
                    <Route path="/admin/post/new" component={NewPost} />
                    <Route path="/admin/post/new-user" component={NewUser} />
                    <Route path="/admin/post/analysis/:id" component={AnalysisArea} />
                    <Redirect from = "/admin/post" to="/admin" />
                </Switch>
            </section>
        </div>
    </div>) : <Redirect to="/"/>;
}

const mapStateToProps = state => ({
    ...state.credential
})

export default connect(mapStateToProps, null)(AdminArea);