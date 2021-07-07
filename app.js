const express = require('express');

require('dotenv').config();

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const indexRouter = require('./routes/index');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// const options = {
//   origin: [
//     'http://kotezh.mesto.nomoredomains.monster',
//     'https://kotezh.mesto.nomoredomains.monster',
//     'http://localhost:3000',
//     'http://84.252.142.107',
//     'https://84.252.142.107',
//   ],
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
//   credentials: true,
// };

app.use('*', cors(options));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });
app.use(indexRouter);
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик ошибок
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});
app.listen(PORT);
