import React, { Component } from "react";
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
        <div className="container">
        <h1>Welcome!</h1>
        </div>
        <Footer />
      </div>
    );
  }
}


export default Home;
