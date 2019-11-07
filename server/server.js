// Main server
const express = require('express');
const cors = require('cors');
const db = require('./pgPromise');

const app = express(); // Creating express server

app.use(cors()); // Allows cors interaction
app.use(express.urlencoded({extended: false})); // Required to parse into useable js
app.use(express.json()); // Required for parsing JSON

const usersRouter = require('./routes/usersRouter.js')

app.use('/users', usersRouter)

// Test route to check if server is working
app.get('/:test', (req, res) => {
    res.json({
        message: 'Server is up and running',
        params: req.params.test
    })
});

const port = 8000; 

app.listen(port, () => {
    console.log(`Live at => http://localhost:${port}`);
});