import React from 'react';
import {Link} from 'react-router-dom';

class ProfileSideView extends React.Component{
    constructor(){
        super();
        this.state = {
            userdata: JSON.parse(localStorage.getItem('userData'))
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div class="text-center">
                                <img src={`http://127.0.0.1:5000/${this.state.userdata.picture}`} class="rounded" width="150" height="150" alt = "" />
                            </div>
                            <ul class="list-group">
                               <Link to="/profile"><li class="list-group-item">{this.state.userdata.name}</li></Link>
                               <Link to="/profile/follow"><li class="list-group-item">Following</li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProfileSideView;