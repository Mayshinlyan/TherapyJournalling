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
      authenticated: null
    };
  }

  componentWillMount() {
    this.getJournal();
    this.setState({});
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
        console.log("helllooo" + response.data);
        return this.setState({
          journal: response.data
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ success: false, response: "View Form Failed" });
      });
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
              <p>{journal.journalText}</p>
              <p className="">
                {Utility.parseDate(journal.createdAt).month}/
                {Utility.parseDate(journal.createdAt).date}/
                {Utility.parseDate(journal.createdAt).year}
              </p>
            </div>

            {/* feedback */}
            <div>
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
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default ViewJournal;
