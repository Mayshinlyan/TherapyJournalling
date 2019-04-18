import React, { Component } from "react";
import Plot from 'react-plotly.js';
import "./Report.css";
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from "../../components/Footer/Footer";
import WordCloud from 'react-d3-cloud';


class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            username: '',
            name: '',
            journals: [],
            happyX: [],
            angryX: [],
            stressedX: [], 
            sleepX: [],
            happyY: [],
            angryY: [],
            stressedY: [], 
            sleepY: [],
            aggregatedJournals: '',
            wordRotate: null,
            fontSizeMapper: null,
            wordFreq: [],
            happy_exercise: 'Your happiness and exercise have not been found to be correlated',
            happy_outdoors : 'Your happiness and outdoor time have not been found to be correlated',
            happy_sleep: 'Your happiness and sleep have not been found to be correlated',
            stress_excersie: 'Your stress and exercise have not been found to be correlated',
            stress_outdoors: 'Your stress and outdoor have not been found to be correlated',
            stress_sleep: 'Your stress and sleep have not been found to be correlated',
            correlations: [],
            exercise: [], 
            nap: [],
            coffee: [],
            sun: [],
            computer: []

        };
    }

    componentWillMount() {
        this.setState({
            user: this.props.user,
            username: this.props.user.username
        });

        const username = this.props.user.username;
        //arrays for x, y of mood values for graphs
        const happyX=[], angryX=[], stressedX=[], sleepX=[];
        const happyY=[], angryY=[], stressedY=[], sleepY=[];
        const exercise=[], nap=[], coffee=[], sun=[], computer = [];

        //get journal data
        axios.post('/api/getJournals', { username })
        .then((result) => {
          const newJournals = result.data.journals; 
          this.setState({
            journals: [...newJournals]
          })
          var aggregatedJournals = '';
          //populate mood arrays: x values can just be 0...length of array, y values are 0-100 vals entered by users
          for(var i=0; i<newJournals.length; i++) {
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

            aggregatedJournals += ' ' + newJournals[i].journalText;
          }
          
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
          })

          this.trends();
        }).catch(error => {
          console.log(error);
        });
        this.trends()

    }

    trends(){
        var Correlation = require('node-correlation');
        var happy = this.state.happyY;
        var excersie = this.state.exercise;
        var sleep = this.state.sleepY;
        var stress = this.state.stressedY;
        var outdoors = this.state.sun;
        
        var happy_exercise = Correlation.calc(happy, excersie);
        var happy_sleep = Correlation.calc(happy, sleep);
        var happy_outdoors = Correlation.calc(happy, outdoors);
        var stress_excersie = Correlation.calc(stress, excersie);
        var stress_sleep = Correlation.calc(stress, sleep);
        var stress_outdoors = Correlation.calc(stress, outdoors);
        var retStr="";
        if (Math.abs(happy_exercise) > .5){
            this.setState({
                happy_exercise: "Your happiness is correlated with when you exercise. Next time when you are feeling down consider doing a work out!"
            });
        }
        if (Math.abs(happy_sleep) > .5){
            this.setState({
                happy_sleep: "Your happiness is correlated with when you get good sleep. You should focus on techniques to help you sleep better. Try and stay off your screens late at night!"
        });
    }
        if (Math.abs(happy_outdoors)> .5){
            this.setState({
                happy_outdoors: "Your happiness is correlated with when you go outdoors. When you are having a bad day try getting out more!"
        });
        }
        if(Math.abs(stress_excersie)>.5){
            this.setState({
                stress_excersie: "Your stress is correlated with when you exercise. Next time when you are filling stressed consider doing a work out!"
        });
        }
        if (Math.abs(stress_sleep) > .5){
            this.setState({
                stress_sleep: "Your stress is correlated with when you get good sleep. You should focus on techniques to help you sleep better. Try and stay off your screens late at night!"
        });
        }
        if (Math.abs(stress_outdoors)> .5){
            this.setState({
                stress_outdoors: "Your stress is correlated with when you go outdoors. When you are having a stressful day try getting out more!"
        });
        }
    console.log(this.state.happy_exercise);
    }

	render() {
		return (
			<div>
				<Navbar />
                <div className="container">
                <h1>Report</h1>
                <ul className="reportNav">
                    <li><a href="#plot"> Graphs </a></li>
                    <li><a href="#cor"> Correlations </a></li>
                    <li><a href="#cloud"> Word Cloud </a></li>
                </ul>
                <h2 id="plot">Moods Over Time</h2>
                <div className="plot-container" >
                    <Plot
                        data={[
                        {
                            x: this.state.happyX,
                            y: this.state.happyY,
                            hoverlabel: {bgcolor: 'white'},
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: '#FBD558', symbol: 'diamond'},
                            line: {color: '#33A1FB'},
                            
                        }]}
                        layout={{width: 600, height: 400, title: 'Happiness', 
                        xaxis: {showgrid: false}, yaxis: {showgrid: false}}}
                    />
                </div>
                <div className="plot-container">
                    <Plot
                        data={[
                        {
                            x: this.state.angryX,
                            y: this.state.angryY,
                            hoverlabel: {bgcolor: 'white'},
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: '#FBD558', symbol: 'diamond'},
                            line: {color: '#33A1FB'},
                            
                        }]}
                        layout={{width: 600, height: 400, title: 'Anger', 
                        xaxis: {showgrid: false}, yaxis: {showgrid: false}}}
                    />
                </div>
                <div className="plot-container">
                    <Plot
                        data={[
                        {
                            x: this.state.stressedX,
                            y: this.state.stressedY,
                            hoverlabel: {bgcolor: 'white'},
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: '#FBD558', symbol: 'diamond'},
                            line: {color: '#33A1FB'},
                            
                        }]}
                        layout={{width: 600, height: 400, title: 'Stress', 
                        xaxis: {showgrid: false}, yaxis: {showgrid: false}}}
                    />
                </div>
                <div className="plot-container">
                    <Plot
                        data={[
                        {
                            x: this.state.sleepX,
                            y: this.state.sleepY,
                            hoverlabel: {bgcolor: 'white'},
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: '#FBD558', symbol: 'diamond'},
                            line: {color: '#33A1FB'},
                            
                        }]}
                        layout={{width: 600, height: 400, title: 'Sleep', 
                        xaxis: {showgrid: false}, yaxis: {showgrid: false}}}
                    />
                </div>
                </div>{/* container */}
                <div className = "correlations">
                <h2 id = "cor" >Correlations on activites and moods</h2>
                
                 <ul className="cor">
                    <li>
                    <h3>
                        Happiness and excersie
                    </h3>
                    <p> {this.state.happy_exercise}</p>
                    </li>
                    <li>
                    <h3>
                    <p>Happiness and outdoors</p>
                    </h3>{this.state.happy_outdoors}</li>
                    <li>
                    <h3>
                        Happiness and Sleep
                    </h3>
                    <p>{this.state.happy_sleep} </p>
                    </li>
                    <li>
                    <h3>
                      Stress and excersie 
                    </h3>
                    <p> {this.state.stress_excersie}</p>
                    </li>
                    <li>
                    <h3>
                        Stress and Sleep
                    </h3>
                    <p>{this.state.stress_sleep}</p>
                    </li>
                    <li>
                    <h3>
                        Stress and outdoors
                    </h3>
                    <p>{this.state.stress_outdoors}</p>
                    </li>

                </ul> 
                        
                </div>
                <div className = "wordCloud" id ="cloud">
                <h2> Word Cloud </h2>
                    <WordCloud
                      data={this.state.wordFreq}
                      fontSizeMapper={this.state.fontSizeMapper}
                      rotate={this.state.wrodRotate}
                    />
                </div>
             
				<Footer />
			</div>
		);
	}
}

export default Report;
