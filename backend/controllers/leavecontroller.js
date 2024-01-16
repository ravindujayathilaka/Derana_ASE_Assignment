const Leave = require('../models/Leave');

exports.getOneRequest = function (req, res) {

    const id = req.params.id;

    Leave.findOne({ id: id})
    .then((leave) => {
        res.status(200).send({status: "Leave Details Fetched", leave})
    }).catch((err) => {
        console.log(err)
        res.status(500).send({error: err.message})
    })
};

exports.getAllRequest = function (req, res) {

    Leave.find()
    .then((leaves) => {
        res.status(200).send({status: "Get All Leaves Fetched", leaves})
    }).catch((err) => {
        console.log(err)
        res.status(500).send({error: err.message})
    })
};

exports.deleteLeave = function (req, res) {

    const id = req.params.id;

    Leave.findOneAndDelete({ _id: id})
    .then((leave) => {
        res.status(200).send({status: "Leave Deleted", leave})
    }).catch((err) => {
        console.log(err)
        res.status(500).send({error: err.message})
    })
};

exports.updateRequest = function (req, res) {

    const id = req.params.id;

    const updateLeave = {
        leaveType,
        duration,
        leaveDates,
        email,
        comment,
        status,
    }

    const update = Leave.findByIdAndUpdate(id, updateLeave)
    .then(() => {
        res.status(200).send({status: 'Leave Request Updated', update});
    }).catch((err) => {
        res.status(500).send({error: err.message});
    })
};

exports.acceptRequest = function (req, res) {

    const id = req.params.id;

    const updateLeave = {
        status: 'Accept',
    }

    const update = Leave.findByIdAndUpdate(id, updateLeave)
    .then(() => {
        res.status(200).send({status: 'Leave Accepted', update});
    }).catch((err) => {
        res.status(500).send({error: err.message});
    })
};

exports.rejectRequest = function (req, res) {

    const id = req.params.id;

    const updateLeave = {
        status: 'Reject',
    }

    const update = Leave.findByIdAndUpdate(id, updateLeave)
    .then(() => {
        res.status(200).send({status: 'Leave Rejected', update});
    }).catch((err) => {
        res.status(500).send({error: err.message});
    })
};

exports.createRequest = function (req, res) {

    const leaveType = req.body.leaveType;
    const duration = req.body.duration;
    const leaveDates = req.body.selectedDates;
    const email = req.body.email;
    const comment = req.body.comment;
    const status = 'Pending';

    const leaveReq = new Leave({
        leaveType : leaveType,
        duration : duration,
        leaveDates : leaveDates,
        email : email,
        comment : comment,
        status : status,
    })
  
    leaveReq.save()
    .then((leaveRequest) => {
        res.status(200).send({status: 'Request Create', leaveRequest})
    }).catch((err) => {
        res.status(500).send({error: err.message});
    })

};