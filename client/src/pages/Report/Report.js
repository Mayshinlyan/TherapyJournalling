import React, { Component } from "react";
import Plot from 'react-plotly.js';
import "./Report.css";
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from "../../components/Footer/Footer";


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
            sleepY: []
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
        
        //get journal data
        axios.post('/api/getJournals', { username })
        .then((result) => {
          const newJournals = result.data.journals; 
          this.setState({
            journals: [...newJournals]
          })
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
          }
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
          })
        }).catch(error => {
          console.log(error);
        });
    }


	render() {
		return (
			<div>
				<Navbar />
                <div className="container">
                <h1>Report</h1>
                <h2>Moods Over Time</h2>
                <div className="plot-container">
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
				<Footer />
			</div>
		);
	}
}

export default Report;
