import React, { Component } from "react";
import axios from "axios";
import "./Navbar.css";
import scrollToComponent from "react-scroll-to-component";
import logo from "../../images/logo.png";

import { NavLink } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      authenticated: null
    };
    this.authenticateUser = this.authenticateUser.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
  }

  componentWillMount() {
    this.authenticateUser();
  }

  loggedOut() {
    axios.get("/api/logout").then(response => {
      this.setState({
        user: {},
        authenticated: false
      });
      window.location.reload();
    });
  }

  authenticateUser() {
    axios
      .get("/api/user")
      .then(response => {
        return this.setState({
          user: response.data.user,
          authenticated: true
        });
      })
      .catch(error => {
        return this.setState({
          user: {},
          authenticated: false
        });
      });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              className="logo"
              alt="{logo}"
              width="60em"
              onClick={() =>
                scrollToComponent(this.Jumbotron, { offset: 0, duration: 1500 })
              }
            />
            TherapyJournal
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/about"
                  onClick={() =>
                    scrollToComponent(this.Projects, {
                      offset: 0,
                      align: "top",
                      duration: 1500
                    })
                  }
                >
                  Our Story
                </NavLink>
              </li>
              {this.state.user ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/journal"
                    onClick={() =>
                      scrollToComponent(this.Projects, {
                        offset: 0,
                        align: "top",
                        duration: 1500
                      })
                    }
                  >
                    Journal
                  </NavLink>
                </li>
              ) : (
                <li />
              )}
              {this.state.user ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/pastjournals"
                    onClick={() =>
                      scrollToComponent(this.Projects, {
                        offset: 0,
                        align: "top",
                        duration: 1500
                      })
                    }
                  >
                    Past Journals
                  </NavLink>
                </li>
              ) : (
                <li />
              )}
              {this.state.user ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={`/profile/${this.state.user.username}`}
                  >
                    {this.state.user.username}
                  </NavLink>
                </li>
              ) : (
                <li />
              )}
              {this.state.user ? (
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={this.loggedOut} to="/">
                    Logout
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signin">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;