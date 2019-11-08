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

router.post('/posts/:post_id/:commenter_id', async(req, res) => {
    const params = req.params
    const comment = req.body
    const inputQuery = (`INSERT INTO comments (user_id, post_id, poster_id, body) VALUES($1, $2, $3, $4) `)

    try {
        await db.none(inputQuery,[comment.user_id, params.post_id, params.commenter_id, comment.body])
        res.json({
            message:'Success. Comment posted',
            payload: req.body,
            success: true
        })

    } catch(error){
        res.json({
            message: 'Failed to add comment to post',
            success: false
        })
        console.log(error)
    }
})

router.patch('/:post_id/:commenter_id', (req, res) => {
    const postId = req.params.post_id
    const commenterId = req.params.commenter_id
    const inputQuery = (``)
})

router.delete('/posts/:post_id/:commenter_id', async(req, res) => {
    const postId = req.params.post_id
    const commenterId = req.params.commenter_id
    const inputQuery = (`DELETE FROM comments WHERE post_id = $1 AND commenter_id = $2`)

    try{
        await db.none(inputQuery, [postId, commenterId])
        res.json({
            message: 'Success. Comment removed',
            success: true
        })
    } catch(error) {
        res.json({
            message: 'Could not delete comment. Try again later',
            success: false
        })
    }
})

module.exports = router