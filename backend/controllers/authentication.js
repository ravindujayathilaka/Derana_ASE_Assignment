const jwt = require('jwt-simple');
const User = require('../models/User');
const { secret } = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

exports.signin = function (req, res) {
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const department = req.body.department;
  const type = req.body.type;
  const casual = 7;
  const annual = 7;
  const medical = 7;
  const custom = 7;

  if (!email || !password) {
    return res.status(422).send({ error: 'Email and password must be provided' });
  }

  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use...' });
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
      department: department,
      type: type,
      casual: casual,
      annual: annual,
      medical: medical,
      custom: custom,

    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(user) });
    });
  });
};
