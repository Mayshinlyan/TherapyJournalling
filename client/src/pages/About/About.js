import React, { Component } from "react";
import { NavLink, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../../components/Navbar/Navbar';
import "./About.css";
import PropTypes from 'prop-types';
import Footer from "../../components/Footer/Footer";


function About(props) {
  const { classes } = props;

  return (
    <div>
      <Navbar />
      <div style={{marginTop: '4.7em'}} className='container profile'>
      <div className='jumbotron'>
      <h1>Therapy Journaling</h1>
      <br></br>
      <p>	Many people struggle with stress, anxiety, depression, and other mental illnesses but lack the resources to help them manage their emotions. Therapy is a great tool but isn’t an option for everyone due to financial concerns as well as the stigma around therapy. In addition for a lot of people, including one of the most stressed populations, college students, access to therapy is very limited. Journaling has been found to be extremely helpful in one’s mood and can even boost the immune system and improve lung and liver functionality. Moreover, it can improve working memory, result in better grades for students, and alter social and linguistic behaviour. Although there are many benefits for journaling, many people journal but still get stuck in negative thought patterns that inhibit their improvement. Negative thought patterns are a precursor to depression but are possible to mediate with the right help. There are popular journaling app like DayOne, Momento, and TheraChat but they do not have features to provide feedback to journals. Although some of them have access to therapist, these features are not free. 
      <br/><br/>
      Our website allows users to have private journals and receive automated feedback on their journaling in order in enhance the process and improve their wellbeing. We ask the user about their mood before journaling as well as few questions about their activities and then allow them to write as little or as much as they want. With the information from their day, mood, and journaling we can collect data about what things make them have certain moods. For example, if someone often says they are happy on days when they also report that they exercised, we can suggest to the user that exercising is linked to their wellbeing. Another example is if they report that they are angry and in that journal entry they use lots of negative words and that does not result in a positive mood change, we could suggest that they aim for more positive words. In addition, we search their journals for negative thought patterns and give them tips to alleviate those problems and help them reframe their thinking. We have charts for the users to be able to see how their mood fluctuates with many other factors so they can understand their emotions better. 
      <br/><br/>
      </p>
      </div>
      </div>
      <Footer />
    </div>
  );
}


export default About;
