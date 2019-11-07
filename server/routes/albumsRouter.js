// Albums

// GET /albums/:owner_id - Get all albums that belong to a user.
// POST /albums/:owner_id - Create new empty album for user.

const express = require('express');
const db = require('../pgPromise');

const Router = express.Router();

Router.get('/:user_id', async (req, res) => {
    const userId = req.params.user_id;

    try {
        const query = 'SELECT * FROM albums WHERE user_id = $1';
        const data = await db.any(query, [userId]);
        res.json({
            message: 'Returned all albums',
            payload: data
        });
    } catch (err) {
        console.log(err);
        res.send(`Something went wrong, try again later.`);
    };
});

Router.post('/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    try {
        const query = 'INSERT INTO albums (user_id) VALUES ($1)';
        await db.any(query, [userId]);
        res.json({
            message: `Created a new album for user ${userId}`,
            success: true 
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: `Something went wrong`,
            success: false
        });
    };
});


module.exports = Router;