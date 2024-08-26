const express = require('express');
const path = require('path');
const db = require('./db');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
        console.log(query)
        const result = await db.query(query);
        // const result = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
        console.log(result);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})