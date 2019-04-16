import React, { Component } from 'react';
import axios from 'axios';
import './Feedback.css';
import Navbar from '../../components/Navbar/Navbar';
import Utility from '../../Utility';
import Footer from "../../components/Footer/Footer";


class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        this.setState({

        });
    }


   

    render() {
        return (
            <div>
                <Navbar />
                <div className="page">
                <h1>Feedback</h1>
                </div>
                <Footer />
            </div>

        );
    }
}

export default Feedback;
