const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const beautifyUnique = require('mongoose-beautiful-unique-validation')
mongoose.promise = global.Promise


// Define journalSchema
const journalSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false
		//unique: 'Email must be unique.'
	},
	journalText: {
		type: String,
		required: true
	},
	isDeleted: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

journalSchema.methods.printJournal = function () {
	console.log("printing the journal: ", this.journalText);
}

var Journal = mongoose.model('Journal', journalSchema);
module.exports = Journal;

