import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';

import { configDotenv } from 'dotenv';
import { log } from 'console';
configDotenv();

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: 'password',
    database: 'world'
}).promise();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/country', async (req, res) => {
    const query = `
    SELECT * FROM country;
    `;
    const [response] = await pool.query(query)
    res.send(response)
});

app.get('/country/:name', async (req, res) => {
    const name = req.params.name
    const query = `select * from country where name like "${name}"`;
    const [response] = await pool.query(query);
    res.send(response);
});
