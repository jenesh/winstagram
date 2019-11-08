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
    try{
        res.json({
            message: 'Getting all /users',
            payload: data
        })
    } catch (error){
        res.json({
            message: 'Error not a valid input try another'
        })
    }
})


router.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    const inputQuery = (`SELECT * FROM users WHERE id =${id}`)
    const data = await db.one(inputQuery)
    try{
        res.json({
            message: `Getting user ${id}`,
            payload: data
        })
    } catch (error){
        res.json({
            message: 'Error try another input'
        })
    }
    
})

router.post('/', async (req, res) => {
    const user = req.body
    const inputQuery = (`INSERT INTO users(username, password, firstname, lastname) VALUES($1, $2, $3, $4)`) 
    
    try{
        await db.none(inputQuery,[user.username, user.password, user.firstname, user.lastname])
        res.json({
            message: "Success user added to database",
            payload: req.body
        })
    } catch(error){
        res.json({
            message: "Could not add user. Something went wrong"
        })
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const inputQuery = (`DELETE FROM users WHERE id=${id}`);
    
    try{
         await db.none(inputQuery)
        res.json({
            message: 'Success. User deleted.'
        })
    } catch(error){
        res.json({
            message: 'Could not delete user. Try another userId'
        })
        console.log(error)
    }
})

module.exports = router;
