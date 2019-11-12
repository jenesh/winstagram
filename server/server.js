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
    // req.session.cookie.expires = false;
    // console.log('SESSION', req.session);
    try {
        if (!req.session.hasOwnProperty('valid')) {
            console.log('TRUE')
            res.redirect('/login');
            return;
        }
    } catch (err) {
        console.log(err)
    }
    
    let username = req.session.valid.username;
    let id = req.session.valid.id;
    id = Number(id);

    if (req.session.valid.loggedIn) {
        // // GET ALL USER INFORMATION
        let user, likes, pictures, posts, comments = [];

        // GET ALL POSTS FOR ALL USERS
        try{
            posts = await db.any('SELECT * FROM posts LEFT JOIN users ON (users.id = posts.user_id_post) WHERE users.id <> $1', [id]);
            // JOIN comments ON (users.id = comments.user_id)
            // JOIN likes ON (users.id = likes.user_id)

        } catch (error){
            // console.log('AllInfo error => ', error);
        }

        // GET CURRENT USER INFO
        try{
            user = await db.one('SELECT * FROM users WHERE id = $1', [id]);
        } catch (error){
            // console.log('Users error => ', error);
        }

        // GET ALL COMMENTS FOR EACH POST
        try{
            comments = await db.any('SELECT * FROM posts LEFT JOIN comments ON (posts.id_post = comments.post_id_comment) WHERE posts.id_post <> $1', [id]);
        } catch (error){
            // console.log('Comments error => ', error);
        }

        // GET ALL LIKES FOR EACH POST
        try{
            likes = await db.any('SELECT * FROM posts LEFT JOIN likes ON (posts.id_post = likes.post_id_like) WHERE posts.id_post <> $1', [id]);
            console.log('Working')
        } catch (error){
            // console.log('Comments error => ', error);
        }

        // GET ALL PHOTOS FOR EACH POST
        try{
            pictures = await db.any('SELECT * FROM posts LEFT JOIN pictures ON (posts.id_post = pictures.post_id_picture) WHERE posts.id_post <> $1', [id]);
            console.log('Working')
        } catch (error){
            // console.log('Comments error => ', error);
        }

        // Building required JSON data
        for (let i = 0; i < comments.length; i++) {
            for (let j = 0; j < posts.length; j++) {
                if (comments[i].post_id_comment === posts[j].id_post) {
                    if (posts[j].allComments) {
                        posts[j].allComments.push(comments[i]);
                    } else {
                        posts[j].allComments = [];
                        posts[j].allComments.push(comments[i]);
                    }
                }
            }
        }

        for (let i = 0; i < likes.length; i++) {
            for (let j = 0; j < posts.length; j++) {
                if (likes[i].post_id_like === posts[j].id_post) {
                    if (posts[j].allLikes) {
                        posts[j].allLikes.push(likes[i]);
                    } else {
                        posts[j].allLikes = [];
                        posts[j].allLikes.push(likes[i]);
                    }
                }
            }
        }

        for (let i = 0; i < pictures.length; i++) {
            for (let j = 0; j < posts.length; j++) {
                if (pictures[i].post_id_picture === posts[j].id_post) {
                    if (posts[j].allPhotos) {
                        posts[j].allPhotos.push(pictures[i]);
                    } else {
                        posts[j].allPhotos = [];
                        posts[j].allPhotos.push(pictures[i]);
                    }
                }
            }
        }

        const data = {
            user: user,
            posts: posts,
            // comments: comments
        }

        // console.log('All Info: ', data);
        // console.log('Current User Info: ', user);
        console.log('All Comments for each post: ', comments);

        const viewPath = path.dirname(__dirname) + '/public/views/homepage.ejs';
        //res.json(data);
        res.render(viewPath, {data, user});
    } else {
        res.redirect('/login');
    }
});

app.get('/profile', async (req, res) => {
    // req.session.cookie.expires = false;
    // console.log('SESSION', req.session);
    try {
        if (!req.session.hasOwnProperty('valid')) {
            console.log('TRUE')
            res.redirect('/login');
            return;
        }
    } catch (err) {
        console.log(err)
    }
    
    let username = req.session.valid.username;
    let id = req.session.valid.id;
    id = Number(id);

    if (req.session.valid.loggedIn) {
        // // GET ALL USER INFORMATION
        let user, likes, pictures, posts, comments = [];

        // GET ALL POSTS FOR ALL USERS
        try{
            posts = await db.any('SELECT * FROM posts LEFT JOIN users ON (users.id = posts.user_id_post) WHERE users.id = $1', [id]);
            // JOIN comments ON (users.id = comments.user_id)
            // JOIN likes ON (users.id = likes.user_id)

        } catch (error){
            // console.log('AllInfo error => ', error);
        }

        // GET CURRENT USER INFO
        try{
            user = await db.one('SELECT * FROM users WHERE id = $1', [id]);
        } catch (error){
            // console.log('Users error => ', error);
        }

        // GET ALL COMMENTS FOR EACH POST
        try{
            comments = await db.any('SELECT * FROM posts LEFT JOIN comments ON (posts.id_post = comments.post_id_comment) WHERE posts.id_post = $1', [id]);
        } catch (error){
            // console.log('Comments error => ', error);
        }

        // GET ALL LIKES FOR EACH POST
        try{
            likes = await db.any('SELECT * FROM posts LEFT JOIN likes ON (posts.id_post = likes.post_id_like) WHERE posts.id_post = $1', [id]);
            console.log('Working')
        } catch (error){
            // console.log('Comments error => ', error);
        }

        // GET ALL PHOTOS FOR EACH POST
        try{
            pictures = await db.any('SELECT * FROM posts LEFT JOIN pictures ON (posts.id_post = pictures.post_id_picture) WHERE posts.id_post = $1', [id]);
            console.log('Working')
        } catch (error){
            // console.log('Comments error => ', error);
        }

        // Building required JSON data
        for (let i = 0; i < comments.length; i++) {
            for (let j = 0; j < posts.length; j++) {
                if (comments[i].post_id_comment === posts[j].id_post) {
                    if (posts[j].allComments) {
                        posts[j].allComments.push(comments[i]);
                    } else {
                        posts[j].allComments = [];
                        posts[j].allComments.push(comments[i]);
                    }
                }
            }
        }

        for (let i = 0; i < likes.length; i++) {
            for (let j = 0; j < posts.length; j++) {
                if (likes[i].post_id_like === posts[j].id_post) {
                    if (posts[j].allLikes) {
                        posts[j].allLikes.push(likes[i]);
                    } else {
                        posts[j].allLikes = [];
                        posts[j].allLikes.push(likes[i]);
                    }
                }
            }
        }

        for (let i = 0; i < pictures.length; i++) {
            for (let j = 0; j < posts.length; j++) {
                if (pictures[i].post_id_picture === posts[j].id_post) {
                    if (posts[j].allPhotos) {
                        posts[j].allPhotos.push(pictures[i]);
                    } else {
                        posts[j].allPhotos = [];
                        posts[j].allPhotos.push(pictures[i]);
                    }
                }
            }
        }

        const data = {
            user: user,
            posts: posts,
            // comments: comments
        }

        // console.log('All Info: ', data);
        // console.log('Current User Info: ', user);
        console.log('All Comments for each post: ', comments);

        const viewPath = path.dirname(__dirname) + '/public/views/profile.ejs';
        // res.json(data);
        res.render(viewPath, {data, user});
    } else {
        res.redirect('/login');
    }
});



// LOGOUT ROUTE
app.get('/logout', (req, res) => {
    console.log('Destroying Session');
    req.session.destroy();
    res.json({status: true});
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