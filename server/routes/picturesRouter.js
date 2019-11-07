// Pictures

// GET /pictures/albums/:album_id - Get all pictures for a single album.
// POST /pictures/albums/:album_id - Add single picture to album.
// DELETE /pictures/:pic_id - Delete single picture.

const express = require('express');
const db = require('../pgPromise');

const Router = express.Router();

Router.get('/', async (req, res) => {
    const query = 'SELECT * FROM pictures';
    try {
        const data = await db.any(query);
        res.json({
            message: 'Returned all pictures',
            payload: data
        });
    } catch (err) {
        console.log(err);
        res.send(`Something went wrong, try again later.`);
    }
});

module.exports = Router;