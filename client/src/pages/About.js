import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import "./Home.css";
import "../components/Button/Button.css";
import Navbar from "../components/Navbar/Navbar";
import Jumbotron from "../components/Jumbotron/Jumbotron";

class About extends Component {
  constructor() {
    super();
    // this.state = {
    //   isHidden: true,
    //   posts: [],
    //   redirect: false
    // };
  }

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to="/" />;
    // }
    // let posts = [];
    // if (this.state) {
    //   posts = this.state.posts;
    // }

    return (
      <div>
        <Navbar />

      </div>
    );
  }
}

export default About;
