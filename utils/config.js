require('dotenv').config();

const {
  PORT = 3000,
  // NODE_ENV,
  MONGO_DB_URL, JWT_SECRET,
} = process.env;
// const MONGO_DB = NODE_ENV === 'production' ? MONGO_DB_URL : 'mongodb://localhost:27017/bitfilmsdb';
// const JWT_SECRET_USED = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';
const MONGO_DB = MONGO_DB_URL;
const JWT_SECRET_USED = JWT_SECRET;
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const CORS_OPTIONS = {
  origin: [
    'http://kotezh.diploma.nomoredomains.monster',
    'https://kotezh.diploma.nomoredomains.monster',
    'http://localhost:3000',
    'http://130.193.55.107',
    'https://130.193.55.107',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = {
  PORT,
  MONGO_DB,
  JWT_SECRET_USED,
  MONGO_OPTIONS,
  CORS_OPTIONS,
};
