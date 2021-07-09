const validator = require('validator');
const { ObjectId } = require('mongoose').Types;
const { URL_ERROR_TEXT, ID_ERROR_TEXT } = require('./constants');

const urlValidator = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message(URL_ERROR_TEXT);
};

const idValidator = (value, helpers) => {
  if (ObjectId.isValid(value)) {
    return value;
  }
  return helpers.message(ID_ERROR_TEXT);
};

module.exports = { urlValidator, idValidator };
