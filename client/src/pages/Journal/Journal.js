import React, { Component } from "react";
import { NavLink, Link, Redirect } from "react-router-dom";
import "./Journal.css";
import axios from 'axios';
import logo from "../../components/Navbar/logo.svg"
import Navbar from '../../components/Navbar/Navbar';
import SignUp from "../SignUp/SignUp";
import Footer from "../../components/Footer/Footer";
import './Journal.css'

class Journal extends Component {
    constructor(props) {
        super(props);
        this.state = {
			user: null,
            username: '',
			_jtext: '',
            password: '',
            success: null,
            response: null,
			email: '',
			name: ''
        }
        this.submitJournal = this.submitJournal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            user: this.props.user,
            username: this.props.user.username
        });
    }

	submitJournal(e) {
		e.preventDefault();
		const {user, username, _jtext}  = this.state;
        axios.post('/api/submitJournal', { username, _jtext })
		.then(function(response) {
				console.log("response:", response.data);
				// TODO: tell user the journal is submitted; redirect somewhere
			}).catch(error => {
				console.log(error);
				// TODO: handle error
			});
	}

	handleChange(e) {
		var t = document.getElementById('form-text').value;
		this.setState({
			_jtext: t
		});
	}

	render() {
		return (
			<div>
				<Navbar />
				<h1>Therapy Journalling</h1>
				<form onSubmit={this.submitJournal}>
					<div>
						<textarea autoFocus rows="4" cols="50" name="jtext" id="form-text" 
							onChange={this.handleChange}/>
					</div>
					<div>
					<button type="submit" className="btn btn-dark w-100">Submit</button>
					</div>
				</form>
				<Footer />
			</div>
		);
	}
}


export default Journal;
