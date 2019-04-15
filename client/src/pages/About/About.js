import React, { Component } from "react";
import "./About.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../../components/Navbar/Navbar';
import Footer from "../../components/Footer/Footer";


function About(props) {
  const { classes } = props;

  return (
    <div>
      <Navbar />
      <div class="container">
      <h1 class="h1">Our Story</h1>
      <h2>Background</h2>
      <p>Many people struggle with stress, anxiety, depression, and other mental illnesses but lack the resources 
        to help them manage their emotions. Therapy is a great tool, but isn’t an option for everyone due to financial 
        concerns, time constraints and the stigma around therapy. Journaling has been found to be 
        extremely helpful in one’s mood and can even boost the immune system and improve lung and liver functionality. 
        Moreover, it can improve working memory, result in better grades for students, and alter social and linguistic 
        behaviour. Although there are many benefits for journaling, many people journal but still get stuck in negative 
        thought patterns that inhibit their improvement. Negative thought patterns are a precursor to depression but 
        are possible to mediate with the right help.</p>
        
      <h2>TherapyJournaling</h2>
      <p>TherapyJournal allows you to maintain a private journal and receive automated feedback in order to
        enhance the journaling process, avoid negative thought patterns, and improve your wellbeing. Your account
        is private: no human will ever read your journals. We will ask you a few questions about your mood, sleep, and
        other activities for the day in order to help us give more tailored recommendations.</p>

      <h2>Resources</h2>
      <p>TherapyJournaling is not meant to be a replacement to traditional therapy, but rather an additional tool to utilize. </p>
      <p>Some resources related to suicide prevention, finding a therapist, and other crisis-related resources are listed below.</p>

      <ul class = "resources">
        <li>National Suicide Prevention Lifeline: 1-800-273-TALK (8255), Veterans Press 1</li>
        <li>Crisis Text Line: Text TALK to 741741</li>
        <li>IMAlive.org Instant Message Crisis: <a href="IMAlive.org">IMAlive.org</a></li>
        <li>The Trevor Project: 1-866-488-7386
          <ul>
            <li>Trevor Text: Text TREVOR to 1-202-304-1200</li>
            <li>Trevor Chat: <a href="www.thetrevorproject.org">www.thetrevorproject.org</a></li>
          </ul>
        </li>
        <li>RAINN (National Sexual Assault Hotline): 1-800-656-4673
          <ul>
            <li>Chat: <a href="hotline.rainn.org">hotline.rainn.org</a></li>
          </ul>
         </li>
        <li>National Eating Disorders Association: 1-800-931-2237
          <ul>
            <li>Chat: <a href="www.myneda.org">www.myneda.org</a></li>
          </ul>
        </li>
      </ul>

      </div>
      <Footer />
    </div>
  );
}


export default About;
