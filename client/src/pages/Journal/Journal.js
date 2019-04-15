import React, { Component } from "react";
import { NavLink, Link, Redirect } from "react-router-dom";
import "./Journal.css";
import axios from "axios";
import logo from "../../components/Navbar/logo.svg";
import Navbar from "../../components/Navbar/Navbar";
import SignUp from "../SignUp/SignUp";
import Footer from "../../components/Footer/Footer";
import runicon1 from "../../images/runicon1.png";
import coffeeicon1 from "../../images/coffeeicon1.png";
import computericon1 from "../../images/computericon1.png";
import journalicon1 from "../../images/journalicon1.png";
import sleepicon1 from "../../images/sleepicon1.png";
import sunicon1 from "../../images/sunicon1.png";

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
            journals: []
        }
        this.submitJournal = this.submitJournal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.wordValue = this.wordValue.bind(this);
    }

  componentWillMount() {
    this.setState({
      user: this.props.user,
      username: this.props.user.username
    });
  }

  submitJournal(e) {
    e.preventDefault();
    const {
      user,
      username,
      _jtext,
      happiness,
      angriness,
      stressValue,
      sleepValue,
      exercise,
      nap,
      coffee,
      sun,
      computer
    } = this.state;
    axios
      .post("/api/submitJournal", {
        username,
        _jtext,
        happiness,
        angriness,
        stressValue,
        sleepValue,
        exercise,
        nap,
        coffee,
        sun,
        computer
      })
      .then(response => {
        console.log(response);
        this.setState({ success: true });
        // TODO: tell user the journal is submitted; redirect somewhere
      })
      .catch(error => {
        console.log(error.response.data.message);
        this.setState({ success: false, response: "Form submission failed." });
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }



  wordValue() {
    const { _jtext}  = this.state;
    var afinn = require('afinn-165');
    var words = _jtext.split(" ");
    var i;
    var sum = 0;
    var negsum = 0;
    var possum = 0;
    for (i = 0; i < words.length; i++){
        if (afinn[words[i]] != undefined) {
          sum += afinn[words[i]];
        }
        if (afinn[words[i]]>0){
              possum++;
        }
        if (afinn[words[i]]<0) {
            negsum++;
        }
    }
    console.log("sum: ", sum);
    console.log("negsum: ", negsum);
    console.log("possum: ", possum);
  }
    

	render() {
		return (
			<div>
				<Navbar />
        <div class="container">
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
          <ul class="journal-icons">
            <li class="journal-icon">
              <div className="checkcontainer">
                <input
                  type="checkbox"
                  name="exercise"
                  value="exercise"
                  id="exercise"
                  checked={this.state.exercise}
                  onChange={this.handleInputChange}
                />
                <label htmlFor="exercise">
                  <img src={runicon1} />
                </label>
                <div className="text"> Exercise</div>
              </div>
            </li>
            <li class="journal-icon">
              <div className="checkcontainer">
                <input
                  type="checkbox"
                  name="nap"
                  value="nap"
                  id="nap"
                  checked={this.state.nap}
                  onChange={this.handleInputChange}
                />
                <label htmlFor="nap">
                  <img src={sleepicon1} />
                </label>
                <div className="text"> nap</div>
              </div>
            </li>
            <li class="journal-icon">
              <div className="checkcontainer">
                <input
                  type="checkbox"
                  name="coffee"
                  value="coffee"
                  id="coffee"
                  checked={this.state.coffee}
                  onChange={this.handleInputChange}
                />
                <label htmlFor="coffee">
                  <img src={coffeeicon1} />
                </label>
                <div className="text"> coffee</div>
              </div>
            </li>
            <li class="journal-icon">
              <div className="checkcontainer">
                <input
                  type="checkbox"
                  name="sun"
                  value="sun"
                  id="sun"
                  checked={this.state.sun}
                  onChange={this.handleInputChange}
                />
                <label htmlFor="sun">
                  <img src={sunicon1} />
                </label>
                <div className="text"> outdoors</div>
              </div>
            </li>
            <li class="journal-icon">
              <div className="checkcontainer">
                <input
                  type="checkbox"
                  name="computer"
                  value="computer"
                  id="computer"
                  checked={this.state.computer}
                  onChange={this.handleInputChange}
                />
                <label htmlFor="computer">
                  <img src={computericon1} />
                </label>
                <div className="text"> Computer</div>
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
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={this.wordValue}
              className="btn btn-dark w-100"
            >
              Submit
            </button>
          </div>
        </form>
        {this.state.success && (
          <Redirect
            to={{
              pathname: "/feedback"
            }}
          />
        )}
        <Footer />
      </div>
      </div>
    );
  }
}

export default Journal;
