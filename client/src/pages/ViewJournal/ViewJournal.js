import React, { Component } from "react";
import "./ViewJournal.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Utility from "../../Utility";

class ViewJournal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journal: null,
      success: null,
      response: null,
      authenticated: null,
      happynum: null,
      angrynum: null,
      stressnum: null,
      sleepnum: null,
      happy:
        "Your happiness level is good",
      angry:
        "Your angriness level is good",
      stress:
        "Your stress level is good",
      sleep:
        "Your sleep level is good",
      
    };
  }

  componentWillMount() {
    this.setState({});
    const shortId = this.props.match.params.shortId;
    console.log("/api/journal/" + shortId);
    axios
      .get("/api/journal/" + shortId)
      .then(response => {
        console.log("helllooo" + response.data);
        this.setState({
          journal: response.data,
          happynum: response.data.happiness,
          angrynum: response.data.angriness,
          stressnum: response.data.stressValue,
          sleepnum: response.data.sleepValue
        });
        console.log(this.state.happynum);
        console.log(this.state.angrynum);
        console.log(this.state.stressnum);
        console.log(this.state.sleepnum);
        this.happy();
        this.angry();
        this.stress();
        this.sleep();
      })
      .catch(error => {
        console.log(error);
        this.setState({ success: false, response: "View Form Failed" });
      });
  }

  /**
   * fetch the journal
   */
  getJournal() {
    const shortId = this.props.match.params.shortId;
    console.log("/api/journal/" + shortId);
    axios
      .get("/api/journal/" + shortId)
      .then(response => {
        return this.setState({
          journal: response.data
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ success: false, response: "View Form Failed" });
      });
  }

  happy() {
    var happy = this.state.happynum;

    if (happy<25) {
      this.setState({
        happy:
          "You dont seem very happy today. Try checking out these resources: ____"
      });
    }
    console.log(this.state.happynum);
  }

  angry() {
    var angry = this.state.angrynum;

    if (angry>75) {
      this.setState({
        angry:
          "You seem very angry today. Maybe try mediattion or listening to calming music. You can also try checking out these resourses: ____"
      });
    }
    console.log(angry);
  }

  stress() {
    var stress = this.state.stressnum;

    if (stress>75) {
      this.setState({
        stress:
          "You seem very stressed today. Maybe try mediattion. You can also try checking out these resourses: ____"
      });
    }
    console.log(stress);
  }

  sleep() {
    var sleep = this.state.sleepnum;

    if (sleep<25) {
      this.setState({
        sleep:
          "You didn't sleep very well today. Try turning off all screens 1 hour before bed or meditation. You can also try checking out these resourses: ____"
      });
    }
    console.log(sleep);
  }


  render() {
    if (this.state.journal && this.state.journal !== "deleted") {
      const { journal } = this.state;
      console.log(journal);

      return (
        <div className="Top">
          <Navbar />
          <div className="container">
            {/* journal */}
            <div className="">
              <h1>{journal.username}'s Journal</h1>
              <p className="">
                {Utility.parseDate(journal.createdAt).month}/
                {Utility.parseDate(journal.createdAt).date}/
                {Utility.parseDate(journal.createdAt).year}
              </p>
              
              <h2>Feedback:</h2>

              <div className="sliders">
                <li>
                <h3>Happiness</h3>
                <p> {this.state.happy}</p>
                </li>
              </div>
              <div className="sliders">
                  <li>
                  <h3>Angriness</h3>
                  <p> {this.state.angry}</p>
                  </li>
              </div>
              <div className="sliders">
                  <li>
                  <h3>Stress</h3>
                  <p> {this.state.stress}</p>
                  </li>
              </div>
              <div className="sliders">
                  <li>
                  <h3>Sleep</h3>
                  <p> {this.state.sleep}</p>
                  </li>
              </div>

              
              <p>{journal.journalText}</p>
            </div>

            

            {/* feedback */}
            {/* <div>
              <h1>Your Feedback</h1>
              <h4>
                <li>Anger: {journal.angriness}</li>
                <li>Happiness: {journal.happiness}</li>
                <li>Stress: {journal.stressValue}</li>
                <li>Sleep: {journal.sleepValue}</li>
                <li>Coffee: {journal.coffee.toString()}</li>
                <li>Computer: {journal.computer.toString()}</li>
                <li>Nap: {journal.nap.toString()}</li>
                <li>Sun: {journal.sun.toString()}</li>
                <li>Exercise: {journal.exercise.toString()}</li>
              </h4>
            </div> */}

            

          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default ViewJournal;
