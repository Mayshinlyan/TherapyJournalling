import React, { Component } from 'react';
import axios from 'axios';
import './Feedback.css';
import Navbar from '../../components/Navbar/Navbar';
import Utility from '../../Utility';


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

        <div className="Top">
              <Navbar />
               <div style={{marginTop: '4.7em'}} className='container'>

                    <div className='jumbotron'>
                    <h1>Your Feedback</h1>
                    </div>
                </div>

        </div>

        );
    }
}

export default Feedback;
