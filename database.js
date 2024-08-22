const { Pool } = require('pg')
  
const client = new Pool({
  user: "yashcomputers",
  host: "localhost",
  database: "techier",
  password: "password",
  port: 5432,
})

client.connect((err) => {
    if (err) {
      console.error('Connection error', err.stack);
    } else {
      console.log('Connected to the database');
    }
  });

module.exports = client;