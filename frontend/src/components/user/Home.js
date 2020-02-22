import React from 'react';
import ProfileSideView from './ProfileSideView';
import PostCreate from './PostCreate';
import Posts from './Posts';

class Home extends React.Component{
    constructor(){
        super();
        this.state = {

        }
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
                            <PostCreate />
                            <Posts />
                        </div>
                        <div className="col-2 ">

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Home;