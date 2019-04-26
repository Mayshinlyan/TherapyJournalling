import React, { Component } from "react";
import "./ViewJournal.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Utility from "../../Utility";
import runicon1 from "../../images/runicon1.png";
import coffeeicon1 from "../../images/coffeeicon1.png";
import computericon1 from "../../images/computericon1.png";
import sleepicon1 from "../../images/sleepicon1.png";
import sunicon1 from "../../images/sunicon1.png";
import Footer from "../../components/Footer/Footer";

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
        "You seem pretty happy.",
      angry:
        "You aren't too angry.",
      stress:
        "You don't seem very stressed.",
      sleep:
        "You seem like you slept pretty well.",
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
          "You dont seem too angry."
      });
    }
  }

  stress() {
    var stress = this.state.stressnum;

    if (stress>75) {
      this.setState({
        stress:
          "You seem very stressed today. Maybe try meditation. You can also try checking out these resources: https://www.adaa.org/netforum/findatherapist."
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
          "You don't seem too stressed."
      });
    }
  }

  sleep() {
    var sleep = this.state.sleepnum;

    if (sleep<25) {
      this.setState({
        sleep:
          "You didn't sleep very well today. Try turning off all screens 1 hour before bed or meditation. You can also try checking out these resourses: https://www.sleepassociation.org/."
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
          "Your sleep seems okay."
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

              <div className="journal">
              <p className="">
                {Utility.parseDate(journal.createdAt).month}/
                {Utility.parseDate(journal.createdAt).date}/
                {Utility.parseDate(journal.createdAt).year}
              </p>
              <p>{journal.journalText}</p>
              </div>
              <br/>

              <h2>Feedback:</h2>

              <div className="sliders">
                <li>
                <h3>Happiness</h3>
                <p> {this.state.happy}</p>
                <p className="styled"><progress max="100" value={journal.happiness}></progress></p>
                </li>
              </div>
              <div className="sliders">
                  <li>
                  <h3>Angriness</h3>
                  <p> {this.state.angry}</p>
                  <p className="styled"><progress max="100" value={journal.angriness}></progress></p>
                  </li>
              </div>
              <div className="sliders">
                  <li>
                  <h3>Stress</h3>
                  <p> {this.state.stress}</p>
                  <p className="styled"><progress max="100" value={journal.stressValue}></progress></p>
                  </li>
              </div>
              <div className="sliders">
                  <li>
                  <h3>Sleep</h3>
                  <p> {this.state.sleep}</p>
                  <p className="styled"><progress max="100" value={journal.sleepValue}></progress></p>
                  </li>
              </div>
              <div className="sliders">
                  <li>
                  <h3>Sentiment</h3>
                  <p>We have calculated the overal sentiment of you're journal entry. This accounts for positivity and negativity in your journal. The farther along your bar is, the more positive you were!</p>
                  <p className="styled"><progress max="2" value={journal.tsentiment+1}></progress></p>
                  </li>
              </div>

              
            </div>
            <div className="sliders">
            <li>
            <h3>Activities</h3>
            

                  {journal.coffee.toString() === 'false' && journal.exercise.toString() === 'false' && journal.nap.toString() === 'false' && journal.coffee.toString() === 'false' && journal.computer.toString() == 'false' && journal.sun.toString() === 'false' ? 

                  <p>You did no activities this day.</p>:
                  
                  <ul>
                    {journal.exercise.toString() === 'true' &&
                    <li>
                    <img src={runicon1} alt="Run"/>
                    </li>
                    }
                    {journal.nap.toString() === 'true' &&
                    <li>
                    <img src={sleepicon1} alt="Sleep"/>
                    </li>
                    }
                    {journal.coffee.toString() === 'true' &&
                    <li>
                    <img src={coffeeicon1} alt="Coffee"/>
                    </li>
                    }
                    {journal.computer.toString() === 'true' &&
                    <li>
                    <img src={computericon1} alt="Computer"/>
                    </li>
                    }
                    {journal.sun.toString() === 'true' &&
                    <li>
                    <img src={sunicon1} alt="Sun"/>
                    </li>
                    }
                  </ul>
                  
                  }  
                  </li>
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
          <Footer />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default ViewJournal;
