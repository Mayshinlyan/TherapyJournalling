import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import Journal from "./pages/Journal/Journal";
import PastJournals from "./pages/PastJournals/PastJournals";
import ViewJournal from "./pages/ViewJournal/ViewJournal";
import Report from "./pages/Report/Report";

class Routes extends Component {
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
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path="/journal"
            render={props =>
              this.state.user ? (
                <Journal user={this.state.user} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/pastjournals"
            render={props =>
              this.state.user ? (
                <PastJournals user={this.state.user} {...props} />
              ) : (
                <Redirect to="/signin" />
              )
            }
          />
          <Route
            exact
            path="/profile/:username"
            render={props =>
              this.state.user ? (
                <Profile user={this.state.user} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/journal/:shortId"
            render={props =>
              this.state.user ? (
                <ViewJournal user={this.state.user} {...props} />
              ) : (
                <ViewJournal {...props} />
              )
            }
          />
          <Route
            exact
            path="/report"
            render={props =>
              this.state.user ? (
                <Report user={this.state.user} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
