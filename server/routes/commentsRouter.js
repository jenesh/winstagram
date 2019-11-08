// Comments

// GET /comments/posts/:post_id - Get all comments for a single post.
// POST /comments/posts/:post_id/:commenter_id - Add single comment.
// PATCH /comments/:post_id/:commenter_id - Edit single comment.
// DELETE /comments/:post_id/:commenter_id - Delete single comment.

const express = require('express')
const cors = require('cors')
const db = require('../pgPromise')
const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('Comments home')
// })

router.get('/posts/:post_id', async(req, res) => {
    const postId = parseInt(req.params.post_id)
    const inputQuery = (`SELECT body FROM comments WHERE post_id = $1`)

    try{
        const getPosts = await db.any(inputQuery, [postId])
        res.json({
            message: 'Success. Get request received',
            payload: getPosts,
            success: true
        })
    }catch (error){
        res.json({
            message: "Error wrong input. Enter a different post id",
            success: false
        })
    }
})

router.post('/posts/:post_id/:commenter_id', (req, res) => {
    const postId = req.body.post_id
    const commenterId = req.body.commenter_id
    const inputQuery = (`SELECT `)
})

router.patch('/:post_id/:commenter_id', (req, res) => {

})

router.delete('/posts/:commenter_id', (req, res) => {

})

module.exports = router