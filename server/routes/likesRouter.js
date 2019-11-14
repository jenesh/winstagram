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
    const userId = req.session.valid.id;
    const postId = req.params.id;
    let insertQuery = `
    INSERT INTO likes (user_id_like, post_id_like, poster_id_like)
    VALUES ($1, $2, $3)
    `;
    try {
        const user_id = userId;
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

router.delete("/like/:postId", async (req, res) => {
    console.log("DELETE method for likes starting.");
    const postId = req.params.postId;
    const userId = req.session.valid.id;
    const inputQuery = `
    DELETE FROM likes
    WHERE user_id_like = $1
    AND post_id_like = $2
    `;
    try {
        await db.none(inputQuery, [userId, postId]);
        res.json({
            message: `Success. Deleted like with postId: ${postId} and userId: ${userId}`,
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