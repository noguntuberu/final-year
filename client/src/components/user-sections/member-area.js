import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import SideNav from '../clientarea/nav-side';
import PostList from '../clientarea/post-list';
import DetailedPost from '../clientarea/detailed-post';

const MemberArea = props => {
    const {name, isLoggedIn, level} = props;
    return isLoggedIn && level !== 0? (
        <div>
            <header>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="site-name">ENTSYS</div>
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
    
                    <SideNav user="member"/>
                </section>
                <section className="right-section">
                    <Switch>
                        <Route path="/member/post/:id" component={DetailedPost} />
                        <Route path="/member" component={PostList} />
                        <Redirect from = "/member/post" to="/member" />
                    </Switch>
                </section>
            </div>
        </div>
    ) : <Redirect to="/" />
}

const mapStateToProps = state => ({
    ...state.credential
})

export default connect(mapStateToProps, null)(MemberArea);