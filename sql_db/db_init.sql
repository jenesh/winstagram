-- SQL QUERIES
-- ===> TO DO <===
-- CREATE DB => Name for now winstagram
-- CREATE TABLES (6)
-- INSERT MOCK DATA

DROP DATABASE IF EXISTS winstagram;

CREATE DATABASE winstagram;

\c winstagram

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL
);

CREATE TABLE posts (
    id_post SERIAL PRIMARY KEY,
    user_id_post INT REFERENCES users (id) ON DELETE CASCADE,
    body_post TEXT,
    url TEXT,
    time TEXT DEFAULT NOW()
);

CREATE TABLE likes (
    id_like SERIAL PRIMARY KEY,
    user_id_like INT REFERENCES users (id) ON DELETE CASCADE,
    post_id_like INT REFERENCES posts (id_post) ON DELETE CASCADE,
    poster_id_like INT REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id_comment SERIAL PRIMARY KEY,
    user_id_comment INT REFERENCES users (id) ON DELETE CASCADE,
    post_id_comment INT REFERENCES posts (id_post) ON DELETE CASCADE,
    poster_id_comment INT REFERENCES users (id) ON DELETE CASCADE,
    body_comment TEXT,
    time TEXT DEFAULT NOW()
);

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    user_id_album INT REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE pictures (
    id SERIAL PRIMARY KEY,
    user_id_picture INT REFERENCES users (id) ON DELETE CASCADE,
    album_id_picture INT REFERENCES albums (id) ON DELETE CASCADE,
    url_picture TEXT,
    time TEXT DEFAULT NOW()
);

-- DUMMY DATA
INSERT INTO users (username, password, firstname, lastname) VALUES
    ('red', '123','owen', 'jones'),
    ('green', '123','sharrar', 'khan'),
    ('blue', '123','jenesh', 'napit'),
    ('lol', '123','mr', 'lol'),
    ('lml', '123','lml', 'funny'),
    ('yo', '123','y', 'o'),
    ('yay', '123','mr', 'yay'),
    ('name1', '123','name', '1'),
    ('name2', '123','name', '2'),
    ('name3', '123','name', '3'),
    ('name4', '123','name', '4'),
    ('name5', '123','name', '5'),
    ('name6', '123','name', '6'),
    ('name7', '123','name', '7'),
<<<<<<< HEAD
    ('name8', '123','name', '8')
;
=======
    ('name8', '123','name', '8');
>>>>>>> 91a758963771f8eebfaa2fa001901ad720cbe261

INSERT INTO posts (user_id_post, body_post, url) VALUES
    (1, 'Red is my favorite color', ''),
    (2, 'Green is my favorite color', ''),
    (3, 'Blue is my favorite color', ''),
<<<<<<< HEAD
    (4, 'body4', ''),
    (5, 'body5', ''),
    (6, 'body6', ''),
    (7, 'body7', ''),
    (8, 'body8', '')

;
=======
    (1, 'body4', 'image1'),
    (2, 'body5', ''),
    (1, 'body6', ''),
    (3, 'body7', ''),
    (3, 'body8', 'image2');
>>>>>>> 91a758963771f8eebfaa2fa001901ad720cbe261

INSERT INTO likes (user_id_like, post_id_like, poster_id_like) VALUES
    (1, 2, 2),
    (2, 3, 3),
    (3, 2, 2),
<<<<<<< HEAD

    (4, 2, 7),
    (2, 6, 3),
    (1, 2, 4),
​
    (5, 2, 3),
    (8, 1, 3),
    (6, 5, 9),
​
    (10, 7, 8),
    (2, 11, 5),
    (7, 9, 8),
​
    (8, 5, 7),
    (12, 11, 10),
    (9, 6, 4)
;

INSERT INTO comments (user_id, post_id, poster_id, body) VALUES
    (1, 2, 2, 'That\s my favorite color too!'),
    (2, 2, 2, 'Omg, Twinz!'),
    (2, 1, 1, 'First!')`
=======
    (3, 2, 2),
    (2, 3, 3),
    (1, 2, 2),
    (1, 2, 2),
    (1, 3, 3),
    (1, 2, 2),
    (2, 2, 2),
    (2, 3, 3),
    (2, 2, 2),
    (3, 2, 2),
    (3, 3, 3),
    (3, 2, 2),
    (4, 2, 7),
    (2, 6, 3),
    (1, 2, 4),
    (5, 2, 3),
    (8, 1, 3),
    (6, 5, 9)
;
INSERT INTO comments (user_id_comment, post_id_comment, poster_id_comment, body_comment) VALUES
    (1, 2, 2, 'Thats my favorite color too!'),
    (1, 1, 2, 'Thats my favorite color too!'),
    (2, 2, 2, 'Omg, Twinz!'),
    (2, 1, 1, 'First!'),
    (1, 3, 3, 'First!')
>>>>>>> 91a758963771f8eebfaa2fa001901ad720cbe261
;

INSERT INTO albums (user_id_album) VALUES 
    (1),
    (2),
    (1)
;

INSERT INTO pictures (user_id_picture, album_id_picture, url_picture) VALUES
    (1, 1, 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'),
    (1, 2, 'https://www.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg'),
    (2, 3, 'https://www.petmd.com/sites/default/files/introduce-dog-to-cat.jpg')
;

-- Display both the tables
\echo ========> USERS <========
SELECT * FROM users;
\echo ========> POSTS <========
SELECT * FROM posts;
\echo ========> LIKES <========
SELECT * FROM likes;
\echo ========> COMMENTS <========
SELECT * FROM comments;
\echo ========> ALBUMS <========
SELECT * FROM albums;
\echo ========> PICTURES <========
SELECT * FROM pictures;