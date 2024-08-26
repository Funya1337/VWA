const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  password: '123qwe123',
  host: 'localhost',
  port: 5432,
  database: 'sqli-test'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};