import React, { Component } from 'react';
import './Feedback.css';
import Navbar from '../../components/Navbar/Navbar';

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
                    <h1>My Feedback</h1>
                    </div>
                </div>
        </div>
        );
    }
}

export default Feedback;
