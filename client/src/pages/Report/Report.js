import React, { Component } from "react";
import "./Report.css";
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from "../../components/Footer/Footer";

class Report extends Component {
    constructor(props) {
        super(props);
        
    }

    componentWillMount() {
      
    }

	render() {
    
		return (
			<div>
				<Navbar />
                <div class="container">
                <h1>Report</h1>
       
                </div>
				<Footer />
			</div>
		);
	}
}

export default Report;
