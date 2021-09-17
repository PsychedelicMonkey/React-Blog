const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const fileUpload = require('express-fileupload');

dotenv.config();
const app = express();

// Passport config
require('./config/passport')(passport);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
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
app.use('/api/users', require('./routes/api/users'));
app.use('/auth/google', require('./routes/auth/google'));

// Serve static files in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// INSECURE FILE UPLOAD
app.post('/upload', (req, res) => {
  const { upload } = req.files;

  upload.mv(`${__dirname}/client/public/img/${upload.name}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.json({
      uploaded: true,
      url: `/img/${upload.name}`,
    });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`));
