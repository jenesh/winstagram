// Main server
const express = require('express');
const cors = require('cors');
const db = require('./pgPromise');

const app = express(); // Creating express server

app.use(cors()); // Allows cors interaction
app.use(express.urlencoded({extended: false})); // Required to parse into useable js
app.use(express.json()); // Required for parsing JSON

// TEST Route
app.get('/', (req, res) => {
    res.json({
        message: 'Server is up and running',
        params: req.params.test
    })
});

// USERS Route
const usersRouter = require('./routes/usersRouter.js')
app.use('/users', usersRouter)



// ALBUMS Route
const albumsRouter = require('./routes/albumsRouter');
app.use('/albums', albumsRouter);

// PICTURES Route
const picturesRouter = require('./routes/picturesRouter');
app.use('/pictures', picturesRouter);

const port = 8000; 

app.listen(port, () => {
    console.log(`Live at => http://localhost:${port}`);
});