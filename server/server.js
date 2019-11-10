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
    const { username, id } = req.session.valid;
    if (req.session.valid.loggedIn) {
        const viewPath = path.dirname(__dirname) + '/public/views/homepage.ejs';

        // // GET ALL USER INFORMATION

        // const query1 = db.any() // GET ALL POSTS
        // const query2 = db.any() // GET ALL COMMENTS

        // GET ALL LIKES
        let likes;

        try{
            likes = db.any('SELECT * FROM likes WHERE user_id = $1', [id])  
        } catch (error){
            console.log(error)
        }
        // GET ALL PHOTOS
        let pictures;

        try{
            pictures = db.any('SELECT * FROM pictures WHERE user_id = $1', [id])
        } catch (error){
            console.log(error)
        }

        let posts, query2;
        // const posts = db.any() // GET ALL POSTS
        try{
            posts = await db.any(`SELECT * FROM posts WHERE user_id = $1`, [id]);
        } catch (error){
            query1 = error;
            console.log("error:", error);
        }
        // const comments = db.any() // GET ALL COMMENTS
        try{
            comments = await db.any(`SELECT * FROM comments WHERE user_id = $1`, [id]);
        } catch (error){
            comments = error;
            console.log("error:", error);
        }
        // const query3 = db.any() // GET ALL LIKES
        // const query4 = db.any() // GET ALL PHOTOS

        const arr = [1, 2, 3, 4, 5]

        res.render(viewPath, {username, id, arr, posts, comments, likes, pictures});
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