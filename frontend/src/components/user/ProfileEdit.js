import React from 'react';
import Axios from 'axios';
import ProfileSideView from './ProfileSideView';

class ProfileEdit extends React.Component{
    constructor(){
        super();
        this.state = {
            userData: JSON.parse(localStorage.getItem('userData')),
            name: '',
            gender: '',
            picture: '',
            location: ''
        }
    }

    inputPicture = (picture) => {
        const formData = new FormData();
        formData.append('picture',picture.target.files[0])

        Axios.post("http://127.0.0.1:5000/users/picture", formData, {
            headers: {
                user_id: this.state.userData.user_id,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            // console.log(response.data)
            localStorage.setItem("userData",JSON.stringify(response.data));
            this.props.history.push("/profile")
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className="container-fuild">
                    <div className="row">
                        <div className="col-3  text-center p-3">
                            <ProfileSideView />
                        </div>
                        <div className="col-7 bg-light text-center p-3">
                            <h2>Update Your Profile Now</h2>
                            <div class="text-center">
                                <img src={`http://127.0.0.1:5000/${this.state.userData.picture}`} class="rounded" alt={this.state.userData.name} width="200" height="200" />
                                <form>
                                    <div class="form-group">
                                        <label>Change Profile Picture</label>
                                        <input type="file" class="form-control-file" name="picture" onChange={this.inputPicture} />
                                    </div>
                                </form>
                            </div>
                            <form>
                                <div class="form-group">
                                    <label>Your Name</label>
                                    <input type="name" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label>Your Email</label>
                                    <input type="text" class="form-control" disabled value={this.state.userData.email} />
                                </div>
                                <div class="form-group">
                                    <label>Select Gender</label>
                                    <select class="form-control">
                                        <option>Female</option>
                                        <option>Male</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Your Location</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <button type="submit" class="btn btn-primary">Change</button>
                            </form>   
                        </div>
                        <div className="col-2 ">

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProfileEdit;