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
    const { username } = req.body;
    req.session.valid = {
        loggedIn: true,
        username: username
    };
    if (req.session.valid) {
        const homePage = path.dirname(__dirname) + '/public/homepage/homepage.html';
        res.sendFile(homePage);
    } else {
        res.redirect('/login');
    }
});

app.get('/homepage', (req, res) => {
    if (req.session.valid.loggedIn) {
        res.json({
            payload: {
                username: req.session.valid.username,
                posts: [1, 2, 3]
            },
            message: 'User data'
        });
    } else {
        res.redirect('/login');
    }
})

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