// Users

// GET /users - Get all users.
// GET /users/:username - Get user by username
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
        console.log("error:", error);
    }
})

router.get('/username/:username', async(req, res) => {
    const username = req.params.username
    const inputQuery = (`SELECT * FROM users WHERE username = $1`)
    
    try{
        const data = await db.one(inputQuery, [username])
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

router.get('/id/:id', async(req, res) => {
    const id = Number(req.params.id)
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
        console.log('error:',error)
    }
    console.log(typeof id)
    
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

//u and p as two variables, get u and p from query, then make query call, select * from users if u = $1 and p = $2
//db.one
router.get('/login/inputs/:username/:password', async(req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    console.log("password", password)
    const inputQuery = (`SELECT * FROM users WHERE username = $1 AND password = $2`);
    
    try{
        const data = await db.one(inputQuery, [username, password])
        res.json({
            message: `Getting user named: ${username}`,
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

module.exports = router;
