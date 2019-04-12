import React, { Component } from "react";
import { NavLink, Link, Redirect } from "react-router-dom";
import "./Journal.css";
import axios from 'axios';
import logo from "../../components/Navbar/logo.svg"
import Navbar from '../../components/Navbar/Navbar';
import SignUp from "../SignUp/SignUp";
import Footer from "../../components/Footer/Footer";

class Journal extends Component {
    constructor(props) {
        super(props);
        this.state = {
			      exercise: false,
            nap: false,
            coffee: false,
            sun: false,
            computer: false,
			      user: null,
            username: '',
            _jtext: '',
            happiness: 50,
            angriness: 50,
            stressValue: 50,
            sleepValue: 50,
            password: '',
            success: null,
            response: null,
            email: '',
            name: '',
            journals: [1, 2, 3]
        }
        this.submitJournal = this.submitJournal.bind(this);
		    this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            user: this.props.user,
            username: this.props.user.username
        });
    }


	submitJournal(e) {
		e.preventDefault();
		const {user, username, _jtext, happiness, angriness, stressValue, sleepValue, exercise, nap, coffee, sun, computer}  = this.state;
        axios.post('/api/submitJournal', { username, _jtext, happiness, angriness, stressValue, sleepValue, exercise, nap, coffee, sun, computer })
		.then(function(response) {
				console.log("response:", response.data);
				// TODO: tell user the journal is submitted; redirect somewhere
			}).catch(error => {
				console.log(error);
				// TODO: handle error
			});
	}

	handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }

	render() {
		return (
			<div>
				<Navbar />
				<h1>Therapy Journaling</h1>
				<form onSubmit={this.submitJournal}>
				<h2>How were your mood levels today?</h2>
          <div className="slidecontainer">
                <input
                  type="range"
                  min="1"
                  max="100"
                  className="slider1"
                  id="happySlide"
                  name="happiness"
                  onChange={this.handleInputChange}
                  value={this.state.value}
                />
          </div>
          <div className="slidecontainer">
                <input
                  type="range"
                  min="1"
                  max="100"
                  className="slider1"
                  id="stressSlide"
                  name="stressValue"
                  onChange={this.handleInputChange}
                  value={this.state.value}
                  />
          </div>
         <div className="slidecontainer">
                <input
                  type="range"
                  min="1"
                  max="100"
                  className="slider1"
                  id="angrySlide"
                  name="angriness"
                  onChange={this.handleInputChange}
                  value={this.state.value}
                  />
          </div>
        <h2> How did you sleep?</h2>
        <div className="slidecontainer">
                <input
                  type="range"
                  min="1"
                  max="100"
                  className="slider1"
                  id="sleepSlide"
                  name="sleepValue"
                  onChange={this.handleInputChange}
                  value={this.state.value}
                  />
          </div>
          <ul>
                <li>
                    <div className="container">
                        <input
                          type="checkbox"
                          name="exercise"
                          value="exercise"
                          id="exercise"
                          checked={this.state.exercise}
                          onChange={this.handleInputChange}/>
                         <label htmlFor="exercise"><img src="images/runicon1.png"/></label>
                        <div className="overlay">
                         <div className="text"> Exercise</div>
                        </div>
                    </div>
                </li>
            <li>
                    <div className="container">
                        <input
                          type="checkbox"
                          name="nap"
                          value="nap"
                          id="nap"
                          checked={this.state.nap}
                          onChange={this.handleInputChange}/>
                         <label htmlFor="nap"><img src="images/sleepicon1.png"/></label>
                        <div className="overlay">
                         <div className="text"> nap</div>
                        </div>
                    </div>
                </li>
            <li>
                    <div className="container">
                        <input
                          type="checkbox"
                          name="coffee"
                          value="coffee"
                          id="coffee"
                          checked={this.state.coffee}
                          onChange={this.handleInputChange}/>
                         <label htmlFor="coffee"><img src="images/coffeeicon1.png"/></label>
                        <div className="overlay">
                         <div className="text"> coffee</div>
                        </div>
                    </div>
                </li>
            <li>
                    <div className="container">
                        <input
                          type="checkbox"
                          name="sun"
                          value="sun"
                          id="sun"
                          checked={this.state.sun}
                          onChange={this.handleInputChange}/>
                         <label htmlFor="sun"><img src="images/sunicon1.png"/></label>
                        <div className="overlay">
                         <div className="text"> outdoors</div>
                        </div>
                    </div>
                </li>
              <li>
                    <div className="container">
                        <input
                          type="checkbox"
                          name="computer"
                          value="computer"
                          id="computer"
                          checked={this.state.computer}
                          onChange={this.handleInputChange}/>
                         <label htmlFor="computer"><img src="images/computericon1.png"/></label>
                        <div className="overlay">
                         <div className="text"> Computer</div>
                        </div>
                    </div>
                </li>
          </ul>
					<div>
						<textarea
							autoFocus
							rows="4"
							cols="50"
							name="_jtext"
							id="_jtext"
							value={this.state.value}
							onChange={this.handleInputChange}/>
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
