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
                <Plot
                    data={[
                    {
                        x: this.state.happyX,
                        y: this.state.happyY,
                        type: 'scattergl',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    }]}
                    layout={{width: 320, height: 240, title: 'Happiness'}}
                />

                <Plot
                    data={[
                    {
                        x: this.state.angryX,
                        y: this.state.angryY,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    }]}
                    layout={{width: 320, height: 240, title: 'Angriness'}}
                />  

                <Plot
                    data={[
                    {
                        x: this.state.stressedX,
                        y: this.state.stressedY,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    }]}
                    layout={{width: 320, height: 240, title: 'Stress'}}
                />  

                <Plot
                    data={[
                    {
                        x: this.state.sleepX,
                        y: this.state.sleepY,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    }]}
                    layout={{width: 320, height: 240, title: 'Sleep'}}
                />  
                </div>
				<Footer />
			</div>
		);
	}
}

export default Report;
