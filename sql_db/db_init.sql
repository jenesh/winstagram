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
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id) ON DELETE CASCADE,
    body TEXT,
    url TEXT,
    time TEXT DEFAULT NOW()
);

-- DUMMY DATA
INSERT INTO users (username, password, firstname, lastname) VALUES
    ('red', '123','owen', 'jones'),
    ('green', '123','sharrar', 'khan'),
    ('blue', '123','jenesh', 'napit')
;

INSERT INTO posts (user_id, body, url) VALUES
    (1, 'Red is my favorite color', ''),
    (2, 'Green is my favorite color', ''),
    (3, 'Blue is my favorite color', '')
;

-- Display both the tables
SELECT * FROM users;
SELECT * FROM posts;