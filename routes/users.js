const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUserMe, updateUserMe, logout } = require('../controllers/users');

router.get('/users/me', getUserMe);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserMe);
router.post('/signout', logout);

module.exports = router;
