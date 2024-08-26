require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const loginRoute = require('./routes/login');
const { cookieJwtAuth } = require('./middlewares/cookieJwtAuth');
const { isLoggedIn } = require('./middlewares/isLoggedIn');
const addRoute = require("./routes/add");
const db = require('./db');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public', "index.html"));
// })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', "index.html"));
})

app.get('/login', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../public', "login.html"));
})

app.get('/posts', async (req, res) => {
  res.json(await db.getPosts());
})

app.get('/welcome', cookieJwtAuth, (req, res) => {
  console.log("user data: ", req.user)
  res.sendFile(path.join(__dirname, '../public', 'welcome.html'));
})

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
})

app.post('/api/login', loginRoute);
app.post('/api/add', cookieJwtAuth, addRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})