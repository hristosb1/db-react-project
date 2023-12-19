import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';

import { configDotenv } from 'dotenv';
import moment from 'moment';
configDotenv();

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'project1'
}).promise();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const created = moment().format();
    if (!username || !password) {
        res.status(400).send('Username and password are required');
    }

    const query = `
    INSERT INTO users (username, password, created)
    VALUES (? , ? , ?)`;

    await pool.query(query, [username, password, created]);
})

const postData = JSON.stringify({
    username: 'testUser1',
    password: 'testUser2',
});

fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: postData
}).catch(err => console.error(err));
