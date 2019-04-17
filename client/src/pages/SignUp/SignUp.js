import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './SignUp.css';
import { Redirect } from 'react-router-dom';
import Footer from "../../components/Footer/Footer";

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        email: '',
        name: '',
        success: null,
        response: null
    }
    this.submitFormOnClick = this.submitFormOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
}

submitFormOnClick(e) {
    e.preventDefault();
    const { username, password, email} = this.state;
    if (!username || !password || !email) {
        return this.setState({
            success: false,
            response: 'Please complete the form.'
        });
    }

    axios.post('/api/register', { username, password, email })
    .then(response => {
        this.setState({ success: true });
        window.location.reload();
    }).catch(error => {
        this.setState({ success: false, response: error.response.data.message });
    });
}

handleChange(e) {
    const values = this.state;
    values[e.target.name] = e.target.value;
    this.setState(values);
}

  render() {
    const { username, password, email } = this.state;
    return (
    <div>
        <Navbar />

        <div style={{marginTop: '4em'}} className="modal-dialog w-25" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title" id="registerModal">Register</h5>
                      <button type="button" className="close" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  {this.state.success === false && (
                      <div className="modal-body">
                          <p className="red-text">{this.state.response}</p>
                      </div>
                  )}

                  <form className = { this.state.auth } onSubmit={this.submitFormOnClick}>
                      <div className="modal-body">
                          <div className="md-form">
                              <input type="text" id="username-form"
                              className="form-control" name="username"
                              value={username} onChange={this.handleChange}/>
                              <label htmlFor="username-form">Username</label>
                          </div>
                          <div className="md-form">
                              <input type="text" id="email-form"
                              className="form-control" name="email"
                              value={email} onChange={this.handleChange}/>
                              <label htmlFor="email-form">Email</label>
                          </div>
                          <div className="md-form">
                              <input type="password" id="password-form"
                              className="form-control" name="password"
                              value={password} onChange={this.handleChange}/>
                              <label htmlFor="password-form">Password</label>
                          </div>
                      </div>

                      <div className="text-center pb-3">
                        <button type="submit" className="btn btn-dark">Submit</button>
                      </div> {/* end of modal footers */}
                     </form> {/* end of form */}
                </div>
                  { this.state.success && (
                      <Redirect to={{pathname: '/signin'}} />
                  )}
          </div> {/* end of modal dialog */}
          <Footer />
      </div>
  );
  }
}

export default SignUp;
