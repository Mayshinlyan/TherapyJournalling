const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const beautifyUnique = require("mongoose-beautiful-unique-validation");
mongoose.promise = global.Promise;

// Define journalSchema
const journalSchema = new Schema({
  shortId: {
    type: String,
    unique: "ShortId not unique."
  },
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
    required: false
  },
  happiness: {
    type: Number,
    required: false
  },
  angriness: {
    type: Number,
    required: false
  },
  stressValue: {
    type: Number,
    required: false
  },
  sleepValue: {
    type: Number,
    required: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  exercise: {
    type: Boolean,
    defaul: false
  },
  nap: {
    type: Boolean,
    defaul: false
  },
  coffee: {
    type: Boolean,
    defaul: false
  },
  sun: {
    type: Boolean,
    defaul: false
  },
  computer: {
    type: Boolean,
    defaul: false
  }
});

var Journal = mongoose.model("Journal", journalSchema);
module.exports = Journal;
