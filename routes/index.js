// const express = require('express');
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const users = require('./users');
const movies = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

// const app = express();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);
// router.post('/signout', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required(),
//     password: Joi.string().required(),
//   }),
// }), logOut);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);
router.use(auth);
router.use('/', users);
router.use('/', movies);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Данные не найдены'));
});

module.exports = router;
