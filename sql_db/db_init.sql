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
    lastname VARCHAR(50) NOT NULL,
    profile_img TEXT NOT NULL
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
INSERT INTO users (username, password, firstname, lastname, profile_img) VALUES
    ('red', '123','owen', 'jones', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4e/4e3b9005e98f41f3d5e902141ad17f8f340335b8.jpg'),
    ('green', '123','sharrar', 'khan', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c9/c9488cd6b71532d4d7c5e489b17c7bed7ecb9166.jpg'),
    ('blue', '123','jenesh', 'napit', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/d7/d7a8811156c40364e88c435748f9a5111c534572.jpg'),
    ('bravo', '123','nia', 'carty', 'https://i.pinimg.com/originals/32/09/c0/3209c039c412745c026a4b6e400a9eae.jpg'),
    ('smith', '123','jim', 'smith', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/03/0392a64c390a09ca7c4849b3af64b7b07370d6db.jpg'),
    ('allen', '123','mike', 'bunny', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/00602f6b99e9f286aa28d4120d25fb3f666e192d.jpg'),
    ('miller', '123','britney', 'roh', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b7/b7a7c89368dc0fa1def4bd4249413e801b94229e.jpg'),
    ('brown', '123','jolene', 'malik', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/70/70eab86785a56ef99f1a42e29170a4eea470acef.jpg')
;

INSERT INTO posts (user_id_post, body_post, url) VALUES
    (1, 'Red is my favorite color', 'https://images.unsplash.com/photo-1513477967668-2aaf11838bd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'),
    (2, 'You can do anything you put your mind to. :)', ''),
    (2, 'Green is my favorite color', 'https://images.unsplash.com/photo-1572406667345-eb5e50352ec0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'),
    (3, 'Blue is my favorite color', 'https://images.unsplash.com/photo-1573433618812-f612e727b7d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
    (3, 'Switching from soda to only water has been one of the best changes.', ''),
    (1, 'I believe I can fly', 'https://images.unsplash.com/photo-1573456170607-b885fdc78985?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
    (2, 'Is the world flat or round?', 'https://images.unsplash.com/photo-1573502641713-edc392a0ef30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80'),
    (2, 'I had the worst nightname yesterday but good thing it was only a dream.', ''),
    (1, 'Queens is the best dont @ me', 'https://images.unsplash.com/photo-1558981023-1d4b7dd8dfb9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
    (1, 'Just started meditating and so far I feel more calm throughout the day.', ''),
    (3, 'Why is it so cold all of a sudden?', 'https://images.unsplash.com/photo-1573567001730-9eb49e901f40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'),
    (3, 'Whenever I feel sad I just watch a knicks game to remind myself it could be worse.', 'https://www.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg')
;

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
    (3),
    (4),
    (5)
;

INSERT INTO pictures (user_id_picture, album_id_picture, post_id_picture, url_picture) VALUES
    (1, 1, 1, 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'),
    (1, 2, 1, 'https://www.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg'),
    (2, 3, 2, 'https://www.petmd.com/sites/default/files/introduce-dog-to-cat.jpg'),
    (3, 4, 3, 'https://cdn.pixabay.com/photo/2015/06/22/08/37/children-817365_960_720.jpg'),
    (3, 3, 3, 'https://image.freepik.com/free-photo/businessman-set-start-running-position-prepare-fight-business-race_42193-123.jpg'),
    (4, 5, 4, 'https://cdn.pixabay.com/photo/2016/07/02/01/07/basketball-1492261_960_720.jpg'),
    (5, 5, 5, 'https://image.freepik.com/free-photo/life-thailand-buffalo-kids-people-from-field-sunset-silhouette-photo_51530-937.jpg')
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