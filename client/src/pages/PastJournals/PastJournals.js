import React, { Component } from "react";
import "./PastJournals.css";
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from "../../components/Footer/Footer";

class PastJournals extends Component {
    constructor(props) {
        super(props);
        this.state = {
			user: null,
            username: '',
            name: '',
            journals: []
        }
    }

    componentWillMount() {
        this.setState({
            user: this.props.user,
            username: this.props.user.username
        });

        const username = this.props.user.username;
        
        axios.post('/api/getJournals', { username })
        .then((result) => {
          const newJournals = result.data.journals; 
          this.setState({
            journals: [...newJournals]
          })
        }).catch(error => {
          console.log(error);
        });
    }

	render() {
    const journals = this.state.journals;
		return (
			<div>
				<Navbar />
                <h1>Therapy Journaling</h1>
                <div>
                    {journals.map(function(journal, jid){
                        return (
                        <div className="past-journal" key={jid}>
                            <div>Created on: {journal.createdAt}</div>
                            <div>Journal text: {journal.journalText}</div>
                        </div>
                        )
                    })}
                </div>
				<Footer />
			</div>
		);
	}
}

export default PastJournals;
