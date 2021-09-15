const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

dotenv.config();
const app = express();

// Passport config
require('./config/passport')(passport);

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

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/user', require('./routes/api/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`));
