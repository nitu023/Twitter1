import React from 'react';
import Axios from 'axios';

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    inputChange = (inputData) => {
        this.setState({[inputData.target.name]: inputData.target.value})
    }

    inputSubmit = (dataSubmit) => {
        dataSubmit.preventDefault();
        Axios.post("http://127.0.0.1:5000/users/login", {
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            // console.log(response.data)
            if(response.data.token){
                localStorage.setItem("token", response.data.token)
                setUserData(response.data.token)
            }else{
                alert("Wrong email or password")
            }
        })
        .catch(error => {
            console.log(error)
        })

        let setUserData = (tokenId) =>{
            Axios.get("http://127.0.0.1:5000/user/details", {
                headers: {
                    Authorization: "Bearer " + tokenId,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                // console.log(response.data)
                localStorage.setItem("userData",JSON.stringify(response.data));
                this.props.history.push("/home")
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="container">
                    <h2 className = "text-center mt-5">Login Your Account </h2>
                    <div className="row mt-5">
                        <div className="col-4">
                            
                        </div>
                        <div className="col-4">
                            <form onSubmit={this.inputSubmit}>
                                <div class="form-group">
                                    <label>Email address</label>
                                    <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.inputChange} required />
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.inputChange} required />
                                </div>
                                <button type="submit" class="btn btn-primary">Login Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Login;