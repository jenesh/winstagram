const express = require('express');
const cors = require('cors');
const db = require('../pgPromise');
const router = express.Router();

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


router.get("/posts", async (req, res) => {
    console.log("Getting all likes");
    try {
        let likes = await db.any(`SELECT * FROM likes`);
        res.json({
            payload: likes,
            message: "Successfully got all likes",
            success: true
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            message: "Error. Something went wrong!",
            success: false
        })
    }
});


router.get("/posts/:id", async (req, res) => {
    console.log("GET method for likes getting called. Get all like for a single post");
    const id = parseInt(req.params.id);
    try {
        let likes = await db.any(`
        SELECT * FROM likes
        WHERE user_id_like = $1
        `, [req.params.id]);
        res.json({
            payload: likes,
            message: `Success, recieved all likes on post ${id}`,
            success: true
        });

    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            message: "Error. Something went wrong!",
            success: false
        });
    }
});


router.post("/posts/:id", async (req, res) => {
    console.log("POST method for likes has been called. Adding a single like");
    console.log("req.body:", req.body);
    
    const postId = parseInt(req.params.id);
    let insertQuery = `
    INSERT INTO likes (user_id_like, post_id_like, poster_id_like)
    VALUES ($1, $2, $3)
    `;
    try {
        const user_id = parseInt(req.body.user_id);
        const poster_id = parseInt(req.body.poster_id);

        await db.any(insertQuery, [user_id, postId, poster_id]);
        res.json({
            payload: [user_id, postId, poster_id],
            message: "like created",
            success: true
        });

    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({
            message: "Error, something went wrong",
            success: false
        });
    }
});


router.delete("/:id", async (req, res) => {
    console.log("DELETE method for likes starting.");
    const id = req.params.id;
    const inputQuery = `
    DELETE FROM likes
    WHERE user_id_like = $1
    `;
    try {
        await db.none(inputQuery, [id]);
        res.json({
            message: `Success. deleted post with id: ${id}`,
            success: true
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500);
        res.json({  
            message: "Error. Something went wrong!",
            success: false
        });
    }
});


module.exports = router;