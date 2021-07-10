require('dotenv').config();

const jwt = require('jsonwebtoken');
const { JWT_SECRET_USED } = require('../utils/config');
const { UNAUTHORIZED_ERROR_TEXT } = require('../utils/constants');
const DataError = require('../errors/data-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET_USED);
  } catch (err) {
    throw new DataError(UNAUTHORIZED_ERROR_TEXT);
  }
  req.user = payload;
  next();
};
