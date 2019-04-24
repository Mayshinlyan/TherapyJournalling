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
      possum: null,
      negsum: null,
      sum: null,
      _jtext: '',
      happy:
        "Your happiness level is good",
      angry:
        "Your angriness level is good",
      stress:
        "Your stress level is good",
      sleep:
        "Your sleep level is good",
      tsadness: null,
      tjoy: null,
      tfear:  null,
      tdisgust: null,
      tanger: null,
      tsentiment: null 
    };
  }

  componentWillMount() {
    this.setState({});
    const shortId = this.props.match.params.shortId;
    console.log("/api/journal/" + shortId);
    axios
      .get("/api/journal/" + shortId)
      .then(response => {
        this.setState({
          journal: response.data,
          happynum: response.data.happiness,
          angrynum: response.data.angriness,
          stressnum: response.data.stressValue,
          sleepnum: response.data.sleepValue,
          _jtext: response.data.journalText,
          tsadness: response.data.tsadness,
          tjoy: response.data.tjoy,
          tfear:  response.data.tfear,
          tdisgust: response.data.tdisgust,
          tanger: response.data.tanger,
          tsentiment: response.data.tsentiment
        });

        this.happy();
        this.angry();
        this.stress();
        this.sleep();
        this.wordValue();
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
          "You dont seem very happy today. Try checking out this therapy resource: https://www.adaa.org/netforum/findatherapist"
      });
    }
    else if (happy<50) {
      this.setState({
        happy:
          "You dont seem very happy today."
      });
    }
    else if (happy<75) {
      this.setState({
        happy:
          "You happiness is okay today."
      });
    }
  }

  angry() {
    var angry = this.state.angrynum;

    if (angry>75) {
      this.setState({
        angry:
          "You seem very angry today. Maybe try meditation or listening to calming music."
      });
    }
    else if (angry>50) {
      this.setState({
        angry:
          "You seem pretty angry today. Maybe try meditation or listening to calming music."
      });
    }
    else if (angry>25) {
      this.setState({
        angry:
          "You dont seem too angry today."
      });
    }
  }

  stress() {
    var stress = this.state.stressnum;

    if (stress>75) {
      this.setState({
        stress:
          "You seem very stressed today. Maybe try meditation. You can also try checking out these resources: https://www.adaa.org/netforum/findatherapist"
      });
    }
    else if (stress>50) {
      this.setState({
        stress:
          "You seem very stressed today. Maybe try meditation."
      });
    }
    else if (stress>25) {
      this.setState({
        stress:
          "You dont seem too stressed today."
      });
    }
  }

  sleep() {
    var sleep = this.state.sleepnum;

    if (sleep<25) {
      this.setState({
        sleep:
          "You didn't sleep very well today. Try turning off all screens 1 hour before bed or meditation. You can also try checking out these resourses: https://www.sleepassociation.org/"
      });
    }
    else if (sleep<50) {
      this.setState({
        sleep:
          "You didn't sleep very well today. Try turning off all screens 1 hour before bed or meditation."
      });
    }
    else if (sleep<75) {
      this.setState({
        sleep:
          "Your sleep seems okay today."
      });
    }
  }

    wordValue() {
    // const { _jtext}  = this.state._jtext;
    // console.log(_jtext);
    var afinn = require('afinn-165');
    var words = this.state._jtext.split(" ");
    console.log(words);
    var i;
    var sum = 0;
    var negsum = 0;
    var possum = 0;
    for (i = 0; i < words.length; i++){
        if (afinn[words[i]] !== undefined) {
          sum += afinn[words[i]];
        }
        if (afinn[words[i]]>0){
              possum++;
        }
        if (afinn[words[i]]<0) {
            negsum++;
        }
    }
    this.setState({
      possum: possum,
      negsum: negsum,
      sum: sum
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
            <div className="">
              <h1>{journal.username}'s Journal</h1>
              <br/>
              <p className="">
                {Utility.parseDate(journal.createdAt).month}/
                {Utility.parseDate(journal.createdAt).date}/
                {Utility.parseDate(journal.createdAt).year}
              </p>
              
              <p>{journal.journalText}</p>

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
              <div className="sliders">
                  <li>
                  <h3>Positive Words</h3>
                  <p> You used {this.state.possum} positive words in this journal entry.</p>
                  </li>
              </div>
              <div className="sliders">
                  <li>
                  <h3>Negative Words</h3>
                  <p> You used {this.state.negsum} negative words in this journal entry.</p>
                  </li>
              </div>
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
