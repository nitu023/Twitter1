import React from 'react';
import Axios from 'axios';
import ProfileSideView from './ProfileSideView';

class Following extends React.Component {
    constructor() {
        super();
        this.state = {  
            currentUser: JSON.parse(localStorage.getItem('userData')),
            userData: []
        }
        
    }

    componentDidMount() {
        Axios.get("http://127.0.0.1:5000/users/following/" + this.state.currentUser.user_id)
            .then(response => {
                this.setState({userData: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    unfollowUser = (userId, name) => {
        // console.log(this.state.currentUser.user_id)
        Axios.post("http://127.0.0.1:5000/user/unfollow", {
            current_userid:userId ,
            user_id:this.state.currentUser.user_id 
        })
        .then(response => {
            console.log(response.data)
            window.location.reload(false)
        })
        .catch(error => {
            console.log(error)
        })
        alert("unfollowing " + name)
    }


    render() {
        // console.log(this.state.userData)
        const showUsers = this.state.userData.map(eachUser => {
            return (
                <div className="col-3">
                    <div class="card p-3" >
                        <img src={`http://127.0.0.1:5000/${eachUser.picture}`} class="card-img-top" alt={eachUser.name} />
                        <div class="card-body">
                            <h3 class="card-title">{eachUser.name}</h3>
                        </div>
                        <button class="btn btn-danger" onClick={()=> this.unfollowUser(eachUser._id.$oid, eachUser.name)}>UnFollow</button>
                    </div>
                </div>
            )
        })

        return (
            <React.Fragment>
                <div className="container-fuild">
                    <div className="row">
                        <div className="col-3 bg-danger text-center p-3">
                            <ProfileSideView />
                        </div>
                        <div className="col-9 bg-light text-center p-3">
                            <h2>Here are the people you are following</h2>
                            <div className="row">
                                {showUsers}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default Following;