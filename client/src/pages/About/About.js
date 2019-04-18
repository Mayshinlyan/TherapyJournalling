import React from "react";
import "./About.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../../components/Navbar/Navbar';
import Footer from "../../components/Footer/Footer";

function About(props) {
  return (
    <div>
      <Navbar />
      <div className="container">
      <h1>Our Story</h1>
          <div className="row">
              <div className="col-lg-7">
                <h2 className="about-h2">Journaly: your personalized journaling journey</h2>
                <p className="about-p">Many people struggle with stress, anxiety, depression, and other mental illnesses but lack the resources 
                  to help them manage their emotions. Therapy is a great tool, but isn’t an easy option for everyone.</p>
                  
                  <p className="about-p">Journaling has been found to be extremely helpful in one’s mood. Moreover, it can improve working memory, result in better grades for students, and alter social and linguistic 
                  behaviour. Although there are many benefits for journaling, many people journal but still get stuck in negative 
                  thought patterns that inhibit their improvement. Negative thought patterns are a precursor to depression but 
                  are possible to mediate with the right help.</p>
                  
                <p className="about-p">Journaly allows you to maintain a private journal and receive automated feedback in order to
                  enhance the journaling process, avoid negative thought patterns, and improve your wellbeing. Your account
                  is private: no human will ever read your journals. We will ask you a few questions about your mood, sleep, and
                  other activities for the day in order to help us give more tailored recommendations.</p>

              </div>
              <div className="col-lg-5 resources">
              <h2>Resources</h2>
                <p>Journaly is not meant to be a replacement to traditional therapy, but rather an additional tool to utilize. </p>
                <p>Some resources related to suicide prevention, finding a therapist, and other crisis-related resources are listed below.</p>

                <dl>
                  <dt>National Suicide Prevention Lifeline:</dt>
                      <dd>1-800-273-TALK (8255), Veterans Press 1</dd>
                  <dt>Crisis Text Line: </dt>
                      <dd>Text TALK to 741741</dd>
                  <dt>IMAlive.org Instant Message Crisis: </dt>
                      <dd><a href="http://IMAlive.org">IMAlive.org</a></dd>
                  <dt>The Trevor Project: </dt>
                      <dd>Call: 1-866-488-7386</dd>
                      <dd>Trevor Text: Text TREVOR to 1-202-304-1200</dd>
                      <dd>Trevor Chat: <a href="http://www.thetrevorproject.org">www.thetrevorproject.org</a></dd>
                  <dt>RAINN (National Sexual Assault Hotline): </dt>
                      <dd>Call: 1-800-656-4673</dd>
                      <dd>Chat: <a href="http://hotline.rainn.org">hotline.rainn.org</a></dd>
                  <dt>National Eating Disorders Association: 1-800-931-2237</dt>
                      <dd>Chat: <a href="http://www.myneda.org">www.myneda.org</a></dd>
                  <dt>Find a Therapist</dt>
                  
                <dd>Association for Behavioral and Cognitive Therapies–<br></br> Find a Therapist: <a href="http://www.findcbt.org/FAT/">www.findcbt.org/FAT</a></dd>
                <dd>Anxiety and Depression Association of America–<br></br> Find a Therapist: <a href="https://adaa.org/netforum/findatherapist">adaa.org/netforum/findatherapist</a></dd>
                </dl>
              </div>
          </div>
      </div>
      <Footer />
    </div>
  );
}


export default About;
