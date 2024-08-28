require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const loginRoute = require('./routes/login');
const { cookieJwtAuth } = require('./middlewares/cookieJwtAuth');
const { isLoggedIn } = require('./middlewares/isLoggedIn');
const { isAdmin } = require('./middlewares/isAdmin');
const addRoute = require("./routes/add");
const db = require('./db');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', "index.html"));
})

app.get('/login', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../public', "login.html"));
})

app.get('/admin', cookieJwtAuth, isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, '../public', "admin.html"));
})

app.get('/welcome', cookieJwtAuth, (req, res) => {
  console.log("user data: ", req.user)
  res.sendFile(path.join(__dirname, '../public', 'welcome.html'));
})

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
})

// api

app.post('/api/login', loginRoute);

app.post('/api/add', cookieJwtAuth, addRoute);

app.get('/api/posts', async (req, res) => {
  res.json(await db.getPosts());
})

app.get('/api/posts/:id', async (req, res) => {
  res.json(await db.getPostById(req.params.id));
})

app.delete('/api/posts/delete/:id', async (req, res) => {
  console.log(123);
  const isSuccessful = await db.deletePost(req.params.id);
  if (isSuccessful) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
})

app.patch('/api/posts/edit/:body/:id', async (req, res) => {
  const editedPost = await db.editPost(req.params.body, req.params.id);
  return editedPost
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})