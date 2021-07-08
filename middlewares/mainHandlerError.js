// централизованный обработчик ошибок
const { INTERNAL_SERVER_ERROR_TEXT } = require('../utils/constants');

module.exports.mainHandlerError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? INTERNAL_SERVER_ERROR_TEXT : message });
  next();
};
