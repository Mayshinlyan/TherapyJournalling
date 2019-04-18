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
    computer: computer
  });
  console.log("helloooooooo");
  console.log(JSON.stringify(newJournal));
  newJournal.save(function(err, newJournal) {
    if (err) return console.error(err); // TODO: handle error
  });
  return res.status(200).json({
    success: true
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
  console.log("heheheh");
  const shortId = req.params.shortId;
  models.Journal.findOne({
    shortId: shortId
  })
    .then(result => {
      //console.log(result);
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
