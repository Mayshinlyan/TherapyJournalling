import React, { Component } from "react";
import { NavLink, Link, Redirect } from "react-router-dom";
import "./Home.css";
import Navbar from '../../components/Navbar/Navbar';
import Footer from "../../components/Footer/Footer";

class Home extends Component {


  componentWillMount() {


}

  render() {
    
    return (
      <div>
        <Navbar />
        <div class="container">
        <h1>Welcome!</h1>
        </div>
        <Footer />
      </div>
    );
  }
}


export default Home;
