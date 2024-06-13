const Meeting = require('../models/meeting');

exports.getMeetings = async(req, res) =>{
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMeetingById =async(req, res)=> {
  res.json(res.meeting);
};

exports.createMeeting= async(req, res)=> {
  const meeting = new Meeting({
    title: req.body.title,
    date: req.body.date,
    location: req.body.location,
    description: req.body.description,
    attendees: req.body.attendees,
  });

  try {
    const newMeeting = await meeting.save();
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMeeting = async (req, res) => {
    const { id } = req.params;
  
    try {
      const meeting = await Meeting.findById(id);
      if (!meeting) {
        return res.status(404).json({ message: 'Meeting not found' });
      }
  
      if (req.body.title !== undefined) {
        meeting.title = req.body.title;
      }
      if (req.body.date !== undefined) {
        meeting.date = req.body.date;
      }
      if (req.body.location !== undefined) {
        meeting.location = req.body.location;
      }
      if (req.body.description !== undefined) {
        meeting.description = req.body.description;
      }
      if (req.body.attendees !== undefined) {
        meeting.attendees = req.body.attendees;
      }
  
      const updatedMeeting = await meeting.save();
      res.json(updatedMeeting);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


  const meetingService = require('../services/meetingService');
  
  exports.deleteMeeting = async (req, res) => {
    const { id } = req.params;
    
    try {
      const result = await meetingService.deleteMeeting(id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  

