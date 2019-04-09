import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
import './SignIn.css'

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            success: null,
            response: null
        }
        this.submitFormOnClick = this.submitFormOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitFormOnClick(e) {
        e.preventDefault();
        const { username, password } = this.state;

        axios.post('/api/login', { username, password })
        .then(response => {
            this.setState({ success: true });
            // todo: hash password
            console.log(response);
            window.location.reload();
        }).catch(error => {
            this.setState({ success: false, response: "Invalid credentials." });
        });
    }

    handleChange(e) {
        const values = this.state;
        values[e.target.name] = e.target.value;
        this.setState(values);
    }

    render () {
        const { username, password } = this.state;
        return (
          <div class="darkBg">
             <Navbar />
                <div style={{marginTop: '2em'}} className="modal-dialog w-25" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModal">Login</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        {/* <span className="pr-3 pl-3"><hr></hr></span> */}
                        {this.state.success === false && (
                            <div className="modal-body">
                                <p className="red-text">{this.state.response}</p>
                            </div>
                        )}


                        <form onSubmit={this.submitFormOnClick}>
                            <div className="modal-body">
                                <div className="md-form">
                                    <input type="text" id="username-form"
                                    className="form-control" name="username"
                                    value={username} onChange={this.handleChange}/>
                                    <label htmlFor="username-form">Username</label>
                                </div>
                                <div className="md-form">
                                    <input type="password" id="password-form"
                                    className="form-control" name="password"
                                    value={password} onChange={this.handleChange}/>
                                    <label htmlFor="password-form">Password</label>
                                </div>
                                <div className="mb-3 text-center" >
                                    <button type="submit" className="btn btn-dark w-100">Submit</button>
                                </div>
                                <span>Don't have an account?<a href="/signup"> Signup here. </a></span>
                            </div>
                        </form>
                        {this.state.success && (
                            <Redirect to={{pathname: '/'}} />
                        )}
                    </div> {/* end of modal dialog */}
                </div> {/* end of form */}

               <Footer />
            </div>
        );
    }
}

export default SignIn;
