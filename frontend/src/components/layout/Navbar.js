import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Axios from 'axios';

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            tokenId: localStorage.getItem("token")
        }
    }

    componentDidMount(){
        Axios.get("http://127.0.0.1:5000/user/details", {
            headers: {
                Authorization: "Bearer " + this.state.tokenId,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            // console.log(response.data)
            localStorage.setItem("userData",JSON.stringify(response.data));
        })
        .catch(error => {
            console.log(error)
        })
    }

    logOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userData")
        this.props.history.push("/")
    }

    render() {

        const loginLinks = (
            <React.Fragment>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                    <div className="my-2 my-lg-0">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )

        const logoutLinks = (
            <React.Fragment>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link h4" to="/home">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white h5" to="/findusers">All Users</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link text-white h5" to="#" onClick={this.logOut}>Logout</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link text-white h5" to="/profile/edit">Edit</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link text-white h5" to="/profile/follow">following</Link>
                        </li>
                    </ul>
                    <div className="my-2 my-lg-0">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Profile
                                    </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item text-white" to="/profile">Profile</Link>
                                    {/* <Link className="dropdown-item" to="/profile/edit">Edit</Link> */}
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item text-white h4" to="#" onClick={this.logOut}>Logout</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <Link className="navbar-brand " to="#">
                        <img src="https://img.icons8.com/cotton/2x/twitter.png" width="45" height="45" style={{marginLeft:"86px",marginTop:"-20px"}} className="d-inline-block align-top " alt="" />
                       <h1 className = "ml-5" style={{marginTop:"-30px"}}> Twitter</h1>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {localStorage.getItem("token") ? logoutLinks : loginLinks}
                </nav>
            </React.Fragment>
        )
    }
}

export default withRouter(Navbar);