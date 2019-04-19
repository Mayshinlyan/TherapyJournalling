const models = require("../models/models");
const journalController = {};
const ids = require("short-id");

journalController.submitJournal = (req, res) => {
  const {
    username,
    _jtext,
    happiness,
    angriness,
    stressValue,
    sleepValue,
    exercise,
    nap,
    coffee,
    sun,
    computer
  } = req.body;

  let shortId = ids.generate();

  //Check if shortId is unique
  while (shortIdExists(shortId)) {
    console.log(shortId);
    console.log(shortIdExists(shortId));
    shortId = ids.generate();
  }
  'use strict';
  var NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
  var ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
  var toneAnalyzer = new ToneAnalyzerV3({
    "version": '2017-09-21',
    "url": 'https://gateway.watsonplatform.net/tone-analyzer/api/'
  });

  // toneAnalyzer.tone(
  //   {
  //     tone_input: 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.',
  //     content_type: 'text/plain'
  //   },
  //   function(err, tone) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('tone endpoint:');
  //       console.log(JSON.stringify(tone, null, 2));
  //     }
  //   }
  // );
  var nlu = new NaturalLanguageUnderstandingV1({
    version: '2018-04-05',
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
  });
  let emotion = null;
  var options = {
    text: _jtext,
    features: {
      'sentiment': {},
      'emotion': {
      'document': true
      }
    }
  };
  nlu.analyze(options)
    .then(analysisResults => {
      emotion = analysisResults.emotion.document.emotion;

      var newJournal = new models.Journal({
        shortId,
        username: username,
        journalText: _jtext,
        happiness: happiness,
        angriness: angriness,
        stressValue: stressValue,
        sleepValue: sleepValue,
        exercise: exercise,
        nap: nap,
        coffee: coffee,
        sun: sun,
        computer: computer,
        tsadness: emotion.sadness,
        tjoy: emotion.joy,
        tfear: emotion.fear,
        tdisgust: emotion.disgust,
        tanger: emotion.anger,
        tsentiment: analysisResults.sentiment.document.score
      });

      console.log(JSON.stringify(newJournal));
      newJournal.save(function(err, newJournal) {
        if (err) return console.error(err); // TODO: handle error
      });
      return res.status(200).json({
        success: true
      });
    })
    .catch(err => {
      console.log('error:', err);
    });

  // newJournal
  //   .save()
  //   .then(result => {
  //     return res.status(200).json({
  //       success: true,
  //       data: result
  //     });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     return res.status(500).json({
  //       message: error
  //     });
  //   });
};

/**
 * get all the houranls created by the user
 */

journalController.getAllUserJournals = (req, res) => {
  const { username } = req.body;
  console.log(username);
  models.Journal.find(
    {
      username: username
    },
    (err, journals) => {
      if (err) {
        return console.error(err);
      }
      return res.status(200).json({
        success: true,
        journals: journals
      });
    }
  );
};

/**
 * get a single journal based on its shortid
 */
journalController.getJournal = (req, res) => {
  const shortId = req.params.shortId;
  models.Journal.findOne({
    shortId: shortId
  })
    .then(result => {
      return res.json(result);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        message: error
      });
    });
};

// Check if shortId is unique
const shortIdExists = shortId => {
  let result = false;
  models.Journal.findOne({ shortId })
    .then(post => {
      if (post) result = true;
      console.log("ShortId not unique.");
      return (result = true);
    })
    .catch(error => {
      console.log(error.errors);
    });
  return result;
};

module.exports = journalController;
