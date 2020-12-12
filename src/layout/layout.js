import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Header from '../component/header';
import Footer from '../component/footer';
import Home from '../component/home';
import Activate from '../Auth/activation';
import forget from '../Auth/forgetpassword';
import activatePassword from '../Auth/passwordActivate';
import Error from '../component/Error';
import Auth from '../Auth/auth';
import profile from '../component/profile';
import Symptoms from '../component/Symptom/symptomChecker';
import BlogPosts from '../component/Blogs/blogs';
import create from '../component/Blogs/create';
import Blog from '../component/Blogs/blog';
import Results from '../component/Symptom/results';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
export default class layout extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }

    render() {
        return (
            <div>


<Router>
    
<Header/>
     <Switch>

    <Route exact path="/" component={Home} />
    <Route exact path="/profile" component={profile}/>
    <Route exact path="/activation/:token" component={Activate} />
    <Route exact path="/password/forget" component={forget} />
    <Route exact path="/password/reset/:token" component={activatePassword} />
    <Route exact path="/Auth" component={Auth} />
    <Route exact path="/SymptomsChecker" component={Symptoms} />
    <Route exact path="/Result" component={Results}/>
    <Route exact path="/blogs" component={BlogPosts} />
    <Route exact path="/blog" component={Blog} />

    <Route exact path="/create" component={create} />

    


    

  

    
    <Route render={function(){
                        return (<Error/>); 
                    }}/>
  </Switch>
  <Footer/>
</Router>


            </div>
        )
    }
}
