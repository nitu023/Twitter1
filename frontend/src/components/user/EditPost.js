import React from 'react';
import Axios from 'axios';

class PostEdit extends React.Component{
    constructor(){
        super();
        this.state = {
            userData: JSON.parse(localStorage.getItem('userData')),
            postsText: '',
            picture1: ''
        }
    }

    inputChange = (inputData) => {
        this.setState({postsText: inputData.target.value})
    }

    inputPicture = (e) => {
        this.setState({picture1:e.target.files[0]})
    }

    inputSubmit = (dataSubmit) => {
        dataSubmit.preventDefault();
        const formData = new FormData();
        formData.append('picture1',this.state.picture1)

        Axios.post("http://127.0.0.1:5000/posts/create", formData, {
            headers: {
                postsText: this.state.postsText,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data)
            // window.location.reload(false)
            this.setState({postsText: '', picture1: ''})
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        // console.log(this.state.userData.user_id)
        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form onSubmit={this.inputSubmit}>
                                <div class="form-group">
                                    <h2>Edit Your Thoughts</h2>
                                    <textarea class="form-control w-50" rows="3" name="postsText" value={this.state.postsText} onChange={this.inputChange} required></textarea>
                                </div>
                                <div class="form-group">
                                    <input type="file" class="form-control-file" name="picture1" onChange={this.inputPicture} />
                                </div>
                                <button type="submit" className="btn btn-primary">Edit My Thoughts</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PostEdit;