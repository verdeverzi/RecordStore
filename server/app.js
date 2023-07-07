const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//! ROUTES
const recordsRouter = require('./routes/recordsRouter');
const cartsRouter = require('./routes/cartsRouter');
const usersRouter = require('./routes/usersRouter');
const meRouter = require('./routes/meRouter');
const authRouter = require('./routes/authRouter');
const {
  routeNotFound,
  globalErrorHandler,
} = require('./middleware/errorHandlers');

//! INIT
const app = express();

//! MIDDLEWARE
const corsOptions = {
  origin: ['http://localhost:3000', 'https://record-store-d4co.onrender.com'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json({ limit: '1MB' }));
app.use(cookieParser());

app.use('/records', recordsRouter);
app.use('/users', usersRouter);
app.use('/carts', cartsRouter);
app.use('/me', meRouter);
app.use('/auth', authRouter);

//! Error Handling middlewares
app.use(routeNotFound);
app.use(globalErrorHandler);

//! CONNECT TO DB
const { DB_PROTOCOL, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_QUERIES } =
  process.env;
const URI = `${DB_PROTOCOL}${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?${DB_QUERIES}`;

//! Use this in case you have your URI as one variable
// const URI = process.env.DB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once('error', console.error)
  .once('open', () => console.log('Database connection established'));

module.exports = app;
