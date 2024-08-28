const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 3001

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', "index.html"));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})