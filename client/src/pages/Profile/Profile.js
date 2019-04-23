import React, { Component } from "react";
import axios from "axios";
import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: "",
      curPassword: "",
      newPassword: "",
      email: "",
      name: ""
    };
    this.submitFormOnClick = this.submitFormOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      user: this.props.user,
      username: this.props.user.username,
      curPassword: "",
      newPassword: "",
      email: this.props.user.email,
      name: this.props.user.name
    });
  }

  submitFormOnClick(e) {
    e.preventDefault();
    const { username, curPassword, email, name } = this.state;
    // Handle incomplete form
    if (!username || !email || !name) {
      return this.setState({
        success: false,
        response: "Please complete the form."
      });
    }
    if (!curPassword) {
      return this.setState({
        success: false,
        response: "Password needed to change profile details."
      });
    }

    axios
      .post("/api/updateUser", { username, curPassword, email, name })
      .then(response => {
        console.log(response.data);
        this.setState({
          success: true,
          user: response.data.data,
          username: response.data.data.username,
          name: response.data.data.name,
          email: response.data.data.email
        });
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          success: false,
          response: error.response.data.message
        });
      });
  }

  // Get value of input fields and assign to state
  handleChange(e) {
    const values = this.state;
    values[e.target.name] = e.target.value;
    this.setState(values);
  }

  render() {
    const dbusername = this.state.user.username;
    const dbemail = this.state.user.email;
    const { username, email, curPassword } = this.state;
    return (
      <div className="Top">
        <Navbar />
        <div style={{ marginTop: "4.7em" }} className="container profile">
          <div className="jumbotron">
            <h4 className="card-title">Username: {dbusername}</h4>
            <p className="card-text">Email: {dbemail}</p>
            <a
              className="btn btn-dark"
              data-toggle="collapse"
              href="#editForm"
              aria-expanded="false"
              aria-controls="editForm"
            >
              Edit
            </a>
          </div>
          {this.state.success === false && (
            <div className="modal-body">
              <p className="red-text">{this.state.response}</p>
            </div>
          )}
          <div className="collapse" id="editForm">
            <div className="card card-body">
              <form onSubmit={this.submitFormOnClick}>
                <div className="modal-body">
                  <div className="">
                    <label className="profileFormLabel" htmlFor="username">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="">
                    <label className="profileFormLabel" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="">
                    <label className="profileFormLabel" htmlFor="curPassword">
                      Password
                    </label>
                    <input
                      type="password"
                      id="curPassword"
                      className="form-control"
                      name="curPassword"
                      value={curPassword}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="flex-row">
                    <button type="submit" className="btn btn-dark">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>{" "}
          {/* end of collapse */}
        </div>{" "}
        {/* end of profile */}
      </div>
    );
  }
}

export default Profile;
