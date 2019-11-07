// Users

// GET /users - Get all users.
// GET /users/:id - Get single user.
// POST /users - Add single user.
// DELETE /users/:id - Delete user with the corresponding id.

const express = require('express')
const cors = require('cors')
const db = require('../pgPromise')
const router = express.Router();

router.get('/', async (req, res) => {
    const inputQuery = ('SELECT * FROM users')
    const data = await db.any(inputQuery)
    res.json({
        message: 'Getting all /users',
        payload: data
    })
})


router.get('/:id', (req, res) => {
    const id = req.params.id
    
})

router.post('/')
router.delete('/:id')

module.exports = router;
