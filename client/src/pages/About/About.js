import React, { Component } from "react";
import { NavLink, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../../components/Navbar/Navbar';
import "./About.css";
import PropTypes from 'prop-types';
import Footer from "../../components/Footer/Footer";


function About(props) {
  const { classes } = props;

  return (
    <div>
      <Navbar />
      <h1>Therapy Journalling</h1>
      <Footer />
    </div>
  );
}


export default About;
