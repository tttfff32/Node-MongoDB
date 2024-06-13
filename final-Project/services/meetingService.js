const Meeting = require('../models/meeting');

exports.getMeetings=async() =>{
  try {
    const meetings = await Meeting.find();
    return meetings;
  } catch (err) {
    throw new Error(`Failed to fetch meetings: ${err.message}`);
  }
};

exports.getMeetingById=async(id) =>{
  try {
    const meeting = await Meeting.findById(id);
    if (!meeting) {
      throw new Error('Meeting not found');
    }
    return meeting;
  } catch (err) {
    throw new Error(`Failed to fetch meeting: ${err.message}`);
  }
};

exports.createMeeting=async(meetingData)=> {
  try {
    const meeting = new Meeting(meetingData);
    const newMeeting = await meeting.save();
    return newMeeting;
  } catch (err) {
    throw new Error(`Failed to create meeting: ${err.message}`);
  }
};


const meetingService = require('../services/meetingService');

exports.updateMeeting = async (req, res) => {
  const { id } = req.params;
  const meetingData = req.body; 

  try {
    const updatedMeeting = await meetingService.updateMeeting(id, meetingData);
    res.json(updatedMeeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



exports.deleteMeeting = async (id) => {
  try {
    const result = await Meeting.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error('Meeting not found');
    }
    return { message: 'Meeting deleted' };
  } catch (err) {
    throw new Error(`Failed to delete meeting: ${err.message}`);
  }
};


