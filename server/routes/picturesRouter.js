// Pictures

// GET /pictures/albums/:album_id - Get all pictures for a single album.
// POST /pictures/albums/:album_id - Add single picture to album.
// DELETE /pictures/:pic_id - Delete single picture.

const express = require('express');
const db = require('../pgPromise');

const Router = express.Router();

Router.get('/albums/:album_id', async (req, res) => {
    const { album_id } = req.params;
    const query = 'SELECT * FROM pictures WHERE album_id_picture = $1';
    try {
        const data = await db.any(query, [album_id]);
        res.json({
            message: `Returned all photos from album ${album_id}`,
            payload: data,
            success: true
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: `Something went wrong, try again later.`,
            success: false
        });
    }
});

Router.post('/albums/:album_id', async (req, res) => {
    const album_id = req.params.album_id;
    const {user_id, post_id, url} = req.body;
    const query = `
        INSERT INTO pictures (user_id_picture, album_id_picture, post_id_picture, url_picture) 
        VALUES ($1, $2, $3, $4)`
        ;
    try {
        await db.none(query, [user_id, album_id, post_id, url]);
        res.json({
            message: `Added photo to album: ${album_id}`,
            success: true
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: `Something went wrong, try again later.`,
            success: false
        });
    }
});

Router.delete('/:pic_id', async (req, res) => {
    const id = req.params.pic_id;
    const query = `DELETE FROM pictures WHERE id_picture = $1`;
    try {
        await db.none(query, [id_picture]);
        res.json({
            message: `Deleted photo of id: ${id}`,
            success: true
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: `Something went wrong, try again later.`,
            success: false
        });
    }
});

module.exports = Router;