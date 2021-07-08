const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
}), deleteMovie);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/^https?:\/\/(www)?[-.~:/?#[\]@!$&'()*+,;=\w]+#?/),
    trailer: Joi.string().required().regex(/^https?:\/\/(www)?[-.~:/?#[\]@!$&'()*+,;=\w]+#?/),
    thumbnail: Joi.string().required().regex(/^https?:\/\/(www)?[-.~:/?#[\]@!$&'()*+,;=\w]+#?/),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

module.exports = router;
