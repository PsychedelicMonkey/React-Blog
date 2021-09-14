const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected....'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`));
