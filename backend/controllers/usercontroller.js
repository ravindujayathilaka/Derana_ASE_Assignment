const User = require('../models/User');


exports.findUser = function (req, res) {

    const id = req.params.id;

    User.findOne({ id: id})
    .then((user) => {
        res.status(200).send({status: "User Fetched", user})
    }).catch((err) => {
        console.log(err)
        res.status(500).send({error: err.message})
    })
};

exports.findUserWithEmail = function (req, res) {

    const email = req.body.email;

    User.findOne({ email: email})
    .then((user) => {
        res.status(200).send({status: "User Fetched", user})
    }).catch((err) => {
        console.log(err)
        res.status(500).send({error: err.message})
    })
};

exports.findAllUsers = function (req, res) {

    User.find()
    .then((users) => {
        res.status(200).send({status: "Users Fetched", users})
    }).catch((err) => {
        console.log(err)
        res.status(500).send({error: err.message})
    })
};

exports.updateUser = function (req, res, next) {

    const userId = req.body.id;

    const updateUser = {
        name,
        email,
        password,
        department,
        type
    }

    const update = User.findByIdAndUpdate(userId, updateUser)
    .then(() => {
        res.status(200).send({status: 'User Updated'});
    }).catch((err) => {
        res.status(500).send({error: err.message});
    })
};

exports.updateLeaveCount = function (req, res, next) {

    const email = req.body.email;
    const leaveType = req.body.type;
    const leaveCount = req.body.count;

    let updateLeaveCount = {}

    if (leaveType == "casual"){
        updateLeaveCount = {
            $inc: {casual: -leaveCount}
        }
    }else if (leaveType == "annual"){
        updateLeaveCount = {
            $inc: {annual: -leaveCount}
        }
    }else if (leaveType == "medical"){
        updateLeaveCount = {
            $inc: {medical: -leaveCount}
        }
    }else if (leaveType == "custom"){
        updateLeaveCount = {
            $inc: {custom: -leaveCount}
        }
    }

    const filter = {
        email: email
    }
    const update = User.findOneAndUpdate(filter, updateLeaveCount, {returnDocument: true}, (err, updatedDoucment) => {
        if (err) {
            return res.status(500).send({error: err.message})
        }

        return res.status(200).send({status: 'Leave Count Updated', updatedDoucment})
    })
};

exports.deleteUser = function(req, res) {

    const userId = req.params.id;

    User.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: 'User Successfully Deleted'})
    }).catch((err) => {
        res.status(500).send({status: err.message});
    })
};
