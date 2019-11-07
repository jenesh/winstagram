// Posts

// GET /posts - Get all posts.
// GET /posts/:id - Get single post.
// POST /posts - Add single post.
// PATCH /posts/:id - Edit single post.
// DELETE /posts/:id - Delete single post.

/*
USERS CONTAINS:
{
    username: 
    password:
    firstname:
    lastname
}

POSTS CONTAINS:
{
    username: 
    body:
    url:
    timestamp
}

*/
const express = require('express');
const cors = require('cors');
const db = require('../pgPromise');
const router = express.Router();

const app = express(); // Creating express server

app.use(cors()); // Allows cors interaction
app.use(express.urlencoded({extended: false})); // Required to parse into useable js
app.use(express.json()); // Required for parsing JSON


// GET /posts - Get all posts.
router.get("/", async (req, res) => {
    console.log("GET method for getting all posts started");
    try {
        let posts = await db.any("SELECT * FROM posts");
        res.json({
            payload: posts,
            message: "Success. Retrieved all posts"
        });
    } catch (error) {
        res.status(500);
        res.json({  
            message: "Error. Something went wrong!"
        });
        console.log("Error:", error);
    }
});


//GET /posts/:id - Get single post.
router.get('/:id', async (req, res) => {
    console.log("GET method for getting a single post started"); 
    try {
        let posts = await db.any(`
        SELECT * FROM posts
        WHERE id = $1`, [req.params.id]);
        res.json({
            payload: posts,
            message: "Success. Retrieved all posts"
        });
    } catch (error) {
        res.status(500);
        res.json({  
            message: "Error. Something went wrong!"
        });
        console.log("Error:", error);
    }
}); 

//POST /posts - Add single post.
router.post('/', async (req, res) => {
    console.log("POST method for creating a new post started");
    console.log("req.body:", req.body);
    let insertQuery = `
    INSERT INTO posts (username, body, url)
    VALUES ($1, $2, $3)
    `;
    try { //if body and url exists
        if(req.body.body & req.body.url) {
            await db.none(insertQuery, [req.body.username, req.body.body, req.body.url]);
            res.json({
                payload: [req.body.username, req.body.body, req.body.url],
                message: "post created!"
            });

          //if body exists and url doesn't  
        } else if(req.body.body && !req.body.url) {
            await db.none(insertQuery, [req.body.username, req.body.body, null]);
            res.json({
                payload: [req.body.username, req.body.body, null],
                message: "post created!"
            });

          //if body doesn't exist but the url does
        } else if(!req.body.body && req.body.url) {
            await db.none(insertQuery, [req.body.username, null, req.body.url]);
            res.json({
                payload: [req.body.username, null, req.body.url],
                message: "post created!"
            });

          //if neiter exists  
        } else { 
            res.json({
                message: "There was an error creating a post"
            });
        }
    } catch (error) {
        res.json({
            message: "There was an error creating a post"
        });
   }

}); 

module.exports = router;