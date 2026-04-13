import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// const db = await mysql.createPool({
//     host: process.env.MYSQLHOST,
//     user : process.env.MYSQLUSER,
//     password : process.env.MYSQLPASSWORD,
//     database : process.env.MYSQLDATABASE,
//       port: process.env.MYSQLPORT,
//   waitForConnections: true,
//   connectionLimit: 10,

// })
const db= mysql.createPool(process.env.DATABASE_URL);


console.log("Connected to db successfully");


export default db;