import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom'

class UserPosts extends React.Component{
    constructor(){
        super();
        this.state = {
            userData: JSON.parse(localStorage.getItem('userData')),
            posts: []
        }
    }

    componentDidMount(){
        Axios.get("http://127.0.0.1:5000/user/posts/" + this.state.userData.user_id)
        .then(response => {
            // console.log(response.data)
            this.setState({posts: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    Deleteblog = (post_id) => {
        Axios.delete('http://127.0.0.1:5000/delete-post/' + post_id, {
          headers: {
            user_id: this.state.userData.user_id
          }
        })
          .then((res) => {
            console.log(res.data)
            // this.props.history.push(`/Profile/${this.state.user_id}`)
            window.location.reload(false)
          })
          .catch((error) => alert(error))
      }

    render(){
        console.log(this.state.posts)

        let showPosts = this.state.posts.map(eachpost => {
            return(
                <div class="media border border-secondary p-3 m-1">
                    <img src={`http://127.0.0.1:5000/${eachpost.picture}`} class="mr-3 rounded-circle" alt="..." width="100" height="100" />
                    <div class="media-body text-left">
                        <h5 class="mt-0">{eachpost.name}</h5>
                        <p>{eachpost.postsText}</p>
                        <img src={`http://127.0.0.1:5000/${eachpost.picture1}`} class="mr-3" width="400" height="300" />
                        <div className="ml-2">
                        <Link to={`/PostEdit/${eachpost.post_id}`}><button   type="submit" className="offset-2 btn btn-primary mt-3"> Edit Post</button></Link>                       
                        <button  className=" ml-3 btn btn-danger mt-3" type="submit" onClick={() => this.Deleteblog(eachpost.post_id)}> Delete Post </button>
                        </div>
                    </div>
                </div>
            )
        })

        return(
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

export default UserPosts;