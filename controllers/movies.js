const Movie = require('../models/movie');
const {
  REQUEST_ERROR_TEXT,
  MOVIE_NOT_FOUND_ERROR_TEXT,
  RIGHTS_ERROR_TEXT,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const RequestError = require('../errors/request-err');
const NotOwnerError = require('../errors/owner-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((newMovie) => {
      const movie = newMovie.toObject();
      movie.owner = req.user;
      return res.status(201).send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new RequestError(REQUEST_ERROR_TEXT);
      }
      throw err;
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND_ERROR_TEXT);
      }
      return movie;
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NotOwnerError(RIGHTS_ERROR_TEXT);
      }
      movie.remove()
        .then(() => res.send({ data: movie }))
        .catch((err) => { throw err; });
    })
    .catch(next);
};
