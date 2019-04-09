import React, { Component } from 'react';
import axios from 'axios';
import './Journal.css';
import Navbar from '../../components/Navbar/Navbar';
import Utility from '../../Utility';


class Journal extends Component {
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
                    <h1>Journal Entries</h1>
                    </div>
                </div>

        </div>

        );
    }
}

export default Journal;
