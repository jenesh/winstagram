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
    time_post TEXT DEFAULT NOW()
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
    time_comment TEXT DEFAULT NOW()
);

CREATE TABLE albums (
    id_album SERIAL PRIMARY KEY,
    user_id_album INT REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE pictures (
    id_picture SERIAL PRIMARY KEY,
    user_id_picture INT REFERENCES users (id) ON DELETE CASCADE,
    album_id_picture INT REFERENCES albums (id_album) ON DELETE CASCADE,
    post_id_picture INT REFERENCES posts (id_post) ON DELETE CASCADE,
    url_picture TEXT,
    time_picture TEXT DEFAULT NOW()
);

-- DUMMY DATA
INSERT INTO users (username, password, firstname, lastname) VALUES
    ('red', '123','owen', 'jones'),
    ('green', '123','sharrar', 'khan'),
    ('blue', '123','jenesh', 'napit'),
    ('lol', '123','mr', 'lol'),
    ('lml', '123','lml', 'funny'),
    ('yo', '123','y', 'o'),
    ('yay', '123','mr', 'yay')
;

INSERT INTO posts (user_id_post, body_post, url) VALUES
    (1, 'Red is my favorite color', 'https://images.unsplash.com/photo-1513477967668-2aaf11838bd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'),
    (2, 'Green is my favorite color', 'https://images.unsplash.com/photo-1572406667345-eb5e50352ec0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'),
    (3, 'Blue is my favorite color', 'https://images.unsplash.com/photo-1573433618812-f612e727b7d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
    (1, 'I believe I can fly', 'https://images.unsplash.com/photo-1573456170607-b885fdc78985?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
    (2, 'Is the world flat or round?', 'https://images.unsplash.com/photo-1573502641713-edc392a0ef30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80'),
    (1, 'Queens is the best dont @ me', 'https://images.unsplash.com/photo-1558981023-1d4b7dd8dfb9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
    (3, 'Why is it so cold all of a sudden?', 'https://images.unsplash.com/photo-1573567001730-9eb49e901f40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'),
    (3, 'Whenever I feel sad I just watch a knicks game to remind myself it could be worse.', 'https://www.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg');

INSERT INTO likes (user_id_like, post_id_like, poster_id_like) VALUES
    (1, 2, 2),
    (2, 3, 3),
    (3, 2, 2),
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
    (5, 2, 3)
;
INSERT INTO comments (user_id_comment, post_id_comment, poster_id_comment, body_comment) VALUES
    (1, 2, 2, 'Green is so ugly'),
    (1, 3, 3, 'Blue is legit the best'),
    (2, 2, 2, 'Catch me outside how bout that'),
    (2, 1, 1, '2019 Anyone!?'),
    (4, 1, 1, 'Cows go moo, ducks go quack, idiots go 2019 Anyone!?'),
    (5, 3, 3, 'Youre legit wrong kid')
;

INSERT INTO albums (user_id_album) VALUES 
    (1),
    (2),
    (1)
;

INSERT INTO pictures (user_id_picture, album_id_picture, post_id_picture, url_picture) VALUES
    (1, 1, 1, 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'),
    (1, 2, 1, 'https://www.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg'),
    (2, 3, 2, 'https://www.petmd.com/sites/default/files/introduce-dog-to-cat.jpg')
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