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

// router.patch('/users/me/avatar', celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().required().regex(/^https?:\/\/(www)?[-.~:/?#[\]@!$&'()*+,;=\w]+#?/),
//   }),
// }), updateAvatar);

// router.get('/users/:userId', celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().required().hex().length(24),
//   }),
// }), getUser);
// router.put('/movies/:movieId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().required().hex().length(24),
//   }),
// }), likeMovie);
// router.delete('/movies/:movieId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().required().hex().length(24),
//   }),
// }), dislikeMovie);

module.exports = router;
