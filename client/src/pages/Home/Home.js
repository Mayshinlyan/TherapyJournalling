import React, { Component } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

class Home extends Component {
  componentWillMount() {}

  render() {
    return (
      <div class="wrapper">
        <Navbar />
        <div className="home" style={{ marginTop: "3em" }}>
          <div className="title">Welcome</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
