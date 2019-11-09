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
    
    try{
        const data = await db.any(inputQuery)
        res.json({
            message: 'Getting all /users',
            payload: data,
            success: true
        })
    } catch (error){
        res.json({
            message: 'Error not a valid input try another',
            success: false
        })
    }
})


router.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    const inputQuery = (`SELECT * FROM users WHERE id = $1`)
    
    try{
        const data = await db.one(inputQuery, [id])
        res.json({
            message: `Getting user`,
            payload: data,
            success: true
        })
    } catch (error){
        res.json({
            message: 'Error try another input',
            success: false
        })
    }
    
})

router.post('/', async (req, res) => {
    const {username, password, firstname, lastname} = req.body
    const inputQuery = (`INSERT INTO users(username, password, firstname, lastname) VALUES($1, $2, $3, $4)`) 
    
    try{
        await db.none(inputQuery,[username, password, firstname, lastname])
        res.json({
            message: "Success user added to database",
            payload: req.body,
            success: true
        })
    } catch(error){
        res.json({
            message: "Could not add user. Something went wrong",
            success: false
        })
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const inputQuery = (`DELETE FROM users WHERE id=$1`);
    
    try{
         await db.none(inputQuery, [id])
        res.json({
            message: 'Success. User deleted.',
            success: true
        })
    } catch(error){
        res.json({
            message: 'Could not delete user. Try another userId',
            success: false
        })
        console.log(error)
    }
})

module.exports = router;
