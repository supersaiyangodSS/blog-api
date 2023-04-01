const express = require('express');
const sessions = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

const oneDay = 1000 * 60 * 60;

const app = express();
const port = process.env.PORT || 3000;

app.use(sessions({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: oneDay
  }
}));

mongoose.connect(process.env.MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('mongoDB connected!'))
  .catch((err) => console.log(err.message));

const usersRoute = require('./api/users');
const postsRoute = require('./api/posts');
const { log } = require('console');

app.use(express.json());
app.use('/post', postsRoute);
app.use('/user', usersRoute);

app.get('/', (req, res) => {
    res.send('Welcome to BLOG API');
});

app.listen(port, () => console.log(`server is up and running at port ${port}`));
