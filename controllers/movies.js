const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const RequestError = require('../errors/request-err');
const NotOwnerError = require('../errors/owner-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    // .populate('likes')
    // .populate('owner')
    .then((movies) => res.status(200).send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  // const { name, link } = req.body;
  Movie.create({ owner: req.user._id, ...req.body })
    .then((newMovie) => {
      const movie = newMovie.toObject();
      movie.owner = req.user;
      return res.status(201).send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new RequestError('Переданы некорректные данные');
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new NotOwnerError('Карточка принадлежит другому пользователю');
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.status(200).send({ data: movie }))
        .catch(next);
    })
    .catch(next);
};

// module.exports.likeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//     { new: true },
//   )
//     .populate('likes')
//     .populate('owner')
//     .orFail(new Error('PageNotFound'))
//     .then((card) => res.status(200).send({ data: card }))
//     .catch((err) => {
//       if (err.message === 'PageNotFound') {
//         throw new NotFoundError('Карточка не найдена');
//       }
//       if (err.name === 'CastError') {
//         throw new RequestError('Переданы некорректные данные');
//       }
//     })
//     .catch(next);
// };

// module.exports.dislikeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } }, // убрать _id из массива
//     { new: true },
//   )
//     .populate('likes')
//     .populate('owner')
//     .orFail(new Error('PageNotFound'))
//     .then((card) => res.status(200).send({ data: card }))
//     .catch((err) => {
//       if (err.message === 'PageNotFound') {
//         throw new NotFoundError('Карточка не найдена');
//       }
//       if (err.name === 'CastError') {
//         throw new RequestError('Переданы некорректные данные');
//       }
//     })
//     .catch(next);
// };
