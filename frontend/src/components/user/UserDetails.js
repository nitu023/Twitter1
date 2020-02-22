import React from 'react';
import Axios from 'axios';
import ProfileSideView from './ProfileSideView';


class UserDetails extends React.Component{
    constructor(){
        super();
        this.state = {
            userData: [],
            currentUser: JSON.parse(localStorage.getItem('userData')),
            searchData:[],
        }
    }

    componentDidMount(){
        Axios.get("http://127.0.0.1:5000/read_user/"+ this.props.match.params.user_id)
        .then(response => {
            console.log(response.data)
            this.setState({userData: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    followUser = (userId, name) => {
        // console.log(userId)
        Axios.post("http://127.0.0.1:5000/user/follow", {
            current_userid: this.state.currentUser.user_id,
            user_id: userId
        })
        .then(response => {
            console.log(response.data)
            if (response.data === "following"){
                alert(response.data + name)
            }
            else{
                alert("already followed")
            }
           
        })
        .catch(error => {
            console.log(error)
        })
        // alert("You are following " + name)
    }
    

    render(){
    // console.log(this.state.searchData)
    // console.log(this.state.currentUser.name)
        const showUsers = this.state.userData.map(eachUser => {
            if( this.state.searchData == 0){
            if(eachUser._id.$oid != this.state.currentUser.user_id){
                return(
                    <div className="col-8 offset-1">
                        <div class="card p-3" >
                            <img src={`http://127.0.0.1:5000/${eachUser.picture}`}class="card-img-top" alt={eachUser.name}/>
                            <div class="card-body">
                                <h3 class="card-title">{eachUser.name}</h3>
                                <h3 class="card-title">{eachUser.email}</h3>
                                <button class="btn btn-success" onClick={()=> this.followUser(eachUser._id.$oid, eachUser.name)}>Follow</button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        })

        return(
            <React.Fragment>
                <div className="container-fuild">
                    <div className="row">
                        <div className="col-3  text-center p-3">
                            <ProfileSideView />
                        </div>
                       
                        <div className="col-9 bg-light text-center p-3">
                            <h2>User Detalis</h2>
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

export default UserDetails;