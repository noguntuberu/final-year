import React from 'react';
import {connect} from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import SideNav from './nav-side';
import NewPost from './new-post';
import PostList from './post-list';
import DetailedPost from './detailed-post';
import AnalysisArea from './analysis-display';


const ClientArea = props => {
    return props.isLoggedIn ? (<div>
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
                            Oguntuberu Nathan O.
                        </h5>
                    </div>

                    <SideNav />
                </section>
                <section className="right-section">
                    <Switch>
                        <Route exact path="/admin/account" component={PostList} />
                        <Route path="/admin/account/post/new" component={NewPost} />
                        <Route exact path="/admin/account/post/:id" component={DetailedPost} />
                        <Route path="/admin/account/post/analysis/:id" component={AnalysisArea} />
                        <Redirect from = "/admin/account/post" to="/account" />
                    </Switch>
                </section>
            </div>
        </div>) : <Redirect to="/admin" />
}
const mapStateToProps = state => ({
    ...state.credential
})

export default connect(mapStateToProps, null)(ClientArea);