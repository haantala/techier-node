const express = require('express');
const cors = require('cors');
const client = require('./database');
const app = express();
// Enable CORS for all origins
app.use(cors());

// Or, specify the allowed origin (in your case, 'http://localhost:3000')
app.use(cors({
  origin: 'http://localhost:3000'
}));

// const pool = new Pool({
//   user: 'yashcomputers', // Your PostgreSQL username
//   host: 'localhost',
//   database: 'techier',
//   password: 'password', // Your PostgreSQL password
//   port: 5432,
// });




app.use(express.json());

const dataRoutes = require("./module/data/data.routes")


app.use(dataRoutes)


// // CREATE
// app.post('/insertdata', async (req, res) => {
//   const { firstName, lastName, email, password,mobile } = req.body;
//   const newData = await pool.query(
//     'INSERT INTO data (firstName, lastName, email, password, mobile) VALUES ($1, $2, $3,$4,$5) RETURNING *',
//     [firstName, lastName, email, password,mobile]
//   );
//   res.json({status:1,data:newData.rows[0],message:"Data added Successfully"});
// });

// READ
// app.get('/getdata', async (req, res) => {
//   const alldata = await client.query('SELECT * FROM data');
//   res.json({status:1,data:alldata.rows});
// });

// UPDATE
// app.post('/updateData', async (req, res) => {

//   const { firstname, lastname, email, password,mobile, data_id } = req.body;
//   const updatedData= await client.query(
//     'UPDATE data SET firstname = $1, lastname = $2, email = $3, password=$4, mobile=$5 WHERE data_id = $6 RETURNING *',
//     [firstname, lastname, email, password,mobile, data_id]
//   );
//   res.json({status:1,data:updatedData.rows[0],message:"Data Updated Successfully"});
// });

// DELETE
// app.post('/deletedata', async (req, res) => {
//   const { data_id } = req.body;
//   await client.query('DELETE FROM data WHERE data_id = $1', [data_id]);
//   res.json({ status:1,message: 'User deleted successfully' });
// });

const server = app.listen(5001, function (error) {
  console.log('====================================');
  console.log(`🚀 App listening on the port ${5001}`);
  console.log('====================================');
});