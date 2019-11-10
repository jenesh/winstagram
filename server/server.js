const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./pgPromise');

const app = express(); 

app.use(cors()); 
app.use(express.urlencoded({extended: false}));
<<<<<<< HEAD
app.use(express.json());
=======
app.use(express.json()); 
app.use(express.static(`${path.dirname(__dirname)}/public`));
>>>>>>> 320c1139a26d5ad25ffcade1650670bd8cbbbbb8

// Redirect to homepage
app.get('/', (req, res) => {
    console.log(path.dirname(__dirname));
    res.redirect('/landingpage');
})

// HOMEPAGE Route
app.get('/landingpage', (req, res) => {
    const landingPage = path.dirname(__dirname) + '/public/landingPage/landingPage.html';
    res.sendFile(landingPage);
})

// HOMEPAGE Route
app.get('/login', (req, res) => {
    const loginPage = path.dirname(__dirname) + '/public/login/login.html';
    res.sendFile(loginPage);
});

app.get('/signup', (req, res) => {
    const signUpPage = path.dirname(__dirname) + '/public/signup/signup.html';
    res.sendFile(signUpPage);
});

// USERS Route
const usersRouter = require('./routes/usersRouter.js')
app.use('/users', usersRouter);

//POST Route:
const postsRoutes = require("./routes/postsRouter");
app.use("/posts", postsRoutes);

// LIKES Router
const likesRouter = require("./routes/likesRouter");
app.use("/likes", likesRouter);

<<<<<<< HEAD

app.get('/', (req, res) => {
    res.sendFile('/Users/sharrarkhan/Desktop/pursuitWork/core/firstGroupProject/winstagram/public/landingpage/landingpage.html')
    // res.json({
    //     message: 'Server is up and running',
    //     params: req.params.test
    // })
});


const usersRouter = require('./routes/usersRouter.js')
app.use('/users', usersRouter)

=======
>>>>>>> 320c1139a26d5ad25ffcade1650670bd8cbbbbb8
// COMMENTS Route
const commentsRouter = require("./routes/commentsRouter")
app.use('/comments', commentsRouter)

// ALBUMS Route
const albumsRouter = require('./routes/albumsRouter');
app.use('/albums', albumsRouter);

// PICTURES Route
const picturesRouter = require('./routes/picturesRouter');
app.use('/pictures', picturesRouter);

// TEST Route
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Server is up and running',
//         params: req.params.test
//     })
// });

const port = 8000; 

app.listen(port, () => {
    console.log(`Live at => http://localhost:${port}`);
});