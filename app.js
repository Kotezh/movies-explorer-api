const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mainHandlerError } = require('./middlewares/mainHandlerError');
const router = require('./routes');
const {
  PORT, MONGO_DB, MONGO_OPTIONS, CORS_OPTIONS,
} = require('./utils/config');

const app = express();

mongoose.connect(MONGO_DB, MONGO_OPTIONS);

app.use('*', cors(CORS_OPTIONS));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(rateLimiter);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(mainHandlerError);

app.listen(PORT);
