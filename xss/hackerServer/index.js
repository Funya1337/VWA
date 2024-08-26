const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/acceptCookie', (req, res) => {
    console.log(req.query);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})