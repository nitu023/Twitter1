import React from 'react';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import {BrowserRouter, Route} from 'react-router-dom';
import Homepage from './components/Home/Homepage';
import Login from './components/auth/Login';
import Home from './components/user/Home';
import Profile from './components/user/Profile';
import AllUsers from './components/user/AllUsers';
import Following from './components/user/Following';
import ProfileEdit from './components/user/ProfileEdit';
import CommentPost from './components/user/CommentPost';
import PostEdit from './components/user/EditPost';
import UserDetails from './components/user/UserDetails'
class App extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return(
            <BrowserRouter>
                <Navbar />
                <Route path="/" exact component={Homepage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={Home} />
                <Route path="/Profile" exact component={Profile} />
                <Route path="/findusers" component={AllUsers} />
                <Route path="/profile/follow" component={Following} />
                <Route path="/profile/edit" component={ProfileEdit} />
                <Route path="/commentPost/:post_id" render={(props) => { return (<CommentPost {...props} />) }} ></Route>
                <Route path="/PostEdit/:post_id" render={(props) => { return (<PostEdit {...props} />) }} ></Route>
                <Route path="/userdetails/:user_id" render={(props) => { return (<UserDetails {...props} />) }} ></Route>
            </BrowserRouter>
        )
    } 
}

export default App;