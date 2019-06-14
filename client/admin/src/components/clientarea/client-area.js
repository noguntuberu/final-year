import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SideNav from './nav-side';
import NewPost from './new-post';
import PostList from './post-list';
import DetailedPost from './detailed-post';
import AnalysisArea from './analysis-display';


const ClientArea = props => {
    return (
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
                            Oguntuberu Nathan O.
                        </h5>
                    </div>

                    <SideNav />
                </section>
                <section className="right-section">
                    <Switch>
                        <Route exact path="/account" component={PostList} />
                        <Route path="/account/post/new" component={NewPost} />
                        <Route exact path="/account/post/:id" component={DetailedPost} />
                        <Route path="/account/post/analysis/:id" component={AnalysisArea} />
                        <Redirect from = "/account/post" to="/account" />
                    </Switch>

                </section>
            </div>
        </div>
    )
}

export default ClientArea;