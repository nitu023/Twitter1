import React from 'react';
import Axios from 'axios';
import ProfileSideView from './ProfileSideView';


class AllUsers extends React.Component{
    constructor(){
        super();
        this.state = {
            userData: [],
            currentUser: JSON.parse(localStorage.getItem('userData')),
            searchData:[],
            name :""
        }
    }

    componentDidMount(){
        Axios.get("http://127.0.0.1:5000/users/"+ this.state.currentUser.user_id)
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
    onChange = (e) => {
        console.log(e.target.value)
        this.setState({
            name: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        Axios.post("http://127.0.0.1:5000/search", {
            name: this.state.name
        })
            .then(res => {
                console.log(res.data)
                this.setState({
                    searchData: res.data

                })

            })
    }

    render(){
    // console.log(this.state.searchData)
    // console.log(this.state.currentUser.name)
        const showUsers = this.state.userData.map(eachUser => {
            if( this.state.searchData == 0){
            if(eachUser._id.$oid != this.state.currentUser.user_id){
                return(
                    <div className="col-3">
                        <div class="card p-3" >
                            <img src={`http://127.0.0.1:5000/${eachUser.picture}`}class="card-img-top" alt={eachUser.name}/>
                            <div class="card-body">
                                <h3 class="card-title">{eachUser.name}</h3>
                                <button class="btn btn-success" onClick={()=> this.followUser(eachUser._id.$oid, eachUser.name)}>Follow</button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        })
        const showSearchUsers = this.state.searchData.map(eachUser => {
            if(eachUser._id.$oid != this.state.currentUser.user_id){
                return(
                    <div className="col-3">
                        <div class="card p-3" >
                            <img src={`http://127.0.0.1:5000/${eachUser.picture}`}class="card-img-top" alt={eachUser.name}/>
                            <div class="card-body">
                                <h3 class="card-title">{eachUser.name}</h3>
                                <button class="btn btn-success" onClick={()=> this.followUser(eachUser._id.$oid, eachUser.name)}>Follow</button>
                            </div>
                        </div>
                    </div>
                )
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
                            <h2>Find all the users to follow</h2>
                            <div className="row">
                                {showUsers}
                            </div>
                            <div className="row">
                                {showSearchUsers}
                            </div>
                        </div>
                    </div>
                    <div >
                    <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label className ="offset-5  text-dark h3" >Search Here By name </label>
                            <input type="text" className="form-control w-25 offset-5  " value={this.state.name} onChange={this.onChange} />
                        </div>
                        <button  className="offset-5 btn btn-primary" type = "submit" >Submit</button>
                    </form>
                </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AllUsers;