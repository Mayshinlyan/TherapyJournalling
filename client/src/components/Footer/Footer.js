import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";


class Footer extends Component {
  render() {
    return (
      <footer id="myFooter">
        <div className="footer-copyright">
            <p className="mt-2">© Copyright TherapyJournal</p>
        </div>
    </footer>
    );
  }
}

export default Footer;
