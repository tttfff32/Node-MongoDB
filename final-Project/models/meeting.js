const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
