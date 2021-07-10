const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const users = require('./users');
const movies = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { DATA_NOT_FOUND_ERROR_TEXT } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);
router.use(auth);
router.use('/', users);
router.use('/', movies);
router.use('/', (req, res, next) => {
  next(new NotFoundError(DATA_NOT_FOUND_ERROR_TEXT));
});

module.exports = router;
