import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom'

class Posts extends React.Component {
    constructor() {
        super();
        this.state = {
            userData: JSON.parse(localStorage.getItem('userData')),
            posts: [],
            liked: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log(this.state.userData.user_id)
        Axios.get("http://127.0.0.1:5000/posts/" + this.state.userData.user_id)
            .then(response => {
                console.log(response.data.data)
                this.setState({ posts: response.data.data })
            })
            .catch(error => {
                console.log(error)
            })
    }



    handleClick() {
        this.setState({
            liked: !this.state.liked
        });
    }


    render() {
        const text = this.state.liked ? 'liked' : 'haven\'t liked';
        const label = this.state.liked ? 'Unlike' : 'Like'

        let showPosts = this.state.posts.reverse().map(eachPost => {
            if (this.state.userData.user_id === eachPost.user_id) {
                return (
                    <div class="media border border-secondary p-3 m-1">
                        <img src={`http://127.0.0.1:5000/${eachPost.picture}`} class="mr-3" alt="..." width="100" height="100" />
                        <div class="media-body text-left">
                        <Link to={`/userdetails/${eachPost.user_id}`}> <h5 class="mt-0">{eachPost.name}</h5></Link>
                            <p>{eachPost.postsText}</p>
                            <img src={`http://127.0.0.1:5000/${eachPost.picture1}`} alt="post" class="mr-3" width="600" height="300" />
                            <div>
                                <button className=" offset-4  btn btn-primary" type="submit" >Edit Post</button>
                                <button className="  btn btn-danger ml-3" type="submit" >Delete Post</button>
                                
                            </div>
                        </div>
                    </div>  
                )
            }
            else {
                return (
                    <div class="media border border-secondary p-3 m-1">
                        <img src={`http://127.0.0.1:5000/${eachPost.picture}`} class="mr-3 rounded-circle" alt="" width="60" height="60" />
                        <div class="media-body text-left">
                        <Link to={`/userdetails/${eachPost.user_id}`}> <h5 class="mt-0">{eachPost.name}</h5></Link>
                            <p>{eachPost.postsText}</p>
                            <img src={`http://127.0.0.1:5000/${eachPost.picture}`} class="mr-3" width="600" height="300" alt="" />
                            <Link to={`/commentPost/${eachPost.post_id}`}><button type="submit" className="offset-4 btn btn-primary mt-3"> Comment On Post</button></Link>
                            <button className="btn btn-danger ml-3 mt-3" onClick={this.handleClick}>
                                    {label}</button>
                        </div>

                    </div>
                )
            }
        })
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-5">
                            {showPosts}
                           
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Posts;