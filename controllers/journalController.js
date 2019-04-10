const models = require('../models/models');
const journalController = {};

journalController.submitJournal = (req, res) => {
	const { username, _jtext } = req.body;
	var newJournal = new models.Journal({
		username: username,
		journalText: _jtext 
	});
	newJournal.save(function (err, newJournal) {
		if (err) return console.error(err); // TODO: handle error
	});
    return res.status(200).json({
		success: true
	});
};

module.exports = journalController;
