const models = require('../models/models');
const journalController = {};

journalController.submitJournal = (req, res) => {
	const { username, _jtext, happiness, angriness, stressValue, sleepValue, exercise, nap, coffee, sun, computer } = req.body;
	var newJournal = new models.Journal({
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
	newJournal.save(function (err, newJournal) {
		if (err) return console.error(err); // TODO: handle error
	});
    return res.status(200).json({
		success: true
	});
};

journalController.getJournals = (req, res) => {
	const { username } = req.body;

	models.Journal.find({
		username: username
	}, (err, journals) => {
		if (err) {
			return console.error(err);	
		} 
		return res.status(200).json({
			success:true,
			journals: journals
		})
	})
};

module.exports = journalController;
