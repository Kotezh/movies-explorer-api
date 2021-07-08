const rateLimit = require('express-rate-limit');
const { LIMITER_TEXT } = require('../utils/constants');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: LIMITER_TEXT,
});

module.exports = rateLimiter;
