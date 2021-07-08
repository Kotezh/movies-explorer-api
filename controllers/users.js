require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET_USED } = require('../utils/config');
const {
  DATA_ERROR_TEXT,
  REQUEST_ERROR_TEXT,
  USER_NOT_FOUND_ERROR_TEXT,
  USER_EXISTS_ERROR_TEXT,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const MongoError = require('../errors/mongo-err');
const RequestError = require('../errors/request-err');
const DataError = require('../errors/data-err');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_USED, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 604800000,
          httpOnly: true,
        })
        .send({ token: 'ok' });
    })
    .catch(() => {
      throw new DataError(DATA_ERROR_TEXT);
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  const userId = req.user._id;
  return User.findById(userId)
    .then(() => {
      res
        .cookie('jwt', '', {
          expires: new Date(2000, 1, 1),
          httpOnly: true,
        })
        .send({ logout: 'ok' });
      req.session.destroy(() => { res.redirect('/'); });
    })
    .catch(() => {
      throw new DataError(DATA_ERROR_TEXT);
    })
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  const userId = req.user._id;
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new Error('PageNotFound');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new RequestError(REQUEST_ERROR_TEXT);
      }
      if (err.message === 'PageNotFound') {
        throw new NotFoundError(USER_NOT_FOUND_ERROR_TEXT);
      }
    })
    .catch(next);
};

module.exports.updateUserMe = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new Error('PageNotFound');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new RequestError(REQUEST_ERROR_TEXT);
      }
      if (err.message === 'PageNotFound') {
        throw new NotFoundError(USER_NOT_FOUND_ERROR_TEXT);
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new MongoError(USER_EXISTS_ERROR_TEXT);
        }
        if (err.name === 'CastError') {
          throw new RequestError(REQUEST_ERROR_TEXT);
        }
      }))
    .then((user) => res.status(201).send({ email: user.email, id: user._id }))
    .catch(next);
};
