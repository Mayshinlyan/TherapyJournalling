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
        <div className="home">
        <div className="title">Welcome</div>
        </div>
        <Footer />
      </div>
    );
  }
}


export default Home;
