import React, { Component } from "react";
import "./PastJournals.css";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

class PastJournals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: "",
      name: "",
      journals: []
    };
  }

  componentWillMount() {
    this.setState({
      user: this.props.user,
      username: this.props.user.username
    });

    const username = this.props.user.username;

    axios
      .post("/api/allUserJournals", { username })
      .then(result => {
        const newJournals = result.data.journals;
        this.setState({
          journals: [...newJournals]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const journals = this.state.journals;
    return (
      <div>
        <Navbar />
        <div className="page">
          <h1 className="past-header">Your Past Journals</h1>
          <div className="scroll">
            {journals.map(function(journal, jid) {
              return (
                <div className="past-journal" key={jid}>
                  <a href={"/journal/" + journal.shortId}>
                    <div>Created on: {journal.createdAt}</div>
                    <br />
                    <div>Journal text: {journal.journalText}</div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PastJournals;
