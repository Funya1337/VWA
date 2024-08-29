require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const loginRoute = require('./routes/login');
const { cookieJwtAuth } = require('./middlewares/cookieJwtAuth');
const { isLoggedIn } = require('./middlewares/isLoggedIn');
const { isAdmin } = require('./middlewares/isAdmin');
const addRoute = require("./routes/add");
const bodyParser = require('body-parser');
const db = require('./db');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.post('/api/ssrf', async (req, res) => {
  const { products } = req.body;

  if (!products) {
    return res.status(400).send('No URL provided');
  }

  try {
    const response = await axios.get(products);
    console.log('External API Response:', response.data);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching data from external API:', error.message);
    res.status(500).send('Failed to fetch data from the external API');
  }
});

app.post('/api/login', loginRoute);

app.post('/api/add', cookieJwtAuth, addRoute);

app.get('/api/posts', async (req, res) => {
  res.json(await db.getPosts());
})

app.get('/api/posts/:id', async (req, res) => {
  res.json(await db.getPostById(req.params.id));
})

app.get('/api/products', (req, res) => {
  const products = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 200 },
    { id: 3, name: 'Product C', price: 300 }
  ];
  res.json(products);
});

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