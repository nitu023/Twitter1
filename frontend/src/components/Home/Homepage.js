import React from 'react';
import {Link} from 'react-router-dom';



function Homepage() {
    return (
        <div>
            <React.Fragment>
                <div class="jumbotron text-center">
                    <h1 class="display-4">Welcome to Twitter</h1>
                    <p class="lead">Join Twitter to connect with others and share your thoughts!</p>
                    <hr class="my-4"></hr>
                    <Link class="btn btn-primary btn-lg" to="/register" role="button">Register</Link>
                </div>
            </React.Fragment>
        </div>
    )
}


        


export default Homepage;