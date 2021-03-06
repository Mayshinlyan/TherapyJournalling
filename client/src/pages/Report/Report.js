import React, { Component } from "react";
import Plot from "react-plotly.js";
import "./Report.css";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import WordCloud from "react-d3-cloud";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: "",
      name: "",
      journals: [],
      happyX: [],
      angryX: [],
      stressedX: [],
      sleepX: [],
      happyY: [],
      angryY: [],
      stressedY: [],
      sleepY: [],
      happyMax: 0,
      happyMin: 0,
      angryMax: 0,
      angryMin: 0,
      stressMax: 0,
      stressMin: 0,
      sleepMax: 0,
      sleepMin: 0,
      happyAvg: 0,
      angryAvg: 0,
      stressAvg: 0,
      sleepAvg: 0,
      aggregatedJournals: "",
      wordRotate: null,
      fontSizeMapper: null,
      wordFreq: [],
      happy_exercise: '',
      happy_outdoors : '',
      happy_sleep: '',
      stress_exercise: '',
      stress_outdoors: '',
      stress_sleep: '',
      correlations: [],
      exercise: [],
      nap: [],
      coffee: [],
      sun: [],
      computer: [],
    };
  }

  componentWillMount() {
    this.setState({
      user: this.props.user,
      username: this.props.user.username
    });

    const username = this.props.user.username;
    //arrays for x, y of mood values for graphs
    const happyX = [],
      angryX = [],
      stressedX = [],
      sleepX = [];
    const happyY = [],
      angryY = [],
      stressedY = [],
      sleepY = [];
    const exercise = [],
      nap = [],
      coffee = [],
      sun = [],
      computer = [];
    var happyMax = 0, happyMin = 0, angryMax = 0, angryMin = 0,
      stressMax = 0, stressMin = 0, sleepMax = 0, sleepMin = 0;
    var happyAvg = 0, angryAvg = 0, stressAvg = 0, sleepAvg = 0;
      

    //get journal data
    axios
      .post("/api/allUserJournals", { username })
      .then(result => {
        const newJournals = result.data.journals;
        this.setState({
          journals: [...newJournals]
        });
        var aggregatedJournals = "";
        //populate mood arrays: x values can just be 0...length of array, y values are 0-100 vals entered by users
        for (var i = 0; i < newJournals.length; i++) {
          happyX[i] = i;
          angryX[i] = i;
          stressedX[i] = i;
          sleepX[i] = i;

          happyY[i] = newJournals[i].happiness;
          angryY[i] = newJournals[i].angriness;
          stressedY[i] = newJournals[i].stressValue;
          sleepY[i] = newJournals[i].sleepValue;

          exercise[i] = newJournals[i].exercise ? 1 : 0;
          nap[i] = newJournals[i].nap ? 1 : 0;
          coffee[i] = newJournals[i].coffee ? 1 : 0;
          sun[i] = newJournals[i].sun ? 1 : 0;
          computer[i] = newJournals[i].computer ? 1 : 0;

          aggregatedJournals += " " + newJournals[i].journalText;
        }
        happyMax = Math.max(...happyY);
        happyMin = Math.min(...happyY);
        angryMax = Math.max(...angryY);
        angryMin = Math.min(...angryY);
        stressMax = Math.max(...stressedY);
        stressMin = Math.min(...stressedY);
        sleepMax = Math.max(...sleepY);
        sleepMin = Math.min(...sleepY);

        const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
        happyAvg = Math.round(avg(happyY));
        angryAvg = Math.round(avg(angryY));
        stressAvg = Math.round(avg(stressedY));
        sleepAvg = Math.round(avg(sleepY));

        // this block got from https://stackoverflow.com/a/26877411/1883640
        var words = aggregatedJournals.split(" ");
        var freq = words.reduce(function(p, c) {
          p[c] = (p[c] || 0) + 1;
          return p;
        }, {});
        var freqMap = Object.keys(freq).map(function(key) {
          return { text: key, value: freq[key] };
        });
        const fontSizeMapper = word => Math.log2(word.value) * 15;
        const rotate = word => word.value % 360;
        //*******************************************************//
        //update state
        this.setState({
          happyX: [...happyX],
          angryX: [...angryX],
          stressedX: [...stressedX],
          sleepX: [...sleepX],

          happyY: [...happyY],
          angryY: [...angryY],
          stressedY: [...stressedY],
          sleepY: [...sleepY],

          exercise: [...exercise],
          nap: [...nap],
          coffee: [...coffee],
          sun: [...sun],
          computer: [...computer],

          fontSizeMapper: fontSizeMapper,
          wordRotate: rotate,
          wordFreq: [...freqMap],

          happyMax, 
          happyMin, 
          angryMax, 
          angryMin,
          stressMax, 
          stressMin, 
          sleepMax, 
          sleepMin,
          happyAvg,
          angryAvg,
          stressAvg,
          sleepAvg,
        });

        this.trends();
      })
      .catch(error => {
        console.log(error);
      });
  }

  trends() {
    var Correlation = require("node-correlation");
    var happy = this.state.happyY;
    var stress = this.state.stressedY;
    var sleep = this.state.sleepY;

    var exercise = this.state.exercise;
    var outdoors = this.state.sun;

    var happy_exercise = Correlation.calc(happy, exercise);
    var happy_sleep = Correlation.calc(happy, sleep);
    var happy_outdoors = Correlation.calc(happy, outdoors);
    var stress_exercise = Correlation.calc(stress, exercise);
    var stress_sleep = Correlation.calc(stress, sleep);
    var stress_outdoors = Correlation.calc(stress, outdoors);

    if (Math.abs(happy_exercise) > 0.5) {
      this.setState({
        happy_exercise:
          "Your happiness is correlated with when you exercise. Next time when you are feeling down consider doing a work out!"
      });
    }
    if (Math.abs(happy_sleep) > 0.5) {
      this.setState({
        happy_sleep:
          "Your happiness is correlated with when you get good sleep. You should focus on techniques to help you sleep better. Try and stay off your screens late at night!"
      });
    }
    if (Math.abs(happy_outdoors) > 0.5) {
      this.setState({
        happy_outdoors:
          "Your happiness is correlated with when you go outdoors. When you are having a bad day try getting out more!"
      });
    }
    if (Math.abs(stress_exercise) > 0.5) {
      this.setState({
        stress_exercise:
          "Your stress is correlated with when you exercise. Next time when you are feeling stressed consider doing a work out!"
      });
    }
    if (Math.abs(stress_sleep) > 0.5) {
      this.setState({
        stress_sleep:
          "Your stress is correlated with when you get good sleep. You should focus on techniques to help you sleep better. Try and stay off your screens late at night!"
      });
    }
    if (Math.abs(stress_outdoors) > 0.5) {
      this.setState({
        stress_outdoors:
          "Your stress is correlated with when you go outdoors. When you are having a stressful day try getting out more!"
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1>Report</h1>

          <ul className="reportNav">
            <li>
              <a href="#plot"> Graphs </a>
            </li>
            <li>
              <a href="#cor"> Correlations </a>
            </li>
            <li>
              <a href="#cloud"> Word Cloud </a>
            </li>
          </ul>
          <h2 id="plot">Moods Over Time</h2>
          <div className="row">
            <div className="col-lg-6">
              <Plot
                data={[
                  {
                    x: this.state.happyX,
                    y: this.state.happyY,
                    hoverlabel: { bgcolor: "white" },
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "#FBD558", symbol: "diamond" },
                    line: { color: "#33A1FB" }
                  }
                ]}
                layout={{
                  width: 600,
                  height: 400,
                  title: "Happiness",
                  xaxis: { showgrid: false, title: { text: "Journal Entry #" } },
                  yaxis: { title: { text: "Happiness Measure" }, range: [0, 100] }
                }}
              />
            </div>
            <div className="col-lg-6 graph-comment">
                <div>This is your self-reported <span className="blue">happiness</span> measure, graphed over time.</div>
                <div>Your <span className="blue">maximum</span> reported happiness level is <span className="blue">{this.state.happyMax}</span>.</div>
                <div>Your <span className="blue">minimum</span> reported happiness level is <span className="blue">{this.state.happyMin}</span>.</div>
                <div>Your happiness average is <span className="blue">{this.state.happyAvg}</span>.</div>
            </div>
          </div>{/* row */}
          
          <div className="row">
            <div className="col-lg-6 graph-comment">
                <div>This is your self-reported <span className="blue">anger</span> measure, graphed over time.</div>
                <div>Your <span className="blue">maximum</span> reported anger level is <span className="blue">{this.state.angryMax}</span>.</div>
                <div>Your <span className="blue">minimum</span> reported anger level is <span className="blue">{this.state.angryMin}</span>.</div>
                <div>Your anger average is <span className="blue">{this.state.angryAvg}</span>.</div>
            </div>
            <div className="col-lg-6">
            <Plot
              data={[
                {
                  x: this.state.angryX,
                  y: this.state.angryY,
                  hoverlabel: { bgcolor: "white" },
                  type: "scatter",
                  mode: "lines+markers",
                  marker: { color: "#FBD558", symbol: "diamond" },
                  line: { color: "#33A1FB" }
                }
              ]}
              layout={{
                width: 600,
                height: 400,
                title: "Anger",
                xaxis: { showgrid: false, title: { text: "Journal Entry #" } },
                yaxis: { title: { text: "Anger Measure" }, range: [0, 100] }
              }}
            />
            </div>

          </div>{/* row */}
          
          <div className="row">
            <div className="col-lg-6">
              <Plot
                data={[
                  {
                    x: this.state.stressedX,
                    y: this.state.stressedY,
                    hoverlabel: { bgcolor: "white" },
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "#FBD558", symbol: "diamond" },
                    line: { color: "#33A1FB" }
                  }
                ]}
                layout={{
                  width: 600,
                  height: 400,
                  title: "Stress",
                  xaxis: { showgrid: false, title: { text: "Journal Entry #" } },
                  yaxis: { title: { text: "Stress Measure" }, range: [0, 100] }
                }}
              />
              </div>
              <div className="col-lg-6 graph-comment">
                <div>This is your self-reported <span className="blue">stress</span> measure, graphed over time.</div>
                <div>Your <span className="blue">maximum</span> reported stress level is {this.state.stressMax}.</div>
                <div>Your <span className="blue">minimum</span> reported stress level is {this.state.stressMin}.</div>
                <div>Your stress average is <span className="blue">{this.state.stressAvg}</span>.</div>
              </div>
            </div>{/* row */}
          <div className="row">
            <div className="col-lg-6 graph-comment">
                <div>This is your self-reported <span className="blue">sleep</span> measure, graphed over time.</div>
                <div>Your <span className="blue">maximum</span> reported sleep value is <span className="blue"></span>{this.state.sleepMax}.</div>
                <div>Your <span className="blue">minimum</span> reported sleep value is <span className="blue"></span>{this.state.sleepMin}.</div>
                <div>Your sleep average is <span className="blue">{this.state.sleepAvg}</span>.</div>

            </div>
            <div className="col-lg-6">
              <Plot
                data={[
                  {
                    x: this.state.sleepX,
                    y: this.state.sleepY,
                    hoverlabel: { bgcolor: "white" },
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "#FBD558", symbol: "diamond" },
                    line: { color: "#33A1FB" }
                  }
                ]}
                layout={{
                  width: 600,
                  height: 400,
                  title: "Sleep",
                  xaxis: { showgrid: false, title: { text: "Journal Entry #" } },
                  yaxis: { title: { text: "Sleep Quality" }, range: [0, 100] }
                }}
              />
              </div>
          </div>{/* row */}
        </div>
        {/* container */}

  
        <div className = "correlations">
                <h2 id = "cor" >Correlations on activites and moods</h2>
                
                {this.state.happy_exercise === '' && this.state.happy_outdoors === '' && this.state.happy_sleep === '' && 
                this.state.stress_exercise === '' && this.state.stress_outdoors === '' && this.state.stress_sleep === '' ? 
                <div className="no-data">There are currently no correlations to show.</div> :

                <ul className="cor">
                {this.state.happy_exercise !== '' &&
                    <li>
                    <h3>Happiness and exercise</h3>
                    <p> {this.state.happy_exercise}</p>
                    </li>
                }
                {this.state.happy_outdoors !== '' &&
                    <li>
                    <h3>
                    <p>Happiness and outdoors</p>
                    </h3>{this.state.happy_outdoors}
                    </li>
                }
                {this.state.happy_sleep !== '' &&
                    <li>
                    <h3>Happiness and sleep</h3>
                    <p>{this.state.happy_sleep} </p>
                    </li>
                }
                {this.state.stress_exercise !== '' &&
                    <li>
                    <h3>Stress and exercise </h3>
                    <p> {this.state.stress_exercise}</p>
                    </li>
                }
                {this.state.stress_sleep !== '' &&
                    <li>
                    <h3>Stress and sleep</h3>
                    <p>{this.state.stress_sleep}</p>
                    </li>
                }
                {this.state.stress_outdoors !== '' &&
                    <li>
                    <h3>Stress and outdoors</h3>
                    <p>{this.state.stress_outdoors}</p>
                    </li>
                }
                </ul> 
                }
        
                </div>
                <div className = "wordCloud" id ="cloud">
                <h2> Word Cloud </h2>
                {this.state.wordFreq.length <= 1 ? 
                <div className="no-data">There is currently no journal data to show.</div> : 
                <WordCloud
                      data={this.state.wordFreq}
                      fontSizeMapper={this.state.fontSizeMapper}
                      rotate={this.state.wrodRotate}
                    />
                }  
                </div>

        <Footer />
      </div>
    );
  }
}

export default Report;
