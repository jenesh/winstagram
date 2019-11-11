const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./pgPromise');
const session = require('express-session');

const app = express(); 

app.use(cors()); 
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
app.use(express.static(`${path.dirname(__dirname)}/public`));
app.use(session({
    secret: 'please',
    resave: true,
    saveUninitialized: true
}));
app.set('view engine', 'ejs');

// Redirect to LANDINGPAGE
app.get('/', (req, res) => {
    console.log(path.dirname(__dirname));
    res.redirect('/landingpage');
});

// LANDINGPAGE Route
app.get('/landingpage', (req, res) => {
    const landingPage = path.dirname(__dirname) + '/public/landingPage/landingPage.html';
    res.sendFile(landingPage);
});

// HOMEPAGE Route
app.get('/validation', (req, res) => {
    const { username, id } = req.query;
    // console.log('Params', req.query);
    req.session.valid = {
        loggedIn: true,
        username: username,
        id: id
    };
    if (req.session.valid && username.length > 0 && id.length > 0) {
        res.redirect('/homepage');
    } else {
        res.redirect('/login');
    }
});

app.get('/homepage', async (req, res) => {
    // console.log('SESSION', req.session);
    let { username, id } = req.session.valid;
    id = Number(id);

    if (req.session.valid.loggedIn) {
        // // GET ALL USER INFORMATION
        let users, likes, pictures, posts, comments, allInfo;
        try{
            allInfo = await db.any(`
            SELECT * FROM users
            JOIN posts ON (users.id = posts.user_id)
            JOIN comments ON (users.id = comments.user_id)
            `, [id])  
        } catch (error){
            console.log('Likes error => ', error);
        }

        // GET ALL USERS
        try{
            users = await db.any('SELECT * FROM users WHERE id = $1', [id])  
        } catch (error){
            console.log('Users error => ', error);
        }
        // GET ALL LIKES
        try{
            likes = await db.any('SELECT * FROM likes WHERE user_id = $1', [id])  
        } catch (error){
            console.log('Likes error => ', error);
        }
        // GET ALL PHOTOS
        try{
            pictures = await db.any('SELECT * FROM pictures WHERE user_id = $1', [id])
        } catch (error){
            console.log('Photos error => ', error);
        }
        // GET ALL POSTS
        try{
            posts = await db.any(`SELECT * FROM posts WHERE user_id = $1`, [id]);
        } catch (error){
            query1 = error;
            console.log('Posts error => ', error);
        }
        // GET ALL COMMENTS
        try{
            comments = await db.any(`SELECT * FROM comments WHERE user_id = $1`, [id]);
        } catch (error){
            comments = error;
            console.log('Comments error => ', error);
        }

        const arr = [1, 2, 3, 4, 5];
        console.log('All Info: ', allInfo);
        // console.log(users, likes, pictures, posts, comments);

        const viewPath = path.dirname(__dirname) + '/public/views/homepage.ejs';
        res.render(viewPath, {username, id, users, posts, comments, likes, pictures});
    } else {
        res.redirect('/login');
    }
});

// LOGIN Route
app.get('/login', (req, res) => {
    const loginPage = path.dirname(__dirname) + '/public/login/login.html';
    res.sendFile(loginPage);
});

// SIGNUP Route
app.get('/signup', (req, res) => {
    const signUpPage = path.dirname(__dirname) + '/public/signup/signup.html';
    res.sendFile(signUpPage);
});

// USERS Route
const usersRouter = require('./routes/usersRouter.js');
app.use('/users', usersRouter);

//POST Route:
const postsRoutes = require("./routes/postsRouter");
app.use("/posts", postsRoutes);

// LIKES Router
const likesRouter = require("./routes/likesRouter");
app.use("/likes", likesRouter);

// COMMENTS Route
const commentsRouter = require("./routes/commentsRouter");
app.use('/comments', commentsRouter);

// ALBUMS Route
const albumsRouter = require('./routes/albumsRouter');
app.use('/albums', albumsRouter);

// PICTURES Route
const picturesRouter = require('./routes/picturesRouter');
app.use('/pictures', picturesRouter);

// TEST Route
// app.get('/test', (req, res) => {
//     console.log('Original Session Information: ', req.session);
//     req.session.userData = {
//         username: 'John',
//         password: 'Cena'
//     }

//     res.redirect('/redirect');
// });

// app.get('/redirect', (req, res) => {
//     console.log('Recieved User Data: ', req.session.userData);
//     // res.json({
//     //     body: req.session.userData,
//     //     message: 'Redirected'
//     // })
//     const sessionPage = path.dirname(__dirname) + '/public/test/session.html';
//     res.sendFile(sessionPage);
// })

const port = 8000; 

app.listen(port, () => {
    console.log(`Live at => http://localhost:${port}`);
});