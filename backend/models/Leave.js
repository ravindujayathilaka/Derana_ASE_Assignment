const mongoose = require('mongoose');

const { Schema } = mongoose;


// creating user schema
const leaveSchema = new Schema({
    leaveType: String,
    duration: String,
    leaveDates: String,
    email: String,
    comment: String,
    status:String,
});

const Leave = mongoose.model('leave', leaveSchema);

module.exports = Leave;
