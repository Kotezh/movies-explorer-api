const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUserMe, updateUserMe } = require('../controllers/users');

router.get('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
  }),
}), getUserMe);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
  }),
}), updateUserMe);

module.exports = router;
