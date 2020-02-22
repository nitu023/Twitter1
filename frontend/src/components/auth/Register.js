import React from 'react';
import Axios from 'axios';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    inputChange = (inputData) => {
        this.setState({[inputData.target.name]: inputData.target.value})
    }

    inputSumit = (dataSubmit) => {
        dataSubmit.preventDefault();
        Axios.post("http://127.0.0.1:5000/user/register", {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            console.log(response.data)
            this.props.history.push('/login')
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h2 className = "text-center mt-5">Register your Account</h2>
                    <div className="row mt-5">
                        <div className="col-4">

                        </div>
                        <div className="col-4">
                            <form onSubmit={this.inputSumit}>
                                <div class="form-group">
                                    <label>Enter Name</label>
                                    <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.inputChange} required />
                                </div>
                                <div class="form-group">
                                    <label>Email Address</label>
                                    <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.inputChange} required />
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.inputChange} required />
                                </div>
                                <div class="form-group form-check">
                                    <input checked type="checkbox" class="form-check-input" />
                                    <label class="form-check-label">I agree to terms & condition</label>
                                </div>
                                <button type="submit" class="btn btn-primary">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Register;