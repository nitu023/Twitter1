import React from 'react';
import Axios from 'axios';

class Comment extends React.Component{
    constructor(){
        super();
        this.state = {
            userData: JSON.parse(localStorage.getItem('userData')),
            Comment: '',
            commentData:[]
        }
    }
    

    inputChange = (inputData) => {
        this.setState({Comment: inputData.target.value})
    }

    inputSubmit = (dataSubmit) => {
        dataSubmit.preventDefault();
        Axios.post("http://127.0.0.1:5000/comment/"+ this.props.match.params.post_id,{
                user_id: this.state.userData.user_id,
                picture:this.state.userData.picture,
                name: this.state.userData.name,
                Comment: this.state.Comment,
                'Content-Type': 'application/json'
        })
        .then(response => {
            console.log(response.data)
            // window.location.reload(false)
            this.setState({Comment: ''})
        })
        .catch(error => {
            console.log(error)
        })
    }
    componentDidMount(){
        Axios.get("http://127.0.0.1:5000/comment_read/" + this.props.match.params.post_id)
        .then(response => {
            console.log(response.data)
            this.setState({commentData: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }
    render(){
        // console.log(this.state.userData.user_id)
        let commentPost = this.state.commentData.map(comment =>{
            return (
                <div>
                    <div class="media border border-secondary p-3 m-1 w-50">
                    <img src={`http://127.0.0.1:5000/${comment.picture}`} class="mr-3 rounded-circle" alt="..." width="100" height="100" />
                    <div class="media-body text-left">
                         <h5 class="mt-0">{comment.name}</h5>
                        <p>{comment.Comment}</p>
                    </div>
                   
                </div>
                </div>
            )
        })
        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form onSubmit={this.inputSubmit}>
                                <div class="form-group">
                                    <h2>Write Your Comment</h2>
                                    <textarea class="form-control w-50" rows="3" name="Comment" value={this.state.Comment} onChange={this.inputChange} required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                    {commentPost}
                </div>
            </React.Fragment>
        )
    }
}

export default Comment;