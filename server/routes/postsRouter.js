const express = require('express');
const cors = require('cors');
const db = require('../pgPromise');
const router = express.Router();

const app = express(); 

app.use(cors());
app.use(express.urlencoded({extended: false})); 
app.use(express.json());


router.get("/", async (req, res) => {
    console.log("GET method for getting all posts started");
    try {
        let posts = await db.any("SELECT * FROM posts");
        res.json({
            payload: posts,
            message: "Success. Retrieved all posts",
            success: true
        });
    } catch (error) {
        res.status(500);
        res.json({  
            message: "Error. Something went wrong!",
            success: false
        });
        console.log("Error:", error);
    }
});


router.get('/:id', async (req, res) => {
    console.log("GET method for getting a single post started"); 
    try {
        let posts = await db.any(`
        SELECT * FROM posts
        WHERE id = $1`, [req.params.id]);
        res.json({
            payload: posts,
            message: "Success. Retrieved all posts",
            success: true
        });
    } catch (error) {
        res.status(500);
        res.json({  
            message: "Error. Something went wrong!",
            success: false
        });
        console.log("Error:", error);
    }
}); 


router.post('/', async (req, res) => {
    console.log("POST method for creating a new post started");
    console.log("req.body:", req.body);
    let insertQuery = `
    INSERT INTO posts (user_id, body, url)
    VALUES ($1, $2, $3)
    `;
    try { //if body and url exists
        if(req.body.body && req.body.url) {
            const id = parseInt(req.body.user_id);
            const body = req.body.body;
            const url = req.body.url;

            await db.any(insertQuery, [id, body, url]);

            res.json({
                payload: [req.body.user_id, req.body.body, ""],
                message: "post created, (id, body and url exists)",
                success: true
            });

          //if body exists and url doesn't  
        } else if(req.body.body && !req.body.url) {
            const id = parseInt(req.body.user_id);
            const body = req.body.body;
            await db.none(insertQuery, [id, body, ""]);
            res.json({
                payload: [id, body, ""],
                message: "post created, (id and body only exists)",
                success: true
            });

          //if body doesn't exist but the url does
        } else if(!req.body.body && req.body.url) {
            const id = parseInt(req.body.user_id);
            const url = req.body.url;
            await db.none(insertQuery, [id, "", url]);
            res.json({
                payload: [id, "", url],
                message: "post created, (id and url only exists",
                success: true
            });
          //if neiter exists  
        }
    } catch (error) {
        console.log("error:", error);
        res.json({
            message: "There was an error creating a post",
            success: false
        });
   }

});


router.delete("/:id", async (req, res) => {
    console.log("DELETE method for deleting a single post started");
    const postId = parseInt(req.params.id);
    console.log("postID:", postId);
    const inputQuery = `
    DELETE FROM posts
    WHERE id = $1
    `;
    try {
        await db.none(inputQuery, [postId]);
        res.json({
            message: `Success. deleted post with id: ${postId}`,
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


router.patch("/:id", async (req, res) => {
    console.log("PATCH method for posts is starting");

    const {id} = req.params;
    const {body} = req.body;
    const inputQuery = `
    UPDATE posts SET body = $1
    WHERE id = $2
    `;
    console.log("req.body:", req.body)
    try {
        await db.none(inputQuery, [body, id]);
        res.json({
            message:'Success. Post updated.',
            payload: req.body,
            success: true
        });
    } catch (error){
        console.log("Error:", error)
        res.json({
            message: "Failed to update post. Try again please",
            success: false
        });
    }
});


module.exports = router;