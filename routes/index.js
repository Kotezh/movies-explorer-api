const express = require('express');
const { celebrate, Joi } = require('celebrate');
const users = require('./users');
const movies = require('./movies');
const { createUser, login, logOut } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

const app = express();

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signout', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), logOut);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);
app.use(auth);
app.use('/', users);
app.use('/', movies);
app.use('/', () => { throw new NotFoundError('Данные не найдены'); });
