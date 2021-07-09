const mongoose = require('mongoose');
const validator = require('validator');
const { URL_ERROR_TEXT } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => { validator.isURL(v); },
      message: (link) => `${link.value} - ${URL_ERROR_TEXT}`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => { validator.isURL(v); },
      message: (link) => `${link.value} - ${URL_ERROR_TEXT}`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => { validator.isURL(v); },
      message: (link) => `${link.value} - ${URL_ERROR_TEXT}`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
